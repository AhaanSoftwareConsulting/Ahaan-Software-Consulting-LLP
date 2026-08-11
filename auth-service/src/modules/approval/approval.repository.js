/**
 * approval.repository.js
 * Raw DB queries for approval_requests table + user approval columns.
 * No business logic here — only data access.
 */
const { v4: uuidv4 } = require('uuid');
const { query } = require('../../config/database');

// ─────────────────────────────────────────
// Approval Requests
// ─────────────────────────────────────────

/** Create a new pending approval request for a user. */
async function createRequest(userId) {
  const id = uuidv4();
  await query(
    `INSERT INTO approval_requests (id, user_id, status, requested_at)
     VALUES (?, ?, 'pending', NOW())`,
    [id, userId]
  );
  return getRequestByUserId(userId);
}

/** Get the latest approval request for a given user. */
async function getRequestByUserId(userId) {
  const rows = await query(
    `SELECT * FROM approval_requests WHERE user_id = ? ORDER BY requested_at DESC LIMIT 1`,
    [userId]
  );
  return rows[0] || null;
}

/** Get a single approval request by its ID. */
async function getRequestById(requestId) {
  const rows = await query(
    `SELECT * FROM approval_requests WHERE id = ?`,
    [requestId]
  );
  return rows[0] || null;
}

/** Get all pending approval requests (for manager/CEO dashboard). */
async function getPendingRequests() {
  return query(
    `SELECT
       ar.id            AS request_id,
       ar.requested_at,
       ar.status,
       u.id             AS user_id,
       u.email,
       u.full_name,
       u.role
     FROM approval_requests ar
     JOIN users u ON u.id = ar.user_id
     WHERE ar.status = 'pending'
     ORDER BY ar.requested_at ASC`
  );
}

/** Get all approval requests (pending + reviewed) — for full history. */
async function getAllRequests({ status = null, limit = 50, offset = 0 } = {}) {
  let sql = `
    SELECT
      ar.id            AS request_id,
      ar.status,
      ar.requested_at,
      ar.reviewed_at,
      ar.reject_reason,
      u.id             AS user_id,
      u.email,
      u.full_name,
      u.role,
      rev.email        AS reviewed_by_email,
      rev.full_name    AS reviewed_by_name
    FROM approval_requests ar
    JOIN users u ON u.id = ar.user_id
    LEFT JOIN users rev ON rev.id = ar.reviewed_by
  `;
  const params = [];
  if (status) {
    sql += ' WHERE ar.status = ?';
    params.push(status);
  }
  sql += ' ORDER BY ar.requested_at DESC LIMIT ? OFFSET ?';
  params.push(limit, offset);
  return query(sql, params);
}

/** Mark a request as approved. */
async function markApproved(requestId, reviewerId) {
  await query(
    `UPDATE approval_requests
     SET status = 'approved', reviewed_by = ?, reviewed_at = NOW()
     WHERE id = ?`,
    [reviewerId, requestId]
  );
  return getRequestById(requestId);
}

/** Mark a request as rejected. */
async function markRejected(requestId, reviewerId, reason = null) {
  await query(
    `UPDATE approval_requests
     SET status = 'rejected', reviewed_by = ?, reviewed_at = NOW(), reject_reason = ?
     WHERE id = ?`,
    [reviewerId, reason, requestId]
  );
  return getRequestById(requestId);
}

// ─────────────────────────────────────────
// User approval columns
// ─────────────────────────────────────────

/** Stamp is_approved = TRUE + approved_by on the user row. */
async function approveUser(userId, approverId) {
  await query(
    `UPDATE users
     SET is_approved = TRUE, approved_by = ?, approved_at = NOW()
     WHERE id = ?`,
    [approverId, userId]
  );
}

/** Stamp is_approved = FALSE + optional rejection reason on the user row. */
async function rejectUser(userId, reason = null) {
  await query(
    `UPDATE users
     SET is_approved = FALSE, rejected_reason = ?
     WHERE id = ?`,
    [reason, userId]
  );
}

module.exports = {
  createRequest,
  getRequestByUserId,
  getRequestById,
  getPendingRequests,
  getAllRequests,
  markApproved,
  markRejected,
  approveUser,
  rejectUser,
};
