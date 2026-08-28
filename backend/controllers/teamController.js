const Team = require("../models/TeamSQL");

// CREATE
exports.createTeam = async (req, res) => {
  try {
    const { name, position, description, dateOfBirth, dateOfJoining } = req.body;

    const updateData = {
      name,
      position,
      description,
      dateOfBirth,
      dateOfJoining,
    };

    // Cloudinary ইমেজ হ্যান্ডলিং
    if (req.file) {
      updateData.image = req.file.path;
    } else if (req.body.image) {
      updateData.image = req.body.image;
    }

    const team = await Team.create(updateData);
    res.status(201).json({ success: true, data: team });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// GET ALL
exports.getTeam = async (req, res) => {
  try {
    const teams = await Team.findAll({
      order: [["createdAt", "ASC"]],
    });
    res.status(200).json({ success: true, data: teams });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// GET SINGLE
exports.getSingleTeam = async (req, res) => {
  try {
    const team = await Team.findByPk(req.params.id);

    if (!team) {
      return res.status(404).json({ success: false, message: "Team not found" });
    }

    res.status(200).json({ success: true, data: team });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// UPDATE
exports.updateTeam = async (req, res) => {
  try {
    const team = await Team.findByPk(req.params.id);

    if (!team) {
      return res.status(404).json({ success: false, message: "Team not found" });
    }

    const { name, position, description, dateOfBirth, dateOfJoining } = req.body;

    const updateData = {
      name: name || team.name,
      position: position || team.position,
      description: description || team.description,
      dateOfBirth: dateOfBirth || team.dateOfBirth,
      dateOfJoining: dateOfJoining || team.dateOfJoining,
    };

    if (req.file) {
      updateData.image = req.file.path;
    }

    await team.update(updateData);

    res.status(200).json({ success: true, data: team });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// DELETE
exports.deleteTeam = async (req, res) => {
  try {
    const team = await Team.findByPk(req.params.id);

    if (!team) {
      return res.status(404).json({ success: false, message: "Team not found" });
    }

    await team.destroy();

    res.status(200).json({
      success: true,
      message: "Team member deleted successfully",
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};