const Test = require("../models/Test");

// Create
exports.createTest = async (req, res) => {
  try {
    const test = await Test.create(req.body);

    res.status(201).json({
      success: true,
      message: "Data saved successfully",
      data: test,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get All
exports.getAllTest = async (req, res) => {
  try {
    const tests = await Test.findAll({
      order: [["id", "DESC"]],
    });

    res.status(200).json({
      success: true,
      data: tests,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};