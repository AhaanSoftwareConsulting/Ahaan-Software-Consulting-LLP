/**
 * Simple in-memory sliding-window rate limiter, keyed by client IP + path.
 *
 * NOTE: this is per-process, fine for local dev / a single instance. For
 * multiple replicas, swap the in-memory Map for Redis (INCR + EXPIRE) so
 * limits are enforced globally instead of per-instance.
 */

// path -> [maxRequests, windowSeconds]
const SENSITIVE_LIMITS = {
  '/auth/login': [5, 60],
  '/auth/register': [3, 60],
  '/auth/password-reset/forgot': [3, 60],
  '/auth/email-verification/resend': [3, 60],
};
const DEFAULT_LIMIT = [100, 60];

const hits = new Map(); // key -> array of timestamps (ms)

function rateLimiter(req, res, next) {
  const clientIp = req.ip || 'unknown';
  const path = req.path;
  const [maxRequests, windowSeconds] = SENSITIVE_LIMITS[path] || DEFAULT_LIMIT;

  const key = `${clientIp}:${path}`;
  const now = Date.now();
  const windowMs = windowSeconds * 1000;

  let timestamps = hits.get(key) || [];
  timestamps = timestamps.filter((t) => t > now - windowMs);

  if (timestamps.length >= maxRequests) {
    return res.status(429).json({
      error_code: 'RATE_LIMIT_EXCEEDED',
      message: 'Too many requests, please try again later',
    });
  }

  timestamps.push(now);
  hits.set(key, timestamps);
  next();
}

module.exports = rateLimiter;
