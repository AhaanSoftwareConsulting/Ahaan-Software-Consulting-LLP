const mongoose = require("mongoose");

const developmentSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    link: { type: String, required: true },
    image: { type: String, required: true }, // Cloudinary URL
    developer: { type: String, required: true }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Development", developmentSchema);
