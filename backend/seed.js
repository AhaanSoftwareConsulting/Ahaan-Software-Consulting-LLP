require("dotenv").config();

const mongoose = require("mongoose");
const User = require("./models/User");

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.log(err));

const seedSuperAdmin = async () => {
  try {
    // Check by email
    const existing = await User.findOne({
      email: "sugam.ahaansoftware@gmail.com",
    });

    if (existing) {
      console.log("❌ This email already exists.");
      process.exit();
    }

    // DO NOT HASH PASSWORD HERE
    await User.create({
      name: "Sugam Karmakar",
      email: "sugam.ahaansoftware@gmail.com",
      password: "Sugam_ASC@2026",
      designation: "ceo",
      role: "super_admin",
      status: "approved",

      profilePicture:
        "https://res.cloudinary.com/db6pxeuoy/image/upload/v1783511278/Sugam_zeqr4e.webp",
    });

    console.log("🎉 Super Admin Created Successfully");
    process.exit();

  } catch (err) {
    console.error(err);
    process.exit();
  }
};

seedSuperAdmin();