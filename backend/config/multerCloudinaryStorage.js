const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("./cloudinary");

/**
 * This is the missing piece: multer's `storage` option needs an actual
 * storage ENGINE (with _handleFile/_removeFile), not the raw Cloudinary
 * SDK client. multer-storage-cloudinary bridges the two — it uploads
 * the incoming file stream directly to Cloudinary and gives multer back
 * a `req.file` object whose `.path` is the resulting Cloudinary URL.
 */
const profileAvatarStorage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "profiles/avatars",
    allowed_formats: ["jpg", "jpeg", "png", "webp"],
    // Optional: keep uploaded avatars reasonably sized
    transformation: [{ width: 500, height: 500, crop: "limit" }],
  },
});

module.exports = profileAvatarStorage;