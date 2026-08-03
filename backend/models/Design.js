const mongoose = require("mongoose");

const designSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    link: { type: String, },
    image: { type: String, required: true }, // Cloudinary URL
    designer: { type: String, required: true },
    category: {
      type: String,
      required: true,
      enum: [
        "electronics",
        "education-books",
        "business-services",
        "cars-motorcycles",
        "sports-outdoors-travel",
        "fashion-beauty",
        "defense-security",
        "it-tech",
        "food-restaurant",
        "entertainment",
        "travel",
        "society-people",
        "medical-healthcare",
        "real-estate",
        "web-banner",
        "business-card",
        "product-label",
        "others",
      ],
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model("Design", designSchema);
