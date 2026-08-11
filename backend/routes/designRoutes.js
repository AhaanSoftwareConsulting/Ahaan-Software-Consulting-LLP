const express = require("express");
const router = express.Router();
const upload = require("../middleware/uploadMiddleware");
const DesignController = require("../controllers/DesignController");

// Cloudinary-র 'ahaan-designs' ফোল্ডারে 'image' ফাইলটি সেভ হবে
const designUpload = upload("ahaan-designs").single("image");

// Create Design
router.post("/", designUpload, DesignController.create);

// Get All Designs
router.get("/", DesignController.getAll);

// Get Single Design
router.get("/:id", DesignController.getOne);

// Update Design
router.put("/:id", designUpload, DesignController.update);

// Delete Design
router.delete("/:id", DesignController.delete);

module.exports = router;