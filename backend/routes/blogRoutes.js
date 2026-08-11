const express = require("express");
const router = express.Router();

const upload = require("../middleware/uploadMiddleware");
const BlogController = require("../controllers/BlogController");

// Blog-এর জন্য নির্দিষ্ট Cloudinary ফোল্ডার 'ahaan-blogs' নির্ধারণ
const blogUpload = upload("ahaan-blogs").fields([
  { name: "blog_image", maxCount: 1 },
  { name: "author_image", maxCount: 1 },
]);

// Create Blog
router.post("/", blogUpload, BlogController.createBlog);

// Get All Blogs
router.get("/", BlogController.getBlogs);

// Get Single Blog
router.get("/:id", BlogController.getBlog);

// Update Blog
router.put("/:id", blogUpload, BlogController.updateBlog);

// Delete Blog
router.delete("/:id", BlogController.deleteBlog);

module.exports = router;