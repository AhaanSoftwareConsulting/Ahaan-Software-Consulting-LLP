const SocialMedia = require("../models/SocialMediaSQL");
const { deleteCloudinaryImage } = require("../config/cloudinaryHelper");

class SocialMediaController {
  // CREATE
  static async create(req, res) {
    try {
      console.log("========== CREATE SOCIAL MEDIA ==========");
      console.log("BODY:", req.body);
      console.log("FILE:", req.file);

      const { projectName, backgroundColor } = req.body;

      const image = req.file?.path || null;

      if (!image) {
        return res.status(400).json({
          success: false,
          message: "Image is required.",
        });
      }

      if (!projectName) {
        return res.status(400).json({
          success: false,
          message: "Project name is required.",
        });
      }

      if (!backgroundColor) {
        return res.status(400).json({
          success: false,
          message: "Background color is required.",
        });
      }

      const newSocialMedia = await SocialMedia.create({
        image,
        projectName,
        backgroundColor,
      });

      return res.status(201).json({
        success: true,
        message: "Social media post created successfully.",
        data: newSocialMedia,
      });
    } catch (error) {
      console.error("CREATE SOCIAL MEDIA ERROR:");
      console.error(error);

      return res.status(500).json({
        success: false,
        message: error.message || "Internal Server Error",
      });
    }
  }

  // GET ALL
  static async getAll(req, res) {
    try {
      const data = await SocialMedia.findAll({
        order: [["createdAt", "DESC"]],
      });

      return res.status(200).json({
        success: true,
        total: data.length,
        data,
      });
    } catch (error) {
      console.error("GET ALL SOCIAL MEDIA ERROR:");
      console.error(error);

      return res.status(500).json({
        success: false,
        message: error.message || "Internal Server Error",
      });
    }
  }

  // GET ONE
  static async getOne(req, res) {
    try {
      const data = await SocialMedia.findByPk(req.params.id);

      if (!data) {
        return res.status(404).json({
          success: false,
          message: "Social media post not found.",
        });
      }

      return res.status(200).json({
        success: true,
        data,
      });
    } catch (error) {
      console.error("GET SOCIAL MEDIA ERROR:");
      console.error(error);

      return res.status(500).json({
        success: false,
        message: error.message || "Internal Server Error",
      });
    }
  }

  // UPDATE
  static async update(req, res) {
    try {
      console.log("========== UPDATE SOCIAL MEDIA ==========");
      console.log("BODY:", req.body);
      console.log("FILE:", req.file);

      const data = await SocialMedia.findByPk(req.params.id);

      if (!data) {
        return res.status(404).json({
          success: false,
          message: "Social media post not found.",
        });
      }

      const newImage = req.file?.path;

      // If a new image is uploaded,
      // delete the old image from Cloudinary.
      if (newImage && data.image) {
        await deleteCloudinaryImage(data.image);
      }

      await data.update({
        projectName:
          req.body.projectName !== undefined
            ? req.body.projectName
            : data.projectName,

        backgroundColor:
          req.body.backgroundColor !== undefined
            ? req.body.backgroundColor
            : data.backgroundColor,

        image: newImage || data.image,
      });

      return res.status(200).json({
        success: true,
        message: "Social media post updated successfully.",
        data,
      });
    } catch (error) {
      console.error("UPDATE SOCIAL MEDIA ERROR:");
      console.error(error);

      return res.status(500).json({
        success: false,
        message: error.message || "Internal Server Error",
      });
    }
  }

  // DELETE
  static async delete(req, res) {
    try {
      const data = await SocialMedia.findByPk(req.params.id);

      if (!data) {
        return res.status(404).json({
          success: false,
          message: "Social media post not found.",
        });
      }

      // Delete image from Cloudinary
      if (data.image) {
        await deleteCloudinaryImage(data.image);
      }

      await data.destroy();

      return res.status(200).json({
        success: true,
        message: "Social media post deleted successfully.",
      });
    } catch (error) {
      console.error("DELETE SOCIAL MEDIA ERROR:");
      console.error(error);

      return res.status(500).json({
        success: false,
        message: error.message || "Internal Server Error",
      });
    }
  }
}

module.exports = SocialMediaController;