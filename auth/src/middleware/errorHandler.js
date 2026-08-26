const { AppError } = require('../utils/errors');

function notFoundHandler(req, res) {
  res.status(404).json({ error_code: 'NOT_FOUND', message: 'Route not found' });
}

// eslint-disable-next-line no-unused-vars
function errorHandler(err, req, res, next) {
  if (err instanceof AppError) {
    const body = { error_code: err.errorCode, message: err.message };
    if (err.details) body.details = err.details;
    return res.status(err.statusCode).json(body);
  }

  console.error(`Unhandled error on ${req.method} ${req.originalUrl}:`, err);
  return res.status(500).json({ error_code: 'INTERNAL_SERVER_ERROR', message: 'An unexpected error occurred' });
}

module.exports = { notFoundHandler, errorHandler };
