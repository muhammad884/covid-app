import dotenv from "dotenv";
import nodemailer from "nodemailer";
dotenv.config();

let transporter = nodemailer.createTransport({
  //host: process.env.EMAIL_HOST,
  port: process.env.EMAIL_PORT,
  secure: false,
  service: "gmail",
  auth: {
    user: process.env.EMAIL_FROM,
    pass: process.env.EMAIL_PASSWORD,
  },
});

export default transporter;
