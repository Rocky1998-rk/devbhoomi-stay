import mongoose from "mongoose";

const connectDatabase = async () => {
  try {
    const connection = await mongoose.connect(process.env.MONGODB_URI);

    console.log("✅ MongoDB Connected");
    console.log(`Host: ${connection.connection.host}`);
    console.log(`Database: ${connection.connection.name}`);

  } catch (error) {
    console.error("❌ MongoDB Connection Failed");
  console.error("Error Name:", error.name);
  console.error("Error Message:", error.message);
  console.error("Full Error:", error);

    process.exit(1);
  }
};

export default connectDatabase;