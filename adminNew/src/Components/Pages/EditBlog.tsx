import { useEffect, useState, type ChangeEvent, type FormEvent } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { Editor } from "@tinymce/tinymce-react";
import { toast } from "react-toastify";

interface Blog {
  id: string;
  title: string;
  author: string;
  content: string;
  image: string;
}

interface BlogResponse extends Blog {
  created_at?: string;
}

const EditBlog = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [blog, setBlog] = useState<Blog>({
    id: "",
    title: "",
    author: "",
    content: "",
    image: "",
  });

  const [imageFile, setImageFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const loadBlog = async () => {
      try {
        const res = await axios.get<BlogResponse[]>(
          "https://ahaansoftware.com/blog-db.json"
        );

        const matched = res.data.find(
          (item) => String(item.id) === String(id)
        );

        if (!matched) {
          toast.error("Blog Not Found");

          setTimeout(() => {
            navigate("/manage-blogs");
          }, 1000);

          return;
        }

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
            : `https://ahaansoftware.com/${matched.image}`
        );
      } catch (error: any) {
        toast.error(
          error?.response?.data?.message ??
            "Failed To Load Blog"
        );
      }
    };

    loadBlog();
  }, [id, navigate]);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = e.target;

    setBlog((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleEditorChange = (
    content: string
  ) => {
    setBlog((prev) => ({
      ...prev,
      content,
    }));
  };

  const handleImageChange = (
    e: ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];

    if (!file) return;

    setImageFile(file);
    setPreviewUrl(URL.createObjectURL(file));
  };

  const handleSubmit = async (
    e: FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    if (!blog.id) return;

    setIsSubmitting(true);

    try {
      const formData = new FormData();

      formData.append("id", blog.id);
      formData.append("title", blog.title);
      formData.append("author", blog.author);
      formData.append("content", blog.content);

      if (imageFile) {
        formData.append("image", imageFile);
      }

      const res = await axios.post(
        "https://ahaansoftware.com/update-json.php",
        formData
      );

      if (res.data.status === "success") {
        toast.success(
          res.data.message ??
            "Blog Updated Successfully"
        );

        setTimeout(() => {
          navigate("/manage-blogs");
        }, 1000);
      } else {
        toast.error(
          res.data.message ??
            "Failed To Update Blog"
        );
      }
    } catch (error: any) {
      toast.error(
        error?.response?.data?.message ??
          "Network / Server Error"
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="mx-auto max-w-5xl px-4 py-8">
      <div className="rounded-2xl border border-yellow-200 bg-[#FCFCF5] p-6 shadow-xl md:p-8">
        <h2 className="mb-8 text-center text-3xl font-bold text-black">
          Edit Blog
        </h2>

        <form
          onSubmit={handleSubmit}
          className="space-y-6"
        >
          {/* Title */}

          <div>
            <label className="mb-2 block font-semibold">
              Title
            </label>

            <input
              type="text"
              name="title"
              value={blog.title}
              onChange={handleChange}
              required
              className="w-full rounded-full border border-gray-300 px-5 py-3 outline-none transition focus:border-yellow-500 focus:ring-4 focus:ring-yellow-200"
            />
          </div>

          {/* Author */}

          <div>
            <label className="mb-2 block font-semibold">
              Author
            </label>

            <input
              type="text"
              name="author"
              value={blog.author}
              onChange={handleChange}
              required
              className="w-full rounded-full border border-gray-300 px-5 py-3 outline-none transition focus:border-yellow-500 focus:ring-4 focus:ring-yellow-200"
            />
          </div>

          {/* Image */}

          <div>
            <label className="mb-2 block font-semibold">
              Upload Image
            </label>

            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="block w-full rounded-xl border border-gray-300 p-3 file:mr-4 file:rounded-lg file:border-0 file:bg-yellow-500 file:px-4 file:py-2 file:text-white hover:file:bg-yellow-600"
            />

            {previewUrl && (
              <img
                src={previewUrl}
                alt="Preview"
                className="mt-5 max-h-56 rounded-xl border object-cover shadow"
              />
            )}
          </div>

          {/* TinyMCE */}

          <div>
            <label className="mb-2 block font-semibold">
              Content
            </label>

            <div className="overflow-hidden rounded-xl border">
              <Editor
                apiKey="YOUR_TINYMCE_API_KEY"
                value={blog.content}
                onEditorChange={handleEditorChange}
                init={{
                  height: 350,
                  menubar: true,
                  plugins: [
                    "advlist autolink lists link image charmap preview anchor",
                    "searchreplace visualblocks code fullscreen",
                    "insertdatetime media table code help wordcount",
                  ],
                  toolbar:
                    "undo redo | formatselect | bold italic underline | alignleft aligncenter alignright alignjustify | bullist numlist | link image table | code",
                }}
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full rounded-full bg-black px-6 py-4 font-semibold uppercase tracking-wide text-[#EBB428] transition hover:bg-neutral-800 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isSubmitting
              ? "Updating..."
              : "Update Blog"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditBlog;