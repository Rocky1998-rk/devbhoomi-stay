import "dotenv/config";

const whatsappConfig = {
  verifyToken: process.env.WHATSAPP_VERIFY_TOKEN?.trim() || "",
  accessToken: process.env.WHATSAPP_ACCESS_TOKEN?.trim() || "",
  phoneNumberId:
    process.env.WHATSAPP_PHONE_NUMBER_ID?.trim() || "",
  businessAccountId:
    process.env.WHATSAPP_BUSINESS_ACCOUNT_ID?.trim() || "",
  apiVersion:
    process.env.WHATSAPP_API_VERSION?.trim() || "",
};

export default whatsappConfig;