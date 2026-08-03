const express = require("express");
const { saveForm, getForm } = require("../controllers/formController");
const FormData = require("../models/FormData");  // ✅ IMPORT THIS

const router = express.Router();

// Save form
router.post("/", saveForm);

// Get all forms
router.get("/", getForm);

// Get total count
router.get("/count", async (req, res) => {
  try {
    const total = await FormData.countDocuments();
    res.json({ total });
  } catch (error) {
    console.error("Count Error:", error);
    res.status(500).json({ message: "Error fetching count" });
  }
});

module.exports = router;

