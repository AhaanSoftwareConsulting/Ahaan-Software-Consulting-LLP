const express = require('express');
const helmet = require('helmet');

const config = require('./config/config');
const corsMiddleware = require('./middleware/cors');
const requestId = require('./middleware/requestId');
const requestLogger = require('./middleware/logger');
const rateLimiter = require('./middleware/rateLimiter');
const { notFoundHandler, errorHandler } = require('./middleware/errorHandler');

const authRoutes = require('./modules/auth/auth.routes');
const passwordResetRoutes = require('./modules/passwordReset/passwordReset.routes');
const emailVerificationRoutes = require('./modules/emailVerification/emailVerification.routes');
const approvalRoutes = require('./modules/approval/approval.routes');
const app = express();

app.use(helmet());
app.use(corsMiddleware);
app.use(express.json());
app.use(requestId);
app.use(requestLogger);
app.use(rateLimiter);

app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok', service: config.app.name });
});

app.use('/auth', authRoutes);
app.use('/auth/password-reset', passwordResetRoutes);
app.use('/auth/email-verification', emailVerificationRoutes);
app.use('/approval', approvalRoutes)

app.use(notFoundHandler);
app.use(errorHandler);

module.exports = app;
