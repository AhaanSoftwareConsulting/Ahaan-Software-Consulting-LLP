/**
 * Minimal SMTP email sender via nodemailer. Swap for SES/SendGrid/Postmark in
 * production, and ideally call it from a background job queue rather than
 * inline in the request so email latency never blocks the API response.
 */
const nodemailer = require('nodemailer');
const config = require('../config/config');

const transporter = nodemailer.createTransport({
  host: config.smtp.host,
  port: config.smtp.port,
  secure: config.smtp.port === 465,
  auth: config.smtp.user ? { user: config.smtp.user, pass: config.smtp.password } : undefined,
});

async function sendEmail(toEmail, subject, htmlBody) {
  await transporter.sendMail({
    from: config.smtp.fromEmail,
    to: toEmail,
    subject,
    html: htmlBody,
  });
}

async function sendPasswordResetEmail(toEmail, resetLink) {
  const subject = 'Reset your password';
  const html = `
    <p>We received a request to reset your password.</p>
    <p><a href="${resetLink}">Click here to reset your password</a></p>
    <p>This link expires in ${config.tokens.passwordResetExpireMinutes} minutes.
    If you didn't request this, you can ignore this email.</p>
  `;
  await sendEmail(toEmail, subject, html);
}

async function sendVerificationEmail(toEmail, verifyLink) {
  const subject = 'Verify your email address';
  const html = `
    <p>Thanks for signing up! Please verify your email address.</p>
    <p><a href="${verifyLink}">Click here to verify your email</a></p>
    <p>This link expires in ${config.tokens.emailVerificationExpireHours} hours.</p>
  `;
  await sendEmail(toEmail, subject, html);
}

module.exports = { sendEmail, sendPasswordResetEmail, sendVerificationEmail };
