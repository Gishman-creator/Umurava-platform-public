import nodemailer from 'nodemailer';
import jwt from 'jsonwebtoken';
import config from '../config/config';
import logger from '../utils/logger';

class EmailService {
    private transporter: nodemailer.Transporter;

    constructor() {
        this.transporter = nodemailer.createTransport({
            host: "smtp.office365.com",
            port: 587,
            secure: false,
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS
            },
            tls: {
                ciphers: 'SSLv3',
                rejectUnauthorized: false
            }
        });
    }

    async sendVerificationEmail(email: string, name: string, userId: string): Promise<void> {
        const token = jwt.sign(
            { userId },
            config.jwtSecret,
            { expiresIn: '24h' }
        );

        const verificationUrl = `${process.env.FRONTEND_URL}/verify-email/${token}`;

        const mailOptions = {
            from: `"Umurava Platform" <${process.env.EMAIL_USER}>`,
            to: email,
            subject: 'Verify Your Email - Umurava Platform',
            html: `
                <h1>Welcome to Umurava, ${name}!</h1>
                <p>Please verify your email by clicking the link below:</p>
                <a href="${verificationUrl}" style="padding: 10px 20px; background-color: #007bff; color: white; text-decoration: none; border-radius: 5px;">Verify Email</a>
                <p>This link expires in 24 hours.</p>
                <p>If the button doesn't work, copy and paste this URL into your browser:</p>
                <p>${verificationUrl}</p>
            `
        };

        try {
            await this.transporter.verify();
            const info = await this.transporter.sendMail(mailOptions);
            logger.info(`Verification email sent to ${email}: ${info.messageId}`);
        } catch (error: any) {
            logger.error('Error sending verification email:', error);
            throw new Error(`Failed to send verification email: ${error.message}`);
        }
    }
}

export default new EmailService(); 