const Blog = require("../models/BlogSQL");
const { deleteCloudinaryImage } = require("../config/cloudinaryHelper");

class BlogController {
  // ==========================
  // Create Blog
  // ==========================
  static async createBlog(req, res) {
    try {
      const {
        title,
        author,
        content,
        thumbs_up,
        love,
        created_at,
      } = req.body;

      const blogImage = req.files?.blog_image?.[0]?.path || null;
      const authorImage = req.files?.author_image?.[0]?.path || null;

      const blog = await Blog.create({
        title,
        author,
        content,
        image: blogImage,
        author_image: authorImage,
        thumbs_up: thumbs_up || 0,
        love: love || 0,
        created_at: created_at || new Date(),
      });

      return res.status(201).json({
        success: true,
        message: "Blog created successfully.",
        data: blog,
      });
    } catch (error) {
      console.error(error);

      return res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  }

  // ==========================
  // Get All Blogs
  // ==========================
  static async getBlogs(req, res) {
    try {
      const blogs = await Blog.findAll({
        order: [["createdAt", "DESC"]],
      });

      return res.status(200).json({
        success: true,
        total: blogs.length,
        data: blogs,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  }

  // ==========================
  // Get Single Blog
  // ==========================
  static async getBlog(req, res) {
    try {
      const blog = await Blog.findByPk(req.params.id);

      if (!blog) {
        return res.status(404).json({
          success: false,
          message: "Blog not found.",
        });
      }

      return res.status(200).json({
        success: true,
        data: blog,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  }

  // ==========================
  // Update Blog
  // ==========================
  static async updateBlog(req, res) {
    try {
      const blog = await Blog.findByPk(req.params.id);

      if (!blog) {
        return res.status(404).json({
          success: false,
          message: "Blog not found.",
        });
      }

      const newBlogImage = req.files?.blog_image?.[0]?.path;
      const newAuthorImage = req.files?.author_image?.[0]?.path;

      // নতুন ছবি আপলোড হলে Cloudinary থেকে পুরোনো ছবি মুছে ফেলা হবে
      if (newBlogImage && blog.image) {
        await deleteCloudinaryImage(blog.image);
      }

      if (newAuthorImage && blog.author_image) {
        await deleteCloudinaryImage(blog.author_image);
      }

      await blog.update({
        title: req.body.title || blog.title,
        author: req.body.author || blog.author,
        content: req.body.content || blog.content,
        image: newBlogImage || blog.image,
        author_image: newAuthorImage || blog.author_image,
        thumbs_up:
          req.body.thumbs_up !== undefined
            ? req.body.thumbs_up
            : blog.thumbs_up,
        love:
          req.body.love !== undefined
            ? req.body.love
            : blog.love,
        created_at: req.body.created_at || blog.created_at,
      });

      return res.status(200).json({
        success: true,
        message: "Blog updated successfully.",
        data: blog,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  }

  // ==========================
  // Delete Blog
  // ==========================
  static async deleteBlog(req, res) {
    try {
      const blog = await Blog.findByPk(req.params.id);

      if (!blog) {
        return res.status(404).json({
          success: false,
          message: "Blog not found.",
        });
      }

      // Cloudinary থেকে দুটো ছবিই Delete করে দেওয়া হচ্ছে
      if (blog.image) await deleteCloudinaryImage(blog.image);
      if (blog.author_image) await deleteCloudinaryImage(blog.author_image);

      await blog.destroy();

      return res.status(200).json({
        success: true,
        message: "Blog deleted successfully.",
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  }
}

module.exports = BlogController;