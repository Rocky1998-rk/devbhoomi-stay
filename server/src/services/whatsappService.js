import WhatsAppSession from "../models/WhatsAppSession.js";
import whatsappConfig from "../config/whatsappConfig.js";

// =====================================================
// Session Expiry
// =====================================================

const SESSION_DURATION_MS =
  30 * 60 * 1000;

const getSessionExpiry = () => {
  return new Date(
    Date.now() + SESSION_DURATION_MS
  );
};

// =====================================================
// Get or Create WhatsApp Session
// =====================================================

export const getOrCreateWhatsAppSession = async (phoneNumber,customerName = "") => {
  if (!phoneNumber) {
    throw new Error(
      "WhatsApp phone number is required"
    );
  }

  let session = await WhatsAppSession.findOne({
    phoneNumber,
  });

  // Existing session
  if (session) {
    session.expiresAt = getSessionExpiry();

    if (customerName) {
      session.customerName =
        customerName.trim();
    }

    await session.save();

    return session;
  }

  // New session
  try {
    session = await WhatsAppSession.create({
      phoneNumber,
      customerName:
        customerName?.trim() || "",
      currentStep: "welcome",
      expiresAt: getSessionExpiry(),
    });

    return session;
  } catch (error) {
    if (error?.code === 11000) {
      const existingSession =
        await WhatsAppSession.findOne({
          phoneNumber,
        });

      if (!existingSession) {
        throw error;
      }

      existingSession.expiresAt =
        getSessionExpiry();

      if (customerName) {
        existingSession.customerName =
          customerName.trim();
      }

      await existingSession.save();

      return existingSession;
    }

    throw error;
  }
};


// =====================================================
// Update WhatsApp Session
// =====================================================

export const updateWhatsAppSession = async (
  phoneNumber,
  updates = {}
) => {
  if (!phoneNumber) {
    throw new Error(
      "WhatsApp phone number is required"
    );
  }

  const session =
    await WhatsAppSession.findOne({
      phoneNumber,
    });

  if (!session) {
    throw new Error(
      "WhatsApp session not found"
    );
  }

  // ==========================================
  // Update Allowed Session Fields
  // ==========================================

  Object.entries(updates).forEach(
    ([key, value]) => {
      if (value !== undefined) {
        session[key] = value;
      }
    }
  );

  // ==========================================
  // Refresh Session
  // ==========================================

  session.expiresAt =
    getSessionExpiry();

  await session.save();

  return session;
};

// =====================================================
// Get WhatsApp Session
// =====================================================

export const getWhatsAppSession = async (
  phoneNumber
) => {
  if (!phoneNumber) {
    throw new Error(
      "WhatsApp phone number is required"
    );
  }

  return WhatsAppSession.findOne({
    phoneNumber,
  });
};

// =====================================================
// Parse Incoming WhatsApp Message
// =====================================================

export const parseWhatsAppMessage = (
  payload
) => {
  const value =
    payload?.entry?.[0]?.changes?.[0]
      ?.value;

  const message =
    value?.messages?.[0];

  const contact =
    value?.contacts?.[0];

  if (!message) {
    return null;
  }

 const parsedMessage = {
  messageId:
    message.id || null,

  from:
    message.from || null,

  customerName:
    contact?.profile?.name ||
    "Customer",

  timestamp:
    message.timestamp || null,

  type:
    message.type || null,

  text: "",

  buttonId: null,

  buttonTitle: null,

  listId: null,

  listTitle: null,

  flowData: null,
};

  // ==========================================
  // Text Message
  // ==========================================

  if (message.type === "text") {
    parsedMessage.text =
      message.text?.body
        ?.trim() || "";
  }

  // ==========================================
  // Reply Button
  // ==========================================

  if (
    message.type === "interactive" &&
    message.interactive
      ?.type === "button_reply"
  ) {
    parsedMessage.buttonId =
      message.interactive
        ?.button_reply?.id ||
      null;

    parsedMessage.buttonTitle =
      message.interactive
        ?.button_reply?.title ||
      null;
  }

  // ==========================================
  // List Reply
  // ==========================================

  if (
    message.type === "interactive" &&
    message.interactive
      ?.type === "list_reply"
  ) {
    parsedMessage.listId =
      message.interactive
        ?.list_reply?.id ||
      null;

    parsedMessage.listTitle =
      message.interactive
        ?.list_reply?.title ||
      null;
  }

// ==========================================
// WhatsApp Flow Reply
// ==========================================

if (
  message.type === "interactive" &&
  message.interactive
    ?.type === "nfm_reply"
) {
  const responseJson =
    message.interactive
      ?.nfm_reply
      ?.response_json;

  if (responseJson) {
    try {
      parsedMessage.flowData =
        JSON.parse(responseJson);
    } catch (error) {
      console.error(
        "WhatsApp Flow Response Parse Error:",
        error.message
      );

      parsedMessage.flowData = null;
    }
  }
}

  return parsedMessage;
};

// =====================================================
// Send WhatsApp API Request
// =====================================================

const sendWhatsAppRequest = async (payload) => {
  const {
    apiVersion,
    phoneNumberId,
    accessToken,
  } = whatsappConfig;

  if (!apiVersion) {
    throw new Error(
      "WHATSAPP_API_VERSION is not configured"
    );
  }

  if (!phoneNumberId) {
    throw new Error(
      "WHATSAPP_PHONE_NUMBER_ID is not configured"
    );
  }

  if (!accessToken) {
    throw new Error(
      "WHATSAPP_ACCESS_TOKEN is not configured"
    );
  }

  const url =
    `https://graph.facebook.com/` +
    `${apiVersion}/` +
    `${phoneNumberId}/messages`;

  try {
    const response = await fetch(
      url,
      {
        method: "POST",

        headers: {
          Authorization:
            `Bearer ${accessToken}`,

          "Content-Type":
            "application/json",
        },

        body: JSON.stringify(
          payload
        ),
      }
    );

    const data =
      await response.json();

    // ============================================
    // WhatsApp API Error
    // ============================================

    if (!response.ok) {
      console.error(
        "WhatsApp API Error:",
        JSON.stringify(
          data,
          null,
          2
        )
      );

      throw new Error(
        data?.error?.message ||
          "Failed to send WhatsApp message"
      );
    }

    // ============================================
    // WhatsApp API Success
    // ============================================

    console.log(
      "WhatsApp API Success:",
      JSON.stringify(
        data,
        null,
        2
      )
    );

    return data;

  } catch (error) {
    console.error(
      "WhatsApp Request Failed:",
      error.message
    );

    throw error;
  }
};


// =====================================================
// Send Text Message
// =====================================================

export const sendWhatsAppText = async (
  phoneNumber,
  text
) => {
  if (!phoneNumber) {
    throw new Error(
      "Phone number is required"
    );
  }

  if (!text) {
    throw new Error(
      "Message text is required"
    );
  }

  return sendWhatsAppRequest({
    messaging_product:
      "whatsapp",

    recipient_type: "individual",

    to: phoneNumber,

    type: "text",

    text: {
      preview_url: false,
      body: text,
    },
  });
};

// ======================================
// Send WhatsApp Image
// ======================================

export const sendWhatsAppImage =
  async (
    phoneNumber,
    imageUrl,
    caption = ""
  ) => {
    if (
      !phoneNumber ||
      !imageUrl
    ) {
      throw new Error(
        "Phone number and image URL are required"
      );
    }

    const response =
      await fetch(
        `https://graph.facebook.com/${whatsappConfig.apiVersion}/${whatsappConfig.phoneNumberId}/messages`,
        {
          method: "POST",

          headers: {
            Authorization:
              `Bearer ${whatsappConfig.accessToken}`,

            "Content-Type":
              "application/json",
          },

          body: JSON.stringify({
            messaging_product:
              "whatsapp",

            to: phoneNumber,

            type: "image",

            image: {
              link: imageUrl,

              ...(caption
                ? {
                    caption,
                  }
                : {}),
            },
          }),
        }
      );

    const data =
      await response.json();

    if (!response.ok) {
      console.error(
        "WhatsApp Image Error:",
        data
      );

      throw new Error(
        data?.error?.message ||
        "Failed to send WhatsApp image"
      );
    }

    return data;
  };

// =====================================================
// Send WhatsApp Reply Buttons
// =====================================================

export const sendWhatsAppButtons =
  async (
    phoneNumber,
    bodyText,
    buttons
  ) => {
    if (!phoneNumber) {
      throw new Error(
        "Phone number is required"
      );
    }

    if (!bodyText) {
      throw new Error(
        "Message body is required"
      );
    }

    if (
      !Array.isArray(buttons) ||
      buttons.length === 0
    ) {
      throw new Error(
        "At least one button is required"
      );
    }

    if (buttons.length > 3) {
      throw new Error(
        "Use WhatsApp list message for more than 3 options"
      );
    }

    const formattedButtons =
      buttons.map((button) => ({
        type: "reply",

        reply: {
          id: button.id,
          title: button.title,
        },
      }));

    return sendWhatsAppRequest({
      messaging_product:
        "whatsapp",

      recipient_type: "individual",

      to: phoneNumber,

      type: "interactive",

      interactive: {
        type: "button",

        body: {
          text: bodyText,
        },

        action: {
          buttons:
            formattedButtons,
        },
      },
    });
  };

// =====================================================
// Send WhatsApp List Message
// =====================================================

export const sendWhatsAppList =
  async (
    phoneNumber,
    bodyText,
    buttonText,
    sections
  ) => {
    if (!phoneNumber) {
      throw new Error(
        "Phone number is required"
      );
    }

    if (!bodyText) {
      throw new Error(
        "Message body is required"
      );
    }

    if (
      !buttonText ||
      !Array.isArray(sections) ||
      sections.length === 0
    ) {
      throw new Error(
        "List message data is required"
      );
    }

    return sendWhatsAppRequest({
      messaging_product:
        "whatsapp",

      recipient_type: "individual",

      to: phoneNumber,

      type: "interactive",

      interactive: {
        type: "list",

        body: {
          text: bodyText,
        },

        action: {
          button: buttonText,
          sections,
        },
      },
    });
  };

  

// =====================================================
// Prepare Cloudinary Image for WhatsApp Flow
// =====================================================

const prepareFlowImage = async (
  imageUrl
) => {
  if (!imageUrl) {
    return null;
  }

  const MAX_IMAGE_SIZE =
    95 * 1024;

  const variants = [];

  if (
    imageUrl.includes(
      "/image/upload/"
    )
  ) {
    variants.push(
      imageUrl.replace(
        "/image/upload/",
        "/image/upload/c_fill,w_300,h_200,q_25,f_jpg/"
      )
    );

    variants.push(
      imageUrl.replace(
        "/image/upload/",
        "/image/upload/c_fill,w_260,h_180,q_20,f_jpg/"
      )
    );

    variants.push(
      imageUrl.replace(
        "/image/upload/",
        "/image/upload/c_fill,w_220,h_160,q_15,f_jpg/"
      )
    );
  }

  variants.push(imageUrl);

  for (
    const variantUrl of variants
  ) {
    try {
      const response =
        await fetch(
          variantUrl
        );

      if (!response.ok) {
        continue;
      }

      const arrayBuffer =
        await response.arrayBuffer();

      const buffer =
        Buffer.from(arrayBuffer);

      if (
        buffer.length >
        MAX_IMAGE_SIZE
      ) {
        continue;
      }

      return buffer.toString(
        "base64"
      );
    } catch (error) {
      console.error(
        "Flow Image Prepare Error:",
        error.message
      );
    }
  }

  return null;
};


// =====================================================
// Send WhatsApp Flow
// =====================================================

export const sendWhatsAppFlow =
  async (
    phoneNumber,
    {
      flowId,
      flowToken,
      bodyText,
      headerText = "Stay Lansdowne",
      footerText = "Stay Lansdowne",
      flowCta = "Select Hotel",
      screen = "HOTEL_SELECTION",
      hotels = [],
    }
  ) => {
    if (!phoneNumber) {
      throw new Error(
        "Phone number is required"
      );
    }

    if (!flowId) {
      throw new Error(
        "Flow ID is required"
      );
    }

    if (!Array.isArray(hotels)) {
      throw new Error(
        "Hotels must be an array"
      );
    }

    const flowHotels =
      await Promise.all(
        hotels
          .slice(0, 10)
          .map(
            async (hotel) => {
              const imageUrl =
                hotel.coverImage ||
                hotel.images?.[0] ||
                null;

              const image =
                await prepareFlowImage(
                  imageUrl
                );

              const option = {
                id:
                  String(
                    hotel.hotelId
                  ),

                title:
                  String(
                    hotel.hotelName
                  ).slice(
                    0,
                    30
                  ),

                description:
                  `From ₹${hotel.startingPrice}/night`,

                "alt-text":
                  String(
                    hotel.hotelName
                  ),
              };

              if (image) {
                option.image =
                  image;
              }

              return option;
            }
          )
      );

    return sendWhatsAppRequest({
      messaging_product:
        "whatsapp",

      recipient_type:
        "individual",

      to:
        phoneNumber,

      type:
        "interactive",

      interactive: {
        type: "flow",

        header: {
          type: "text",
          text:
            headerText,
        },

        body: {
          text:
            bodyText,
        },

        footer: {
          text:
            footerText,
        },

        action: {
          name: "flow",

          parameters: {
            flow_message_version:
              "3",

            flow_action:
              "navigate",

            flow_token:
              flowToken,

            flow_id:
              flowId,

            flow_cta:
              flowCta,

            flow_action_payload: {
              screen,

              data: {
                hotels:
                  flowHotels,
              },
            },
          },
        },
      },
    });
  };