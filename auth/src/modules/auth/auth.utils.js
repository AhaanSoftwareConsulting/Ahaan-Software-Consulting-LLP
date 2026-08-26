/** Respects X-Forwarded-For when behind a reverse proxy / load balancer. */
function getClientIp(req) {
  const forwarded = req.headers['x-forwarded-for'];
  if (forwarded) return forwarded.split(',')[0].trim();
  return req.ip || (req.socket && req.socket.remoteAddress) || null;
}

function getUserAgent(req) {
  return req.headers['user-agent'] || null;
}

module.exports = { getClientIp, getUserAgent };
