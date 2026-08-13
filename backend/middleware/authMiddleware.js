const jwt = require("jsonwebtoken");

/**
 * Verifies the JWT issued by auth-service (port 8000).
 *
 * profile-service does NOT share a database with auth-service, so it
 * can't look up sessions/users directly. Instead it trusts the JWT's
 * signature (same secret as auth-service) and reads the user id from
 * the token payload. This is the standard "stateless auth" pattern for
 * microservices — auth-service is the only source of truth for
 * credentials; every other service just verifies the token it issued.
 *
 * IMPORTANT: process.env.JWT_ACCESS_SECRET here MUST be the exact same
 * value used by auth-service's utils/security.js (issueTokenPair).
 * If they don't match, every request will fail with 401.
 */
function requireAuth(req, res, next) {
  const header = req.headers.authorization || "";
  const [scheme, token] = header.split(" ");

  if (scheme !== "Bearer" || !token) {
    return res.status(401).json({
      error_code: "MISSING_TOKEN",
      message: "Authorization header with Bearer token is required",
    });
  }

  try {
    const payload = jwt.verify(token, process.env.JWT_ACCESS_SECRET);

    if (payload.type && payload.type !== "access") {
      return res.status(401).json({
        error_code: "INVALID_TOKEN",
        message: "Token is not an access token",
      });
    }

    // auth-service signs the user id as `sub` (see issueTokenPair usage
    // in auth.service.js: issueTokenPair(user.id)). Adjust the claim
    // name here if your token payload uses a different key.
    req.user = { id: payload.sub, role: payload.role };
    next();
  } catch (err) {
    return res.status(401).json({
      error_code: "INVALID_TOKEN",
      message: "Access token is invalid or expired",
    });
  }
}

module.exports = { requireAuth };