/**
 * approval.controller.js
 * HTTP layer — parse request, call service, send response.
 */
const service = require('./approval.service');

/** GET /approval/pending  — list all pending requests (manager/CEO only) */
async function getPendingRequests(req, res, next) {
  try {
    const requests = await service.getPendingRequests();
    res.status(200).json({ data: requests, count: requests.length });
  } catch (err) {
    next(err);
  }
}

/** GET /approval  — full history with optional ?status=pending|approved|rejected */
async function getAllRequests(req, res, next) {
  try {
    const { status, limit = 50, offset = 0 } = req.query;
    const requests = await service.getAllRequests({
      status: status || null,
      limit: parseInt(limit, 10),
      offset: parseInt(offset, 10),
    });
    res.status(200).json({ data: requests, count: requests.length });
  } catch (err) {
    next(err);
  }
}

/** GET /approval/:requestId  — single request detail */
async function getRequest(req, res, next) {
  try {
    const request = await service.getRequest(req.params.requestId);
    res.status(200).json(request);
  } catch (err) {
    next(err);
  }
}

/** PATCH /approval/:requestId/approve */
async function approveRequest(req, res, next) {
  try {
    const updated = await service.approveRequest(req.params.requestId, req.user);
    res.status(200).json({
      message: 'User has been approved and notified by email.',
      request: updated,
    });
  } catch (err) {
    next(err);
  }
}

/** PATCH /approval/:requestId/reject */
async function rejectRequest(req, res, next) {
  try {
    const { reason } = req.body;
    const updated = await service.rejectRequest(req.params.requestId, req.user, reason || null);
    res.status(200).json({
      message: 'User request has been rejected and they have been notified.',
      request: updated,
    });
  } catch (err) {
    next(err);
  }
}

module.exports = {
  getPendingRequests,
  getAllRequests,
  getRequest,
  approveRequest,
  rejectRequest,
};
