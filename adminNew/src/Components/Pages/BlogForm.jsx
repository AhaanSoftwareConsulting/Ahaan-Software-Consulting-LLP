import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Editor } from "@tinymce/tinymce-react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";
import "./BlogForm.css";

const BlogForm = () => {
  const { register, handleSubmit, reset } = useForm();
  const [content, setContent] = useState("");
  const [imagePreview, setImagePreview] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const navigate = useNavigate();

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    const formData = new FormData();
    formData.append("id", Date.now());
    formData.append("title", data.title);
    formData.append("author", data.author);
    formData.append("content", content);
    formData.append("image", data.image[0]);

    const apiKey = "r1zfinrrh0tqrbcpfar1ovisttlkimq7podofkni7z3rv31s";

console.log("API KEY:", apiKey);

    try {
      const res = await fetch("https://ahaansoftware.com/update-json.php", {
        method: "POST",
        body: formData,
      });
      const result = await res.json();
      if (result.status === "success") {
        toast.success(result.message || "Blog Submitted Successfully");

        reset();
        setContent("");
        setImagePreview(null);
        navigate("/manage-blogs");
      } else {
        toast.error(result.message || "Failed To Submit Blog");
      }
    } catch (error) {
      toast.error(error?.message || "Network Error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container mt-4">
      <div className="blog-form-wrapper">
        <h2 className="form-title"> Add Blog </h2>
        <form onSubmit={handleSubmit(onSubmit)} className="blog-form">
          <div className="form-group">
            <label className="form-label">Title</label>
            <input
              className="form-control styled-input"
              {...register("title", { required: true })}
            />
          </div>
          <div className="form-group">
            <label className="form-label">Author</label>
            <input
              className="form-control styled-input"
              {...register("author", { required: true })}
            />
          </div>
          <div className="form-group">
            <label className="form-label">Upload Image</label>
            <input
              className="form-control styled-input"
              type="file"
              accept="image/*"
              {...register("image", { required: true })}
              onChange={(e) =>
                setImagePreview(URL.createObjectURL(e.target.files[0]))
              }
            />
            {imagePreview && (
              <img
                src={imagePreview}
                alt="Preview"
                className="img-thumbnail mt-2"
                style={{ maxHeight: "150px" }}
              />
            )}
          </div>
          <div className="form-group">
            <label className="form-label">Content</label>
            <Editor
              apiKey="r1zfinrrh0tqrbcpfar1ovisttlkimq7pdoffkni7z3rv31s"
              
              value={content}
              onEditorChange={(newContent) => setContent(newContent)}
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
            {isSubmitting ? "Submitting..." : "Submit Blog"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default BlogForm;
