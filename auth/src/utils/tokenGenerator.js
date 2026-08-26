const crypto = require('crypto');

/** URL-safe random token to email/send to the user (e.g. in a reset link). */
function generateRawToken(nBytes = 32) {
  return crypto.randomBytes(nBytes).toString('base64url');
}

/** We only ever store this hash in the DB, never the raw token. */
function hashToken(rawToken) {
  return crypto.createHash('sha256').update(rawToken).digest('hex');
}

module.exports = { generateRawToken, hashToken };
