const { v4: uuidv4 } = require('uuid');
const { query } = require('../../config/database');

async function create(userId, tokenHash, expiresAt) {
  const id = uuidv4();
  await query(
    `INSERT INTO password_reset_tokens (id, user_id, token_hash, expires_at) VALUES (?, ?, ?, ?)`,
    [id, userId, tokenHash, expiresAt]
  );
  return getByTokenHash(tokenHash);
}

async function getByTokenHash(tokenHash) {
  const rows = await query('SELECT * FROM password_reset_tokens WHERE token_hash = ?', [tokenHash]);
  return rows[0] || null;
}

async function invalidateAllForUser(userId) {
  await query('UPDATE password_reset_tokens SET used = TRUE WHERE user_id = ? AND used = FALSE', [userId]);
}

async function markUsed(tokenId) {
  await query('UPDATE password_reset_tokens SET used = TRUE WHERE id = ?', [tokenId]);
}

module.exports = { create, getByTokenHash, invalidateAllForUser, markUsed };
