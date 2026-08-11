/**
 * approval.middleware.js
 * Route guards for approval-related endpoints.
 * Use these on top of requireAuth from middleware/auth.js.
 */
const { AppError } = require('../../utils/errors');
const { canApprove } = require('./approval.service');

/**
 * Allows only managers and CEOs through.
 * Must be used AFTER requireAuth so req.user is populated.
 *
 * Usage:
 *   router.get('/pending', requireAuth, requireApprover, controller.getPending)
 */
function requireApprover(req, res, next) {
  if (!req.user) {
    return next(new AppError('Not authenticated', 401, 'UNAUTHENTICATED'));
  }
  if (!canApprove(req.user)) {
    return next(new AppError('Only managers or CEO can access this resource', 403, 'FORBIDDEN'));
  }
  next();
}

/**
 * Blocks login for users who have NOT been approved yet.
 * This is called inside auth.service.authenticate() — not used as route
 * middleware but exported here so the logic lives in the approval module.
 */
function assertApproved(user) {
  if (!user.is_approved) {
    throw new AppError(
      'Your account is pending approval by a manager or CEO. You will receive an email once approved.',
      403,
      'ACCOUNT_PENDING_APPROVAL'
    );
  }
}

module.exports = { requireApprover, assertApproved };
