const express = require("express");
const router = express.Router();
const {
  saveContact,
  getContacts,
  getContactCount,
} = require("../controllers/contactController");

// Save contact
router.post("/add", saveContact);

// Get all contacts
router.get("/all", getContacts);

// Get total count
router.get("/count", getContactCount);

module.exports = router;