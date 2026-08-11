const repo = require('./emailVerification.repository');
const accountsRepository = require('../accounts/accounts.repository');
const { generateRawToken, hashToken } = require('../../utils/tokenGenerator');
const { sendVerificationEmail } = require('../../utils/emailSender');
const { InvalidTokenError, UserNotFoundError } = require('../../utils/errors');
const config = require('../../config/config');
const approvalService=require("../approval/approval.service")
function isValid(record) {
  return record && !record.used && new Date() < new Date(record.expires_at);
}

async function sendVerification(email) {
  const user = await accountsRepository.getByEmail(email);
  if (!user || user.is_verified) {
    // Don't reveal account existence / verification state.
    return;
  }

  await repo.invalidateAllForUser(user.id);

  const rawToken = generateRawToken();
  const expiresAt = new Date(Date.now() + config.tokens.emailVerificationExpireHours * 60 * 60 * 1000);
  await repo.create(user.id, hashToken(rawToken), expiresAt);

  const verifyLink = `${config.frontend.verifyEmailUrl}?token=${rawToken}`;

  if (config.app.debug) {
    // DEV ONLY: prints the raw token to the console so you can test without a
    // working SMTP server. Remove/disable in production.
    console.log(`DEV verification token for ${user.email}: ${rawToken}`);
    console.log(`DEV verification link: ${verifyLink}`);
  } else {
    await sendVerificationEmail(user.email, verifyLink);
  }
}

async function verify(rawToken) {
  const record = await repo.getByTokenHash(hashToken(rawToken));
  if (!isValid(record)) {
    throw new InvalidTokenError('Verification token is invalid or expired');
  }

  const user = await accountsRepository.getById(record.user_id);
  if (!user) throw new UserNotFoundError();

  await accountsRepository.markVerified(user.id);
  await repo.markUsed(record.id);

  await approvalService.createApprovalRequest(user.id);
}

module.exports = { sendVerification, verify };
