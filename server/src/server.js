import dotenv from "dotenv";

// ======================================
// Load Environment Variables FIRST
// ======================================

dotenv.config();


// ======================================
// Dynamic Imports
// ======================================

const { default: app } =
  await import("./app.js");

const {
  default: connectDatabase,
} = await import(
  "./config/database.js"
);


// ======================================
// PORT
// ======================================

const PORT =
  process.env.PORT || 5000;


// ======================================
// Start Application
// ======================================

const startServer = async () => {
  try {
    // =========================
    // Connect MongoDB
    // =========================

    await connectDatabase();

    // =========================
    // Start Express Server
    // =========================

    app.listen(
      PORT,
      () => {
        console.log(
          `🚀 Server is running on port ${PORT}`
        );
      }
    );

  } catch (error) {
    console.error(
      "❌ Failed to start server"
    );

    console.error(
      error.message
    );

    process.exit(1);
  }
};

startServer();