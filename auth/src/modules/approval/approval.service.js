/**
 * approval.service.js
 * All business logic for the approval flow.
 *
 * Flow:
 *   1. Employee/HR registers → verifies email
 *   2. emailVerification.service calls approval.service.createApprovalRequest()
 *   3. Email goes to all managers + CEO in the system
 *   4. Manager/CEO hits PATCH /approval/:requestId/approve  (or /reject)
 *   5. On approve → user.is_approved = TRUE + notify employee by email
 *   6. auth.service.authenticate() checks is_approved before issuing tokens
 */
const repo = require('./approval.repository');
const accountsRepository = require('../accounts/accounts.repository');
const { sendEmail } = require('../../utils/emailSender');
const { AppError } = require('../../utils/errors');
const config = require('../../config/config');

// ─────────────────────────────────────────
// Roles allowed to approve/reject
// ─────────────────────────────────────────
const APPROVER_ROLES = ['manager', 'ceo'];

function canApprove(user) {
  return APPROVER_ROLES.includes(user.role);
}

// ─────────────────────────────────────────
// Internal helpers
// ─────────────────────────────────────────

/** Fetch all users whose role is manager or ceo (to notify them). */
async function getApprovers() {
  const { query } = require('../../config/database');
  return query(
    `SELECT id, email, full_name, role FROM users
     WHERE role IN ('manager','ceo') AND is_active = TRUE AND is_verified = TRUE`
  );
}

async function notifyApprovers(employee, approvers) {
  if (!approvers.length) {
    console.warn('No active managers/CEOs found to notify for approval request.');
    return;
  }

  const approvalLink = `${config.frontend.approvalDashboardUrl || 'http://localhost:3000/admin/approvals'}`;

  for (const approver of approvers) {
    const subject = `Approval request: ${employee.full_name || employee.email} wants access`;
    const html = `
      <p>Hello ${approver.full_name || approver.email},</p>
      <p>
        <strong>${employee.full_name || employee.email}</strong> (${employee.email}) has verified
        their email and is requesting access to the system as <strong>${employee.role}</strong>.
      </p>
      <p>
        Please review and approve or reject their request:<br/>
        <a href="${approvalLink}">${approvalLink}</a>
      </p>
      <p>This request will remain pending until you act on it.</p>
    `;

    if (config.app.debug) {
      console.log(`DEV approval notification → ${approver.email} for employee ${employee.email}`);
    } else {
      try {
        await sendEmail(approver.email, subject, html);
      } catch (err) {
        // Log but don't crash — the request is still created in the DB.
        console.error(`Failed to notify approver ${approver.email}:`, err.message);
      }
    }
  }
}

async function notifyEmployeeApproved(employee, approver) {
  const subject = 'Your account has been approved!';
  const html = `
    <p>Hello ${employee.full_name || employee.email},</p>
    <p>Your account has been <strong>approved</strong> by ${approver.full_name || approver.email}.</p>
    <p>You can now log in at <a href="${config.frontend.loginUrl || 'http://localhost:3000/login'}">
      ${config.frontend.loginUrl || 'http://localhost:3000/login'}</a>.
    </p>
  `;

  if (config.app.debug) {
    console.log(`DEV approved email → ${employee.email}`);
  } else {
    try {
      await sendEmail(employee.email, subject, html);
    } catch (err) {
      console.error(`Failed to notify employee ${employee.email} of approval:`, err.message);
    }
  }
}

async function notifyEmployeeRejected(employee, approver, reason) {
  const subject = 'Your account access request was not approved';
  const html = `
    <p>Hello ${employee.full_name || employee.email},</p>
    <p>Your access request has been <strong>rejected</strong> by ${approver.full_name || approver.email}.</p>
    ${reason ? `<p>Reason: ${reason}</p>` : ''}
    <p>Please contact your HR department if you believe this is a mistake.</p>
  `;

  if (config.app.debug) {
    console.log(`DEV rejected email → ${employee.email} reason: ${reason}`);
  } else {
    try {
      await sendEmail(employee.email, subject, html);
    } catch (err) {
      console.error(`Failed to notify employee ${employee.email} of rejection:`, err.message);
    }
  }
}

// ─────────────────────────────────────────
// Public service methods
// ─────────────────────────────────────────

/**
 * Called automatically after email verification is confirmed.
 * Creates an approval_request row and emails all managers/CEOs.
 */
async function createApprovalRequest(userId) {
  const user = await accountsRepository.getById(userId);
  if (!user) throw new AppError('User not found', 404, 'USER_NOT_FOUND');

  // Managers and CEOs skip the approval queue — they self-approve.
  if (canApprove(user)) {
    await repo.approveUser(userId, userId);
    console.log(`Auto-approved ${user.role}: ${user.email}`);
    return null;
  }

  // Check if there's already a pending request.
  const existing = await repo.getRequestByUserId(userId);
  if (existing && existing.status === 'pending') {
    return existing; // Don't create duplicate.
  }

  const request = await repo.createRequest(userId);
  const approvers = await getApprovers();
  await notifyApprovers(user, approvers);
  return request;
}

/** Manager/CEO approves a pending request. */
async function approveRequest(requestId, reviewerUser) {
  if (!canApprove(reviewerUser)) {
    throw new AppError('Only managers or CEO can approve requests', 403, 'FORBIDDEN');
  }

  const request = await repo.getRequestById(requestId);
  if (!request) throw new AppError('Approval request not found', 404, 'NOT_FOUND');
  if (request.status !== 'pending') {
    throw new AppError(`Request is already ${request.status}`, 400, 'ALREADY_REVIEWED');
  }

  // Update request row + user row in parallel.
  await Promise.all([
    repo.markApproved(requestId, reviewerUser.id),
    repo.approveUser(request.user_id, reviewerUser.id),
  ]);

  const employee = await accountsRepository.getById(request.user_id);
  await notifyEmployeeApproved(employee, reviewerUser);

  return repo.getRequestById(requestId);
}

/** Manager/CEO rejects a pending request. */
async function rejectRequest(requestId, reviewerUser, reason = null) {
  if (!canApprove(reviewerUser)) {
    throw new AppError('Only managers or CEO can reject requests', 403, 'FORBIDDEN');
  }

  const request = await repo.getRequestById(requestId);
  if (!request) throw new AppError('Approval request not found', 404, 'NOT_FOUND');
  if (request.status !== 'pending') {
    throw new AppError(`Request is already ${request.status}`, 400, 'ALREADY_REVIEWED');
  }

  await Promise.all([
    repo.markRejected(requestId, reviewerUser.id, reason),
    repo.rejectUser(request.user_id, reason),
  ]);

  const employee = await accountsRepository.getById(request.user_id);
  await notifyEmployeeRejected(employee, reviewerUser, reason);

  return repo.getRequestById(requestId);
}

/** List all pending approval requests — for manager/CEO dashboard. */
async function getPendingRequests() {
  return repo.getPendingRequests();
}

/** Full approval history with optional status filter. */
async function getAllRequests(filters) {
  return repo.getAllRequests(filters);
}

/** Get a single request by ID. */
async function getRequest(requestId) {
  const request = await repo.getRequestById(requestId);
  if (!request) throw new AppError('Approval request not found', 404, 'NOT_FOUND');
  return request;
}

module.exports = {
  createApprovalRequest,
  approveRequest,
  rejectRequest,
  getPendingRequests,
  getAllRequests,
  getRequest,
  canApprove,
};
