const express = require("express");
const router = express.Router();
const {
  registerUser,
  loginUser,
  getProfile,
  logoutUser,
  approveUser,
  rejectUser,
  getAllUsers,
  getUsersByStatus,
} = require("../controllers/authController");
const { protect } = require("../middleware/authMiddleware");
const upload = require("../middleware/uploadMiddleware"); // multer middleware

// Register with profile picture upload
router.post("/register", upload.single("profilePicture"), registerUser);
router.post("/login", loginUser);
router.put("/approve/:id", protect, approveUser);
router.put("/reject/:id", protect, rejectUser);
router.get("/profile", protect, getProfile);
router.post("/logout", logoutUser);
router.get("/users", protect, getAllUsers);
router.get("/users/status/:status", protect, getUsersByStatus);

module.exports = router;
