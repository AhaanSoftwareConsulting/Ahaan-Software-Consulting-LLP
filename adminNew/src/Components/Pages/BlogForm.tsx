import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Editor } from "@tinymce/tinymce-react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { createBlogAPI } from "../Api/api";

interface BlogFormData {
  title: string;
  author: string;
  blog_image: FileList;
  author_image?: FileList;
}

const BlogForm: React.FC = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<BlogFormData>({
    defaultValues: {
      author: "Ahaan Software",
    },
  });

  const [content, setContent] = useState<string>("");
  const [blogImagePreview, setBlogImagePreview] = useState<string | null>(null);
  const [authorImagePreview, setAuthorImagePreview] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const navigate = useNavigate();

  const onSubmit = async (data: BlogFormData): Promise<void> => {
    if (!content.trim()) {
      toast.error("Blog content is required!");
      return;
    }

    setIsSubmitting(true);

    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("author", data.author);
    formData.append("content", content);

    if (data.blog_image?.[0]) {
      formData.append("blog_image", data.blog_image[0]);
    }

    if (data.author_image?.[0]) {
      formData.append("author_image", data.author_image[0]);
    }

    try {
      const response = await createBlogAPI(formData);

      if (response.data?.success) {
        toast.success(response.data.message || "Blog created successfully!");
        reset();
        setContent("");
        setBlogImagePreview(null);
        setAuthorImagePreview(null);
        navigate("/manage-blogs");
      } else {
        toast.error(response.data?.message || "Failed to submit blog.");
      }
    } catch (error: any) {
      toast.error(error?.response?.data?.message || error?.message || "Something went wrong!");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full px-4 py-2 sm:px-6">
      <div className="mx-auto w-full max-w-5xl">
        {/* Left Aligned Header & Subheader */}
        <div className="mb-4 text-left">
          <h2 className="text-2xl font-black tracking-tight text-gray-900 sm:text-3xl">
            Add New Blog
          </h2>
          <p className="mt-1 text-sm text-gray-500">
            Create and publish a new article for your website audience.
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Title & Author */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-1 block text-xs font-bold uppercase tracking-wider text-gray-700">
                Title <span className="text-red-500">*</span>
              </label>
              <input
                {...register("title", { required: "Title is required" })}
                placeholder="Enter blog title"
                className="w-full rounded-xl border border-gray-300 bg-white px-4 py-2 text-sm text-gray-900 outline-none transition focus:border-yellow-500 focus:ring-2 focus:ring-yellow-300"
              />
              {errors.title && (
                <p className="mt-1 text-xs text-red-500">{errors.title.message}</p>
              )}
            </div>

            <div>
              <label className="mb-1 block text-xs font-bold uppercase tracking-wider text-gray-700">
                Author <span className="text-red-500">*</span>
              </label>
              <input
                {...register("author", { required: "Author is required" })}
                placeholder="Enter author name"
                className="w-full rounded-xl border border-gray-300 bg-white px-4 py-2 text-sm text-gray-900 outline-none transition focus:border-yellow-500 focus:ring-2 focus:ring-yellow-300"
              />
              {errors.author && (
                <p className="mt-1 text-xs text-red-500">{errors.author.message}</p>
              )}
            </div>
          </div>

          {/* Image Uploads */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-1 block text-xs font-bold uppercase tracking-wider text-gray-700">
                Blog Banner Image <span className="text-red-500">*</span>
              </label>
              <div className="flex items-center justify-between gap-2 rounded-xl border border-dashed border-gray-300 bg-white p-2">
                <input
                  type="file"
                  accept="image/*"
                  {...register("blog_image", { required: "Blog image is required" })}
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) setBlogImagePreview(URL.createObjectURL(file));
                  }}
                  className="w-full text-xs text-gray-500 file:mr-2 file:rounded-lg file:border-0 file:bg-black file:px-3 file:py-1.5 file:text-xs file:font-semibold file:text-[#EBB428] hover:file:bg-gray-800 cursor-pointer"
                />
                {blogImagePreview && (
                  <img
                    src={blogImagePreview}
                    alt="Blog Preview"
                    className="h-10 w-14 flex-shrink-0 rounded object-cover border"
                  />
                )}
              </div>
              {errors.blog_image && (
                <p className="mt-1 text-xs text-red-500">{errors.blog_image.message}</p>
              )}
            </div>

            <div>
              <label className="mb-1 block text-xs font-bold uppercase tracking-wider text-gray-700">
                Author Profile Image (Optional)
              </label>
              <div className="flex items-center justify-between gap-2 rounded-xl border border-dashed border-gray-300 bg-white p-2">
                <input
                  type="file"
                  accept="image/*"
                  {...register("author_image")}
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) setAuthorImagePreview(URL.createObjectURL(file));
                  }}
                  className="w-full text-xs text-gray-500 file:mr-2 file:rounded-lg file:border-0 file:bg-black file:px-3 file:py-1.5 file:text-xs file:font-semibold file:text-[#EBB428] hover:file:bg-gray-800 cursor-pointer"
                />
                {authorImagePreview && (
                  <img
                    src={authorImagePreview}
                    alt="Author Preview"
                    className="h-9 w-9 flex-shrink-0 rounded-full object-cover border"
                  />
                )}
              </div>
            </div>
          </div>

          {/* Editor */}
          <div>
            <label className="mb-1 block text-xs font-bold uppercase tracking-wider text-gray-700">
              Content <span className="text-red-500">*</span>
            </label>
            <div className="overflow-hidden rounded-xl border border-gray-300 bg-white shadow-sm">
              <Editor
                apiKey="r1zfinrrh0tqrbcpfar1ovisttlkimq7pdoffkni7z3rv31s"
                value={content}
                onEditorChange={(newContent) => setContent(newContent)}
                init={{
                  height: 220,
                  menubar: false,
                  plugins: [
                    "advlist autolink lists link image charmap preview anchor",
                    "searchreplace visualblocks code fullscreen",
                    "insertdatetime media table code help wordcount",
                  ],
                  toolbar:
                    "undo redo | formatselect | bold italic underline | alignleft aligncenter alignright alignjustify | bullist numlist | link image table | code",
                  content_style:
                    "body { font-family: Outfit, sans-serif; font-size:14px }",
                }}
              />
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full rounded-xl bg-black px-6 py-3 text-sm font-bold uppercase tracking-widest text-[#EBB428] transition hover:bg-gray-900 disabled:cursor-not-allowed disabled:opacity-70 shadow-md"
          >
            {isSubmitting ? "Submitting..." : "Submit Blog"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default BlogForm;