const Development = require("../models/Development");

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
    const items = await Development.find().sort({ createdAt: -1 });
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
    const item = await Development.findById(req.params.id);
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

    const updateData = {
      title,
      link,
      developer,
    };

    if (req.file) {
      updateData.image = req.file.path; // Updated Cloudinary image URL
    }

    const updated = await Development.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true, runValidators: true }
    );

    if (!updated) {
      return res.status(404).json({ success: false, message: "Not found" });
    }

    res.json({ success: true, data: updated });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// ======================================================
// DELETE Development
// ======================================================
exports.deleteDevelopment = async (req, res) => {
  try {
    const deleted = await Development.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ success: false, message: "Not found" });
    }

    res.json({ success: true, message: "Deleted successfully" });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
