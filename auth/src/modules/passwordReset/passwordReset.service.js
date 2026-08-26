const repo = require('./passwordReset.repository');
const accountsRepository = require('../accounts/accounts.repository');
const sessionsService = require('../sessions/sessions.service');
const { generateRawToken, hashToken } = require('../../utils/tokenGenerator');
const { hashPassword } = require('../../utils/security');
const { sendPasswordResetEmail } = require('../../utils/emailSender');
const { InvalidTokenError } = require('../../utils/errors');
const config = require('../../config/config');

function isValid(record) {
  return record && !record.used && new Date() < new Date(record.expires_at);
}

/** Always succeeds silently even if the email doesn't exist (prevents user enumeration). */
async function requestReset(email) {
  const user = await accountsRepository.getByEmail(email);
  if (!user) return;

  await repo.invalidateAllForUser(user.id);

  const rawToken = generateRawToken();
  const expiresAt = new Date(Date.now() + config.tokens.passwordResetExpireMinutes * 60 * 1000);
  await repo.create(user.id, hashToken(rawToken), expiresAt);

  const resetLink = `${config.frontend.resetPasswordUrl}?token=${rawToken}`;

  if (config.app.debug) {
    // DEV ONLY: prints the raw token to the console so you can test without a
    // working SMTP server. Remove/disable in production.
    console.log(`DEV password reset token for ${user.email}: ${rawToken}`);
    console.log(`DEV reset link: ${resetLink}`);
  } else {
    // In production, dispatch this via a background job queue instead of inline.
    await sendPasswordResetEmail(user.email, resetLink);
  }
}

async function resetPassword(rawToken, newPassword) {
  const record = await repo.getByTokenHash(hashToken(rawToken));
  if (!isValid(record)) {
    throw new InvalidTokenError('Password reset token is invalid or expired');
  }

  const newHashed = await hashPassword(newPassword);
  await accountsRepository.setPassword(record.user_id, newHashed);
  await repo.markUsed(record.id);

  // Security best practice: force re-login everywhere after a password reset.
  await sessionsService.revokeAllSessions(record.user_id);
}

module.exports = { requestReset, resetPassword };
