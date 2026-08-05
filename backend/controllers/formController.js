const FormData = require("../models/FormData");

exports.saveForm = async (req, res) => {
  try {
    const newEntry = new FormData(req.body);
    await newEntry.save();

    res.status(201).json({
      success: true,
      message: "Form saved successfully!",
      data: newEntry
    });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

exports.getForm = async (req, res) => {
  try {
    const data = await FormData.find().sort({ createdAt: -1 });

    res.json({
      success: true,
      data
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};
