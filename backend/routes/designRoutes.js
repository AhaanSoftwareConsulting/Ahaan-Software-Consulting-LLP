const express = require("express");
const router = express.Router();
const upload = require("../middleware/uploadMiddleware");
const {
  createDesign,
  updateDesign,
  deleteDesign,
  getDesignById,
  getAllDesigns,
} = require("../controllers/designController");

// Add new design
router.post("/add", upload.single("image"), createDesign);

// Update design by id
router.put("/edit/:id", upload.single("image"), updateDesign);

// Delete design by id
router.delete("/delete/:id", deleteDesign);

// Get single design by id
router.get("/:id", getDesignById);

// Get all designs
router.get("/", getAllDesigns);

module.exports = router;
