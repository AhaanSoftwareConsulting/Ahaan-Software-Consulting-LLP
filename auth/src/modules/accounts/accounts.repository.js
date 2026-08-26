const { v4: uuidv4 } = require('uuid');
const { query } = require('../../config/database');
const { hashPassword } = require('../../utils/security');

async function getById(userId) {
  const rows = await query('SELECT * FROM users WHERE id = ?', [userId]);
  return rows[0] || null;
}

async function getByEmail(email) {
  const rows = await query('SELECT * FROM users WHERE email = ?', [email.toLowerCase()]);
  return rows[0] || null;
}

async function create({ email, password, fullName = null, role = 'employee' }) {
  const id = uuidv4();
  const hashedPassword = await hashPassword(password);
  const allowedRoles = ['employee', 'hr', 'manager', 'ceo'];
  const safeRole = allowedRoles.includes(role) ? role : 'employee';

  await query(
    `INSERT INTO users (id, email, hashed_password, full_name, role)
     VALUES (?, ?, ?, ?, ?)`,
    [id, email.toLowerCase(), hashedPassword, fullName, safeRole]
  );

  return getById(id);
}

async function setPassword(userId, newHashedPassword) {
  await query('UPDATE users SET hashed_password = ? WHERE id = ?', [newHashedPassword, userId]);
  return getById(userId);
}

async function registerFailedLogin(user, maxAttempts, lockoutMinutes) {
  const attempts = user.failed_login_attempts + 1;
  let lockedUntilSql = null;

  if (attempts >= maxAttempts) {
    await query(
      `UPDATE users
       SET failed_login_attempts = ?, locked_until = DATE_ADD(NOW(), INTERVAL ? MINUTE)
       WHERE id = ?`,
      [attempts, lockoutMinutes, user.id]
    );
  } else {
    await query('UPDATE users SET failed_login_attempts = ? WHERE id = ?', [attempts, user.id]);
  }

  return getById(user.id);
}

async function resetFailedLogin(userId) {
  await query(
    `UPDATE users
     SET failed_login_attempts = 0, locked_until = NULL, last_login_at = NOW()
     WHERE id = ?`,
    [userId]
  );
  return getById(userId);
}

async function markVerified(userId) {
  await query('UPDATE users SET is_verified = TRUE WHERE id = ?', [userId]);
  return getById(userId);
}

async function deactivate(userId) {
  await query('UPDATE users SET is_active = FALSE WHERE id = ?', [userId]);
  return getById(userId);
}

module.exports = {
  getById,
  getByEmail,
  create,
  setPassword,
  registerFailedLogin,
  resetFailedLogin,
  markVerified,
  deactivate,
};
