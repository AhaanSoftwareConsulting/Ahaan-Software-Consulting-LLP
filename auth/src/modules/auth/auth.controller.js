const authService = require('./auth.service');
const accountsService = require('../accounts/accounts.service');
const { validateRegisterInput, validateLoginInput } = require('./auth.validators');
const { getClientIp, getUserAgent } = require('./auth.utils');
const emailVerificationService=require('../emailVerification/emailVerification.service')
const { setRefreshCookie, clearRefreshCookie, REFRESH_COOKIE_NAME } = require('./auth.cookies');
// async function register(req, res, next) {
//   try {
//     const { email, password, fullName } = req.body;
//     validateRegisterInput({ email, password });

//     const user = await authService.register({ email, password, fullName });
//     await emailVerificationService.sendVerification(user.email)
//     res.status(201).json(accountsService.toPublic(user));
//   } catch (err) {
//     next(err);
//   }
// }
async function register(req, res, next) {
  try {
    const { email, password, fullName, role } = req.body;
    validateRegisterInput({ email, password });
    const selfRegisterableRoles = ['employee', 'hr'];
    const safeRole = selfRegisterableRoles.includes(role) ? role : 'employee';

    const user = await authService.register({ email, password, fullName, role: safeRole });
    await emailVerificationService.sendVerification(user.email)
    res.status(201).json({
      ...accountsService.toPublic(user),
      message: 'Registered. Please verify your email, then wait for manager/CEO approval before logging in.',
    });
  } catch (err) {
    next(err);
  }
}


async function verifyEmail(req, res, next) {
  try {
    const { token } = req.query;

    await emailVerificationService.verify(token);

    res.status(200).json({
      message: "Email verified successfully"
    });
  } catch (err) {
    next(err);
  }
}

async function login(req, res, next) {
  try {
    const { email, password } = req.body;
    validateLoginInput({ email, password });

    const { accessToken, refreshToken, user } = await authService.login(
      email,
      password,
      getUserAgent(req),
      getClientIp(req)
    );

    setRefreshCookie(res, refreshToken); // NEW — refresh token goes in cookie now

    res.status(200).json({
      accessToken, // only access token in body now
      user: accountsService.toPublic(user),
    });
  } catch (err) {
    next(err);
  }
}

async function refresh(req, res, next) {
  try {
    const refreshToken = req.cookies[REFRESH_COOKIE_NAME]; // CHANGED — read from cookie, not body
    const result = await authService.refresh(refreshToken, getUserAgent(req), getClientIp(req));

    setRefreshCookie(res, result.refreshToken); // NEW — rotate the cookie too

    res.status(200).json({
      access_token: result.accessToken,
      token_type: 'bearer',
      // no refresh_token in body anymore
    });
  } catch (err) {
    next(err);
  }
}

async function logout(req, res, next) {
  try {
    const refreshToken = req.cookies[REFRESH_COOKIE_NAME]; // CHANGED — read from cookie
    if (refreshToken) {
      await authService.logout(refreshToken);
    }
    clearRefreshCookie(res); // NEW
    res.status(204).send();
  } catch (err) {
    next(err);
  }
}
async function logoutAll(req, res, next) {
  try {
    await authService.logoutAllDevices(req.user.id);
    res.status(204).send();
  } catch (err) {
    next(err);
  }
}

async function me(req, res, next) {
  try {
    res.status(200).json(accountsService.toPublic(req.user));
  } catch (err) {
    next(err);
  }
}

module.exports = { register, login, refresh, logout, logoutAll, me, verifyEmail };
