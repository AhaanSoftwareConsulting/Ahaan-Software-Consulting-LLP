const { decodeToken } = require('../utils/security');
const { InvalidTokenError, UserNotFoundError, AccountNotVerifiedError, AppError } = require('../utils/errors');
const accountsRepository = require('../modules/accounts/accounts.repository');

/** Equivalent of core/dependencies.py -> get_current_user */
async function requireAuth(req, res, next) {
  try {
    const authHeader = req.headers.authorization || '';
    const [scheme, token] = authHeader.split(' ');

    if (scheme !== 'Bearer' || !token) {
      throw new InvalidTokenError('Missing or malformed Authorization header');
    }

    let payload;
    try {
      payload = decodeToken(token);
    } catch (e) {
      throw new InvalidTokenError('Access token is invalid or expired');
    }

    if (payload.type !== 'access') {
      throw new InvalidTokenError('Token is not an access token');
    }

    const user = await accountsRepository.getById(payload.sub);
    if (!user) throw new UserNotFoundError();
    if (!user.is_active) throw new InvalidTokenError('Account is deactivated');

    req.user = user;
    next();
  } catch (err) {
    next(err);
  }
}

function requireVerified(req, res, next) {
  if (!req.user.is_verified) {
    return next(new AccountNotVerifiedError());
  }
  next();
}

function requireSuperuser(req, res, next) {
  if (!req.user.is_superuser) {
    return next(new AppError('Admin privileges required', 403, 'FORBIDDEN'));
  }
  next();
}

module.exports = { requireAuth, requireVerified, requireSuperuser };
