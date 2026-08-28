
const express = require('express');
const router = express.Router();
const {
  trackVisit,
  getTotal,
  getStats,
} = require('../controllers/visitorController');

router.post('/track', trackVisit);
router.get('/total', getTotal);
router.get('/stats', getStats);

module.exports = router;