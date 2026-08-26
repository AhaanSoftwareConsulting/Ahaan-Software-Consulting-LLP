const express = require("express");
const router = express.Router();
const upload = require("../middleware/uploadMiddleware");
const AppDevController = require("../controllers/AppDevController");

// Cloudinary-র 'ahaan-designs' ফোল্ডারে 'image' ফাইলটি সেভ হবে
const appDevUpload = upload("ahaan-app").single("image");

// Create Social Media Image
router.post("/add", appDevUpload, AppDevController.create);

// Get All Social Media Images
router.get("/", AppDevController.getAll);

// Get Single Social Media Image
router.get("/:id", AppDevController.getOne);

// Update Social Media Image
router.put("/:id", appDevUpload, AppDevController.update);

// Delete Social Media Image
router.delete("/:id", AppDevController.delete);

module.exports = router;