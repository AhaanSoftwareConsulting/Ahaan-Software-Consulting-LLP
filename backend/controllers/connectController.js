const connect = require("../models/ConnectSQL");

// Save form
exports.saveForm = async (req, res) => {
  try {
    const { name, email, service, budget, projectDetails } = req.body;

    const newEntry = await connect.create({
      name,
      email,
      service,
      budget,
      projectDetails,
    });

    res.status(201).json({
      success: true,
      message: "Form saved successfully!",
      data: newEntry,
    });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

// Get all forms
exports.getForm = async (req, res) => {
  try {
    const data = await connect.findAll({
      order: [["createdAt", "DESC"]],
    });

    res.json({
      success: true,
      data,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

// Get total count
exports.getFormCount = async (req, res) => {
  try {
    const total = await connect.count();
    res.json({ total });
  } catch (error) {
    console.error("Count Error:", error);
    res.status(500).json({ message: "Error fetching count" });
  }
};