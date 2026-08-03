const ContactForm = require("../models/ContactForm");

exports.saveContact = async (req, res) => {
  try {
    const data = new ContactForm(req.body);
    const saved = await data.save();
    res.status(201).json({ message: "Saved Successfully", saved });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getContacts = async (req, res) => {
  try {
    const all = await ContactForm.find().sort({ createdAt: -1 });
    res.json(all);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
