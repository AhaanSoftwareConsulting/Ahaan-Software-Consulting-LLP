const isProd = process.env.NODE_ENV === 'production';

const REFRESH_COOKIE_NAME = 'refreshToken';

const cookieOptions = {
  httpOnly: true,
  secure: true,           // required when sameSite is 'none' — must always be true, not just in prod
  sameSite: 'none',       // required for cross-site requests (Vercel <-> Render)
  path: '/auth',
  maxAge: 7 * 24 * 60 * 60 * 1000,
};

function setRefreshCookie(res, token) {
  res.cookie(REFRESH_COOKIE_NAME, token, cookieOptions);
}

function clearRefreshCookie(res) {
  res.clearCookie(REFRESH_COOKIE_NAME, { ...cookieOptions, maxAge: 0 });
}

module.exports = { setRefreshCookie, clearRefreshCookie, REFRESH_COOKIE_NAME };