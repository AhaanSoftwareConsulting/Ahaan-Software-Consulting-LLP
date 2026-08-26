/**
 * approval.routes.js
 * All routes mounted under /approval in app.js.
 *
 * requireAuth     → valid JWT, populates req.user
 * requireApprover → role must be 'manager' or 'ceo'
 */
const express = require('express');
const controller = require('./approval.controller');
const { requireAuth } = require('../../middleware/auth');
const { requireApprover } = require('./approval.middleware');

const router = express.Router();

// ── Manager / CEO only ──────────────────────────────────────
// List all pending approval requests
router.get('/pending', requireAuth, requireApprover, controller.getPendingRequests);

// Full history (filter by ?status=pending|approved|rejected)
router.get('/', requireAuth, requireApprover, controller.getAllRequests);

// Single request detail
router.get('/:requestId', requireAuth, requireApprover, controller.getRequest);

// Approve a request
router.patch('/:requestId/approve', requireAuth, requireApprover, controller.approveRequest);

// Reject a request (body: { reason: "optional text" })
router.patch('/:requestId/reject', requireAuth, requireApprover, controller.rejectRequest);

module.exports = router;
