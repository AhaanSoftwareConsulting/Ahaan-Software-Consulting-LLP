const Design = require("../models/Design");

// Create Design (Add)
exports.createDesign = async (req, res) => {
  try {
    const { title, link, designer, category } = req.body;

    if (!title || !designer || !category) {
      return res.status(400).json({
        success: false,
        message: "Title, Link & Designer are required",
      });
    }

    if (!req.file) {
      return res.status(400).json({ success: false, message: "Image is required" });
    }

    const image = req.file.path;

    const newDesign = await Design.create({
      title,
      link,
      designer,   // NEW FIELD
      category,
      image,
    });

    res.status(201).json({
      success: true,
      message: "Design saved successfully",
      data: newDesign,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update Design by ID
exports.updateDesign = async (req, res) => {
  try {
    const designId = req.params.id;
    const { title, link, designer, category } = req.body;

    let updateData = {
      title,
      link,
      designer,   // NEW FIELD
      category,
    };

    if (req.file) {
      updateData.image = req.file.path;
    }

    const updatedDesign = await Design.findByIdAndUpdate(
      designId,
      updateData,
      { new: true, runValidators: true }
    );

    if (!updatedDesign) {
      return res.status(404).json({ message: "Design not found" });
    }

    res.json({
      success: true,
      message: "Design updated successfully",
      data: updatedDesign,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Delete Design
exports.deleteDesign = async (req, res) => {
  try {
    const designId = req.params.id;

    const deleted = await Design.findByIdAndDelete(designId);

    if (!deleted) {
      return res.status(404).json({ message: "Design not found" });
    }

    res.json({
      success: true,
      message: "Design deleted successfully",
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get single by ID
exports.getDesignById = async (req, res) => {
  try {
    const design = await Design.findById(req.params.id);

    if (!design) {
      return res.status(404).json({ message: "Design not found" });
    }

    res.json({ success: true, data: design });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get All Designs
exports.getAllDesigns = async (req, res) => {
  try {

    const { category } = req.query;

    let query = {};

    if (category && category !== "All works") {
      query.category = category;
    }

    const designs = await Design.find(query).sort({ createdAt: -1 });

    res.json({
      success: true,
      data: designs,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
