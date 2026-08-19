const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("../config/cloudinary");

// Allow only image files
const fileFilter = (req, file, cb) => {
  console.log("========== FILE CHECK ==========");
  console.log("Original name:", file.originalname);
  console.log("Mimetype:", file.mimetype);
  console.log("Field name:", file.fieldname);

  const allowedMimeTypes = [
    "image/jpeg",
    "image/jpg",
    "image/png",
    "image/webp",
    "image/gif",
  ];

  const allowedExtensions = [
    ".jpg",
    ".jpeg",
    ".png",
    ".webp",
    ".gif",
  ];

  const fileExtension = file.originalname
    ? file.originalname.toLowerCase().slice(file.originalname.lastIndexOf("."))
    : "";

  // Accept normal image MIME types
  if (allowedMimeTypes.includes(file.mimetype)) {
    return cb(null, true);
  }

  // Some clients may send application/octet-stream
  // even when the actual file is an image.
  if (
    file.mimetype === "application/octet-stream" &&
    allowedExtensions.includes(fileExtension)
  ) {
    return cb(null, true);
  }

  return cb(new Error("Only image files are allowed"), false);
};


// Dynamic Upload Middleware
const upload = (folderName = "ahaan-uploads") => {
  const storage = new CloudinaryStorage({
    cloudinary,

    params: async (req, file) => {
      let prefix = "file";

      if (file.fieldname === "blog_image") {
        prefix = "blog";
      } else if (file.fieldname === "author_image") {
        prefix = "author";
      } else if (file.fieldname === "image") {
        prefix = "img";
      } else if (file.fieldname === "profile_image") {
        prefix = "user";
      }

      return {
        folder: folderName,

        allowed_formats: [
          "jpg",
          "jpeg",
          "png",
          "webp",
          "gif",
        ],

        public_id: `${prefix}-${Date.now()}`,
      };
    },
  });

  return multer({
    storage,
    fileFilter,

    limits: {
      fileSize: 10 * 1024 * 1024,
    },
  });
};

module.exports = upload;