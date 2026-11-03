import crypto from "crypto";

import WhatsAppSession from "../models/WhatsAppSession.js";
import WhatsAppPayment from "../models/WhatsAppPayment.js";
import Hotel from "../models/Hotel.js";

import {createBooking,
  updateBookingStatus,
} from "../services/bookingService.js";

import {
  sendWhatsAppText,
  sendWhatsAppButtons,
} from "../services/whatsappService.js";

export const handleRazorpayWebhook =
  async (req, res) => {
    try {
      console.log(
        "======================================"
      );

      console.log(
        "🔔 RAZORPAY WEBHOOK RECEIVED"
      );

      console.log(
        "======================================"
      );

      // ======================================
      // VERIFY RAZORPAY SIGNATURE
      // ======================================

      const signature =
        req.headers[
          "x-razorpay-signature"
        ];

      if (!signature) {
        console.error(
          "❌ Razorpay signature missing"
        );

        return res
          .status(400)
          .json({
            success: false,
            message:
              "Webhook signature missing",
          });
      }

      if (!req.rawBody) {
        console.error(
          "❌ Raw webhook body missing"
        );

        return res
          .status(400)
          .json({
            success: false,
            message:
              "Raw webhook body missing",
          });
      }

      const webhookSecret =
        process.env
          .RAZORPAY_WEBHOOK_SECRET;

      if (!webhookSecret) {
        console.error(
          "❌ RAZORPAY_WEBHOOK_SECRET is not configured"
        );

        return res
          .status(500)
          .json({
            success: false,
            message:
              "Webhook secret not configured",
          });
      }

      const expectedSignature =
        crypto
          .createHmac(
            "sha256",
            webhookSecret
          )
          .update(req.rawBody)
          .digest("hex");

      const receivedBuffer =
        Buffer.from(
          signature,
          "utf8"
        );

      const expectedBuffer =
        Buffer.from(
          expectedSignature,
          "utf8"
        );

      if (
        receivedBuffer.length !==
          expectedBuffer.length ||
        !crypto.timingSafeEqual(
          receivedBuffer,
          expectedBuffer
        )
      ) {
        console.error(
          "❌ Invalid Razorpay webhook signature"
        );

        return res
          .status(401)
          .json({
            success: false,
            message:
              "Invalid webhook signature",
          });
      }

      // ======================================
      // SIGNATURE VERIFIED
      // ======================================

      const event =
        req.body?.event;

      console.log(
        "✅ Razorpay signature verified"
      );

      console.log(
        "📌 Event:",
        event
      );

      // ======================================
      // PAYMENT LINK PAID
      // ======================================

      if (
        event ===
        "payment_link.paid"
      ) {
        const paymentLink =
          req.body?.payload
            ?.payment_link?.entity;

        const payment =
          req.body?.payload
            ?.payment?.entity;

        console.log(
          "✅ PAYMENT LINK PAID"
        );

        console.log(
          "Payment Link ID:",
          paymentLink?.id
        );

        console.log(
          "Reference ID:",
          paymentLink?.reference_id
        );

        console.log(
          "Payment ID:",
          payment?.id
        );

        console.log(
          "Amount:",
          payment?.amount
            ? payment.amount / 100
            : null
        );

        console.log(
          "Payment Status:",
          payment?.status
        );

        const paymentLinkId =
          paymentLink?.id;

        const paymentId =
          payment?.id;

        // ======================================
        // VALIDATE PAYMENT LINK ID
        // ======================================

        if (!paymentLinkId) {
          console.error(
            "❌ Payment Link ID missing"
          );

          return res
            .status(200)
            .json({
              success: true,
              received: true,
              message:
                "Payment received but payment link ID missing",
            });
        }

        // ======================================
        // FIND PERMANENT PAYMENT
        // ======================================

        console.log(
          "🔎 Searching permanent WhatsApp payment mapping:",
          paymentLinkId
        );

        const whatsappPayment =
          await WhatsAppPayment.findOne(
            {
              paymentLinkId,
            }
          );

        if (!whatsappPayment) {
          console.error(
            "❌ WhatsApp payment mapping not found:",
            paymentLinkId
          );

          return res
            .status(200)
            .json({
              success: true,
              received: true,
              message:
                "Payment received but mapping not found",
            });
        }

        console.log(
          "✅ WhatsApp payment mapping found"
        );

        // ======================================
        // IDEMPOTENCY
        // ======================================

        if (
          whatsappPayment.status ===
          "success"
        ) {
          console.log(
            "ℹ️ Payment already processed:",
            paymentLinkId
          );

          return res
            .status(200)
            .json({
              success: true,
              received: true,
              message:
                "Payment already processed",
            });
        }

        // ======================================
        // GET SESSION SNAPSHOT
        // ======================================

        const snapshot =
          whatsappPayment
            .sessionSnapshot ||
          {};

        const selectedHotel =
          snapshot.selectedHotel;

        const selectedRoom =
          snapshot.selectedRoom;

        const guestName =
          snapshot.guestName;

        const guestPhone =
          snapshot.contactNumber ||
          whatsappPayment
            .customerContact;

        const checkIn =
          snapshot.checkIn;

        const checkOut =
          snapshot.checkOut;

        // ======================================
        // VALIDATE BOOKING DATA
        // ======================================

        if (
          !selectedHotel ||
          !selectedRoom ||
          !guestName ||
          !guestPhone ||
          !checkIn ||
          !checkOut
        ) {
          console.error(
            "❌ Required WhatsApp booking data missing"
          );

          await WhatsAppPayment.findByIdAndUpdate(
            whatsappPayment._id,
            {
              status: "success",
              transactionId:
                paymentId || null,
              paidAt: new Date(),
            }
          );

          await sendWhatsAppText(
            whatsappPayment.phoneNumber,
            `✅ Payment Successful!

💰 ₹${whatsappPayment.amount} successfully paid.

🧾 Transaction ID:
${paymentId || "N/A"}

Payment receive ho gayi hai, lekin booking details verify karne ki zarurat hai.`
          );

          return res
            .status(200)
            .json({
              success: true,
              received: true,
              message:
                "Payment received but booking data incomplete",
            });
        }

        // ======================================
        // CREATE ACTUAL BOOKING
        // ======================================

        console.log(
          "🏨 Creating actual booking..."
        );

        let booking;

        try {
          booking =
            await createBooking(
              null,
              {
                hotelId:
                  selectedHotel,

                roomId:
                  selectedRoom,

                guestName,

                guestPhone,

                checkIn,

                checkOut,
              }
            );

          console.log(
            "✅ Actual booking created:",
            booking._id
          );
        } catch (bookingError) {
          console.error(
            "❌ Booking creation failed:",
            bookingError.message
          );

          // Payment was successful,
          // but booking could not be created.
          await WhatsAppPayment.findByIdAndUpdate(
            whatsappPayment._id,
            {
              status: "success",

              transactionId:
                paymentId || null,

              paidAt:
                new Date(),
            }
          );

          await sendWhatsAppText(
            whatsappPayment.phoneNumber,

            `✅ Payment Successful!

💰 ₹${whatsappPayment.amount} successfully paid.

🧾 Transaction ID:
${paymentId || "N/A"}

⚠️ Payment receive ho gayi hai, lekin booking confirm nahi ho paayi.

Our team will verify your booking shortly.`
          );

          return res
            .status(200)
            .json({
              success: true,
              received: true,
              message:
                "Payment received but booking creation failed",
            });
        }

        // ======================================
        // CONFIRM BOOKING
        // ======================================

        const bookingHotel =
          await Hotel.findById(
            booking.hotel
          );

        if (
          !bookingHotel ||
          !bookingHotel.owner
        ) {
          console.error(
            "❌ Booking hotel owner not found"
          );

          return res
            .status(200)
            .json({
              success: true,
              received: true,
              message:
                "Booking created but owner not found",
            });
        }

        const confirmedBooking =
          await updateBookingStatus(
            bookingHotel.owner,
            booking._id,
            "confirmed"
          );

        console.log(
          "✅ Booking confirmed:",
          confirmedBooking._id
        );

        // ======================================
        // UPDATE PERMANENT PAYMENT
        // ======================================

        await WhatsAppPayment.findByIdAndUpdate(
          whatsappPayment._id,
          {
            status: "success",

            transactionId:
              paymentId || null,

            bookingId:
              confirmedBooking._id,

            paidAt:
              new Date(),
          }
        );

        console.log(
          "✅ WhatsApp payment updated with booking ID"
        );

        // ======================================
        // UPDATE ACTIVE SESSION
        // ======================================

        const whatsappSession =
          await WhatsAppSession.findOne(
            {
              phoneNumber:
                whatsappPayment.phoneNumber,
            }
          );

        if (whatsappSession) {
          await WhatsAppSession.findByIdAndUpdate(
            whatsappSession._id,
            {
              paymentStatus:
                "success",

              transactionId:
                paymentId || null,

              bookingId:
                confirmedBooking._id,

              currentStep:
                "booking_confirmed",

              lastMessageAt:
                new Date(),
            }
          );

          console.log(
            "✅ Active WhatsApp session updated"
          );
        } else {
          console.log(
            "ℹ️ WhatsApp session expired"
          );
        }

     // ======================================
// SEND BOOKING CONFIRMATION + VOUCHER BUTTON (Screen 22)
// ======================================

const isHindi =
  snapshot.language === "hindi";

const bookingCode = `STL${String(
  confirmedBooking._id
)
  .slice(-6)
  .toUpperCase()}`;

const bookingConfirmationMessage =
  isHindi
    ? `🎉 *Booking Confirmed!*\n\nआपकी बुकिंग सफलतापूर्वक दर्ज हो गई है।\n\n*Booking ID*\n*${bookingCode}*\n\nWe have sent the details to your WhatsApp.`
    : `🎉 *Booking Confirmed!*\n\nYour booking has been confirmed successfully.\n\n*Booking ID*\n*${bookingCode}*\n\nWe have sent the details to your WhatsApp.`;

const confirmationBannerUrl =
  process.env.WHATSAPP_BOOKING_CONFIRMED_IMAGE_URL?.trim() ||
  "https://res.cloudinary.com/dszadvuz6/image/upload/v1792846187/stay_lansdowne/booking_confirmed_banner.jpg";

await sendWhatsAppButtons(
  whatsappPayment.phoneNumber,
  bookingConfirmationMessage,
  [
    {
      id: "DOWNLOAD_VOUCHER",
      title: "📄 Download Voucher",
    },
    {
      id: "MAIN_MENU",
      title: "🏠 Main Menu",
    },
  ],
  confirmationBannerUrl
    ? { headerImageUrl: confirmationBannerUrl }
    : {}
);

console.log(
  "📤 Booking confirmation + voucher button sent to WhatsApp"
);

        return res.status(200).json({
          success: true,
          received: true,
          bookingId:
            confirmedBooking._id,
          message:
            "Payment, booking and voucher action processed successfully",
        });
      }

      // ======================================
      // OTHER RAZORPAY EVENTS
      // ======================================

      return res.status(200).json({
        success: true,
        received: true,
        message: "Webhook received",
      });

    } catch (error) {
      console.error(
        "❌ Razorpay Webhook Error:",
        error
      );

      return res.status(500).json({
        success: false,
        message:
          "Webhook processing failed",
      });
    }
  };