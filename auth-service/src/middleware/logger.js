function requestLogger(req, res, next) {
  const start = process.hrtime.bigint();

  res.on('finish', () => {
    const durationMs = Number(process.hrtime.bigint() - start) / 1e6;
    console.log(
      `${req.method} ${req.originalUrl} -> ${res.statusCode} (${durationMs.toFixed(2)}ms) [request_id=${req.requestId || '-'}]`
    );
  });

  next();
}

module.exports = requestLogger;
