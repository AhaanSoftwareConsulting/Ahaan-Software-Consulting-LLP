const express = require("express");
const router = express.Router();
const {
  saveForm,
  getForm,
  getFormCount,
} = require("../controllers/connectController");

// Save form
router.post("/add", saveForm);

// Get all forms
router.get("/all", getForm);

// Get total count
router.get("/count", getFormCount);

module.exports = router;