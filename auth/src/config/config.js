require('dotenv').config();

module.exports = {
  app: {
    name: process.env.APP_NAME || 'auth-service',
    env: process.env.NODE_ENV || 'development',
    debug: (process.env.DEBUG || 'true') === 'true',
    port: parseInt(process.env.PORT || '8000', 10),
  },

  db: {
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT || '3306', 10),
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || 'root',
    database: process.env.DB_NAME || 'auth_db',
  },

  jwt: {
    secret: process.env.JWT_SECRET_KEY || 'CHANGE_ME_IN_PRODUCTION',
    accessExpiresMinutes: parseInt(process.env.ACCESS_TOKEN_EXPIRE_MINUTES || '15', 10),
    refreshExpiresDays: parseInt(process.env.REFRESH_TOKEN_EXPIRE_DAYS || '7', 10),
  },

  loginPolicy: {
    maxFailedAttempts: parseInt(process.env.MAX_FAILED_LOGIN_ATTEMPTS || '5', 10),
    lockoutMinutes: parseInt(process.env.ACCOUNT_LOCKOUT_MINUTES || '15', 10),
    minPasswordLength: parseInt(process.env.MIN_PASSWORD_LENGTH || '8', 10),
  },

  tokens: {
    passwordResetExpireMinutes: parseInt(process.env.PASSWORD_RESET_TOKEN_EXPIRE_MINUTES || '30', 10),
    emailVerificationExpireHours: parseInt(process.env.EMAIL_VERIFICATION_TOKEN_EXPIRE_HOURS || '24', 10),
  },

  smtp: {
    host: process.env.SMTP_HOST || 'smtp.mailtrap.io',
    port: parseInt(process.env.SMTP_PORT || '587', 10),
    user: process.env.SMTP_USER || '',
    password: process.env.SMTP_PASSWORD || '',
    fromEmail: process.env.SMTP_FROM_EMAIL || 'no-reply@example.com',
    secure: (process.env.SMTP_USE_TLS || 'true') === 'true',
  },

  frontend: {
    resetPasswordUrl: process.env.FRONTEND_RESET_PASSWORD_URL || 'http://localhost:3000/reset-password',
    verifyEmailUrl: process.env.FRONTEND_VERIFY_EMAIL_URL || 'http://localhost:3000/verify-email',
  },

  cors: {
    allowedOrigins: (process.env.ALLOWED_ORIGINS || 'http://localhost:3000').split(','),
  },
};
