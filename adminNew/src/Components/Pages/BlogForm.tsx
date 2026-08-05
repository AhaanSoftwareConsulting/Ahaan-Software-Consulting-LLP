import { useState } from "react";
import { useForm } from "react-hook-form";
import { Editor } from "@tinymce/tinymce-react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

interface BlogFormData {
  title: string;
  author: string;
  image: FileList;
}

const BlogForm: React.FC = () => {
  const { register, handleSubmit, reset } = useForm<BlogFormData>();

  const [content, setContent] = useState<string>("");
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const navigate = useNavigate();

  const onSubmit = async (
    data: BlogFormData
  ): Promise<void> => {
    setIsSubmitting(true);

    const formData = new FormData();

    formData.append("id", Date.now().toString());
    formData.append("title", data.title);
    formData.append("author", data.author);
    formData.append("content", content);

    if (data.image?.[0]) {
      formData.append("image", data.image[0]);
    }

    try {
      const res = await fetch(
        "https://ahaansoftware.com/update-json.php",
        {
          method: "POST",
          body: formData,
        }
      );

      const result = await res.json();

      if (result.status === "success") {
        toast.success(
          result.message || "Blog Submitted Successfully"
        );

        reset();
        setContent("");
        setImagePreview(null);

        navigate("/manage-blogs");
      } else {
        toast.error(
          result.message || "Failed To Submit Blog"
        );
      }
    } catch (error: any) {
      toast.error(error?.message || "Network Error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 px-4 py-6 sm:px-6 lg:px-8">
      <div className="mx-auto w-full max-w-4xl rounded-3xl border border-yellow-100 bg-[#FCFCF5] p-6 shadow-xl sm:p-8 lg:p-10">
        <h2 className="mb-8 text-center text-2xl font-bold text-black sm:text-3xl">
          Add Blog
        </h2>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-6"
        >
          {/* Title */}
          <div>
            <label className="mb-2 block font-semibold text-gray-800">
              Title
            </label>

            <input
              {...register("title", {
                required: "Title is required",
              })}
              className="w-full rounded-full border border-gray-300 bg-transparent px-5 py-3 outline-none transition focus:border-yellow-500 focus:ring-4 focus:ring-yellow-200"
            />
          </div>

          {/* Author */}
          <div>
            <label className="mb-2 block font-semibold text-gray-800">
              Author
            </label>

            <input
              {...register("author", {
                required: "Author is required",
              })}
              className="w-full rounded-full border border-gray-300 bg-transparent px-5 py-3 outline-none transition focus:border-yellow-500 focus:ring-4 focus:ring-yellow-200"
            />
          </div>

          {/* Image Upload */}
          <div>
            <label className="mb-2 block font-semibold text-gray-800">
              Upload Image
            </label>

            <input
              type="file"
              accept="image/*"
              {...register("image", {
                required: "Image is required",
              })}
              onChange={(e) => {
                const file = e.target.files?.[0];

                if (file) {
                  setImagePreview(
                    URL.createObjectURL(file)
                  );
                }
              }}
              className="block w-full cursor-pointer rounded-xl border border-dashed border-gray-300 bg-white p-4 file:mr-4 file:rounded-full file:border-0 file:bg-black file:px-5 file:py-2 file:text-sm file:font-semibold file:text-[#EBB428] hover:file:bg-gray-900"
            />

            {imagePreview && (
              <div className="mt-4 flex justify-center">
                <img
                  src={imagePreview}
                  alt="Preview"
                  className="max-h-48 rounded-xl border border-gray-200 object-cover shadow-md"
                />
              </div>
            )}
          </div>

          {/* Content */}
          <div>
            <label className="mb-2 block font-semibold text-gray-800">
              Content
            </label>

            <div className="overflow-hidden rounded-2xl border border-gray-300 bg-white">
              <Editor
                 apiKey="r1zfinrrh0tqrbcpfar1ovisttlkimq7pdoffkni7z3rv31s"
                value={content}
                onEditorChange={(newContent) =>
                  setContent(newContent)
                }
                init={{
                  height: 350,
                  menubar: true,
                  plugins: [
                    "advlist autolink lists link image charmap preview anchor",
                    "searchreplace visualblocks code fullscreen",
                    "insertdatetime media table code help wordcount",
                  ],
                  toolbar:
                    "undo redo | formatselect | bold italic underline | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link image table | code",
                  content_style:
                    "body { font-family: Outfit, Arial, sans-serif; font-size:14px } table { width:100%; border-collapse:collapse } td, th { border:1px solid #ccc; padding:8px; }",
                }}
              />
            </div>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full rounded-full bg-black px-6 py-4 text-lg font-semibold uppercase tracking-wide text-[#EBB428] transition hover:bg-gray-900 disabled:cursor-not-allowed disabled:opacity-70"
          >
            {isSubmitting
              ? "Submitting..."
              : "Submit Blog"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default BlogForm;