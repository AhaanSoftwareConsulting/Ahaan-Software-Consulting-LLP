import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./ViewBlog.css";

const ViewBlog = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://ahaansoftware.com/blog-db.json")
      .then((res) => res.json())
      .then((data) => {
        const found = data.find((b) => String(b.id) === id);
        setBlog(found);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error loading blog:", err);
        setLoading(false);
      });
  }, [id]);

  if (loading) return <div className="text-center mt-5">Loading...</div>;

  if (!blog) return <div className="text-center mt-5 text-danger">Blog not found.</div>;

  return (
    <div className="container py-5 view-blog-container">
      {blog.image && (
        <img
          src={
            blog.image.startsWith("http")
              ? blog.image
              : `https://ahaansoftware.com/${blog.image}`
          }
          alt={blog.title}
          className="img-fluid rounded shadow-sm mb-4"
        />
      )}
      <h1 className="fw-bold mb-3">{blog.title}</h1>
      <div className="text-muted mb-4">
        <strong>Author:</strong> {blog.author || "Unknown"} |{" "}
        <strong>Date:</strong>{" "}
        {blog.created_at
          ? new Date(blog.created_at).toLocaleString()
          : "Not available"}
      </div>
      <div
        className="view-blog-content"
        dangerouslySetInnerHTML={{ __html: blog.content }}
      ></div>
    </div>
  );
};

export default ViewBlog;
