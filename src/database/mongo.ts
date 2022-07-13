import mongoose  from "mongoose";
import dotenv from "dotenv";

dotenv.config();

mongoose.Promise = global.Promise
const mongoConnect = async() => {
  try {
    console.log("Connected To MongoDB...");
    await mongoose.connect(process.env.DATABASE as string);
    console.log("MongoDB Was Connected Successfully !");
  } catch (error) {
    console.log("Error On Connection: ", error);
  }
};

export default mongoConnect;
