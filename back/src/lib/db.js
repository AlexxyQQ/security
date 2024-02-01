import mongoose from "mongoose";

export const connectDB = async () => {
  var db_URI =
    process.env.NODE_ENV === "development"
      ? process.env.TEST_DATABASE
      : process.env.PRO_DATABASE;

  try {
    const conn = await mongoose.connect(db_URI);
    console.log(`MongoDB connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};
