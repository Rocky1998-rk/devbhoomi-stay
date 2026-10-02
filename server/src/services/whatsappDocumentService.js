import whatsappConfig from "../config/whatsappConfig.js";

const getGraphUrl = (path) => {
  return `https://graph.facebook.com/${whatsappConfig.apiVersion}/${path}`;
};

// ==========================================
// Upload PDF to WhatsApp
// ==========================================

export const uploadWhatsAppPDF =
  async ({
    pdfBuffer,
    fileName,
  }) => {
    if (
      !whatsappConfig.accessToken ||
      !whatsappConfig.phoneNumberId
    ) {
      throw new Error(
        "WhatsApp configuration is incomplete"
      );
    }

    const formData =
      new FormData();

    const pdfBlob =
      new Blob(
        [pdfBuffer],
        {
          type:
            "application/pdf",
        }
      );

    formData.append(
      "file",
      pdfBlob,
      fileName
    );

    formData.append(
      "type",
      "application/pdf"
    );

    formData.append(
      "messaging_product",
      "whatsapp"
    );

    const response =
      await fetch(
        getGraphUrl(
          `${whatsappConfig.phoneNumberId}/media`
        ),
        {
          method: "POST",

          headers: {
            Authorization:
              `Bearer ${whatsappConfig.accessToken}`,
          },

          body: formData,
        }
      );

    const data =
      await response.json();

    if (!response.ok) {
      console.error(
        "WhatsApp PDF Upload Error:",
        data
      );

      throw new Error(
        data?.error?.message ||
        "Unable to upload PDF to WhatsApp"
      );
    }

    return data.id;
  };

// ==========================================
// Send PDF Document
// ==========================================

export const sendWhatsAppPDF =
  async ({
    phoneNumber,
    mediaId,
    fileName,
    caption,
  }) => {
    const response =
      await fetch(
        getGraphUrl(
          `${whatsappConfig.phoneNumberId}/messages`
        ),
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

            type: "document",

            document: {
              id: mediaId,
              filename: fileName,

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
        "WhatsApp PDF Send Error:",
        data
      );

      throw new Error(
        data?.error?.message ||
        "Unable to send PDF on WhatsApp"
      );
    }

    return data;
  };