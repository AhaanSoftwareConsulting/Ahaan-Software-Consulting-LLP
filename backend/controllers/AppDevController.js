const AppDev = require("../models/AppDevSQL");
const { deleteCloudinaryImage } = require("../config/cloudinaryHelper");

class AppDevController {
  // Create App Development
  static async create(req, res) {
    try {

       const { projectName } = req.body;
      const image = req.file?.path || null;

      if (!projectName) {
        return res.status(400).json({
          success: false,
          message: "Project name is required.",
        });
      }

      if (!image) {
        return res.status(400).json({
          success: false,
          message: "Image is required.",
        });
      }

      const newAppDev = await AppDev.create({
        image,
        projectName,
      });

      return res.status(201).json({
        success: true,
        message: "App development image created successfully.",
        data: newAppDev,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  }

  // Get All App Development Images
  static async getAll(req, res) {
    try {
      const data = await AppDev.findAll({
        order: [["createdAt", "DESC"]],
      });

      return res.status(200).json({
        success: true,
        total: data.length,
        data,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  }

  // Get Single App Development Image
  static async getOne(req, res) {
    try {
      const data = await AppDev.findByPk(req.params.id);

      if (!data) {
        return res.status(404).json({
          success: false,
          message: "App development image not found.",
        });
      }

      return res.status(200).json({
        success: true,
        data,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  }

  // Update App Development Image
  static async update(req, res) {
    try {
      const data = await AppDev.findByPk(req.params.id);

      if (!data) {
        return res.status(404).json({
          success: false,
          message: "App development image not found.",
        });
      }

      const newImage = req.file?.path;

      // Delete old Cloudinary image if a new image is uploaded
      if (newImage && data.image) {
        await deleteCloudinaryImage(data.image);
      }

      await data.update({
        
        projectName:
          req.body.projectName !== undefined
            ? req.body.projectName
            : data.projectName,


        image: newImage || data.image,
      });

      return res.status(200).json({
        success: true,
        message: "App development image updated successfully.",
        data,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  }

  // Delete App Development Image
  static async delete(req, res) {
    try {
      const data = await AppDev.findByPk(req.params.id);

      if (!data) {
        return res.status(404).json({
          success: false,
          message: "App development image not found.",
        });
      }

      // Delete image from Cloudinary
      if (data.image) {
        await deleteCloudinaryImage(data.image);
      }

      await data.destroy();

      return res.status(200).json({
        success: true,
        message: "App development image deleted successfully.",
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  }
}

module.exports = AppDevController;