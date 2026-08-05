const express = require("express");
const router = express.Router();
const upload = require("../middleware/uploadMiddleware");
const controller = require("../controllers/developmentController");

// 👉 Add New Development
router.post("/add", upload.single("image"), controller.createDevelopment);

// 👉 Get All Developments
router.get("/all", controller.getAllDevelopments);

// 👉 Get Single Development by ID
router.get("/:id", controller.getDevelopmentById);

// 👉 Update Development
router.put("/edit/:id", upload.single("image"), controller.updateDevelopment);

// 👉 Delete Development
router.delete("/delete/:id", controller.deleteDevelopment);

module.exports = router;

