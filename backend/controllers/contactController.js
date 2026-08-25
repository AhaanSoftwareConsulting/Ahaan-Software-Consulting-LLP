const Contact = require("../models/ContactSQL");

// Save contact to MySQL
exports.saveContact = async (req, res) => {
  try {
    const { name, email, phone, website, message } = req.body;
    
    const saved = await Contact.create({
      name,
      email,
      phone,
      website,
      message,
    });

    res.status(201).json({ message: "Saved Successfully", saved });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get all contacts from MySQL
exports.getContacts = async (req, res) => {
  try {
    const all = await Contact.findAll({
      order: [["createdAt", "DESC"]],
    });
    res.json(all);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get total count
exports.getContactCount = async (req, res) => {
  try {
    const total = await Contact.count();
    res.json({ total });
  } catch (error) {
    console.error("Contact Count Error:", error);
    res.status(500).json({ message: "Error fetching contact count" });
  }
};