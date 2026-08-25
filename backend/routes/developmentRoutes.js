const express = require("express");
const router = express.Router();
const upload = require("../middleware/uploadMiddleware");
const controller = require("../controllers/developmentController");

// Cloudinary-র 'ahaan-developments' ফোল্ডারে 'image' ফাইলটি সেভ হবে
const devUpload = upload("ahaan-developments").single("image");

// 👉 Add New Development
router.post("/add", devUpload, controller.createDevelopment);

// 👉 Update Development
router.put("/edit/:id", devUpload, controller.updateDevelopment);

// 👉 Get All Developments
router.get("/all", controller.getAllDevelopments);

// 👉 Get Single Development by ID
router.get("/:id", controller.getDevelopmentById);

// 👉 Delete Development
router.delete("/delete/:id", controller.deleteDevelopment);

module.exports = router;