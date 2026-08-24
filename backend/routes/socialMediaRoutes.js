const express = require("express");
const router = express.Router();
const upload = require("../middleware/uploadMiddleware");
const SocialMediaController = require("../controllers/SocialMediaController");

// Cloudinary-র 'ahaan-designs' ফোল্ডারে 'image' ফাইলটি সেভ হবে
const mediaUpload = upload("ahaan-designs").single("image");

// Create Social Media Image
router.post("/add", mediaUpload, SocialMediaController.create);

// Get All Social Media Images
router.get("/", SocialMediaController.getAll);

// Get Single Social Media Image
router.get("/:id", SocialMediaController.getOne);

// Update Social Media Image
router.put("/:id", mediaUpload, SocialMediaController.update);

// Delete Social Media Image
router.delete("/:id", SocialMediaController.delete);

module.exports = router;