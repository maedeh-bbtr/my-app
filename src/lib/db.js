import mongoose from "mongoose";
require("dotenv").config();

export async function connect() {
  console.log("connected to database ✅");
  return mongoose.connect(process.env.MONGO_URI);
}
