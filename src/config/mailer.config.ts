import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

const transporter = nodemailer.createTransport({
  host: String(process.env.NODEMAILER_HOST),
  port: Number(process.env.NODEMAILER_PORT),
  auth: {
    user: String(process.env.NODEMAILER_USER),
    pass: String(process.env.NODEMAILER_PASSWORD),
  },
});

export default transporter;
