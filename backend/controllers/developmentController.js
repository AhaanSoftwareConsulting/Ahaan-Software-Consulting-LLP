const Development = require("../models/DevelopmentSQL");

// ======================================================
// CREATE Development
// ======================================================
exports.createDevelopment = async (req, res) => {
  try {
    const { title, link, developer } = req.body;

    if (!title || !link || !developer) {
      return res.status(400).json({ 
        success: false, 
        message: "Title, Link & Developer Name are required" 
      });
    }

    if (!req.file) {
      return res.status(400).json({ 
        success: false, 
        message: "Image is required" 
      });
    }

    const newDev = await Development.create({
      title,
      link,
      developer,
      image: req.file.path, // Cloudinary URL
    });

    res.status(201).json({ success: true, data: newDev });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: err.message });
  }
};

// ======================================================
// GET ALL Developments
// ======================================================
exports.getAllDevelopments = async (req, res) => {
  try {
    const items = await Development.findAll({
      order: [["createdAt", "DESC"]],
    });
    res.json({ success: true, data: items });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// ======================================================
// GET Development BY ID
// ======================================================
exports.getDevelopmentById = async (req, res) => {
  try {
    const item = await Development.findByPk(req.params.id);
    if (!item) {
      return res.status(404).json({ success: false, message: "Not found" });
    }
    res.json({ success: true, data: item });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// ======================================================
// UPDATE Development
// ======================================================
exports.updateDevelopment = async (req, res) => {
  try {
    const { title, link, developer } = req.body;

    const item = await Development.findByPk(req.params.id);
    if (!item) {
      return res.status(404).json({ success: false, message: "Not found" });
    }

    const updateData = {
      title: title || item.title,
      link: link || item.link,
      developer: developer || item.developer,
    };

    if (req.file) {
      updateData.image = req.file.path; // Updated Cloudinary image URL
    }

    await item.update(updateData);

    res.json({ success: true, data: item });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// ======================================================
// DELETE Development
// ======================================================
exports.deleteDevelopment = async (req, res) => {
  try {
    const item = await Development.findByPk(req.params.id);
    if (!item) {
      return res.status(404).json({ success: false, message: "Not found" });
    }

    await item.destroy();

    res.json({ success: true, message: "Deleted successfully" });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};