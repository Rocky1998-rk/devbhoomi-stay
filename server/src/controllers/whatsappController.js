import {
  parseWhatsAppMessage,
  getOrCreateWhatsAppSession,
  updateWhatsAppSession,
  sendWhatsAppButtons,
  sendWhatsAppText,
  sendWhatsAppContact,
  sendWhatsAppList,
  sendWhatsAppImage,
  sendWhatsAppFlow,
} from "../services/whatsappService.js";
import { searchAvailableHotels } from "../services/whatsappBookingService.js";
import Hotel from "../models/Hotel.js";
import createRazorpayPaymentLink from "../services/razorpayService.js";
import WhatsAppPayment from "../models/WhatsAppPayment.js";
import Room from "../models/Room.js";
import RoomPricing from "../models/RoomPricing.js";
import { getApplicableRoomPricing } from "../services/roomPricingService.js";
import generateBookingVoucher from "../services/voucherService.js";

import {uploadWhatsAppPDF,sendWhatsAppPDF,} from "../services/whatsappDocumentService.js";


const HOTEL_SELECTION_FLOW_ID = "1704794834983995";

// ========================= WhatsApp Webhook Verification =========================

export const verifyWhatsAppWebhook = (req, res) => {
  try {
    const mode = req.query["hub.mode"];
    const token = req.query["hub.verify_token"];
    const challenge = req.query["hub.challenge"];

    const verifyToken =
      process.env.WHATSAPP_VERIFY_TOKEN;

    if (
      mode === "subscribe" &&
      token === verifyToken
    ) {
      return res
        .status(200)
        .send(challenge);
    }

    return res.sendStatus(403);
  } catch (error) {
    console.error(
      "WhatsApp Webhook Verification Error:",
      error.message
    );

    return res.sendStatus(500);
  }
};

// ========================= Send Welcome Screen (Screen 1) =========================


const sendWelcomeScreen = async (phoneNumber) => {
  const welcomeImageUrl =
    process.env.WHATSAPP_WELCOME_IMAGE_URL?.trim();

  if (!welcomeImageUrl) {
    console.warn(
      "WHATSAPP_WELCOME_IMAGE_URL is not configured."
    );
  }

  return sendWhatsAppButtons(
    phoneNumber,
    [
      "🏔️ *Welcome to DevBhoomi Stay*",
      "Escape to the serene hills of Lansdowne & Kotdwar.",
      "✨ Handpicked boutique stays, homestays & resorts.",
      "Please choose your preferred language:",
    ].join("\n\n"),
    [
      {
        id: "LANG_HINDI",
        title: "🇮🇳 हिन्दी",
      },
      {
        id: "LANG_ENGLISH",
        title: "🇬🇧 English",
      },
    ],
    {
      headerImageUrl: welcomeImageUrl,
      footerText: "DevBhoomi Stay • Lansdowne & Kotdwar",
    }
  );
};

// ========================= Send Home Screen =========================

const sendHomeScreen = async (
  phoneNumber,
  language,
  customerName = ""
) => {
  const isHindi = language === "hindi";

  // Get the first name from WhatsApp profile
  const rawName = String(customerName || "").trim();

  console.log("Home Screen Customer Name:", customerName);

  const firstName = rawName.split(/\s+/)[0];

  // Fallback if WhatsApp profile name is unavailable
  const displayName =
    firstName &&
    !["customer", "unknown", "user"].includes(
      firstName.toLowerCase()
    )
      ? firstName
      : isHindi
        ? "दोस्त"
        : "there";

  const bodyText = isHindi
    ? `नमस्ते ${displayName} 🙏🏻\n\n*DevBhoomi Stay* में आपका स्वागत है 🏔️\n\nआज हम आपकी क्या सहायता कर सकते हैं?`
    : `Namaste ${displayName} 🙏🏻\n\nWelcome to *DevBhoomi Stay* 🏔️✨\n\n🌄 Discover the beauty of the mountains and find your perfect stay!\n\nHow may we assist you today? 🧳`;

  return sendWhatsAppButtons(
    phoneNumber,
    bodyText,
    [
      {
        id: "HOME_BOOK_HOTEL",
        title: isHindi
          ? "🏨 होटल खोजें"
          : "🏨 Book a Stay",
      },
      {
        id: "HOME_CONTACT_US",
        title: isHindi
          ? "📞 संपर्क / सहायता"
          : "📞 Concierge Support",
      },
      {
        id: "HOME_ABOUT_US",
        title: isHindi
          ? "ℹ️ हमारे बारे में"
          : "ℹ️ About Us",
      },
    ]
  );
};



// ========================= Send Destination Screen =========================

const sendDestinationScreen = async (
  phoneNumber,
  language
) => {
  const isHindi =
    language === "hindi";

  return sendWhatsAppButtons(
    phoneNumber,

    isHindi
      ? "📍 *गंतव्य का चयन करें*\n\nआप कहाँ ठहरना चाहते हैं?"
      : "📍 *Select Destination*\n\nWhere would you like to stay?",

    [
      {
        id: "DEST_LANSDOWNE",
        title: "🏔️ Lansdowne",
      },

      {
        id: "DEST_KOTDWAR",
        title: "🌲 Kotdwar",
      },
    ]
  );
};

// ========================= Send Check-in Screen =========================

const sendCheckInScreen = async (
  phoneNumber,
  language
) => {
  const isHindi =
    language === "hindi";

  return sendWhatsAppButtons(
    phoneNumber,

    isHindi
      ? "📅 *चेक-इन तिथि (Check-in Date)*\n\nकृपया अपनी चेक-इन डेट चुनें:"
      : "📅 *Check-in Date*\n\nPlease select your check-in date:",

    [
      {
        id: "CHECKIN_TOMORROW",
        title: "📅 Tomorrow",
      },

      {
        id: "CHECKIN_OTHER",
        title: "🗓️ Custom Date",
      },
    ]
  );
};

// ========================= Date Helpers =========================

const getTodayIST = () => {
  const parts =
    new Intl.DateTimeFormat(
      "en-CA",
      {
        timeZone: "Asia/Kolkata",
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
      }
    ).formatToParts(
      new Date()
    );

  const values = {};

  parts.forEach((part) => {
    if (
      part.type !== "literal"
    ) {
      values[part.type] =
        part.value;
    }
  });

  return {
    year: Number(
      values.year
    ),

    month: Number(
      values.month
    ),

    day: Number(
      values.day
    ),
  };
};

// ========================= Create UTC Date =========================

const createUTCDate = (
  year,
  month,
  day
) => {
  return new Date(
    Date.UTC(
      year,
      month - 1,
      day
    )
  );
};

// ========================= Add Days =========================

const addDays = (
  date,
  days
) => {
  const result =
    new Date(date);

  result.setUTCDate(
    result.getUTCDate() +
      days
  );

  return result;
};

// ========================= Format Date =========================

const formatDate = (
  date
) => {
  return date.toLocaleDateString(
    "en-IN",
    {
      timeZone:
        "Asia/Kolkata",

      day: "2-digit",

      month: "2-digit",

      year: "numeric",
    }
  );
};

// =========================
// Convert URL to WhatsApp Compatible JPG
// =========================
const toWhatsAppJpgUrl = (url) => {
  if (!url || typeof url !== "string") return null;
  let cleanUrl = url.trim();
  if (cleanUrl.includes("res.cloudinary.com")) {
    cleanUrl = cleanUrl.replace(/\.(webp|png|jpeg)(\?.*)?$/i, ".jpg$2");
    if (!cleanUrl.endsWith(".jpg")) {
      cleanUrl = cleanUrl.replace("/upload/", "/upload/f_jpg/");
    }
  }
  return cleanUrl;
};

// =========================
// Get Real Room Price Per Night From DB
// =========================
const getRoomNightPrice = async (hotel, roomId, checkInDate) => {
  const date = checkInDate ? new Date(checkInDate) : new Date();
  const ownerId = hotel?.owner?._id || hotel?.owner;

  if (ownerId && roomId) {
    try {
      const applicable = await getApplicableRoomPricing(ownerId, roomId, date);
      if (applicable?.pricePerNight) {
        return applicable.pricePerNight;
      }
    } catch (err) {
      // fallback below
    }
  }

  if (roomId) {
    try {
      const directPricing = await RoomPricing.findOne({
        room: roomId,
        isActive: true,
      }).sort({ priority: -1 });
      if (directPricing?.pricePerNight) {
        return directPricing.pricePerNight;
      }
    } catch (err) {
      // fallback below
    }
  }

  const hotelId = hotel?._id || hotel?.hotelId;
  if (hotelId) {
    try {
      const hotelPricing = await RoomPricing.findOne({
        hotel: hotelId,
        isActive: true,
      }).sort({ priority: -1 });
      if (hotelPricing?.pricePerNight) {
        return hotelPricing.pricePerNight;
      }
    } catch (err) {
      // fallback below
    }
  }

  return Number(hotel?.startingPrice) || 0;
};

// =========================
// Parse User Date
//
// Supported:
//
// DD/MM/YYYY
// DD-MM-YYYY
// YYYY-MM-DD
// =========================

const parseUserDate = (
  value
) => {
  if (!value) {
    return null;
  }

  const cleaned =
    value.trim();

  let day;
  let month;
  let year;

  // DD/MM/YYYY
  // DD-MM-YYYY

  let match =
    cleaned.match(
      /^(\d{2})[\/-](\d{2})[\/-](\d{4})$/
    );

  if (match) {
    day = Number(
      match[1]
    );

    month = Number(
      match[2]
    );

    year = Number(
      match[3]
    );
  }

  // YYYY-MM-DD

  if (!match) {
    match =
      cleaned.match(
        /^(\d{4})-(\d{2})-(\d{2})$/
      );

    if (match) {
      year = Number(
        match[1]
      );

      month = Number(
        match[2]
      );

      day = Number(
        match[3]
      );
    }
  }

  if (
    !day ||
    !month ||
    !year
  ) {
    return null;
  }

  const date =
    createUTCDate(
      year,
      month,
      day
    );

  // Invalid calendar date

  if (
    date.getUTCFullYear() !==
      year ||

    date.getUTCMonth() !==
      month - 1 ||

    date.getUTCDate() !==
      day
  ) {
    return null;
  }

  return date;
};

// ========================= Send Check-out Screen =========================

const sendCheckOutScreen =
  async (
    phoneNumber,
    language,
    checkIn
  ) => {
    const isHindi =
      language ===
      "hindi";

    const nextDay =
      addDays(
        checkIn,
        1
      );

    const nextDayLabel =
      formatDate(
        nextDay
      );

    return sendWhatsAppButtons(
      phoneNumber,

      isHindi
        ? `📅 *चेक-आउट तिथि (Check-out Date)*\n\nअनुशंसित चेक-आउट तिथि: *${nextDayLabel}*`
        : `📅 *Check-out Date*\n\nRecommended check-out: *${nextDayLabel}*`,

      [
        {
          id: "CHECKOUT_NEXT_DAY",
          title: "📅 Next Day",
        },

        {
          id: "CHECKOUT_OTHER",
          title: "🗓️ Custom Date",
        },
      ]
    );
  };

// ========================= Send Adults Screen =========================

const sendAdultsScreen =
  async (
    phoneNumber,
    language
  ) => {
    const isHindi =
      language ===
      "hindi";

    return sendWhatsAppList(
      phoneNumber,

      isHindi
        ? "👥 *अतिथियों की संख्या (Adults)*\n\nकृपया वयस्कों (12+ वर्ष) की संख्या चुनें:"
        : "👥 *Number of Adults*\n\nPlease select the number of adult guests (12+ yrs):",

      isHindi
        ? "Adults चुनें"
        : "Select Adults",

      [
        {
          title: isHindi
            ? "Adults की संख्या"
            : "Number of Adults",

          rows: [
            {
              id: "ADULTS_1",
              title: "👤 1 Adult",
              description: "Solo traveler",
            },

            {
              id: "ADULTS_2",
              title: "👥 2 Adults",
              description: "Couple / 2 guests",
            },

            {
              id: "ADULTS_3",
              title: "👥 3 Adults",
              description: "3 guests stay",
            },

            {
              id: "ADULTS_4_PLUS",
              title: "👥 4+ Adults",
              description: "Family / group stay",
            },
          ],
        },
      ]
    );
  };

// =========================Send Children Screen =========================

const sendChildrenScreen =
  async (
    phoneNumber,
    language
  ) => {
    const isHindi =
      language ===
      "hindi";

    return sendWhatsAppList(
      phoneNumber,

      isHindi
        ? "👶 *बच्चों की संख्या (Children)*\n\nक्या आपके साथ 12 वर्ष से कम आयु के बच्चे यात्रा कर रहे हैं?"
        : "👶 *Number of Children*\n\nAre any children under 12 traveling with you?",

      isHindi
        ? "Children चुनें"
        : "Select Children",

      [
        {
          title: isHindi
            ? "Children की संख्या"
            : "Number of Children",

          rows: [
            {
              id: "CHILDREN_0",
              title: "• 0 Children",
              description: "No children",
            },

            {
              id: "CHILDREN_1",
              title: "👶 1 Child",
              description: "Below 12 years",
            },

            {
              id: "CHILDREN_2",
              title: "👶 2 Children",
              description: "Below 12 years",
            },

            {
              id: "CHILDREN_3_PLUS",
              title: "👶 3+ Children",
              description: "Below 12 years",
            },
          ],
        },
      ]
    );
  };

// ========================= Send Budget Screen =========================

const sendBudgetScreen =
  async (
    phoneNumber,
    language
  ) => {
    const isHindi =
      language ===
      "hindi";

    return sendWhatsAppList(
      phoneNumber,

      isHindi
        ? "💰 *बजट सीमा (Budget Range)*\n\nप्रति रात (per night) के लिए अपना पसंदीदा बजट चुनें:"
        : "💰 *Budget Preference*\n\nPlease select your preferred tariff range per night:",

      isHindi
        ? "Budget चुनें"
        : "Select Budget",

      [
        {
          title:
            "Budget Range",

          rows: [
            {
              id: "BUDGET_1500_2500",
              title: "🏷️ ₹1,500 – ₹2,500",
              description: "Economical & comfortable",
            },

            {
              id: "BUDGET_2500_4000",
              title: "⭐ ₹2,500 – ₹4,000",
              description: "Deluxe hill stays",
            },

            {
              id: "BUDGET_4000_6000",
              title: "✨ ₹4,000 – ₹6,000",
              description: "Premium stays with valley views",
            },

            {
              id: "BUDGET_LUXURY",
              title: "👑 Luxury (₹6,000+)",
              description: "Boutique resorts & villas",
            },
          ],
        },
      ]
    );
  };

// =========================
// Send Hotel Type Screen
// =========================

const sendHotelTypeScreen =
  async (
    phoneNumber,
    language
  ) => {
    const isHindi =
      language ===
      "hindi";

    return sendWhatsAppList(
      phoneNumber,

      isHindi
        ? "🏡 *प्रॉपर्टी प्रकार (Property Type)*\n\nआप किस प्रकार के आवास में ठहरना चाहते हैं?"
        : "🏡 *Stay Preference*\n\nWhat type of accommodation do you prefer?",

      isHindi
        ? "Hotel Type चुनें"
        : "Select Hotel Type",

      [
        {
          title:
            "Hotel Type",

          rows: [
            {
              id: "HOTEL_TYPE_BUDGET",
              title: "🏷️ Budget Stay",
              description: "Clean & affordable",
            },

            {
              id: "HOTEL_TYPE_DELUXE",
              title: "⭐ Deluxe Hotel",
              description: "Scenic views & modern amenities",
            },

            {
              id: "HOTEL_TYPE_LUXURY",
              title: "👑 Luxury Resort",
              description: "High-end comfort & suites",
            },

            {
              id: "HOTEL_TYPE_HOMESTAY",
              title: "🏡 Heritage Homestay",
              description: "Authentic local Uttarakhand stay",
            },
          ],
        },
      ]
    );
  };

// =========================
// Send Searching Screen
// =========================

const sendSearchingHotelsScreen =
  async (
    phoneNumber,
    language
  ) => {
    const isHindi =
      language ===
      "hindi";

    const searchingImageUrl =
      process.env.WHATSAPP_SEARCHING_IMAGE_URL?.trim() ||
      "https://res.cloudinary.com/dszadvuz6/image/upload/v1792822687/stay_lansdowne/searching_hotels_banner.jpg";

    const searchingTitle = "🔍 Searching Hotels...";
    const waitMessage = isHindi
      ? "Please wait while we find the best options for you."
      : "Please wait while we find the best options for you.";

    try {
      // 1. First message: 🔍 Searching Hotels...
      await sendWhatsAppText(
        phoneNumber,
        searchingTitle
      );

      // 2. Green hotel & landscape illustration banner (exact match to reference)
      if (searchingImageUrl) {
        await sendWhatsAppImage(
          phoneNumber,
          searchingImageUrl
        );
      }

      // 3. Second message: Please wait while we find the best options for you.
      await sendWhatsAppText(
        phoneNumber,
        waitMessage
      );
    } catch (error) {
      console.error(
        "Error sending searching hotels screen:",
        error?.message || error
      );

      await sendWhatsAppText(
        phoneNumber,
        `${searchingTitle}\n\n${waitMessage}`
      );
    }
  };


// =========================
// Send Hotels Found Screen
// =========================

const sendHotelsFoundScreen =
  async (
    phoneNumber,
    language,
    hotels
  ) => {
    const isHindi =
      language === "hindi";

    if (
      !hotels ||
      hotels.length === 0
    ) {
      return sendWhatsAppText(
        phoneNumber,

        isHindi
          ? "ℹ️ *कोई होटल उपलब्ध नहीं मिला*\n\nआपके चुने गए दिनांक और फ़िल्टर के अनुसार वर्तमान में कोई प्रॉपर्टी उपलब्ध नहीं है। कृपया भिन्न तिथियों के साथ प्रयास करें या सहायता के लिए संपर्क करें।"
          : "ℹ️ *No Stays Available*\n\nNo properties currently match your selected dates and filters. Please consider adjusting your dates or contacting our team."
      );
    }

    // 1. Header message
    const introMessage = isHindi
      ? `✨ *${hotels.length} होटल उपलब्ध हैं*\n━━━━━━━━━━━━━━━━━━━\nनीचे होटल की तस्वीरें और विवरण देखें, और अपना पसंदीदा होटल चुनने के लिए *होटल चुनें* पर टैप करें:`
      : `✨ *${hotels.length} Hotel(s) Available*\n━━━━━━━━━━━━━━━━━━━\nBrowse hotels below with photos & rates, then tap *Select Hotel* to choose:`;

    await sendWhatsAppText(phoneNumber, introMessage);

    // 2. Send up to 3 individual Hotel Photo Cards
    const cardsToSend = hotels.slice(0, 3);
    for (const h of cardsToSend) {
      const stars = "⭐".repeat(h.starRating || 4);
      const hotelImage = toWhatsAppJpgUrl(
        h.coverImage ||
        (Array.isArray(h.images) && h.images[0]) ||
        null
      );

      const address =
        h.address?.trim() ||
        `${h.city || "Lansdowne"}, ${h.state || "Uttarakhand"}`;

      const price = h.startingPrice || 3000;

      const cardText = isHindi
        ? `🏨 *${h.hotelName}*\n${stars}\n💰 ₹${price} / Night\n📍 ${address}`
        : `🏨 *${h.hotelName}*\n${stars}\n💰 ₹${price} / Night\n📍 ${address}`;

      const buttonOptions = hotelImage
        ? { headerImageUrl: hotelImage }
        : {};

      await sendWhatsAppButtons(
        phoneNumber,
        cardText,
        [
          {
            id: `HOTEL_${String(h.hotelId)}`,
            title: isHindi
              ? "🏨 होटल चुनें"
              : "🏨 Select Hotel",
          },
        ],
        buttonOptions
      );
    }

    // 3. If more than 3 hotels are available, provide a View All Stays button
    if (hotels.length > 3) {
      await sendWhatsAppButtons(
        phoneNumber,
        isHindi
          ? `📋 *अन्य ${hotels.length - 3} होटल भी उपलब्ध हैं*\nबाकी सभी विकल्प देखने के लिए नीचे क्लिक करें:`
          : `📋 *${hotels.length - 3} More Properties Available*\nTap below to explore all options:`,
        [
          {
            id: "OPEN_HOTEL_SELECTION",
            title: isHindi
              ? "📋 सभी होटल देखें"
              : "📋 View All Stays",
          },
        ]
      );
    }
  };






// ======================================
// Send Booking Summary Screen
// ======================================

const sendBookingSummaryScreen = async (
  phoneNumber,
  session,
  hotel
) => {
  const isHindi =
    session.language === "hindi";

  const checkIn = new Date(session.checkIn);
  const checkOut = new Date(session.checkOut);

  const totalNights = Math.max(
    1,
    Math.ceil(
      (checkOut.getTime() - checkIn.getTime()) /
        (1000 * 60 * 60 * 24)
    )
  );

  let pricePerNight = Number(hotel?.startingPrice) || 0;
  if (!pricePerNight) {
    pricePerNight = await getRoomNightPrice(
      hotel,
      session?.selectedRoom,
      session?.checkIn
    );
  }

  const totalAmount =
    pricePerNight * totalNights;

  const checkInText =
    formatDate(checkIn);

  const checkOutText =
    formatDate(checkOut);

  await updateWhatsAppSession(
    phoneNumber,
    {
      bookingAmount: totalAmount,
      currentStep: "booking_summary",
      lastMessageAt: new Date(),
    }
  );

  const summaryMessage = isHindi
    ? `📋 *बुकिंग सारांश (Booking Summary)*
━━━━━━━━━━━━━━━━━━━
🏨 *होटल:* ${hotel.hotelName}
📍 *स्थान:* ${session.destination}

📅 *चेक-इन:* ${checkInText}
📅 *चेक-आउट:* ${checkOutText}
🌙 *अवधि:* ${totalNights} Night(s)

👥 *अतिथि:* ${session.adults} Adult(s)${session.children ? `, ${session.children} Child(ren)` : ""}
👤 *मुख्य अतिथि:* ${session.guestName}
📞 *संपर्क:* ${session.contactNumber}
━━━━━━━━━━━━━━━━━━━
🏷️ *टैरिफ:* ₹${pricePerNight} / night
💳 *कुल राशि:* ₹${totalAmount}`

    : `📋 *Booking Summary*
━━━━━━━━━━━━━━━━━━━
🏨 *Hotel:* ${hotel.hotelName}
📍 *Destination:* ${session.destination}

📅 *Check-in:* ${checkInText}
📅 *Check-out:* ${checkOutText}
🌙 *Duration:* ${totalNights} Night(s)

👥 *Guests:* ${session.adults} Adult(s)${session.children ? `, ${session.children} Child(ren)` : ""}
👤 *Lead Guest:* ${session.guestName}
📞 *Contact:* ${session.contactNumber}
━━━━━━━━━━━━━━━━━━━
🏷️ *Tariff:* ₹${pricePerNight} / night
💳 *Total Amount:* ₹${totalAmount}`;

  await sendWhatsAppButtons(
    phoneNumber,
    summaryMessage,
    [
      {
        id: "CONFIRM_BOOKING",
        title: isHindi
          ? "✅ पुष्टि करें"
          : "✅ Confirm Booking",
      },
      {
        id: "RESTART_BOOKING",
        title: isHindi
          ? "🔄 पुनः आरंभ"
          : "🔄 Start Again",
      },
    ]
  );
};

// =========================
// Process Incoming Message
// =========================

const processIncomingWhatsAppMessage = async (message) => {
const {
  from,
  customerName,
  messageId,
  text,
  buttonId,
  listId,
  flowData,
} = message;
    // ======================================
    // Get / Create Customer Session
    // ======================================

    const session =
      await getOrCreateWhatsAppSession(
        from,
        customerName
      );

// ======================================
// Global Start / Restart Conversation
// ======================================

const normalizedText =
  text?.trim().toLowerCase();

const isStartMessage =
  [
    "hi",
    "hii",
    "hiii",
    "hello",
    "Hello",
    "hey",
    "start",
    "restart",
    "menu",
  ].includes(normalizedText);

if (isStartMessage) {
  await updateWhatsAppSession(from, {
    language: null,

    currentStep: "welcome",

    destination: null,
    checkIn: null,
    checkOut: null,

    adults: null,
    children: null,

    budget: null,
    hotelType: null,

    selectedHotel: null,
    selectedRoom: null,
    selectedRoomCategory: null,

    guestName: null,
    contactNumber: null,

    bookingId: null,
    bookingAmount: null,
    advanceAmount: null,

    paymentStatus: "pending",
    paymentMethod: null,

    transactionId: null,
    paymentOrderId: null,

    voucherGenerated: false,
    voucherUrl: null,

    lastMessageId: messageId,
    lastMessageAt: new Date(),
  });

  await sendWelcomeScreen(from);

  return;
}

    // ======================================
    // Ignore Duplicate Message
    // ======================================

    if (
      messageId &&
      session.lastMessageId ===
        messageId
    ) {
      console.log(
        "Duplicate WhatsApp message ignored:",
        messageId
      );

      return;
    }

    // ======================================
    // Normalize Text
    // ======================================

    // const normalizedText =
    //   text
    //     ?.trim()
    //     .toLowerCase();



    // ======================================
    // New Session → Welcome
    // ======================================

    if (
      session.currentStep ===
        "welcome" &&
      isStartMessage
    ) {
      await sendWelcomeScreen(
        from
      );

      await updateWhatsAppSession(
        from,
        {
          lastMessageId:
            messageId,

          lastMessageAt:
            new Date(),
        }
      );

      return;
    }

    // ================================Language - Hindi======================================
 
    if (
      session.currentStep ===
        "welcome" &&
      buttonId ===
        "LANG_HINDI"
    ) {
      await updateWhatsAppSession(
        from,
        {
          language:
            "hindi",

          currentStep:
            "home",

          lastMessageId:
            messageId,

          lastMessageAt:
            new Date(),
        }
      );

     await sendHomeScreen(
  from,
  "hindi",
  customerName
);

      return;
    }

    // ======================================
    // Language - English
    // ======================================

    if (
      session.currentStep ===
        "welcome" &&
      buttonId ===
        "LANG_ENGLISH"
    ) {
      await updateWhatsAppSession(
        from,
        {
          language:
            "english",

          currentStep:
            "home",

          lastMessageId:
            messageId,

          lastMessageAt:
            new Date(),
        }
      );

      await sendHomeScreen(
        from,
        "english",
        customerName
      );

      return;
    }

    // ======================================
    // Home - Book Hotel
    // ======================================

    if (
      session.currentStep ===
        "home" &&
      buttonId ===
        "HOME_BOOK_HOTEL"
    ) {
      await updateWhatsAppSession(
        from,
        {
          currentStep:
            "select_destination",

          lastMessageId:
            messageId,

          lastMessageAt:
            new Date(),
        }
      );

      await sendDestinationScreen(
        from,
        session.language
      );

      return;
    }

 // ===============================Home - Contact Us / Share Business Contact =============================

if (session.currentStep === "home" &&
  buttonId === "HOME_CONTACT_US"
) {
  const isHindi = session.language === "hindi";

  // Send Stay Lansdowne business contact card
  await sendWhatsAppContact(from);

  const businessPhone = String(
    process.env.WHATSAPP_BUSINESS_PHONE || ""
  ).replace(/\D/g, "");

  const businessShortLink =
    process.env.WHATSAPP_BUSINESS_SHORT_LINK?.trim() ||
    `https://wa.me/${businessPhone}`;

  const contactMessage = isHindi
    ? `📞 *DevBhoomi Stay Concierge*\n\nहमारी स्थानीय सहायता टीम आपकी सेवा में उपलब्ध है।\n\nऊपर दिए गए कॉन्टैक्ट कार्ड को सेव करें या सीधे WhatsApp पर चैट करें:\n${businessShortLink}`
    : `📞 *DevBhoomi Stay Concierge*\n\nOur local Uttarakhand team is here to assist you.\n\nSave our contact card above or chat with us on WhatsApp:\n${businessShortLink}`;

  await sendWhatsAppText(from,contactMessage);

  await updateWhatsAppSession(from, {
    lastMessageId: messageId,
    lastMessageAt: new Date(),
  });

  return;
}



    // ================================== Home - About Us =====================================

    if (
      session.currentStep ===
        "home" &&
      buttonId ===
        "HOME_ABOUT_US"
    ) {
      const aboutMessage =
        session.language ===
        "hindi"

          ? "🏔️ *DevBhoomi Stay के बारे में*\n\nहम लैंसडाउन और कोटद्वार में प्रमाणित, स्वच्छ और प्रकृति के बीच बसे सबसे बेहतरीन होटलों एवं होमस्टे का चयन प्रदान करते हैं। पारदर्शी मूल्य और व्यक्तिगत सहायता हमारी प्राथमिकता है।"

          : "🏔️ *About DevBhoomi Stay*\n\nWe connect travelers with handpicked, authentic mountain stays and resorts across Lansdowne & Kotdwar. Transparent tariffs, local hospitality, and seamless bookings.";

      await sendWhatsAppText(
        from,
        aboutMessage
      );

      await updateWhatsAppSession(
        from,
        {
          lastMessageId:
            messageId,

          lastMessageAt:
            new Date(),
        }
      );

      return;
    }

  
    // ====================================== Destination ======================================

    if (
      session.currentStep ===
        "select_destination" &&
      (
        buttonId ===
          "DEST_LANSDOWNE" ||

        buttonId ===
          "DEST_KOTDWAR"
      )
    ) {
      const destination =
        buttonId ===
          "DEST_LANSDOWNE"

          ? "Lansdowne"

          : "Kotdwar";

      await updateWhatsAppSession(
        from,
        {
          destination,

          currentStep:
            "select_check_in",

          lastMessageId:
            messageId,

          lastMessageAt:
            new Date(),
        }
      );

      await sendCheckInScreen(
        from,
        session.language
      );

      return;
    }

    // ======================================
    // Check-in → Tomorrow
    // ======================================

    if (
      session.currentStep ===
        "select_check_in" &&
      buttonId ===
        "CHECKIN_TOMORROW"
    ) {
      const todayParts =
        getTodayIST();

      const today =
        createUTCDate(
          todayParts.year,
          todayParts.month,
          todayParts.day
        );

      const checkIn =
        addDays(
          today,
          1
        );

      await updateWhatsAppSession(
        from,
        {
          checkIn,

          currentStep:
            "select_check_out",

          lastMessageId:
            messageId,

          lastMessageAt:
            new Date(),
        }
      );

      await sendCheckOutScreen(
        from,
        session.language,
        checkIn
      );

      return;
    }

    // ======================================
    // Check-in → Other Date
    // ======================================

    if (
      session.currentStep ===
        "select_check_in" &&
      buttonId ===
        "CHECKIN_OTHER"
    ) {
      await sendWhatsAppText(
        from,

        session.language ===
          "hindi"

          ? "📅 कृपया अपनी चेक-इन तिथि भेजें।\n\nप्रारूप: DD/MM/YYYY (उदा. 15/10/2026)"

          : "📅 Please type your check-in date.\n\nFormat: DD/MM/YYYY (e.g. 15/10/2026)"
      );

      await updateWhatsAppSession(
        from,
        {
          lastMessageId:
            messageId,

          lastMessageAt:
            new Date(),
        }
      );

      return;
    }

    // ======================================
    // Manual Check-in Date
    // ======================================

    if (
      session.currentStep ===
        "select_check_in" &&
      text &&
      !buttonId &&
      !listId
    ) {
      const checkIn =
        parseUserDate(
          text
        );

      if (!checkIn) {
        await sendWhatsAppText(
          from,

          session.language ===
            "hindi"

            ? "⚠️ कृपया सही दिनांक दर्ज करें।\n\nप्रारूप: DD/MM/YYYY (उदा. 15/10/2026)"

            : "⚠️ Please enter a valid date.\n\nFormat: DD/MM/YYYY (e.g. 15/10/2026)"
        );

        return;
      }

      const todayParts =
        getTodayIST();

      const today =
        createUTCDate(
          todayParts.year,
          todayParts.month,
          todayParts.day
        );

      if (
        checkIn <
        today
      ) {
        await sendWhatsAppText(
          from,

          session.language ===
            "hindi"

            ? "⚠️ चेक-इन तिथि आज या भविष्य की होनी चाहिए।"

            : "⚠️ Check-in date cannot be in the past."
        );

        return;
      }

      await updateWhatsAppSession(
        from,
        {
          checkIn,

          currentStep:
            "select_check_out",

          lastMessageId:
            messageId,

          lastMessageAt:
            new Date(),
        }
      );

      await sendCheckOutScreen(
        from,
        session.language,
        checkIn
      );

      return;
    }

    // ======================================
    // Check-out → Next Day
    // ======================================

    if (
      session.currentStep ===
        "select_check_out" &&
      buttonId ===
        "CHECKOUT_NEXT_DAY"
    ) {
      if (!session.checkIn) {
        await sendCheckInScreen(
          from,
          session.language
        );

        return;
      }

      const checkOut =
        addDays(
          new Date(
            session.checkIn
          ),
          1
        );

      await updateWhatsAppSession(
        from,
        {
          checkOut,

          currentStep:
            "adults",

          lastMessageId:
            messageId,

          lastMessageAt:
            new Date(),
        }
      );

      await sendAdultsScreen(
        from,
        session.language
      );

      return;
    }

    // ======================================
    // Check-out → Other Date
    // ======================================

    if (
      session.currentStep ===
        "select_check_out" &&
      buttonId ===
        "CHECKOUT_OTHER"
    ) {
      await sendWhatsAppText(
        from,

        session.language ===
          "hindi"

          ? "📅 कृपया अपनी चेक-आउट तिथि भेजें।\n\nप्रारूप: DD/MM/YYYY (उदा. 16/10/2026)"

          : "📅 Please type your check-out date.\n\nFormat: DD/MM/YYYY (e.g. 16/10/2026)"
      );

      await updateWhatsAppSession(
        from,
        {
          lastMessageId:
            messageId,

          lastMessageAt:
            new Date(),
        }
      );

      return;
    }

    // ======================================
    // Manual Check-out Date
    // ======================================

    if (
      session.currentStep ===
        "select_check_out" &&
      text &&
      !buttonId &&
      !listId
    ) {
      const checkOut =
        parseUserDate(
          text
        );

      if (!checkOut) {
        await sendWhatsAppText(
          from,

          session.language ===
            "hindi"

            ? "⚠️ कृपया सही दिनांक दर्ज करें।\n\nप्रारूप: DD/MM/YYYY (उदा. 16/10/2026)"

            : "⚠️ Please enter a valid date.\n\nFormat: DD/MM/YYYY (e.g. 16/10/2026)"
        );

        return;
      }

      if (!session.checkIn) {
        await sendWhatsAppText(
          from,

          session.language ===
            "hindi"

            ? "⚠️ पहले चेक-इन तिथि चुनें।"

            : "⚠️ Please select your check-in date first."
        );

        return;
      }

      const checkIn =
        new Date(
          session.checkIn
        );

      if (
        Number.isNaN(
          checkIn.getTime()
        ) ||
        checkOut <=
          checkIn
      ) {
        await sendWhatsAppText(
          from,

          session.language ===
            "hindi"

            ? "⚠️ चेक-आउट की तिथि, चेक-इन तिथि के बाद की होनी चाहिए।"

            : "⚠️ Check-out date must be after check-in date."
        );

        return;
      }

      await updateWhatsAppSession(
        from,
        {
          checkOut,

          currentStep:
            "adults",

          lastMessageId:
            messageId,

          lastMessageAt:
            new Date(),
        }
      );

      await sendAdultsScreen(
        from,
        session.language
      );

      return;
    }

    // ======================================
    // Adults Selection
    // ======================================

    if (
      session.currentStep ===
        "adults" &&
      (
        listId ===
          "ADULTS_1" ||

        listId ===
          "ADULTS_2" ||

        listId ===
          "ADULTS_3" ||

        listId ===
          "ADULTS_4_PLUS"
      )
    ) {
      const adultsMap = {
        ADULTS_1: 1,
        ADULTS_2: 2,
        ADULTS_3: 3,
        ADULTS_4_PLUS: 4,
      };

      const adults =
        adultsMap[listId];

      await updateWhatsAppSession(
        from,
        {
          adults,

          currentStep:
            "children",

          lastMessageId:
            messageId,

          lastMessageAt:
            new Date(),
        }
      );

      await sendChildrenScreen(
        from,
        session.language
      );

      return;
    }

    // ======================================
    // Children Selection
    // ======================================

    if (
      session.currentStep ===
        "children" &&
      (
        listId ===
          "CHILDREN_0" ||

        listId ===
          "CHILDREN_1" ||

        listId ===
          "CHILDREN_2" ||

        listId ===
          "CHILDREN_3_PLUS"
      )
    ) {
      const childrenMap = {
        CHILDREN_0: 0,
        CHILDREN_1: 1,
        CHILDREN_2: 2,
        CHILDREN_3_PLUS: 3,
      };

      const children =
        childrenMap[listId];

      await updateWhatsAppSession(
        from,
        {
          children,

          currentStep:
            "budget",

          lastMessageId:
            messageId,

          lastMessageAt:
            new Date(),
        }
      );

      await sendBudgetScreen(
        from,
        session.language
      );

      return;
    }

    // ======================================
    // Budget Selection
    // ======================================

    if (session.currentStep === "budget" && (
        listId ===
          "BUDGET_1500_2500" ||

        listId ===
          "BUDGET_2500_4000" ||

        listId ===
          "BUDGET_4000_6000" ||

        listId ===
          "BUDGET_LUXURY"
      )
    ) {
      const budgetMap = {
        BUDGET_1500_2500: {
          label:
            "1500-2500",

          min:
            1500,

          max:
            2500,
        },

        BUDGET_2500_4000: {
          label:
            "2500-4000",

          min:
            2500,

          max:
            4000,
        },

        BUDGET_4000_6000: {
          label:
            "4000-6000",

          min:
            4000,

          max:
            6000,
        },

        BUDGET_LUXURY: {
          label:
            "luxury",

          min:
            6000,

          max:
            null,
        },
      };

      const selectedBudget =
        budgetMap[listId];

      await updateWhatsAppSession(
        from,
        {
          budget:
            selectedBudget,

          currentStep:
            "hotel_type",

          lastMessageId:
            messageId,

          lastMessageAt:
            new Date(),
        }
      );

      await sendHotelTypeScreen(
        from,
        session.language
      );

      return;
    }

// ================================Hotel Type Selection ======================================

if (
  session.currentStep === "hotel_type" &&
  (
    listId === "HOTEL_TYPE_BUDGET" ||
    listId === "HOTEL_TYPE_DELUXE" ||
    listId === "HOTEL_TYPE_LUXURY" ||
    listId === "HOTEL_TYPE_HOMESTAY"
  )
) {
  const hotelTypeMap = {
    HOTEL_TYPE_BUDGET: "Budget Hotel",
    HOTEL_TYPE_DELUXE: "Deluxe Hotel",
    HOTEL_TYPE_LUXURY: "Luxury Hotel",
    HOTEL_TYPE_HOMESTAY: "Homestay",
  };

  const hotelType = hotelTypeMap[listId];

  // Save selected hotel type
  await updateWhatsAppSession(from, {
    hotelType,
    currentStep: "searching_hotels",
    lastMessageId: messageId,
    lastMessageAt: new Date(),
  });

  // Show searching message (exact reference design)
  await sendSearchingHotelsScreen(
    from,
    session.language
  );

  // Natural pause so user perceives the live hotel search
  await new Promise((resolve) => setTimeout(resolve, 1200));

  // Get updated session
  const updatedSession =
    await getOrCreateWhatsAppSession(
      from,
      customerName
    );

  // Search available hotels
  const hotels =
    await searchAvailableHotels(
      updatedSession
    );

  // Save result state
  await updateWhatsAppSession(from, {
    currentStep:
      hotels.length > 0
        ? "hotels_found"
        : "hotel_type",
  });

  // Send hotels to customer
  await sendHotelsFoundScreen(
    from,
    updatedSession.language,
    hotels
  );

  return;
}

// ======================================
// Open Hotel Selection Flow
// With Interactive List Fallback
// ======================================

if (
  session.currentStep === "hotels_found" &&
  buttonId === "OPEN_HOTEL_SELECTION"
) {
  // Important: declare outside try so catch can access it
  let hotels = [];

  const isHindi = session.language === "hindi";

  try {
    // Get the latest customer session
    const updatedSession =
      await getOrCreateWhatsAppSession(
        from,
        customerName
      );

    // Search available hotels
    hotels = await searchAvailableHotels(
      updatedSession
    );

    if (
      !Array.isArray(hotels) ||
      hotels.length === 0
    ) {
      await updateWhatsAppSession(from, {
        currentStep: "hotel_type",
        lastMessageId: messageId,
        lastMessageAt: new Date(),
      });

      await sendWhatsAppText(
        from,
        isHindi
          ? "😔 अभी कोई होटल उपलब्ध नहीं है। कृपया दोबारा सर्च करें।"
          : "😔 No hotels are currently available. Please search again."
      );

      return;
    }

    // Try opening the WhatsApp Flow first
    const flowToken =
      `HOTEL_SELECT_${from}_${Date.now()}`;

    await sendWhatsAppFlow(from, {
      flowId: HOTEL_SELECTION_FLOW_ID,
      flowToken,

      bodyText: isHindi
        ? "अपना पसंदीदा होटल चुनें।"
        : "Choose your preferred hotel.",

      headerText: "Stay Lansdowne",

      footerText: "Select your preferred hotel",

      flowCta: isHindi
        ? "होटल चुनें"
        : "Select Hotel",

      screen: "HOTEL_SELECTION",

      hotels,
    });

    console.log("✅ Hotel Selection Flow sent");

    return;
  } catch (error) {
    console.error(
      "Hotel Selection Flow Error:",
      error?.message || error
    );

    // If Flow fails, show a normal WhatsApp list instead
    const safeHotels = Array.isArray(hotels)
      ? hotels
          .filter((hotel) => hotel?.hotelId)
          .slice(0, 10)
      : [];

    if (safeHotels.length > 0) {
      try {
        const hotelRows = safeHotels.map((hotel) => ({
          id: `HOTEL_${String(hotel.hotelId)}`,

          title: String(
            hotel.hotelName || "Hotel"
          ).slice(0, 24),

          description:
            hotel.startingPrice != null
              ? `From ₹${hotel.startingPrice}/night`.slice(0, 72)
              : "Select to view hotel details",
        }));

        await sendWhatsAppList(
          from,

          isHindi
            ? `✨ ${hotelRows.length} होटल उपलब्ध हैं। अपना होटल चुनें।`
            : `✨ ${hotelRows.length} hotel(s) available. Choose your hotel.`,

          isHindi
            ? "होटल चुनें"
            : "Select Hotel",

          [
            {
              title: isHindi
                ? "उपलब्ध होटल"
                : "Available Hotels",

              rows: hotelRows,
            },
          ]
        );

        console.log(
          "✅ Hotel list fallback sent successfully"
        );

        return;
      } catch (fallbackError) {
        console.error(
          "Hotel list fallback error:",
          fallbackError?.message || fallbackError
        );
      }
    }

    // Final fallback if neither Flow nor list works
    await sendWhatsAppText(
      from,

      isHindi
        ? "😔 होटल की सूची अभी नहीं खुल पाई। कृपया थोड़ी देर बाद दोबारा कोशिश करें।"
        : "😔 Hotel selection could not be opened. Please try again shortly."
    );

    return;
  }
}


// ======================================
// Hotel Selection
// ======================================

// ======================================
// Hotel Selection
// Supports:
// 1. WhatsApp Flow
// 2. Legacy List Reply
// ======================================

const flowSelectedHotelId =
  flowData?.selected_hotel
    ? String(
        flowData.selected_hotel
      )
    : null;

const listSelectedHotelId =
  listId &&
  listId.startsWith("HOTEL_")
    ? listId.replace(
        "HOTEL_",
        ""
      )
    : null;

const buttonSelectedHotelId =
  buttonId &&
  buttonId.startsWith("HOTEL_")
    ? buttonId.replace(
        "HOTEL_",
        ""
      )
    : null;

const selectedHotelId =
  flowSelectedHotelId ||
  listSelectedHotelId ||
  buttonSelectedHotelId;

if (
  session.currentStep ===
    "hotels_found" &&
  selectedHotelId
) {
  const hotelId =
    selectedHotelId;

  try {
    // ======================================
    // FIND SELECTED HOTEL
    // ======================================

    const hotel =
      await Hotel.findOne({
        _id: hotelId,
        isActive: true,
      });

    if (!hotel) {
      await sendWhatsAppText(
        from,
        session.language === "hindi"
          ? "⚠️ चुना गया होटल अब उपलब्ध नहीं है।"
          : "⚠️ The selected hotel is no longer available."
      );

// ======================================
// Verify Hotel Is Still In Search Result
// ======================================

const currentAvailableHotels =
  await searchAvailableHotels(
    session
  );

const stillAvailable =
  currentAvailableHotels.some(
    (item) =>
      String(item.hotelId) ===
      String(hotelId)
  );

if (!stillAvailable) {
  await sendWhatsAppText(
    from,

    session.language ===
      "hindi"
      ? "⚠️ यह होटल अब इन तिथियों या फ़िल्टर के लिए उपलब्ध नहीं है।"
      : "⚠️ The selected hotel is no longer available for your selected dates and filters."
  );

  return;
}

      return;
    }

    // ======================================
    // FIND SUITABLE ROOM
    // ======================================

    const totalGuests =
      Number(session.adults || 0) +
      Number(session.children || 0);

    const rooms =
      await Room.find({
        hotel: hotel._id,
        isActive: true,
        isAvailable: true,
      }).populate("roomCategory");

    // ======================================
    // FILTER ROOM BY GUEST CAPACITY
    // ======================================

    const suitableRoom =
      rooms.find((room) => {
        if (!room.roomCategory) {
          return false;
        }

        if (
          room.roomCategory.isActive === false
        ) {
          return false;
        }

        const maxGuests =
          Number(
            room.roomCategory.maxGuests || 0
          );

        return (
          maxGuests >= totalGuests
        );
      });

    if (!suitableRoom) {
      await sendWhatsAppText(
        from,
        session.language === "hindi"
          ? "⚠️ चुने गए अतिथियों की संख्या के लिए इस होटल में उपयुक्त कमरा उपलब्ध नहीं है।"
          : "⚠️ No suitable room is currently available for the selected number of guests."
      );

      return;
    }

    // ======================================
    // SAVE HOTEL + ROOM
    // ======================================

    await updateWhatsAppSession(
      from,
      {
        selectedHotel:
          hotel._id,

        selectedRoom:
          suitableRoom._id,

        selectedRoomCategory:
          suitableRoom.roomCategory._id,

        currentStep:
          "hotel_details",

        lastMessageId:
          messageId,

        lastMessageAt:
          new Date(),
      }
    );

    console.log(
      "✅ WhatsApp Hotel Selected:",
      hotel._id
    );

    console.log(
      "✅ WhatsApp Room Selected:",
      suitableRoom._id
    );

    console.log(
      "✅ WhatsApp Room Category Selected:",
      suitableRoom.roomCategory._id
    );

    // ======================================
    // HOTEL DETAILS (Screen 12)
    // ======================================

    const isHindi =
      session.language === "hindi";

    const hotelImage = toWhatsAppJpgUrl(
      hotel.coverImage ||
      (Array.isArray(hotel.images) && hotel.images[0]) ||
      null
    );

    const stars = "⭐".repeat(hotel.starRating || 4);

    // Fetch real room pricing from database
    const roomPrice =
      (await getRoomNightPrice(
        hotel,
        suitableRoom._id,
        session.checkIn
      )) ||
      Number(suitableRoom.pricePerNight) ||
      Number(hotel.startingPrice) ||
      3000;

    const address =
      hotel.address?.trim() ||
      `${hotel.city || "Lansdowne"}, ${hotel.state || "Uttarakhand"}`;

    // Get real amenities from hotel or room category in DB
    const rawAmenities =
      Array.isArray(hotel.amenities) && hotel.amenities.length > 0
        ? hotel.amenities
        : (Array.isArray(suitableRoom.roomCategory?.amenities) && suitableRoom.roomCategory.amenities.length > 0
            ? suitableRoom.roomCategory.amenities
            : ["WiFi", "Parking"]);

    const amenityLines = [];
    for (let i = 0; i < rawAmenities.length; i += 2) {
      const first = `✔ ${rawAmenities[i]}`;
      const second = rawAmenities[i + 1] ? `   ✔ ${rawAmenities[i + 1]}` : "";
      amenityLines.push(`${first}${second}`);
      if (amenityLines.length >= 3) break;
    }
    const amenitiesText = amenityLines.join("\n");

    const detailsMessage = isHindi
      ? `*${hotel.hotelName}*\n${stars}\n\n📍 ${address}\n💰 ₹${roomPrice} / Night\n\n${amenitiesText}`
      : `*${hotel.hotelName}*\n${stars}\n\n📍 ${address}\n💰 ₹${roomPrice} / Night\n\n${amenitiesText}`;

    const buttonOptions = hotelImage
      ? { headerImageUrl: hotelImage }
      : {};

    await sendWhatsAppButtons(
      from,
      detailsMessage,
      [
        {
          id: "HOTEL_PHOTOS",
          title: "📸 Photos",
        },
        {
          id: "HOTEL_LOCATION",
          title: "📍 Location",
        },
        {
          id: "HOTEL_CONTINUE",
          title: "✅ Book Now",
        },
      ],
      buttonOptions
    );

    return;
  } catch (error) {
    console.error(
      "Hotel Selection Error:",
      error.message
    );

    await sendWhatsAppText(
      from,
      "⚠️ Unable to select hotel at the moment. Please try again."
    );

    return;
  }
}


// ======================================
// Hotel Photos (Screen 13)
// ======================================

if (
  (session.currentStep === "hotel_details" ||
    session.currentStep === "hotel_photos" ||
    session.currentStep === "hotel_location") &&
  buttonId === "HOTEL_PHOTOS"
) {
  try {
    const hotel = await Hotel.findById(
      session.selectedHotel
    );

    if (!hotel) {
      await sendWhatsAppText(
        from,
        "⚠️ Hotel details not found."
      );
      return;
    }

    await updateWhatsAppSession(from, {
      currentStep: "hotel_photos",
      lastMessageId: messageId,
      lastMessageAt: new Date(),
    });

    const photoUrls = [];
    // Only send hotel gallery images if available, without duplicating coverImage
    if (Array.isArray(hotel.images) && hotel.images.length > 0) {
      hotel.images.forEach((img) => {
        const jpg = toWhatsAppJpgUrl(img);
        if (jpg && !photoUrls.includes(jpg)) {
          photoUrls.push(jpg);
        }
      });
    } else if (hotel.coverImage) {
      // Fallback to cover image only if hotel has no gallery images
      const covJpg = toWhatsAppJpgUrl(hotel.coverImage);
      if (covJpg) photoUrls.push(covJpg);
    }

    await sendWhatsAppText(
      from,
      `📸 *${hotel.hotelName}*`
    );

    const photosToSend = photoUrls.slice(0, 5);
    for (let i = 0; i < photosToSend.length; i++) {
      try {
        await sendWhatsAppImage(
          from,
          photosToSend[i],
          `Photo ${i + 1} of ${photosToSend.length}`
        );
      } catch (imgErr) {
        console.error("Error sending hotel photo:", imgErr?.message || imgErr);
      }
    }

    await sendWhatsAppButtons(
      from,
      `*${hotel.hotelName}*\n\nTap below to check location or proceed to book:`,
      [
        {
          id: "HOTEL_LOCATION",
          title: "📍 Location",
        },
        {
          id: "HOTEL_CONTINUE",
          title: "✅ Book Now",
        },
      ]
    );

    return;
  } catch (error) {
    console.error(
      "Hotel Photos Error:",
      error.message
    );

    await sendWhatsAppText(
      from,
      "⚠️ Unable to load hotel photos."
    );

    return;
  }
}


// ======================================
// Hotel Location (Screen 14)
// ======================================

if (
  (session.currentStep === "hotel_details" ||
    session.currentStep === "hotel_photos" ||
    session.currentStep === "hotel_location") &&
  buttonId === "HOTEL_LOCATION"
) {
  try {
    const hotel = await Hotel.findById(
      session.selectedHotel
    );

    if (!hotel) {
      await sendWhatsAppText(
        from,
        "⚠️ Hotel location not found."
      );
      return;
    }

    await updateWhatsAppSession(from, {
      currentStep: "hotel_location",
      lastMessageId: messageId,
      lastMessageAt: new Date(),
    });

    const mapImageUrl =
      process.env.WHATSAPP_MAP_IMAGE_URL?.trim() ||
      "https://res.cloudinary.com/dszadvuz6/image/upload/v1792842848/stay_lansdowne/hotel_location_map.jpg";

    const mapsQuery = encodeURIComponent(
      `${hotel.hotelName}, ${hotel.address || hotel.city || "Lansdowne"}, Uttarakhand`
    );
    const googleMapsUrl = `https://maps.google.com/?q=${mapsQuery}`;

    // 1. Send Map Image Preview (Screen 14)
    if (mapImageUrl) {
      try {
        await sendWhatsAppImage(
          from,
          mapImageUrl,
          "📍 Hotel Location"
        );
      } catch (mapImgErr) {
        console.error("Map image error:", mapImgErr?.message || mapImgErr);
      }
    }

    // 2. Send location details with clickable Google Maps URL and Action Buttons
    const isHindi = session.language === "hindi";
    const locationBody = isHindi
      ? `📍 *होटल लोकेशन (Hotel Location)*\n━━━━━━━━━━━━━━━━━━━\n🏨 *${hotel.hotelName}*\n🏠 ${hotel.address || "Lansdowne, Uttarakhand"}\n\n🗺️ *Google Maps पर खोलें:*\n${googleMapsUrl}`
      : `📍 *Hotel Location*\n━━━━━━━━━━━━━━━━━━━\n🏨 *${hotel.hotelName}*\n🏠 ${hotel.address || "Lansdowne, Uttarakhand"}\n\n🗺️ *Open in Google Maps:*\n${googleMapsUrl}`;

    await sendWhatsAppButtons(
      from,
      locationBody,
      [
        {
          id: "HOTEL_PHOTOS",
          title: "📸 Photos",
        },
        {
          id: "HOTEL_CONTINUE",
          title: "✅ Book Now",
        },
      ]
    );

    return;
  } catch (error) {
    console.error(
      "Hotel Location Error:",
      error.message
    );

    await sendWhatsAppText(
      from,
      "⚠️ Unable to load hotel location."
    );

    return;
  }
}


// ======================================
// Hotel Continue -> Enter Name (Screen 15)
// ======================================

if (
  (
    session.currentStep === "hotel_details" ||
    session.currentStep === "hotel_photos" ||
    session.currentStep === "hotel_location"
  ) &&
  buttonId === "HOTEL_CONTINUE"
) {
  await updateWhatsAppSession(from, {
    currentStep: "enter_name",
    lastMessageId: messageId,
    lastMessageAt: new Date(),
  });

  await sendWhatsAppText(
    from,
    "Please Enter Your Name"
  );

  return;
}


// ======================================
// Enter Guest Name -> Share Contact Prompt (Screen 16)
// ======================================

if (
  session.currentStep === "enter_name" &&
  text &&
  !buttonId &&
  !listId
) {
  const guestName = text.trim();

  if (guestName.length < 2) {
    await sendWhatsAppText(
      from,
      session.language === "hindi"
        ? "⚠️ कृपया अपना वैध नाम दर्ज करें।"
        : "⚠️ Please enter a valid name."
    );

    return;
  }

  await updateWhatsAppSession(from, {
    guestName,
    currentStep: "share_contact",
    lastMessageId: messageId,
    lastMessageAt: new Date(),
  });

  const promptText = `📱 *Please Share Your Contact Number*\n\nWe will use this number for booking updates.`;

  await sendWhatsAppButtons(
    from,
    promptText,
    [
      {
        id: "SHARE_CURRENT_PHONE",
        title: "📱 Share Contact",
      },
    ]
  );

  return;
}

// ======================================
// Share Contact / Contact Number Received
// Supports:
// 1. Button click: SHARE_CURRENT_PHONE
// 2. Typing 10-digit number as text
// ======================================

if (
  session.currentStep === "share_contact" &&
  (buttonId === "SHARE_CURRENT_PHONE" || (text && !buttonId && !listId))
) {
  let contactNumber = "";

  if (buttonId === "SHARE_CURRENT_PHONE") {
    contactNumber = from.replace(/\D/g, "").slice(-10);
  } else {
    contactNumber = text.replace(/\D/g, "");
  }

  if (
    contactNumber.length < 10 ||
    contactNumber.length > 15
  ) {
    await sendWhatsAppText(
      from,
      session.language === "hindi"
        ? "⚠️ कृपया सही 10 अंकों का मोबाइल नंबर भेजें।"
        : "⚠️ Please enter a valid 10-digit mobile number."
    );

    return;
  }

  await updateWhatsAppSession(
    from,
    {
      contactNumber,
      currentStep: "booking_summary",
      lastMessageId: messageId,
      lastMessageAt: new Date(),
    }
  );

  const updatedSession =
    await getOrCreateWhatsAppSession(
      from,
      customerName
    );

  const hotels =
    await searchAvailableHotels(
      updatedSession
    );

  const selectedHotel =
    hotels.find(
      (hotel) =>
        String(hotel.hotelId) ===
        String(updatedSession.selectedHotel)
    );

  if (!selectedHotel) {
    await sendWhatsAppText(
      from,
      updatedSession.language === "hindi"
        ? "⚠️ चुना गया होटल अब उपलब्ध नहीं है। कृपया पुनः प्रयास करें।"
        : "⚠️ The selected hotel is no longer available. Please try the booking again."
    );

    return;
  }

  await sendBookingSummaryScreen(
    from,
    updatedSession,
    selectedHotel
  );

  return;
}

// ======================================
// Confirm Booking
// ======================================

if (
  session.currentStep === "booking_summary" &&
  buttonId === "CONFIRM_BOOKING"
) {
  await updateWhatsAppSession(from, {
    currentStep: "confirm_booking",
    lastMessageId: messageId,
    lastMessageAt: new Date(),
  });

  const isHindi =
    session.language === "hindi";

  await sendWhatsAppButtons(
    from,
    isHindi
      ? `✅ *बुकिंग विवरण सत्यापित*\n\nकमरा सुरक्षित करने के लिए टोकन / एडवांस भुगतान आवश्यक है।\n\n💳 *कुल बुकिंग राशि:* ₹${session.bookingAmount}\n\nक्या आप भुगतान के साथ आगे बढ़ना चाहते हैं?`
      : `✅ *Booking Details Confirmed*\n\nAn advance payment is required to secure your room.\n\n💳 *Total Amount:* ₹${session.bookingAmount}\n\nWould you like to proceed with payment?`,
    [
      {
        id: "PROCEED_PAYMENT",
        title: isHindi
          ? "💳 भुगतान करें"
          : "💳 Pay Advance",
      },
      {
        id: "RESTART_BOOKING",
        title: isHindi
          ? "🔄 पुनः आरंभ"
          : "🔄 Start Again",
      },
    ]
  );

  return;
}

// ======================================
// Restart Booking
// ======================================

if (
  buttonId === "RESTART_BOOKING"
) {
  await updateWhatsAppSession(from, {
    language: null,
    currentStep: "welcome",

    destination: null,
    checkIn: null,
    checkOut: null,

    adults: null,
    children: null,

    budget: null,
    hotelType: null,

    selectedHotel: null,
    selectedRoom: null,
    selectedRoomCategory: null,

    guestName: null,
    contactNumber: null,

    bookingId: null,
    bookingAmount: null,
    advanceAmount: null,

    paymentStatus: "pending",
    paymentMethod: null,

    transactionId: null,
    paymentOrderId: null,

    voucherGenerated: false,
    voucherUrl: null,

    lastMessageId: messageId,
    lastMessageAt: new Date(),
  });

  await sendWelcomeScreen(from);

  return;
}

// ======================================
// Proceed to Payment
// ======================================

if (
  session.currentStep === "confirm_booking" &&
  buttonId === "PROCEED_PAYMENT"
) {
  const totalAmount =
    Number(session.bookingAmount) || 0;

  const advancePercentage =
    Number(
      process.env.WHATSAPP_ADVANCE_PERCENTAGE || 25
    );

  const advanceAmount = Math.round(
    (totalAmount * advancePercentage) / 100
  );

  await updateWhatsAppSession(from, {
    currentStep: "advance_payment",
    advanceAmount,
    paymentStatus: "pending",
    lastMessageId: messageId,
    lastMessageAt: new Date(),
  });

  const isHindi =
    session.language === "hindi";

  const paymentMessage = isHindi
    ? `💳 *एडवांस भुगतान (Advance Deposit)*
━━━━━━━━━━━━━━━━━━━
🏷️ *कुल बुकिंग राशि:* ₹${totalAmount}
📌 *आवश्यक एडवांस:* ${advancePercentage}%
💵 *देय राशि:* ₹${advanceAmount}
━━━━━━━━━━━━━━━━━━━
भुगतान पूरा करने के लिए नीचे दिए गए बटन पर क्लिक करें:`
    : `💳 *Advance Deposit*
━━━━━━━━━━━━━━━━━━━
🏷️ *Total Booking:* ₹${totalAmount}
📌 *Advance Required:* ${advancePercentage}%
💵 *Payable Now:* ₹${advanceAmount}
━━━━━━━━━━━━━━━━━━━
Click the button below to continue with payment:`;

  await sendWhatsAppButtons(
    from,
    paymentMessage,
    [
      {
        id: "PAY_ADVANCE",
        title: `💳 Pay ₹${advanceAmount}`,
      },
      {
        id: "RESTART_BOOKING",
        title: isHindi
          ? "🔄 पुनः आरंभ"
          : "🔄 Start Again",
      },
    ]
  );

  return;
}


// ======================================
// Pay Advance → Payment Gateway
// ======================================

if (
  session.currentStep === "advance_payment" &&
  buttonId === "PAY_ADVANCE"
) {
  const advanceAmount =
    Number(session.advanceAmount) || 0;

  await updateWhatsAppSession(from, {
    currentStep: "payment_gateway",
    paymentStatus: "initiated",
    lastMessageId: messageId,
    lastMessageAt: new Date(),
  });

  const isHindi =
    session.language === "hindi";

  const paymentMessage = isHindi
    ? `🔐 *सुरक्षित भुगतान (Secure Payment)*\n\n💵 *भुगतान योग्य राशि:* ₹${advanceAmount}\n\nकृपया अपनी पसंदीदा भुगतान विधि चुनें:`
    : `🔐 *Secure Payment*\n\n💵 *Amount to Pay:* ₹${advanceAmount}\n\nPlease choose a payment method:`;

await sendWhatsAppList(
  from,
  paymentMessage,

  isHindi
    ? "भुगतान विधि चुनें"
    : "Select Payment",

  [
    {
      title: "Payment Options",
      rows: [
        {
          id: "PAYMENT_RAZORPAY",
          title: "⚡ Razorpay Gateway",
          description: "UPI, Cards, Netbanking & Wallets",
        },
        {
          id: "PAYMENT_UPI",
          title: "📱 Instant UPI",
          description: "GPay, PhonePe, Paytm, BHIM",
        },
        {
          id: "PAYMENT_CARD",
          title: "💳 Debit/Credit Card",
          description: "Visa, Mastercard, RuPay",
        },
        {
          id: "PAYMENT_NETBANKING",
          title: "🏛️ Net Banking",
          description: "All major Indian banks",
        },
      ],
    },
  ]
);

  return;
}

// ======================================
// Payment Method Selection
// ======================================

if (
  session.currentStep === "payment_gateway" &&
  (
    listId === "PAYMENT_RAZORPAY" ||
    listId === "PAYMENT_UPI" ||
    listId === "PAYMENT_CARD" ||
    listId === "PAYMENT_NETBANKING"
  )
) {
  const paymentMethodMap = {
    PAYMENT_RAZORPAY: "razorpay",
    PAYMENT_UPI: "upi",
    PAYMENT_CARD: "card",
    PAYMENT_NETBANKING: "netbanking",
  };

  const paymentMethod =
    paymentMethodMap[listId];

  const advanceAmount =
    Number(session.advanceAmount) || 0;

  await updateWhatsAppSession(from, {
    paymentMethod,
    currentStep: "payment_gateway",
    paymentStatus: "initiated",
    lastMessageId: messageId,
    lastMessageAt: new Date(),
  });

  const isHindi =
    session.language === "hindi";

  const methodNameMap = {
    razorpay: "Razorpay Gateway",
    upi: "UPI",
    card: "Debit / Credit Card",
    netbanking: "Net Banking",
  };

  const selectedMethod =
    methodNameMap[paymentMethod];

  await sendWhatsAppButtons(
    from,

    isHindi
      ? `🔐 *सुरक्षित चेकआउट*\n━━━━━━━━━━━━━━━━━━━\n💵 *राशि:* ₹${advanceAmount}\n💳 *माध्यम:* ${selectedMethod}\n━━━━━━━━━━━━━━━━━━━\nनीचे दिए गए बटन पर क्लिक करके भुगतान करें:`
      : `🔐 *Secure Checkout*\n━━━━━━━━━━━━━━━━━━━\n💵 *Amount:* ₹${advanceAmount}\n💳 *Method:* ${selectedMethod}\n━━━━━━━━━━━━━━━━━━━\nClick the button below to continue:`,

    [
      {
        id: "PAY_NOW",
        title: `💳 Pay ₹${advanceAmount}`,
      },
      {
        id: "RESTART_BOOKING",
        title: isHindi
          ? "🔄 पुनः आरंभ"
          : "🔄 Start Again",
      },
    ]
  );

  return;
}


// ======================================
// PAY NOW → CREATE RAZORPAY PAYMENT LINK
// ======================================

if (
  session.currentStep === "payment_gateway" &&
  buttonId === "PAY_NOW"
) {
  console.log("✅ PAY_NOW HANDLER HIT");

  try {
    const advanceAmount =
      Number(session.advanceAmount) || 0;

    if (advanceAmount <= 0) {
      await sendWhatsAppText(
        from,
        "❌ Invalid payment amount. Please restart the booking."
      );

      return;
    }

    const customerNameForPayment =
      session.guestName ||
      customerName ||
      "Stay Lansdowne Guest";

    const customerContactForPayment =
      session.contactNumber ||
      from;

    const referenceId =
      `STAY-${from}-${Date.now()}`;

    console.log(
      "💳 Creating Razorpay Payment Link...",
      {
        advanceAmount,
        customerName:
          customerNameForPayment,
        customerContact:
          customerContactForPayment,
        referenceId,
      }
    );

    // ======================================
    // CREATE RAZORPAY PAYMENT LINK
    // ======================================

    const paymentLink =
      await createRazorpayPaymentLink({
        amount: advanceAmount,

        customerName:
          customerNameForPayment,

        customerContact:
          customerContactForPayment,

        referenceId,
      });

    console.log(
      "✅ Razorpay Payment Link Created",
      {
        id: paymentLink.id,
        short_url:
          paymentLink.short_url,
      }
    );

    // ======================================
    // SAVE PERMANENT PAYMENT MAPPING
    // ======================================

    await WhatsAppPayment.create({
      phoneNumber: from,

      referenceId,

      paymentLinkId:
        paymentLink.id,

      paymentLinkUrl:
        paymentLink.short_url,

      customerName:
        customerNameForPayment,

      customerContact:
        customerContactForPayment,

      amount:
        advanceAmount,

      currency: "INR",

      paymentMethod:
        session.paymentMethod ||
        "razorpay",

      status: "initiated",

      sessionSnapshot:
        session.toObject
          ? session.toObject()
          : session,
    });

    console.log(
      "✅ WhatsApp Payment Mapping Saved"
    );

    // ======================================
    // ALSO UPDATE CURRENT SESSION
    // ======================================

    await updateWhatsAppSession(
      from,
      {
        paymentOrderId:
          paymentLink.id,

        paymentStatus:
          "initiated",

        currentStep:
          "payment_gateway",

        lastMessageId:
          messageId,

        lastMessageAt:
          new Date(),
      }
    );

    // ======================================
    // SEND PAYMENT LINK
    // ======================================

    const isHindi =
      session.language === "hindi";

    const paymentLinkMessage =
      isHindi
        ? `🔐 *Razorpay सिक्योर पेमेंट लिंक*
━━━━━━━━━━━━━━━━━━━
💵 *भुगतान राशि:* ₹${advanceAmount}
━━━━━━━━━━━━━━━━━━━
नीचे दिए गए सुरक्षित लिंक पर क्लिक करके भुगतान पूरा करें:

🔗 ${paymentLink.short_url}

✅ *भुगतान पूरा होते ही आपको WhatsApp पर पुष्टि एवं वाउचर मिल जाएगा।*`
        : `🔐 *Secure Payment Link*
━━━━━━━━━━━━━━━━━━━
💵 *Amount to Pay:* ₹${advanceAmount}
━━━━━━━━━━━━━━━━━━━
Please complete your payment using the secure Razorpay link below:

🔗 ${paymentLink.short_url}

✅ *Upon successful payment, your booking voucher will be sent right here.*`;

    await sendWhatsAppText(
      from,
      paymentLinkMessage
    );

    console.log(
      "📤 Razorpay payment link sent to WhatsApp"
    );

    return;

  } catch (error) {
    console.error(
      "❌ PAY_NOW Razorpay Error:",
      error
    );

    await sendWhatsAppText(
      from,
      "❌ Payment link create nahi ho paya. Please try again."
    );

    return;
  }
}

// ======================================
// DOWNLOAD VOUCHER
// ======================================

if (
  (
    session.currentStep ===
      "booking_confirmed" ||
    session.currentStep ===
      "download_voucher"
  ) &&
  buttonId ===
    "DOWNLOAD_VOUCHER"
) {
  try {
    console.log(
      "📄 DOWNLOAD_VOUCHER HANDLER HIT"
    );

    const isHindi =
      session?.language === "hindi";

    const whatsappPayment =
      await WhatsAppPayment.findOne({
        phoneNumber: from,

        bookingId:
          session.bookingId,

        status: "success",
      });

    if (!whatsappPayment) {
      await sendWhatsAppText(
        from,
        isHindi
          ? "⚠️ बुकिंग भुगतान रिकॉर्ड नहीं मिला। कृपया सहायता के लिए संपर्क करें।"
          : "⚠️ Booking payment record not found. Please contact support."
      );

      return;
    }

    const thankYouMessage = isHindi
      ? `✨ *धन्यवाद! DevBhoomi Stay चुनने के लिए आभार।*
━━━━━━━━━━━━━━━━━━━
आपकी बुकिंग सफलतापूर्वक दर्ज हो गई है और आपका आधिकारिक वाउचर ऊपर भेज दिया गया है।

हिल्स में आपकी सुखद यात्रा की शुभकामनाएँ! 🏔️`
      : `✨ *Thank You for Choosing DevBhoomi Stay!*
━━━━━━━━━━━━━━━━━━━
Your booking has been confirmed successfully and your official booking voucher has been sent above.

We wish you a wonderful and memorable stay in the hills! 🏔️`;

    const thankYouButtons = [
      {
        id: "BOOK_ANOTHER_STAY",
        title: isHindi ? "🏨 अन्य होटल बुक" : "🏨 Book Again",
      },
      {
        id: "MAIN_MENU",
        title: "🏠 Main Menu",
      },
    ];

    // ======================================
    // ALREADY GENERATED
    // ======================================

    if (
      whatsappPayment.voucherGenerated &&
      whatsappPayment.voucherMediaId
    ) {
      await sendWhatsAppPDF({
        phoneNumber: from,

        mediaId:
          whatsappPayment.voucherMediaId,

        fileName:
          whatsappPayment.voucherFileName ||
          "Booking_Voucher.pdf",

        caption:
          "📄 Your DevBhoomi Stay Booking Voucher",
      });

      await updateWhatsAppSession(
        from,
        {
          currentStep: "thank_you",
          lastMessageAt: new Date(),
        }
      );

      await sendWhatsAppButtons(
        from,
        thankYouMessage,
        thankYouButtons
      );

      return;
    }

    // ======================================
    // GENERATE PDF
    // ======================================

    const voucher =
      await generateBookingVoucher(
        whatsappPayment.bookingId
      );

    console.log(
      "✅ Voucher PDF generated:",
      voucher.fileName
    );

    // ======================================
    // UPLOAD TO WHATSAPP
    // ======================================

    const mediaId =
      await uploadWhatsAppPDF({
        pdfBuffer:
          voucher.pdfBuffer,

        fileName:
          voucher.fileName,
      });

    console.log(
      "✅ Voucher uploaded to WhatsApp:",
      mediaId
    );

    // ======================================
    // SAVE VOUCHER INFO
    // ======================================

    await WhatsAppPayment.findByIdAndUpdate(
      whatsappPayment._id,

      {
        voucherGenerated:
          true,

        voucherFileName:
          voucher.fileName,

        voucherMediaId:
          mediaId,

        voucherSentAt:
          new Date(),
      }
    );

    // ======================================
    // UPDATE SESSION
    // ======================================

    await updateWhatsAppSession(
      from,
      {
        currentStep:
          "voucher_pdf",

        voucherGenerated:
          true,

        lastMessageId:
          messageId,

        lastMessageAt:
          new Date(),
      }
    );

    // ======================================
    // SEND PDF
    // ======================================

    await sendWhatsAppPDF({
      phoneNumber: from,

      mediaId,

      fileName:
        voucher.fileName,

      caption:
        "📄 Your DevBhoomi Stay Booking Voucher",
    });

    console.log(
      "📤 Voucher PDF sent to WhatsApp"
    );

    // ======================================
    // THANK YOU
    // ======================================

    await updateWhatsAppSession(
      from,
      {
        currentStep:
          "thank_you",

        lastMessageAt:
          new Date(),
      }
    );

    await sendWhatsAppButtons(
      from,
      thankYouMessage,
      thankYouButtons
    );

    return;

  } catch (error) {
    console.error(
      "❌ Voucher Generation Error:",
      error
    );

    await sendWhatsAppText(
      from,
      "⚠️ Unable to send your booking voucher at the moment. Please try again."
    );

    return;
  }
}

// ======================================
// BOOK ANOTHER STAY
// ======================================

if (
  session.currentStep === "thank_you" &&
  buttonId === "BOOK_ANOTHER_STAY"
) {
  console.log(
    "🏨 BOOK_ANOTHER_STAY HANDLER HIT"
  );

  await updateWhatsAppSession(
    from,
    {
      currentStep:
        "select_destination",

      // Keep language
      // Reset booking-specific data
      destination: null,
      checkIn: null,
      checkOut: null,

      adults: null,
      children: null,

      budget: null,
      hotelType: null,

      selectedHotel: null,
      selectedRoom: null,
      selectedRoomCategory: null,

      guestName: null,
      contactNumber: null,

      bookingId: null,
      bookingAmount: null,
      advanceAmount: null,

      paymentStatus: "pending",
      paymentMethod: null,

      transactionId: null,
      paymentOrderId: null,

      voucherGenerated: false,
      voucherUrl: null,

      lastMessageId:
        messageId,

      lastMessageAt:
        new Date(),
    }
  );

  await sendDestinationScreen(
    from,
    session.language
  );

  return;
}

// ======================================
// MAIN MENU
// ======================================

if (
  session.currentStep === "thank_you" &&
  buttonId === "MAIN_MENU"
) {
  console.log(
    "🏠 MAIN_MENU HANDLER HIT"
  );

  await updateWhatsAppSession(
    from,
    {
      currentStep: "home",

      // Keep language
      // Reset booking-specific data
      destination: null,
      checkIn: null,
      checkOut: null,

      adults: null,
      children: null,

      budget: null,
      hotelType: null,

      selectedHotel: null,
      selectedRoom: null,
      selectedRoomCategory: null,

      guestName: null,
      contactNumber: null,

      bookingId: null,
      bookingAmount: null,
      advanceAmount: null,

      paymentStatus: "pending",
      paymentMethod: null,

      transactionId: null,
      paymentOrderId: null,

      voucherGenerated: false,
      voucherUrl: null,

      lastMessageId:
        messageId,

      lastMessageAt:
        new Date(),
    }
  );

  await sendHomeScreen(
    from,
    session.language
  );

  return;
}

// ======================================
// MAIN MENU
// ======================================

if (
  (
    session.currentStep === "booking_confirmed" ||
    session.currentStep === "thank_you" ||
    session.currentStep === "voucher_pdf"
  ) &&
  buttonId === "MAIN_MENU"
) {
  console.log(
    "🏠 MAIN_MENU HANDLER HIT"
  );

  await updateWhatsAppSession(
    from,
    {
      // Keep selected language
      currentStep: "home",

      // Reset booking-specific data
      destination: null,
      checkIn: null,
      checkOut: null,

      adults: null,
      children: null,

      budget: null,
      hotelType: null,

      selectedHotel: null,
      selectedRoom: null,
      selectedRoomCategory: null,

      guestName: null,
      contactNumber: null,

      bookingId: null,
      bookingAmount: null,
      advanceAmount: null,

      paymentStatus: "pending",
      paymentMethod: null,

      transactionId: null,
      paymentOrderId: null,

      voucherGenerated: false,
      voucherUrl: null,

      lastMessageId: messageId,
      lastMessageAt: new Date(),
    }
  );

  await sendHomeScreen(
    from,
    session.language
  );

  return;
}

    // ======================================
    // Unknown / Unhandled Message
    // ======================================

    console.log(
      "WhatsApp message received:",
      {
        from,

        customerName,

        text,

        buttonId,

        listId,

        currentStep:
          session.currentStep,
      }
    );
  };



// =========================
// WhatsApp Incoming Webhook
// =========================

export const receiveWhatsAppWebhook =
  async (
    req,
    res
  ) => {
    try {
      console.log(
        "WhatsApp Webhook Received:",
        JSON.stringify(
          req.body,
          null,
          2
        )
      );

      const message =
        parseWhatsAppMessage(
          req.body
        );

      if (!message) {
        return res.sendStatus(
          200
        );
      }

      console.log(
        "Parsed WhatsApp Message:",
        message
      );

      // Immediately acknowledge webhook
      res.sendStatus(200);

      // Process asynchronously
      await processIncomingWhatsAppMessage(
        message
      );
    } catch (error) {
      console.error(
        "WhatsApp Webhook Error:",
        error.message
      );

      if (!res.headersSent) {
        return res.sendStatus(
          200
        );
      }
    }
  };