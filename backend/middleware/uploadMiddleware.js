const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("../config/cloudinary");

// ⭐ Cloudinary Storage Configuration
const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "ahaan-users", // Cloudinary folder name
    allowed_formats: ["jpg", "jpeg", "png", "webp"],
    public_id: (req, file) => `user-${Date.now()}`, // filename on cloud
  },
});

// ⭐ Allow only images
const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image/")) {
    cb(null, true);
  } else {
    cb(new Error("Only image files are allowed"), false);
  }
};

// ⭐ multer instance
const upload = multer({ storage, fileFilter });

module.exports = upload;

