import dotenv from "dotenv";
import app from "./app.js";
import connectDatabase from "./config/database.js";

// Load Environment Variables
dotenv.config();

const PORT = process.env.PORT || 5000;

// Start Application
const startServer = async () => {
  try {
    // Connect MongoDB
    await connectDatabase();

    // Start Express Server
    app.listen(PORT, () => {
      console.log(`🚀 Server is running on port ${PORT}`);
    });

  } catch (error) {
    console.error("❌ Failed to start server");
    console.error(error.message);

    process.exit(1);
  }
};

startServer();