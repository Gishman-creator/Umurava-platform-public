import nodemailer from 'nodemailer';
import logger from '../utils/logger';

export const emailTransporter = nodemailer.createTransport({
  host: 'smtp.mailersend.net',
  port: 587,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

export const EMAIL_FROM = process.env.EMAIL_USER;
export const EMAIL_FROM_NAME = 'Umurava Platform';

// Test connection on startup
emailTransporter.verify((error) => {
  if (error) {
    logger.error('SMTP Connection Error:', error);
  } else {
    logger.info('SMTP Connection: Ready to send mail');
  }
});

export default emailTransporter; 