/**
 * Failed-login / account-lockout logic, kept isolated so it's easy to swap
 * for a Redis-backed implementation later (recommended for multi-instance
 * deployments, since this in-DB version adds a write on every failed attempt).
 */
const config = require('../../config/config');
const { AccountLockedError } = require('../../utils/errors');
const accountsRepository = require('../accounts/accounts.repository');

function checkNotLocked(user) {
  if (user.locked_until && new Date() < new Date(user.locked_until)) {
    throw new AccountLockedError(
      `Account locked due to too many failed login attempts. Try again after ${config.loginPolicy.lockoutMinutes} minutes.`
    );
  }
}

async function registerFailedAttempt(user) {
  await accountsRepository.registerFailedLogin(
    user,
    config.loginPolicy.maxFailedAttempts,
    config.loginPolicy.lockoutMinutes
  );
}

async function registerSuccessfulLogin(user) {
  await accountsRepository.resetFailedLogin(user.id);
}

module.exports = { checkNotLocked, registerFailedAttempt, registerSuccessfulLogin };
