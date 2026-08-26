const express = require('express');
const controller = require('./passwordReset.controller');

const router = express.Router();

router.post('/forgot', controller.forgotPassword);
router.post('/reset', controller.resetPassword);

module.exports = router;
