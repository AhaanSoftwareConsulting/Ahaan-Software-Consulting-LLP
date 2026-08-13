const accountsRepository = require('../accounts/accounts.repository');
const sessionsService = require('../sessions/sessions.service');
const loginAttempts = require('./loginAttempts');
const { issueTokenPair, decodeToken, verifyPassword } = require('../../utils/security');
const { assertApproved } = require('../approval/approval.middleware');
const {
  InvalidCredentialsError,
  AccountNotVerifiedError,
  UserAlreadyExistsError,
  InvalidTokenError,
} = require('../../utils/errors');

async function register({ email, password, fullName, role }) {
  const existing = await accountsRepository.getByEmail(email);
  if (existing) throw new UserAlreadyExistsError();
  return accountsRepository.create({ email, password, fullName, role });
}

/** Validates credentials, enforces lockout policy. Does not issue tokens. */
async function authenticate(email, password) {
  const user = await accountsRepository.getByEmail(email);
  if (!user) {
    // Don't leak which part was wrong.
    throw new InvalidCredentialsError();
  }

  loginAttempts.checkNotLocked(user);

  const valid = await verifyPassword(password, user.hashed_password);
  if (!valid) {
    await loginAttempts.registerFailedAttempt(user);
    throw new InvalidCredentialsError();
  }

  if (!user.is_verified) {
    throw new AccountNotVerifiedError();
  }

  // Blocks login until a manager/CEO has approved the account.
  // (Managers/CEOs are auto-approved when their email gets verified.)
  assertApproved(user);

  if (!user.is_active) {
    throw new InvalidCredentialsError('Account is deactivated');
  }

  await loginAttempts.registerSuccessfulLogin(user);
  return accountsRepository.getById(user.id);
}

async function login(email, password, userAgent, ipAddress) {
  const user = await authenticate(email, password);
  const { accessToken, refreshToken } = issueTokenPair(user.id, user.role);   // ← add user.role
  await sessionsService.createSession(user.id, refreshToken, userAgent, ipAddress);
  return { user, accessToken, refreshToken };
}

/** Validates + rotates a refresh token, returns a new token pair. */
async function refresh(rawRefreshToken, userAgent, ipAddress) {
  let payload;
  try {
    payload = decodeToken(rawRefreshToken);
  } catch (e) {
    throw new InvalidTokenError('Refresh token is invalid or expired');
  }
  if (payload.type !== 'refresh') {
    throw new InvalidTokenError('Token is not a refresh token');
  }

  const oldSession = await sessionsService.validateAndGetSession(rawRefreshToken);
  if (oldSession.user_id !== payload.sub) {
    throw new InvalidTokenError('Token subject mismatch');
  }

  // Look up current role — refresh tokens don't carry it themselves,
  // and role can legitimately change between logins (promotion, etc).
  const user = await accountsRepository.getById(payload.sub);

  const { accessToken, refreshToken: newRefreshToken } = issueTokenPair(payload.sub, user.role);
  await sessionsService.rotate(oldSession, newRefreshToken, userAgent, ipAddress);
  return { accessToken, refreshToken: newRefreshToken };
}

async function logout(rawRefreshToken) {
  await sessionsService.revokeSession(rawRefreshToken);
}

async function logoutAllDevices(userId) {
  return sessionsService.revokeAllSessions(userId);
}

module.exports = { register, authenticate, login, refresh, logout, logoutAllDevices };
