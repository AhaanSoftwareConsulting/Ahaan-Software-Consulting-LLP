const repo = require('./sessions.repository');
const { hashToken } = require('../../utils/tokenGenerator');
const config = require('../../config/config');
const { InvalidTokenError, TokenRevokedError } = require('../../utils/errors');

function isExpired(session) {
  return new Date() >= new Date(session.expires_at);
}

async function createSession(userId, rawRefreshToken, userAgent, ipAddress) {
  const expiresAt = new Date(Date.now() + config.jwt.refreshExpiresDays * 24 * 60 * 60 * 1000);
  return repo.create({
    userId,
    tokenHash: hashToken(rawRefreshToken),
    expiresAt,
    userAgent,
    ipAddress,
  });
}

async function validateAndGetSession(rawRefreshToken) {
  const session = await repo.getByTokenHash(hashToken(rawRefreshToken));
  if (!session) throw new InvalidTokenError('Refresh token not recognized');

  if (session.revoked) {
    // Reuse of a revoked/rotated token -> possible theft. Revoke the whole family.
    await repo.revokeAllForUser(session.user_id);
    throw new TokenRevokedError('Refresh token has already been used or revoked');
  }
  if (isExpired(session)) {
    throw new InvalidTokenError('Refresh token has expired');
  }
  return session;
}

async function rotate(oldSession, newRawRefreshToken, userAgent, ipAddress) {
  const newSession = await createSession(oldSession.user_id, newRawRefreshToken, userAgent, ipAddress);
  await repo.revoke(oldSession.id, newSession.id);
  return newSession;
}

async function revokeSession(rawRefreshToken) {
  const session = await repo.getByTokenHash(hashToken(rawRefreshToken));
  if (session) await repo.revoke(session.id);
}

async function revokeAllSessions(userId) {
  return repo.revokeAllForUser(userId);
}

module.exports = { createSession, validateAndGetSession, rotate, revokeSession, revokeAllSessions };
