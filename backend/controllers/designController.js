const Design = require("../models/DesignSQL");
const { deleteCloudinaryImage } = require("../config/cloudinaryHelper");

class DesignController {
  // Create Design
  static async create(req, res) {
    try {
      const { title, link, designer, category } = req.body;
      const image = req.file?.path || null;

      if (!image) {
        return res.status(400).json({ success: false, message: "Image is required." });
      }

      const newDesign = await Design.create({
        title,
        link,
        image,
        designer,
        category,
      });

      return res.status(201).json({
        success: true,
        message: "Design created successfully.",
        data: newDesign,
      });
    } catch (error) {
      return res.status(500).json({ success: false, message: error.message });
    }
  }

  // Get All Designs
  static async getAll(req, res) {
    try {
      const data = await Design.findAll({ order: [["createdAt", "DESC"]] });
      return res.status(200).json({ success: true, total: data.length, data });
    } catch (error) {
      return res.status(500).json({ success: false, message: error.message });
    }
  }

  // Get Single Design
  static async getOne(req, res) {
    try {
      const data = await Design.findByPk(req.params.id);
      if (!data) return res.status(404).json({ success: false, message: "Design not found." });

      return res.status(200).json({ success: true, data });
    } catch (error) {
      return res.status(500).json({ success: false, message: error.message });
    }
  }

  // Update Design
  static async update(req, res) {
    try {
      const data = await Design.findByPk(req.params.id);
      if (!data) return res.status(404).json({ success: false, message: "Design not found." });

      const newImage = req.file?.path;

      // New image upload hole Cloudinary theke Old image remove hobe
      if (newImage && data.image) {
        await deleteCloudinaryImage(data.image);
      }

      await data.update({
        title: req.body.title || data.title,
        link: req.body.link !== undefined ? req.body.link : data.link,
        designer: req.body.designer || data.designer,
        category: req.body.category || data.category,
        image: newImage || data.image,
      });

      return res.status(200).json({
        success: true,
        message: "Design updated successfully.",
        data,
      });
    } catch (error) {
      return res.status(500).json({ success: false, message: error.message });
    }
  }

  // Delete Design
  static async delete(req, res) {
    try {
      const data = await Design.findByPk(req.params.id);
      if (!data) return res.status(404).json({ success: false, message: "Design not found." });

      // Cloudinary image remove
      if (data.image) await deleteCloudinaryImage(data.image);

      await data.destroy();

      return res.status(200).json({ success: true, message: "Design deleted successfully." });
    } catch (error) {
      return res.status(500).json({ success: false, message: error.message });
    }
  }
}

module.exports = DesignController;