const express = require("express");
const router = express.Router();
const { submitBusinessCheck, spinBusinessCheck } = require("../controllers/businessCheckController");

router.post("/", submitBusinessCheck);       // POST /api/business-check
router.post("/spin", spinBusinessCheck);     // POST /api/business-check/spin

module.exports = router;

// In your main server file (e.g. server.js / index.js), mount it next to
// your existing routes, something like:
//
//   const businessCheckRoutes = require("./routes/businessCheckRoutes");
//   app.use("/api/business-check", businessCheckRoutes);
//
// And make sure these env vars are set on Render:
//   SMTP_USER, SMTP_PASS, BUSINESS_CHECK_TEAM_EMAIL