import {
  parseWhatsAppMessage,
  getOrCreateWhatsAppSession,
  updateWhatsAppSession,
  sendWhatsAppButtons,
  sendWhatsAppText,
  sendWhatsAppList,
  sendWhatsAppImage,
} from "../services/whatsappService.js";

import { searchAvailableHotels } from "../services/whatsappBookingService.js";
import Hotel from "../models/Hotel.js";
import createRazorpayPaymentLink from "../services/razorpayService.js";
import WhatsAppPayment from "../models/WhatsAppPayment.js";
import Room from "../models/Room.js";
import generateBookingVoucher
  from "../services/voucherService.js";

import {
  uploadWhatsAppPDF,
  sendWhatsAppPDF,
} from "../services/whatsappDocumentService.js";


// =========================
// WhatsApp Webhook Verification
// =========================

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

// =========================
// Send Welcome Screen
// =========================

const sendWelcomeScreen = async (
  phoneNumber
) => {
  return sendWhatsAppButtons(
    phoneNumber,

    "🏔️ Welcome to Stay Lansdowne\n\nPlease choose your preferred language.",

    [
      {
        id: "LANG_HINDI",
        title: "हिन्दी",
      },
      {
        id: "LANG_ENGLISH",
        title: "English",
      },
    ]
  );
};

// =========================
// Send Home Screen
// =========================

const sendHomeScreen = async (
  phoneNumber,
  language
) => {
  const isHindi =
    language === "hindi";

  return sendWhatsAppButtons(
    phoneNumber,

    isHindi
      ? "आपका स्वागत है 🙏\n\nआप क्या करना चाहते हैं?"
      : "Welcome to Stay Lansdowne 🏔️\n\nWhat would you like to do?",

    [
      {
        id: "HOME_BOOK_HOTEL",
        title: isHindi
          ? "🏨 होटल बुक करें"
          : "🏨 Book Hotel",
      },

      {
        id: "HOME_CONTACT_US",
        title: isHindi
          ? "📞 संपर्क करें"
          : "📞 Contact Us",
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

// =========================
// Send Destination Screen
// =========================

const sendDestinationScreen = async (
  phoneNumber,
  language
) => {
  const isHindi =
    language === "hindi";

  return sendWhatsAppButtons(
    phoneNumber,

    isHindi
      ? "अपना गंतव्य चुनें:"
      : "Please select your destination:",

    [
      {
        id: "DEST_LANSDOWNE",
        title: "Lansdowne",
      },

      {
        id: "DEST_KOTDWAR",
        title: "Kotdwar",
      },
    ]
  );
};

// =========================
// Send Check-in Screen
// =========================

const sendCheckInScreen = async (
  phoneNumber,
  language
) => {
  const isHindi =
    language === "hindi";

  return sendWhatsAppButtons(
    phoneNumber,

    isHindi
      ? "Check-in date चुनें:"
      : "Please select your check-in date:",

    [
      {
        id: "CHECKIN_TOMORROW",
        title: "Tomorrow",
      },

      {
        id: "CHECKIN_OTHER",
        title: "Select Another Date",
      },
    ]
  );
};

// =========================
// Date Helpers
// =========================

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

// =========================
// Create UTC Date
// =========================

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

// =========================
// Add Days
// =========================

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

// =========================
// Format Date
// =========================

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

// =========================
// Send Check-out Screen
// =========================

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
        ? `Check-out date चुनें:\n\n${nextDayLabel}`
        : `Please select your check-out date:\n\n${nextDayLabel}`,

      [
        {
          id: "CHECKOUT_NEXT_DAY",
          title: "Next Day",
        },

        {
          id: "CHECKOUT_OTHER",
          title: "Select Another Date",
        },
      ]
    );
  };

// =========================
// Send Adults Screen
// =========================

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
        ? "कितने adults यात्रा करेंगे?"
        : "How many adults will be staying?",

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
              title: "1 Adult",
            },

            {
              id: "ADULTS_2",
              title: "2 Adults",
            },

            {
              id: "ADULTS_3",
              title: "3 Adults",
            },

            {
              id: "ADULTS_4_PLUS",
              title: "4+ Adults",
            },
          ],
        },
      ]
    );
  };

// =========================
// Send Children Screen
// =========================

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
        ? "कितने children यात्रा करेंगे?"
        : "How many children will be staying?",

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
              title: "0 Children",
            },

            {
              id: "CHILDREN_1",
              title: "1 Child",
            },

            {
              id: "CHILDREN_2",
              title: "2 Children",
            },

            {
              id: "CHILDREN_3_PLUS",
              title: "3+ Children",
            },
          ],
        },
      ]
    );
  };

// =========================
// Send Budget Screen
// =========================

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
        ? "अपना budget चुनें:"
        : "Please select your budget:",

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
              title:
                "₹1500 - ₹2500",
            },

            {
              id: "BUDGET_2500_4000",
              title:
                "₹2500 - ₹4000",
            },

            {
              id: "BUDGET_4000_6000",
              title:
                "₹4000 - ₹6000",
            },

            {
              id: "BUDGET_LUXURY",
              title: "Luxury",
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
        ? "आप किस type का hotel चाहते हैं?"
        : "What type of stay are you looking for?",

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
              title:
                "Budget Hotel",
            },

            {
              id: "HOTEL_TYPE_DELUXE",
              title:
                "Deluxe Hotel",
            },

            {
              id: "HOTEL_TYPE_LUXURY",
              title:
                "Luxury Hotel",
            },

            {
              id: "HOTEL_TYPE_HOMESTAY",
              title:
                "Homestay",
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

    return sendWhatsAppText(
      phoneNumber,

      isHindi
        ? "🔍 आपके लिए hotels खोज रहे हैं...\n\nकृपया कुछ क्षण प्रतीक्षा करें।"
        : "🔍 Searching hotels for you...\n\nPlease wait a moment."
    );
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
          ? "😔 Aapke selected dates aur filters ke according koi hotel available nahi mila."
          : "😔 No hotels are available for your selected dates and filters."
      );
    }

    // ======================================
    // SEND HOTEL IMAGES + INFO
    // ======================================

    const hotelsToShow =
      hotels.slice(0, 10);

    for (
      const hotel of hotelsToShow
    ) {
      const imageUrl =
        hotel.coverImage ||
        hotel.images?.[0] ||
        null;

      if (!imageUrl) {
        continue;
      }

      const caption =
        isHindi
          ? `🏨 ${hotel.hotelName}

📍 ${hotel.city}, ${hotel.state}

💰 Starting from ₹${hotel.startingPrice}/night

🏷️ ${hotel.hotelType || "Hotel"}`
          : `🏨 ${hotel.hotelName}

📍 ${hotel.city}, ${hotel.state}

💰 Starting from ₹${hotel.startingPrice}/night

🏷️ ${hotel.hotelType || "Hotel"}`;

      try {
        await sendWhatsAppImage(
          phoneNumber,
          imageUrl,
          caption
        );
      } catch (error) {
        console.error(
          "Hotel Image Send Error:",
          hotel.hotelName,
          error.message
        );
      }
    }

    // ======================================
    // HOTEL SELECTION LIST
    // ======================================

    const rows =
      hotelsToShow.map(
        (hotel) => ({
          id:
            `HOTEL_${hotel.hotelId}`,

          title:
            hotel.hotelName.length >
            24
              ? `${hotel.hotelName.slice(
                  0,
                  21
                )}...`
              : hotel.hotelName,

          description:
            `From ₹${hotel.startingPrice}/night`,
        })
      );

    return sendWhatsAppList(
      phoneNumber,

      isHindi
        ? `${hotels.length} hotel available हैं।`
        : `${hotels.length} hotel(s) available.`,

      isHindi
        ? "Hotel चुनें"
        : "Select Hotel",

      [
        {
          title:
            "Available Hotels",

          rows,
        },
      ]
    );
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

  const totalNights = Math.ceil(
    (checkOut.getTime() - checkIn.getTime()) /
      (1000 * 60 * 60 * 24)
  );

  const pricePerNight =
    Number(hotel.startingPrice) || 0;

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
    ? `📋 Booking Summary

🏨 Hotel: ${hotel.hotelName}

📍 Destination: ${session.destination}

📅 Check-in: ${checkInText}
📅 Check-out: ${checkOutText}

🌙 Nights: ${totalNights}

👨 Adults: ${session.adults}
👶 Children: ${session.children}

👤 Guest: ${session.guestName}
📱 Contact: ${session.contactNumber}

💰 Price: ₹${pricePerNight}/night
💵 Total Amount: ₹${totalAmount}`

    : `📋 Booking Summary

🏨 Hotel: ${hotel.hotelName}

📍 Destination: ${session.destination}

📅 Check-in: ${checkInText}
📅 Check-out: ${checkOutText}

🌙 Nights: ${totalNights}

👨 Adults: ${session.adults}
👶 Children: ${session.children}

👤 Guest: ${session.guestName}
📱 Contact: ${session.contactNumber}

💰 Price: ₹${pricePerNight}/night
💵 Total Amount: ₹${totalAmount}`;

  await sendWhatsAppButtons(
    phoneNumber,
    summaryMessage,
    [
      {
        id: "CONFIRM_BOOKING",
        title: isHindi
          ? "✅ Booking Confirm करें"
          : "✅ Confirm Booking",
      },
      {
        id: "RESTART_BOOKING",
        title: isHindi
          ? "🔄 फिर से शुरू करें"
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

    // ======================================
    // Language - Hindi
    // ======================================

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
        "hindi"
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
        "english"
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

    // ======================================
    // Home - Contact Us
    // ======================================

    if (
      session.currentStep ===
        "home" &&
      buttonId ===
        "HOME_CONTACT_US"
    ) {
      const contactMessage =
        session.language ===
        "hindi"

          ? "📞 हमसे संपर्क करने के लिए कृपया Stay Lansdowne टीम से संपर्क करें।"

          : "📞 Please contact the Stay Lansdowne team for assistance.";

      await sendWhatsAppText(
        from,
        contactMessage
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
    // Home - About Us
    // ======================================

    if (
      session.currentStep ===
        "home" &&
      buttonId ===
        "HOME_ABOUT_US"
    ) {
      const aboutMessage =
        session.language ===
        "hindi"

          ? "🏔️ Stay Lansdowne आपको आसान और सुविधाजनक hotel booking experience प्रदान करता है।"

          : "🏔️ Stay Lansdowne provides a simple and convenient hotel booking experience.";

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

    // ======================================
    // Destination
    // ======================================

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

          ? "कृपया check-in date भेजें।\n\nFormat: DD/MM/YYYY"

          : "Please type your check-in date.\n\nFormat: DD/MM/YYYY"
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

            ? "कृपया सही date भेजें।\n\nउदाहरण: 15/10/2027"

            : "Please enter a valid date.\n\nExample: 15/10/2027"
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

            ? "Check-in date past में नहीं हो सकती।"

            : "Check-in date cannot be in the past."
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

          ? "कृपया check-out date भेजें।\n\nFormat: DD/MM/YYYY"

          : "Please type your check-out date.\n\nFormat: DD/MM/YYYY"
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

            ? "कृपया सही date भेजें।\n\nउदाहरण: 20/10/2027"

            : "Please enter a valid date.\n\nExample: 20/10/2027"
        );

        return;
      }

      if (!session.checkIn) {
        await sendWhatsAppText(
          from,

          session.language ===
            "hindi"

            ? "पहले check-in date चुनें।"

            : "Please select your check-in date first."
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

            ? "Check-out date, check-in date के बाद होनी चाहिए।"

            : "Check-out date must be after check-in date."
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




// ======================================
// Hotel Type Selection
// ======================================

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

  // Show searching message
  await sendSearchingHotelsScreen(
    from,
    session.language
  );

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
// Hotel Selection
// ======================================

if (
  session.currentStep === "hotels_found" &&
  listId &&
  listId.startsWith("HOTEL_")
) {
  const hotelId =
    listId.replace("HOTEL_", "");

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
          ? "😔 Selected hotel ab available nahi hai."
          : "😔 The selected hotel is no longer available."
      );

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
          ? "😔 Is hotel mein selected guests ke liye koi suitable room available nahi hai."
          : "😔 No suitable room is currently available for the selected number of guests."
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
    // HOTEL DETAILS
    // ======================================

    const isHindi =
      session.language === "hindi";

    const detailsMessage =
      isHindi
        ? `🏨 ${hotel.hotelName}

📍 ${hotel.city}, ${hotel.state}

🛏️ Room: ${
            suitableRoom.roomCategory.name
          }

👥 Capacity: ${
            suitableRoom.roomCategory.maxGuests
          } Guests

📞 ${hotel.phone}

${
  hotel.description ||
  "Comfortable stay at a convenient location."
}`
        : `🏨 ${hotel.hotelName}

📍 ${hotel.city}, ${hotel.state}

🛏️ Room: ${
            suitableRoom.roomCategory.name
          }

👥 Capacity: ${
            suitableRoom.roomCategory.maxGuests
          } Guests

📞 ${hotel.phone}

${
  hotel.description ||
  "Comfortable stay at a convenient location."
}`;

    await sendWhatsAppButtons(
      from,
      detailsMessage,
      [
        {
          id: "HOTEL_PHOTOS",
          title:
            isHindi
              ? "📸 Photos"
              : "📸 Photos",
        },
        {
          id: "HOTEL_LOCATION",
          title:
            isHindi
              ? "📍 Location"
              : "📍 Location",
        },
        {
          id: "HOTEL_CONTINUE",
          title:
            isHindi
              ? "➡️ Continue"
              : "➡️ Continue",
        },
      ]
    );

    return;
  } catch (error) {
    console.error(
      "Hotel Selection Error:",
      error.message
    );

    await sendWhatsAppText(
      from,
      "😔 Unable to select hotel at the moment. Please try again."
    );

    return;
  }
}


// ======================================
// Hotel Photos
// ======================================

if (
  session.currentStep === "hotel_details" &&
  buttonId === "HOTEL_PHOTOS"
) {
  try {
    const hotel = await Hotel.findById(
      session.selectedHotel
    );

    if (!hotel) {
      await sendWhatsAppText(
        from,
        "😔 Hotel details not found."
      );
      return;
    }

    await updateWhatsAppSession(from, {
      currentStep: "hotel_photos",
      lastMessageId: messageId,
      lastMessageAt: new Date(),
    });

    if (
      hotel.images &&
      hotel.images.length > 0
    ) {
      await sendWhatsAppText(
        from,
        `📸 ${hotel.hotelName}\n\nHotel photos are available.`
      );
    } else {
      await sendWhatsAppText(
        from,
        `📸 ${hotel.hotelName}\n\nCurrently no hotel photos are available.`
      );
    }

    await sendWhatsAppButtons(
      from,
      "What would you like to see next?",
      [
        {
          id: "HOTEL_LOCATION",
          title: "📍 Location",
        },
        {
          id: "HOTEL_CONTINUE",
          title: "➡️ Continue",
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
      "😔 Unable to load hotel photos."
    );

    return;
  }
}


// ======================================
// Hotel Location
// ======================================

if (
  session.currentStep === "hotel_details" &&
  buttonId === "HOTEL_LOCATION"
) {
  try {
    const hotel = await Hotel.findById(
      session.selectedHotel
    );

    if (!hotel) {
      await sendWhatsAppText(
        from,
        "😔 Hotel location not found."
      );
      return;
    }

    await updateWhatsAppSession(from, {
      currentStep: "hotel_location",
      lastMessageId: messageId,
      lastMessageAt: new Date(),
    });

    const locationMessage = `
📍 ${hotel.hotelName}

${hotel.address}

${hotel.city}, ${hotel.state}, ${hotel.country}
`;

    await sendWhatsAppText(
      from,
      locationMessage.trim()
    );

    await sendWhatsAppButtons(
      from,
      "Ready to continue with your booking?",
      [
        {
          id: "HOTEL_CONTINUE",
          title: "➡️ Continue",
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
      "😔 Unable to load hotel location."
    );

    return;
  }
}


// ======================================
// Hotel Continue
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
    session.language === "hindi"
      ? "कृपया अपना पूरा नाम भेजें।"
      : "Please enter your full name."
  );

  return;
}


// ======================================
// Enter Guest Name
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
        ? "कृपया अपना सही पूरा नाम भेजें।"
        : "Please enter a valid full name."
    );

    return;
  }

  await updateWhatsAppSession(from, {
    guestName,
    currentStep: "share_contact",
    lastMessageId: messageId,
    lastMessageAt: new Date(),
  });

  await sendWhatsAppText(
    from,
    session.language === "hindi"
      ? "📱 कृपया अपना contact number भेजें।"
      : "📱 Please share your contact number."
  );

  return;
}

// ======================================
// Share Contact / Contact Number
// ======================================

if (
  session.currentStep === "share_contact" &&
  text &&
  !buttonId &&
  !listId
) {
  const contactNumber = text.replace(/\D/g, "");

  if (
    contactNumber.length < 10 ||
    contactNumber.length > 15
  ) {
    await sendWhatsAppText(
      from,
      session.language === "hindi"
        ? "कृपया valid contact number भेजें।"
        : "Please enter a valid contact number."
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
        ? "😔 Selected hotel ab available nahi hai. Please booking dobara try karein."
        : "😔 The selected hotel is no longer available. Please try the booking again."
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
      ? `✅ आपकी booking details confirm हो गई हैं।

अब आपको advance payment करना होगा।

💰 Total Amount: ₹${session.bookingAmount}

क्या आप payment करना चाहते हैं?`
      : `✅ Your booking details have been confirmed.

An advance payment is required to continue.

💰 Total Amount: ₹${session.bookingAmount}

Would you like to proceed with payment?`,
    [
      {
        id: "PROCEED_PAYMENT",
        title: isHindi
          ? "💳 Payment करें"
          : "💳 Proceed to Payment",
      },
      {
        id: "RESTART_BOOKING",
        title: isHindi
          ? "🔄 Start Again"
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
    ? `💳 Advance Payment

💰 Total Booking Amount: ₹${totalAmount}

📌 Advance Required: ${advancePercentage}%
💵 Pay Now: ₹${advanceAmount}

Payment complete karne ke liye neeche button par click karein.`
    : `💳 Advance Payment

💰 Total Booking Amount: ₹${totalAmount}

📌 Advance Required: ${advancePercentage}%
💵 Pay Now: ₹${advanceAmount}

Click the button below to continue with payment.`;

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
        title: "🔄 Start Again",
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
    ? `🔐 Secure Payment

💰 Amount to Pay: ₹${advanceAmount}

कृपया payment method चुनें।`
    : `🔐 Secure Payment

💰 Amount to Pay: ₹${advanceAmount}

Please choose a payment method.`;

await sendWhatsAppList(
  from,
  paymentMessage,

  isHindi
    ? "Payment चुनें"
    : "Select Payment",

  [
    {
      title: "Payment Options",
      rows: [
        {
          id: "PAYMENT_RAZORPAY",
          title: "Razorpay",
          description: "UPI, Cards, Netbanking",
        },
        {
          id: "PAYMENT_UPI",
          title: "UPI",
          description: "Pay using UPI",
        },
        {
          id: "PAYMENT_CARD",
          title: "Debit / Credit Card",
          description: "Pay using card",
        },
        {
          id: "PAYMENT_NETBANKING",
          title: "Net Banking",
          description: "Pay using net banking",
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
    razorpay: "Razorpay",
    upi: "UPI",
    card: "Debit / Credit Card",
    netbanking: "Net Banking",
  };

  const selectedMethod =
    methodNameMap[paymentMethod];

  await sendWhatsAppButtons(
    from,

    isHindi
      ? `🔐 Secure Payment

💰 Amount to Pay: ₹${advanceAmount}

💳 Payment Method: ${selectedMethod}

नीचे Pay button पर click करें।`
      : `🔐 Secure Payment

💰 Amount to Pay: ₹${advanceAmount}

💳 Payment Method: ${selectedMethod}

Click the Pay button below to continue.`,

    [
      {
        id: "PAY_NOW",
        title: `💳 Pay ₹${advanceAmount}`,
      },
      {
        id: "RESTART_BOOKING",
        title: "🔄 Start Again",
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
        ? `🔐 Razorpay Payment

💰 Amount to Pay: ₹${advanceAmount}

नीचे दिए गए secure payment link पर click करके payment complete करें:

${paymentLink.short_url}

✅ Payment complete होने के बाद आपको WhatsApp पर confirmation मिल जाएगा।`
        : `🔐 Razorpay Payment

💰 Amount to Pay: ₹${advanceAmount}

Please complete your payment using the secure Razorpay link below:

${paymentLink.short_url}

✅ After successful payment, you will receive confirmation on WhatsApp.`;

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
        "❌ Booking payment record nahi mila. Please contact support."
      );

      return;
    }

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
          "📄 Stay Lansdowne Booking Voucher",
      });

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
        "📄 Your Stay Lansdowne Booking Voucher",
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

      `❤️ Thank You!

We look forward to hosting you at Stay Lansdowne.

Have a great day!`,

      [
        {
          id:
            "BOOK_ANOTHER_STAY",

          title:
            "🏨 Book Another Stay",
        },

        {
          id:
            "MAIN_MENU",

          title:
            "🏠 Main Menu",
        },
      ]
    );

    return;

  } catch (error) {
    console.error(
      "❌ Voucher Generation Error:",
      error
    );

    await sendWhatsAppText(
      from,
      "❌ Voucher generate nahi ho paaya. Please try again."
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