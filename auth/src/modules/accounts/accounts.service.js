const repo = require('./accounts.repository');
const { UserAlreadyExistsError, UserNotFoundError, InvalidCredentialsError } = require('../../utils/errors');
const { hashPassword, verifyPassword } = require('../../utils/security');

async function registerUser({ email, password, fullName }) {
  const existing = await repo.getByEmail(email);
  if (existing) throw new UserAlreadyExistsError();
  return repo.create({ email, password, fullName });
}

async function getUser(userId) {
  const user = await repo.getById(userId);
  if (!user) throw new UserNotFoundError();
  return user;
}

async function changePassword(user, currentPassword, newPassword) {
  const valid = await verifyPassword(currentPassword, user.hashed_password);
  if (!valid) throw new InvalidCredentialsError('Current password is incorrect');
  const newHashed = await hashPassword(newPassword);
  return repo.setPassword(user.id, newHashed);
}

/** Strips sensitive fields before sending a user object back to the client. */
function toPublic(user) {
  if (!user) return null;
  const { hashed_password, failed_login_attempts, locked_until, ...publicUser } = user;
  return publicUser;
}

module.exports = { registerUser, getUser, changePassword, toPublic };
