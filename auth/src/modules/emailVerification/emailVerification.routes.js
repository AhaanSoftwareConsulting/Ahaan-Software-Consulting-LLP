const express = require('express');
const controller = require('./emailVerification.controller');

const router = express.Router();

router.post('/resend', controller.resend);
router.post('/verify', controller.verify);

module.exports = router;
