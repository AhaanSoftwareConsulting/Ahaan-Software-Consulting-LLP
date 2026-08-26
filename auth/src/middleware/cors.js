const cors = require('cors');
const config = require('../config/config');

module.exports = cors({
  origin: config.cors.allowedOrigins,
  credentials: true,
});
