// =========================
// Extract Incoming WhatsApp Message
// =========================

export const parseWhatsAppMessage = (payload) => {
  const message =
    payload?.entry?.[0]?.changes?.[0]?.value
      ?.messages?.[0];

  const contact =
    payload?.entry?.[0]?.changes?.[0]?.value
      ?.contacts?.[0];

  if (!message) {
    return null;
  }

  return {
    messageId: message.id || null,

    from: message.from || null,

    customerName:
      contact?.profile?.name || "Customer",

    timestamp:
      message.timestamp || null,

    type: message.type || null,

    text:
      message.type === "text"
        ? message.text?.body?.trim() || ""
        : "",
  };
};