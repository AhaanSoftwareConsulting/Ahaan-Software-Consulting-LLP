const express = require("express");
const router = express.Router();
const upload = require("../middleware/uploadMiddleware");
const {
  createTeam,
  getTeam,
  getSingleTeam,
  updateTeam,
  deleteTeam,
} = require("../controllers/teamController");

// Cloudinary-র 'ahaan-teams' ফোল্ডারে ইমেজ আপলোড হবে
const teamUpload = upload("ahaan-teams").single("image");

router.post("/create", teamUpload, createTeam);
router.get("/all", getTeam);
router.get("/:id", getSingleTeam);
router.put("/update/:id", teamUpload, updateTeam);
router.delete("/delete/:id", deleteTeam);

module.exports = router;