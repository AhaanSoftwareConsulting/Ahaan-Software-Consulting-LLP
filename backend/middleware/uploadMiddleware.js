const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("../config/cloudinary");

// Allow only images
const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image/")) {
    cb(null, true);
  } else {
    cb(new Error("Only image files are allowed"), false);
  }
};

// Dynamic Upload Middleware (পাস করা folderName অনুযায়ী Dynamic Folder তৈরি হবে)
const upload = (folderName = "ahaan-uploads") => {
  const storage = new CloudinaryStorage({
    cloudinary,
    params: async (req, file) => {
      let prefix = "file";

      if (file.fieldname === "blog_image") prefix = "blog";
      else if (file.fieldname === "author_image") prefix = "author";
      else if (file.fieldname === "image") prefix = "img";
      else if (file.fieldname === "profile_image") prefix = "user";

      return {
        folder: folderName, // Cloudinary Specific Folder (e.g., 'ahaan-blogs')
        allowed_formats: ["jpg", "jpeg", "png", "webp"],
        public_id: `${prefix}-${Date.now()}`,
      };
    },
  });

  return multer({
    storage,
    fileFilter,
  });
};

module.exports = upload;