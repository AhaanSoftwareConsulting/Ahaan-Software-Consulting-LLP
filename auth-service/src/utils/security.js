const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { v4: uuidv4 } = require('uuid');
const config = require('../config/config');

const SALT_ROUNDS = 12;

// ---------- Password hashing ----------

async function hashPassword(plainPassword) {
  return bcrypt.hash(plainPassword, SALT_ROUNDS);
}

async function verifyPassword(plainPassword, hashedPassword) {
  return bcrypt.compare(plainPassword, hashedPassword);
}

// ---------- JWT access / refresh tokens ----------

function createAccessToken(subject) {
  return jwt.sign({ sub: subject, type: 'access' }, config.jwt.secret, {
    expiresIn: `${config.jwt.accessExpiresMinutes}m`,
  });
}

function createRefreshToken(subject, jti) {
  return jwt.sign({ sub: subject, type: 'refresh', jti }, config.jwt.secret, {
    expiresIn: `${config.jwt.refreshExpiresDays}d`,
  });
}

function decodeToken(token) {
  // Throws jwt.JsonWebTokenError / TokenExpiredError if invalid/expired.
  return jwt.verify(token, config.jwt.secret);
}

function issueTokenPair(userId) {
  const jti = uuidv4();
  const accessToken = createAccessToken(userId);
  const refreshToken = createRefreshToken(userId, jti);
  return { accessToken, refreshToken, jti };
}

module.exports = {
  hashPassword,
  verifyPassword,
  createAccessToken,
  createRefreshToken,
  decodeToken,
  issueTokenPair,
};
