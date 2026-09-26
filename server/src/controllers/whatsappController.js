import {parseWhatsAppMessage,} from "../services/whatsappService.js";



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

    // Meta webhook verification
    if (
      mode === "subscribe" &&
      token === verifyToken
    ) {
      return res.status(200).send(challenge);
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
// WhatsApp Incoming Webhook
// =========================

export const receiveWhatsAppWebhook = async (
  req,
  res
) => {
  try {
    console.log(
      "WhatsApp Webhook Received:",
      JSON.stringify(req.body, null, 2)
    );

    const message =
      parseWhatsAppMessage(req.body);

    if (!message) {
      return res.sendStatus(200);
    }

    console.log(
      "Parsed WhatsApp Message:",
      message
    );

    return res.sendStatus(200);
  } catch (error) {
    console.error(
      "WhatsApp Webhook Error:",
      error.message
    );

    return res.sendStatus(500);
  }
};