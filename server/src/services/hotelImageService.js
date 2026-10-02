import { v2 as cloudinary } from "cloudinary";

// ======================================
// Configure Cloudinary
// ======================================

const cloudName =
  String(
    process.env.CLOUDINARY_CLOUD_NAME || ""
  ).trim();

const apiKey =
  String(
    process.env.CLOUDINARY_API_KEY || ""
  ).trim();

const apiSecret =
  String(
    process.env.CLOUDINARY_API_SECRET || ""
  ).trim();

cloudinary.config({
  cloud_name: cloudName,
  api_key: apiKey,
  api_secret: apiSecret,
});

// ======================================
// Cloudinary Configuration Check
// ======================================

console.log(
  "Hotel Image Cloudinary Config:",
  {
    cloudName: cloudName
      ? "✅ loaded"
      : "❌ missing",

    apiKey: apiKey
      ? "✅ loaded"
      : "❌ missing",

    apiSecret: apiSecret
      ? "✅ loaded"
      : "❌ missing",
  }
);

// ======================================
// Upload Buffer To Cloudinary
// ======================================

const uploadBufferToCloudinary = (
  buffer,
  folder
) => {
  return new Promise(
    (resolve, reject) => {
      cloudinary.uploader.upload_stream(
        {
          folder,
          resource_type: "image",
        },

        (error, result) => {
          if (error) {
            return reject(error);
          }

          return resolve(result);
        }
      ).end(buffer);
    }
  );
};

// ======================================
// Upload Hotel Images
// ======================================

export const uploadHotelImages =
  async ({
    imageFiles = [],
    coverFile = null,
  }) => {
    // ======================================
    // Validate Cloudinary Config
    // ======================================

    if (
      !cloudName ||
      !apiKey ||
      !apiSecret
    ) {
      throw new Error(
        "Cloudinary credentials are not configured correctly"
      );
    }

    const folder =
      "stay-lansdowne/hotels";

    // ======================================
    // Upload Gallery Images
    // ======================================

    const imageResults =
      await Promise.all(
        imageFiles.map((file) =>
          uploadBufferToCloudinary(
            file.buffer,
            folder
          )
        )
      );

    // ======================================
    // Upload Cover Image
    // ======================================

    let coverResult = null;

    if (coverFile) {
      coverResult =
        await uploadBufferToCloudinary(
          coverFile.buffer,
          folder
        );
    }

    // ======================================
    // Return URLs
    // ======================================

    return {
      imageUrls:
        imageResults.map(
          (item) => item.secure_url
        ),

      coverImage:
        coverResult?.secure_url ||
        null,

      imageResults,

      coverResult,
    };
  };

export default uploadHotelImages;