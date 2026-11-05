import {
  getOwnerHotel,
  createOwnerHotel,
  updateOwnerHotel,
} from "../services/ownerHotelService.js";

import Hotel from "../models/Hotel.js";

import {
  uploadHotelImages,
} from "../services/hotelImageService.js";

// =========================
// Get Owner's Hotel
// =========================

// =========================
// Create Owner's Hotel
// =========================

export const createMyHotel = async (req, res) => {
  try {
    const ownerId = req.user.userId;

    const hotel = await createOwnerHotel(ownerId, req.body);

    return res.status(201).json({
      success: true,
      message: "Hotel created successfully",
      data: hotel,
    });
  } catch (error) {
    console.error("Create Owner Hotel Error:", error.message);

    return res.status(400).json({
      success: false,
      message: error.message || "Failed to create hotel",
    });
  }
};

export const getMyHotel =
  async (req, res) => {
    try {
      const ownerId =
        req.user.userId;

      const hotel =
        await getOwnerHotel(
          ownerId
        );

      return res.status(200).json({
        success: true,
        message:
          "Hotel fetched successfully",
        data: hotel,
      });

    } catch (error) {
      console.error(
        "Get Owner Hotel Error:",
        error.message
      );

      return res.status(404).json({
        success: false,
        message:
          error.message ||
          "Hotel not found",
      });
    }
  };

// =========================
// Update Owner's Hotel
// =========================

export const updateMyHotel =
  async (req, res) => {
    try {
      const ownerId =
        req.user.userId;

      const hotel =
        await updateOwnerHotel(
          ownerId,
          req.body
        );

      return res.status(200).json({
        success: true,
        message:
          "Hotel updated successfully",
        data: hotel,
      });

    } catch (error) {
      console.error(
        "Update Owner Hotel Error:",
        error.message
      );

      return res.status(400).json({
        success: false,
        message:
          error.message ||
          "Failed to update hotel",
      });
    }
  };

// =========================
// Upload Hotel Images
// =========================

export const uploadHotelImagesController =
  async (req, res) => {
    try {
      const ownerId =
        req.user.userId;

      const {
        hotelId,
      } = req.params;

      // ======================================
      // FIND OWNER'S HOTEL
      // ======================================

      const hotel =
        await Hotel.findOne({
          _id: hotelId,
          owner: ownerId,
        });

      if (!hotel) {
        return res.status(404).json({
          success: false,
          message:
            "Hotel not found or you are not authorized to update this hotel",
        });
      }

      // ======================================
      // GET FILES
      // ======================================

      const imageFiles =
        req.files?.images || [];

      const coverFile =
        req.files?.coverImage?.[0] ||
        null;

      // ======================================
      // VALIDATE FILES
      // ======================================

      if (
        imageFiles.length === 0 &&
        !coverFile
      ) {
        return res.status(400).json({
          success: false,
          message:
            "Please upload at least one hotel image",
        });
      }

      // ======================================
      // UPLOAD TO CLOUDINARY
      // ======================================

      const uploadResult =
        await uploadHotelImages({
          imageFiles,
          coverFile,
        });

      // ======================================
      // SAVE IMAGE URLS
      // ======================================

      if (
        uploadResult.imageUrls.length
      ) {
        hotel.images = [
          ...(hotel.images || []),
          ...uploadResult.imageUrls,
        ];
      }

      // ======================================
      // SET COVER IMAGE
      // ======================================

      if (
        uploadResult.coverImage
      ) {
        hotel.coverImage =
          uploadResult.coverImage;

      } else if (
        !hotel.coverImage &&
        uploadResult.imageUrls.length
      ) {
        // First uploaded image becomes
        // cover image automatically.
        hotel.coverImage =
          uploadResult.imageUrls[0];
      }

      await hotel.save();

      // ======================================
      // RESPONSE
      // ======================================

      return res.status(200).json({
        success: true,

        message:
          "Hotel images uploaded successfully",

        data: {
          hotelId:
            hotel._id,

          hotelName:
            hotel.hotelName,

          images:
            hotel.images,

          coverImage:
            hotel.coverImage,

          uploadedImages:
            uploadResult.imageUrls,

          uploadedCoverImage:
            uploadResult.coverImage,
        },
      });

    } catch (error) {
      console.error(
        "Hotel Image Upload Error:",
        error
      );

      return res.status(500).json({
        success: false,
        message:
          error.message ||
          "Failed to upload hotel images",
      });
    }
  };