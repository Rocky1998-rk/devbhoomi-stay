import express from "express";

import {
  verifyWhatsAppWebhook,
  receiveWhatsAppWebhook,
} from "../controllers/whatsappController.js";

const router = express.Router();

// =========================
// WhatsApp Webhook Verification
// =========================

router.get(
  "/webhook",
  verifyWhatsAppWebhook
);

// =========================
// WhatsApp Incoming Webhook
// =========================

router.post(
  "/webhook",
  receiveWhatsAppWebhook
);

export default router;