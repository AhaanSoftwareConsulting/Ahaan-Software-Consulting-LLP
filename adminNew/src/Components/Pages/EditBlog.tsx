import { useEffect, useState, type ChangeEvent, type FormEvent } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Editor } from "@tinymce/tinymce-react";
import { toast } from "react-toastify";
import { getBlogByIdAPI, updateBlogAPI } from "../Api/api";

interface BlogState {
  id: string;
  title: string;
  author: string;
  content: string;
  image: string;
  author_image: string;
}

const EditBlog = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [blog, setBlog] = useState<BlogState>({
    id: "",
    title: "",
    author: "",
    content: "",
    image: "",
    author_image: "",
  });

  const [blogImageFile, setBlogImageFile] = useState<File | null>(null);
  const [authorImageFile, setAuthorImageFile] = useState<File | null>(null);

  const [blogImagePreview, setBlogImagePreview] = useState<string>("");
  const [authorImagePreview, setAuthorImagePreview] = useState<string>("");

  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  useEffect(() => {
    if (!id) return;

    const loadBlog = async () => {
      setIsLoading(true);
      try {
        const res = await getBlogByIdAPI(id);

        if (res.data?.success && res.data?.data) {
          const data = res.data.data;
          setBlog({
            id: String(data.id),
            title: data.title || "",
            author: data.author || "",
            content: data.content || "",
            image: data.image || "",
            author_image: data.author_image || "",
          });

          if (data.image) setBlogImagePreview(data.image);
          if (data.author_image) setAuthorImagePreview(data.author_image);
        } else {
          toast.error("Blog not found!");
          navigate("/manage-blogs");
        }
      } catch (error: any) {
        toast.error(
          error?.response?.data?.message || "Failed to load blog data"
        );
        navigate("/manage-blogs");
      } finally {
        setIsLoading(false);
      }
    };

    loadBlog();
  }, [id, navigate]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setBlog((prev) => ({ ...prev, [name]: value }));
  };

  const handleEditorChange = (content: string) => {
    setBlog((prev) => ({ ...prev, content }));
  };

  const handleBlogImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setBlogImageFile(file);
    setBlogImagePreview(URL.createObjectURL(file));
  };

  const handleAuthorImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setAuthorImageFile(file);
    setAuthorImagePreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!blog.id) return;
    if (!blog.content.trim()) {
      toast.error("Blog content is required!");
      return;
    }

    setIsSubmitting(true);

    try {
      const formData = new FormData();
      formData.append("title", blog.title);
      formData.append("author", blog.author);
      formData.append("content", blog.content);

      if (blogImageFile) {
        formData.append("blog_image", blogImageFile);
      }

      if (authorImageFile) {
        formData.append("author_image", authorImageFile);
      }

      const res = await updateBlogAPI(blog.id, formData);

      if (res.data?.success) {
        toast.success(res.data.message || "Blog updated successfully!");
        navigate("/manage-blogs");
      } else {
        toast.error(res.data?.message || "Failed to update blog.");
      }
    } catch (error: any) {
      toast.error(
        error?.response?.data?.message || "Error updating blog post"
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex h-64 flex-col items-center justify-center space-y-3">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-yellow-500 border-t-transparent"></div>
        <p className="text-sm font-medium text-gray-500">Loading blog details...</p>
      </div>
    );
  }

  return (
    <div className="w-full px-4 py-2 sm:px-6">
      <div className="mx-auto w-full max-w-5xl">
        {/* Left Aligned Header */}
        <div className="mb-4 text-left">
          <h2 className="text-2xl font-black tracking-tight text-gray-900 sm:text-3xl">
            Edit Blog Post
          </h2>
          <p className="mt-1 text-sm text-gray-500">
            Update article details, author info, or banner media.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Title & Author Row */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-1 block text-xs font-bold uppercase tracking-wider text-gray-700">
                Title <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="title"
                value={blog.title}
                onChange={handleChange}
                required
                placeholder="Enter blog title"
                className="w-full rounded-xl border border-gray-300 bg-white px-4 py-2 text-sm text-gray-900 outline-none transition focus:border-yellow-500 focus:ring-2 focus:ring-yellow-300"
              />
            </div>

            <div>
              <label className="mb-1 block text-xs font-bold uppercase tracking-wider text-gray-700">
                Author <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="author"
                value={blog.author}
                onChange={handleChange}
                required
                placeholder="Enter author name"
                className="w-full rounded-xl border border-gray-300 bg-white px-4 py-2 text-sm text-gray-900 outline-none transition focus:border-yellow-500 focus:ring-2 focus:ring-yellow-300"
              />
            </div>
          </div>

          {/* Image Uploads Row */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {/* Banner Image */}
            <div>
              <label className="mb-1 block text-xs font-bold uppercase tracking-wider text-gray-700">
                Update Banner Image
              </label>
              <div className="flex items-center justify-between gap-2 rounded-xl border border-dashed border-gray-300 bg-white p-2">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleBlogImageChange}
                  className="w-full text-xs text-gray-500 file:mr-2 file:rounded-lg file:border-0 file:bg-black file:px-3 file:py-1.5 file:text-xs file:font-semibold file:text-[#EBB428] hover:file:bg-gray-800 cursor-pointer"
                />
                {blogImagePreview && (
                  <img
                    src={blogImagePreview}
                    alt="Banner Preview"
                    className="h-10 w-14 flex-shrink-0 rounded object-cover border"
                  />
                )}
              </div>
            </div>

            {/* Author Image */}
            <div>
              <label className="mb-1 block text-xs font-bold uppercase tracking-wider text-gray-700">
                Update Author Image
              </label>
              <div className="flex items-center justify-between gap-2 rounded-xl border border-dashed border-gray-300 bg-white p-2">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleAuthorImageChange}
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

          {/* TinyMCE Content Editor */}
          <div>
            <label className="mb-1 block text-xs font-bold uppercase tracking-wider text-gray-700">
              Content <span className="text-red-500">*</span>
            </label>
            <div className="overflow-hidden rounded-xl border border-gray-300 bg-white shadow-sm">
              <Editor
                apiKey="r1zfinrrh0tqrbcpfar1ovisttlkimq7pdoffkni7z3rv31s"
                value={blog.content}
                onEditorChange={handleEditorChange}
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

          {/* Buttons */}
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => navigate("/manage-blogs")}
              className="w-1/3 rounded-xl border border-gray-300 bg-white py-3 text-xs font-bold uppercase tracking-wider text-gray-700 transition hover:bg-gray-50"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-2/3 rounded-xl bg-black py-3 text-xs font-bold uppercase tracking-wider text-[#EBB428] shadow-md transition hover:bg-gray-900 disabled:cursor-not-allowed disabled:opacity-70"
            >
              {isSubmitting ? "Updating..." : "Update Blog"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditBlog;