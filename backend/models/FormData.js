const mongoose = require("mongoose");

const formSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Your name is required"],
    trim: true,
  },

  email: {
    type: String,
    required: [true, "Your email is required"],
    trim: true,
  },

  service: {
    type: String,
    required: true,
    enum: [
      "Web Development",
      "App Development",
      "UI/UX Design",
      "E-Commerce Development",
      "Digital Marketing",
    ],
  },

  budget: {
    type: String,
    required: true,
    enum: ["Below $1000", "$1000 - $5000", "Above $5000"],
  },

  projectDetails: {
    type: String,
    required: true,
    trim: true,
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("FormData", formSchema);
