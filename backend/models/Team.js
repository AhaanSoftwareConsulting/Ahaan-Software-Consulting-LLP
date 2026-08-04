const mongoose = require("mongoose");

const teamSchema = new mongoose.Schema(
  {
    name: { 
      type: String, 
      required: true 
    },
    position: { 
      type: String, 
      required: true 
    },
    description: { 
      type: String, 
      required: true 
    },
    image: { 
      type: String, 
      required: true 
    },
    dateOfBirth: {
      type: Date,
      required: true,
    },
    dateOfJoining: {
      type: Date,
      required: true,
    },
  },
  { timestamps: true }, // <-- ADD THIS
);

module.exports = mongoose.model("Team", teamSchema);
