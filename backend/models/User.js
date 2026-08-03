const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { Schema } = mongoose;

const userSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },

    role: {
      type: String,
      enum: ["super_admin", "admin"],
      default: "admin",
    },

    status: {
      type: String,
      enum: ["pending", "approved", "rejected"],
      default: "pending",
    },

    // Only designation — NO PROFILE
    designation: {
      type: String,
      enum: ["web_developer", "designer", "project_manager", "ceo"],
      required: true,
    },

    profilePicture: String,
  },
  { timestamps: true },
);

// Password hashing
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// JWT generator
userSchema.methods.generateJWT = function () {
  return jwt.sign(
    { id: this._id, designation: this.designation },
    process.env.JWT_SECRET,
    { expiresIn: "3d" },
  );
};

module.exports = mongoose.model("User", userSchema);
