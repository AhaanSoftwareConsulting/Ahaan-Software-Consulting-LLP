const cloudinary = require("../config/cloudinary");

/**
 * Cloudinary URL থেকে Public ID বের করে ছবি Delete করার ফাংশন
 * @param {string} imageUrl - Database-এ থাকা পুরো Cloudinary URL
 */
const deleteCloudinaryImage = async (imageUrl) => {
  if (!imageUrl || !imageUrl.includes("cloudinary.com")) return;

  try {
    const parts = imageUrl.split("/");
    const uploadIndex = parts.indexOf("upload");

    if (uploadIndex === -1) return;

    const pathParts = parts.slice(uploadIndex + 1);
    if (pathParts[0].startsWith("v") && !isNaN(pathParts[0].substring(1))) {
      pathParts.shift();
    }

    const fullPublicIdWithExt = pathParts.join("/");
    const publicId = fullPublicIdWithExt.substring(0, fullPublicIdWithExt.lastIndexOf("."));

    await cloudinary.uploader.destroy(publicId);
  } catch (error) {
    console.error("Error deleting image from Cloudinary:", error);
  }
};

module.exports = { deleteCloudinaryImage };