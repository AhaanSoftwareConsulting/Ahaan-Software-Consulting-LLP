const jwt = require("jsonwebtoken");
const User = require("../models/User");
const bcrypt = require("bcrypt");

// JWT TOKEN GENERATOR
User.prototype.generateJWT = function () {
  return jwt.sign(
    {
      id: this._id,
      role: this.role,
      designation: this.designation,
    },
    process.env.JWT_SECRET,
    { expiresIn: "7d" },
  );
};

// REGISTER
exports.registerUser = async (req, res) => {
  try {
    const { name, email, password, designation } = req.body;

    // ⭐ Cloudinary → file.path gives full image URL
    const profilePicture = req.file ? req.file.path : null;

    const exists = await User.findOne({ email });
    if (exists) return res.status(400).json({ message: "User already exists" });

    // Create user
    const user = await User.create({
      name,
      email,
      password,
      designation,
      profilePicture,
    });

    res.status(201).json({
      message: "Registration successful. Please wait for Super Admin approval.",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        designation: user.designation,
        profilePicture, // already full URL
      },
    });
  } catch (error) {
    console.error("Register Error:", error);
    res.status(500).json({ message: "Server Error" });
  }
};

// LOGIN
exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user)
      return res.status(400).json({ message: "Invalid email or password" });

    const match = await bcrypt.compare(password, user.password);
    if (!match)
      return res.status(400).json({ message: "Invalid email or password" });

    if (user.status === "pending") {
      return res.status(403).json({
        success: false,
        message: "Your account is waiting for Super Admin approval.",
      });
    }

    if (user.status === "rejected") {
      return res.status(403).json({
        success: false,
        message: "Your account has been rejected.",
      });
    }

    const token = user.generateJWT();

    res.status(200).json({
      message: "Login successful",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        status: user.status,
        designation: user.designation,
        profilePicture: user.profilePicture,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
      },
    });
  } catch (error) {
    console.error("Login Error:", error);
    res.status(500).json({ message: "Server Error" });
  }
};

exports.approveUser = async (req, res) => {
  try {
    // Only Super Admin can approve users
    if (req.user.role !== "super_admin") {
      return res.status(403).json({
        success: false,
        message: "Only Super Admin can approve users.",
      });
    }

    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    if (user.status === "approved") {
      return res.status(400).json({
        success: false,
        message: "User is already approved.",
      });
    }

    user.status = "approved";
    await user.save();

    res.status(200).json({
      success: true,
      message: "User approved successfully",
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

exports.rejectUser = async (req, res) => {
  try {
    if (req.user.role !== "super_admin") {
      return res.status(403).json({
        success: false,
        message: "Only Super Admin can reject users.",
      });
    }

    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    if (user.status === "rejected") {
      return res.status(400).json({
        success: false,
        message: "User already rejected.",
      });
    }

    user.status = "rejected";

    await user.save();

    res.json({
      success: true,
      message: "User rejected successfully",
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

// PROFILE
exports.getProfile = async (req, res) => {
  res.json({
    message: "User profile fetched",
    user: req.user,
  });
};

// LOGOUT
exports.logoutUser = (req, res) => {
  res.status(200).json({ message: "Logged out successfully" });
};

exports.getAllUsers = async (req, res) => {
  try {
    if (req.user.role !== "super_admin") {
      return res.status(403).json({
        success: false,
        message: "Only Super Admin can access.",
      });
    }

    const users = await User.find().select("-password");

    res.status(200).json({
      success: true,
      users,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

exports.getUsersByStatus = async (req, res) => {
  try {
    if (req.user.role !== "super_admin") {
      return res.status(403).json({
        success: false,
        message: "Only Super Admin can access.",
      });
    }

    const users = await User.find({
      status: req.params.status,
    }).select("-password");

    res.status(200).json({
      success: true,
      users,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};
