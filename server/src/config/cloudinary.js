import { v2 as cloudinary } from "cloudinary";

console.log(
  "Cloudinary config check:",
  {
    cloudName:
      process.env.CLOUDINARY_CLOUD_NAME
        ? "✅ loaded"
        : "❌ missing",

    apiKey:
      process.env.CLOUDINARY_API_KEY
        ? "✅ loaded"
        : "❌ missing",

    apiSecret:
      process.env.CLOUDINARY_API_SECRET
        ? "✅ loaded"
        : "❌ missing",
  }
);

export default cloudinary;