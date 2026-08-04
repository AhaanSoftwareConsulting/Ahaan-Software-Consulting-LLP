import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { Editor } from "@tinymce/tinymce-react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./EditBlog.css";

const EditBlog = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [blog, setBlog] = useState({
    id: "",
    title: "",
    author: "",
    content: "",
    image: "",
  });

  const [imageFile, setImageFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    axios
      .get("https://ahaansoftware.com/blog-db.json")
      .then((res) => {
        const matched = res.data.find((b) => String(b.id) === id);
        if (matched) {
          setBlog({
            id: matched.id,
            title: matched.title,
            author: matched.author,
            content: matched.content,
            image: matched.image,
          });
          setPreviewUrl(
            matched.image?.startsWith("http")
              ? matched.image
              : `https://ahaansoftware.com/${matched.image}`,
          );
        } else {
          toast.error("Blog Not Found");

          setTimeout(() => {
            navigate("/manage-blogs");
          }, 1000);
        }
      })
      .catch((err) => {
        console.error("Error loading blog:", err);
      });
  }, [id, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBlog((prev) => ({ ...prev, [name]: value }));
  };

  const handleEditorChange = (content) => {
    setBlog((prev) => ({ ...prev, content }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImageFile(file);
    setPreviewUrl(URL.createObjectURL(file));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!blog.id) return alert("Blog ID missing");

    setIsSubmitting(true);

    const formData = new FormData();
    formData.append("id", blog.id);
    formData.append("title", blog.title);
    formData.append("author", blog.author);
    formData.append("content", blog.content);
    if (imageFile) formData.append("image", imageFile);

    try {
      const res = await axios.post(
        "https://ahaansoftware.com/update-json.php",
        formData,
      );
      if (res.data.status === "success") {
        toast.success(res.data.message || "Blog Updated Successfully");

        setTimeout(() => {
          navigate("/manage-blogs");
        }, 1000);
      } else {
        toast.error(res.data.message || "Failed To Update Blog");
      }
    } catch (err) {
      console.error("Update failed:", err);

      toast.error(err.response?.data?.message || "Network / Server Error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container mt-4 pb-5">
      <div className="blog-form-wrapper">
        <h2 className="form-title">Tweak</h2>
        <form onSubmit={handleSubmit} className="blog-form">
          <div className="form-group">
            <label className="form-label">Title</label>
            <input
              className="form-control styled-input"
              name="title"
              value={blog.title}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label className="form-label">Author</label>
            <input
              className="form-control styled-input"
              name="author"
              value={blog.author}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label className="form-label">Upload Image</label>
            <input
              className="form-control styled-input"
              type="file"
              accept="image/*"
              onChange={handleImageChange}
            />
            {previewUrl && (
              <img
                src={previewUrl}
                alt="Preview"
                className="img-thumbnail mt-2"
                style={{ maxHeight: "150px" }}
              />
            )}
          </div>
          <div className="form-group">
            <label className="form-label">Content</label>
            <Editor
              apiKey="am0ed4z2fbqy58z28jljxlbija11pzhb7v312hypbfhvcy2b"
              value={blog.content}
              onEditorChange={handleEditorChange}
              init={{
                height: 300,
                menubar: true,
                plugins: [
                  "advlist autolink lists link image charmap preview anchor",
                  "searchreplace visualblocks code fullscreen",
                  "insertdatetime media table code help wordcount",
                ],
                toolbar:
                  "undo redo | formatselect | bold italic underline | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link image table | code",
              }}
            />
          </div>
          <button
            type="submit"
            className="submit-button mt-3"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Updating..." : "Update Blog"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditBlog;
