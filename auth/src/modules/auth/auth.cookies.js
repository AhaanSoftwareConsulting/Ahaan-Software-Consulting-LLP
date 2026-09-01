const isProd = process.env.NODE_ENV === 'production';

const REFRESH_COOKIE_NAME = 'refreshToken';

const cookieOptions = {
  httpOnly: true,
  secure: isProd,          // must be true in production (HTTPS only)
  sameSite: isProd ? 'strict' : 'lax', // 'lax' in dev so localhost works
  path: '/auth',           // cookie only sent to /auth/* routes (refresh, logout)
  maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days, matches your refresh token expiry
};

function setRefreshCookie(res, token) {
  res.cookie(REFRESH_COOKIE_NAME, token, cookieOptions);
}

function clearRefreshCookie(res) {
  res.clearCookie(REFRESH_COOKIE_NAME, { ...cookieOptions, maxAge: 0 });
}

module.exports = { setRefreshCookie, clearRefreshCookie, REFRESH_COOKIE_NAME };