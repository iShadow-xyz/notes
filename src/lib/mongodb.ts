import mongoose from "mongoose";

const connectDB = async () => {
  try {
    if (mongoose.connection.readyState === 0) {
      await mongoose.connect(
        process.env.MONGODB_URI || "mongodb://localhost:27017/noteapp"
      );
      console.log("Connected to MongoDB");
    }
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
};

export default connectDB;
