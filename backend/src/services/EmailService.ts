import nodemailer from "nodemailer";
import jwt from "jsonwebtoken";
import config from "../config/config";
import logger from "../utils/logger";
import { emailTransporter, EMAIL_FROM, EMAIL_FROM_NAME } from "../config/email";
import User from "../models/User";
import crypto from "crypto";
import { Document } from "mongoose";

class EmailService {
  private transporter: nodemailer.Transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      host: "smtp.office365.com",
      port: 587,
      secure: false,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
      tls: {
        ciphers: "SSLv3",
        rejectUnauthorized: false,
      },
    });
  }

  async sendVerificationEmail(
    email: string,
    name: string,
    token: string
  ): Promise<void> {
    try {
      const frontendUrl =
        process.env.NODE_ENV === "production"
          ? "https://umurava-platform.vercel.app"
          : config.frontendUrl;

      const verificationUrl = `${frontendUrl}/verify-email/${token}`;

      await emailTransporter.sendMail({
        from: `"${EMAIL_FROM_NAME}" <${EMAIL_FROM}>`,
        to: email,
        subject: "Please Verify Your Email",
        html: `
                    <h1>Hello ${name},</h1>
                    <p>Please verify your email address by clicking the link below:</p>
                    <a href="${verificationUrl}" style="padding: 10px 20px; background-color: #007bff; color: white; text-decoration: none; border-radius: 5px;">Verify Email</a>
                    <p>This link will expire in 24 hours.</p>
                    <p>If the button doesn't work, copy and paste this URL into your browser:</p>
                    <p>${verificationUrl}</p>
                    <p>If you did not create an account, please ignore this email.</p>
                `,
      });

      logger.info(`Verification email sent to ${email}`);
    } catch (error) {
      logger.error("Error sending verification email:", error);
      throw new Error("Failed to send verification email");
    }
  }
}

export default new EmailService();
