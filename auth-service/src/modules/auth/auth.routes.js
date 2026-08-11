const express = require('express');
const controller = require('./auth.controller');
const { requireAuth } = require('../../middleware/auth');

const router = express.Router();

router.post('/register', controller.register);
router.post('/login', controller.login);
router.post('/refresh', controller.refresh);
router.post('/logout', controller.logout);
router.post('/logout-all', requireAuth, controller.logoutAll);
router.get('/me', requireAuth, controller.me);
router.get('/verify-email', controller.verifyEmail);

module.exports = router;
