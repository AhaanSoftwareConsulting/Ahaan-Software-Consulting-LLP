const express = require("express");
const router = express.Router();
const { saveContact, getContacts } = require("../controllers/contactController");
const Contact = require("../models/ContactForm"); 

// Save contact
router.post("/add", saveContact);

// Get all contacts
router.get("/all", getContacts);

// Get total count
router.get("/count", async (req, res) => {
  try {
    const total = await Contact.countDocuments();
    res.json({ total });
  } catch (error) {
    console.error("Contact Count Error:", error);
    res.status(500).json({ message: "Error fetching contact count" });
  }
});

module.exports = router;
