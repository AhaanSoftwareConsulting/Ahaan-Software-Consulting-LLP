const { v4: uuidv4 } = require('uuid');
const { query } = require('../../config/database');

async function create({ userId, tokenHash, expiresAt, userAgent = null, ipAddress = null }) {
  const id = uuidv4();
  await query(
    `INSERT INTO refresh_tokens (id, user_id, token_hash, expires_at, user_agent, ip_address)
     VALUES (?, ?, ?, ?, ?, ?)`,
    [id, userId, tokenHash, expiresAt, userAgent, ipAddress]
  );
  return getByTokenHash(tokenHash);
}

async function getByTokenHash(tokenHash) {
  const rows = await query('SELECT * FROM refresh_tokens WHERE token_hash = ?', [tokenHash]);
  return rows[0] || null;
}

async function getActiveByUser(userId) {
  return query('SELECT * FROM refresh_tokens WHERE user_id = ? AND revoked = FALSE', [userId]);
}

async function revoke(sessionId, replacedBy = null) {
  await query('UPDATE refresh_tokens SET revoked = TRUE, replaced_by = ? WHERE id = ?', [replacedBy, sessionId]);
}

async function revokeAllForUser(userId) {
  const active = await getActiveByUser(userId);
  await query('UPDATE refresh_tokens SET revoked = TRUE WHERE user_id = ? AND revoked = FALSE', [userId]);
  return active.length;
}

async function deleteExpired() {
  const result = await query('DELETE FROM refresh_tokens WHERE expires_at < NOW()');
  return result.affectedRows || 0;
}

module.exports = { create, getByTokenHash, getActiveByUser, revoke, revokeAllForUser, deleteExpired };
