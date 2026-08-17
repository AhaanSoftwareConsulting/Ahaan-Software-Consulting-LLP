const express = require("express");
const multer = require("multer");
const ProfileController = require("../controllers/ProfileController");
const { requireAuth } = require("../middleware/authMiddleware");

const upload = multer({ storage: require("../config/multerCloudinaryStorage") });

const router = express.Router();

/**
 * Role check for admin-style routes. Trusts req.user.role from the
 * verified JWT payload (see authMiddleware.js) — auth-service must
 * include `role` in the token for this to work.
 */
function requireApproverRole(req, res, next) {
  const allowed = ["manager", "ceo"];
  if (!allowed.includes(req.user?.role)) {
    return res.status(403).json({
      error_code: "FORBIDDEN",
      message: "Only managers or CEO can access this resource",
    });
  }
  next();
}

// ── Self-service (any authenticated user) ──────────────────
// NOTE: designation/department/employee_code are NOT accepted here —
// see SELF_EDITABLE_FIELDS in ProfileController.js
router.get("/me", requireAuth, ProfileController.getMe);
router.patch("/me", requireAuth, upload.single("avatar"), ProfileController.upsertMe);

// ── Manager / CEO only ──────────────────────────────────────
router.get("/", requireAuth, requireApproverRole, ProfileController.getAll);
router.get("/:userId", requireAuth, requireApproverRole, ProfileController.getByUserId);
router.delete("/:userId", requireAuth, requireApproverRole, ProfileController.delete);

// Sets designation, department, employee_code, date_of_joining,
// employment_type, reporting_manager for ANY user. Only reachable by
// manager/CEO — this is the only route in the whole service that can
// change these fields, whether at approval time or later as an edit.
router.patch(
  "/:userId/employment",
  requireAuth,
  requireApproverRole,
  ProfileController.updateEmployment
);

module.exports = router;