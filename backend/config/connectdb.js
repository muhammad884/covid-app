import mongoose from "mongoose";

const connectDB = async (DATABASE_URL) => {
  try {
    const DB_OPTION = {
      dbName: "covid",
    };
    await mongoose.connect(DATABASE_URL, DB_OPTION);
    console.log("db connect");
  } catch (error) {
    console.log(error);
  }
};

export default connectDB;
