const API_URL = "http://localhost:5000/api/owner/bookings";

// Apna CURRENT owner token yahan locally paste karo.
// Is token ko mujhe mat bhejna.
const OWNER_TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2YTc4NzA0OGM2NzVmNjI4MWFlMmRiOTYiLCJyb2xlIjoib3duZXIiLCJpYXQiOjE3OTAzMTc5NDQsImV4cCI6MTc5MDkyMjc0NH0.xEvC8O4_6c13nH6rZukoI8HfBN7WpGEdGaCoHd7vP8M";

const bookingA = {
  roomId: "6a806a7d61cef8b00bdf8b4f",
  guestName: "Concurrent Real Test A",
  guestPhone: "9876543230",
  guestEmail: "concurrent-real-a@example.com",
  checkIn: "2027-02-15",
  checkOut: "2027-02-17",
};

const bookingB = {
  roomId: "6a806a7d61cef8b00bdf8b4f",
  guestName: "Concurrent Real Test B",
  guestPhone: "9876543231",
  guestEmail: "concurrent-real-b@example.com",
  checkIn: "2027-02-15",
  checkOut: "2027-02-17",
};

const createBooking = async (booking) => {
  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${OWNER_TOKEN}`,
      },
      body: JSON.stringify(booking),
    });

    const data = await response.json();

    return {
      httpStatus: response.status,
      data,
    };
  } catch (error) {
    return {
      httpStatus: null,
      data: {
        success: false,
        message: error.message,
      },
    };
  }
};

const runTest = async () => {
  console.log("Starting concurrent booking test...\n");

  const [resultA, resultB] = await Promise.all([
    createBooking(bookingA),
    createBooking(bookingB),
  ]);

  console.log("========== REQUEST A ==========");
  console.log(JSON.stringify(resultA, null, 2));

  console.log("\n========== REQUEST B ==========");
  console.log(JSON.stringify(resultB, null, 2));

  console.log("\n========== FINAL RESULT ==========");

  const successCount = [
    resultA,
    resultB,
  ].filter((result) => result.data?.success === true).length;

  console.log(
    `Successful bookings: ${successCount}`
  );

  if (successCount === 1) {
    console.log(
      "✅ PASS: Only one booking was created."
    );
  } else if (successCount === 2) {
    console.log(
      "❌ FAIL: Both bookings were created."
    );
  } else {
    console.log(
      "⚠️ Neither request created a booking."
    );
  }
};

runTest();