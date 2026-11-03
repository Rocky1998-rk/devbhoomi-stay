import PDFDocument from "pdfkit";
import Booking from "../models/Booking.js";
import Hotel from "../models/Hotel.js";

const formatDate = (date) => {
  return new Date(date).toLocaleDateString(
    "en-IN",
    {
      day: "2-digit",
      month: "short",
      year: "numeric",
    }
  );
};

export const generateBookingVoucher = async (
  bookingId
) => {
  const booking =
    await Booking.findById(
      bookingId
    )
      .populate(
        "room",
        "roomNumber"
      )
      .populate(
        "roomCategory",
        "name"
      );

  if (!booking) {
    throw new Error(
      "Booking not found"
    );
  }

  const hotel =
    await Hotel.findById(
      booking.hotel
    );

  if (!hotel) {
    throw new Error(
      "Hotel not found"
    );
  }

  const voucherNumber =
    `STL-${String(
      booking._id
    )
      .slice(-8)
      .toUpperCase()}`;

  const fileName =
    `Voucher_${voucherNumber}.pdf`;

  return new Promise(
    (resolve, reject) => {
      try {
        const doc =
          new PDFDocument({
            size: "A4",
            margin: 45,
          });

        const chunks = [];

        doc.on(
          "data",
          (chunk) => {
            chunks.push(chunk);
          }
        );

        doc.on(
          "end",
          () => {
            const pdfBuffer =
              Buffer.concat(chunks);

            resolve({
              pdfBuffer,
              fileName,
              voucherNumber,
              booking,
              hotel,
            });
          }
        );

        doc.on(
          "error",
          reject
        );

        // ======================================
        // HEADER
        // ======================================

        doc
          .fontSize(24)
          .font("Helvetica-Bold")
          .text(
            "STAY LANSDOWNE",
            {
              align: "center",
            }
          );

        doc
          .moveDown(0.3)
          .fontSize(17)
          .font("Helvetica-Bold")
          .text(
            "BOOKING VOUCHER",
            {
              align: "center",
            }
          );

        doc.moveDown();

        doc
          .fontSize(10)
          .font("Helvetica")
          .text(
            `Voucher No: ${voucherNumber}`,
            {
              align: "center",
            }
          );

        doc.moveDown(1.5);

        // ======================================
        // HOTEL INFORMATION
        // ======================================

        doc
          .fontSize(14)
          .font("Helvetica-Bold")
          .text(
            "Hotel Details"
          );

        doc.moveDown(0.4);

        doc
          .fontSize(11)
          .font("Helvetica")
          .text(
            `Hotel: ${
              hotel.hotelName ||
              "Stay Lansdowne"
            }`
          );

        doc.text(
          `Location: ${
            hotel.city || ""
          }, ${
            hotel.state || ""
          }`
        );

        if (hotel.phone) {
          doc.text(
            `Hotel Contact: ${hotel.phone}`
          );
        }

        doc.moveDown(1);

        // ======================================
        // GUEST DETAILS
        // ======================================

        doc
          .fontSize(14)
          .font("Helvetica-Bold")
          .text(
            "Guest Details"
          );

        doc.moveDown(0.4);

        doc
          .fontSize(11)
          .font("Helvetica")
          .text(
            `Guest Name: ${booking.guestName}`
          );

        doc.text(
          `Contact: ${booking.guestPhone}`
        );

        if (booking.guestEmail) {
          doc.text(
            `Email: ${booking.guestEmail}`
          );
        }

        doc.moveDown(1);

        // ======================================
        // STAY DETAILS
        // ======================================

        doc
          .fontSize(14)
          .font("Helvetica-Bold")
          .text(
            "Stay Details"
          );

        doc.moveDown(0.4);

        doc
          .fontSize(11)
          .font("Helvetica")
          .text(
            `Booking ID: ${booking._id}`
          );

        doc.text(
          `Room Number: ${
            booking.room?.roomNumber ||
            "N/A"
          }`
        );

        doc.text(
          `Room Category: ${
            booking.roomCategory?.name ||
            "N/A"
          }`
        );

        doc.text(
          `Check-in: ${formatDate(
            booking.checkIn
          )}`
        );

        doc.text(
          `Check-out: ${formatDate(
            booking.checkOut
          )}`
        );

        doc.text(
          `Total Nights: ${
            booking.totalNights
          }`
        );

        doc.text(
          `Booking Status: ${
            booking.status
          }`
        );

        doc.moveDown(1);

        // ======================================
        // PAYMENT DETAILS
        // ======================================

        doc
          .fontSize(14)
          .font("Helvetica-Bold")
          .text(
            "Payment Details"
          );

        doc.moveDown(0.4);

        doc
          .fontSize(11)
          .font("Helvetica")
          .text(
            `Price Per Night: Rs. ${booking.pricePerNight}`
          );

        doc.text(
          `Total Room Amount: Rs. ${booking.totalRoomPrice}`
        );

        doc.moveDown(0.5);

        doc
          .fontSize(13)
          .font("Helvetica-Bold")
          .text(
            "Booking Confirmed"
          );

        doc.moveDown(1.5);

        // ======================================
        // PRICING BREAKDOWN
        // ======================================

        if (
          Array.isArray(
            booking.pricingBreakdown
          ) &&
          booking.pricingBreakdown.length
        ) {
          doc
            .fontSize(14)
            .font("Helvetica-Bold")
            .text(
              "Pricing Breakdown"
            );

          doc.moveDown(0.4);

          booking.pricingBreakdown.forEach(
            (item) => {
              doc
                .fontSize(10)
                .font("Helvetica")
                .text(
                  `${formatDate(
                    item.date
                  )} - Rs. ${
                    item.pricePerNight
                  } / night`
                );
            }
          );

          doc.moveDown();
        }

        // ======================================
        // FOOTER
        // ======================================

        doc
          .fontSize(10)
          .font("Helvetica")
          .text(
            "Thank you for choosing Stay Lansdowne.",
            {
              align: "center",
            }
          );

        doc
          .moveDown(0.3)
          .text(
            "Please carry a copy of this voucher during check-in.",
            {
              align: "center",
            }
          );

        doc.end();

      } catch (error) {
        reject(error);
      }
    }
  );
};

export default generateBookingVoucher;