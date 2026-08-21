import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FiArrowLeft, FiCalendar, FiUser } from "react-icons/fi";
import { getBlogByIdAPI } from "../Api/api";

interface Blog {
  id: string | number;
  title: string;
  author?: string;
  author_image?: string;
  image?: string;
  content: string;
  created_at?: string;
  createdAt?: string;
}

const formatDate = (isoString?: string): string => {
  if (!isoString) return "N/A";
  try {
    return new Date(isoString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  } catch {
    return "N/A";
  }
};

const ViewBlog = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [blog, setBlog] = useState<Blog | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    if (!id) return;

    const fetchBlog = async () => {
      setLoading(true);
      try {
        const res = await getBlogByIdAPI(id);
        if (res.data?.success && res.data?.data) {
          setBlog(res.data.data);
        } else {
          setBlog(null);
        }
      } catch (error) {
        console.error("Error loading blog details:", error);
        setBlog(null);
      } finally {
        setLoading(false);
      }
    };

    fetchBlog();
  }, [id]);

  if (loading) {
    return (
      <div className="flex h-64 flex-col items-center justify-center space-y-3">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-yellow-500 border-t-transparent"></div>
        <p className="text-sm font-medium text-gray-500">Loading blog post...</p>
      </div>
    );
  }

  if (!blog) {
    return (
      <div className="mx-auto max-w-4xl px-4 py-16 text-center">
        <h3 className="text-xl font-bold text-gray-800">Blog Post Not Found</h3>
        <p className="mt-2 text-sm text-gray-500">
          The blog article you are looking for does not exist or has been removed.
        </p>
        <button
          onClick={() => navigate(-1)}
          className="mt-6 inline-flex items-center gap-2 rounded-xl bg-black px-5 py-2.5 text-xs font-bold uppercase text-[#EBB428] transition hover:bg-gray-800"
        >
          <FiArrowLeft className="h-4 w-4" /> Go Back
        </button>
      </div>
    );
  }

  const publishedDate = blog.created_at || blog.createdAt;

  return (
    <div className="w-full px-4 py-4 sm:px-6">
      <div className="mx-auto max-w-4xl">
        {/* Top Action Bar */}
        <div className="mb-6">
          <button
            onClick={() => navigate(-1)}
            className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-gray-600 transition hover:text-black"
          >
            <FiArrowLeft className="h-4 w-4" /> Back to Articles
          </button>
        </div>

        {/* Title */}
        <h1 className="mb-4 text-2xl font-black leading-tight tracking-tight text-gray-900 sm:text-4xl">
          {blog.title}
        </h1>

        {/* Meta Bar */}
        <div className="mb-6 flex flex-wrap items-center justify-between gap-4 border-b border-t border-gray-100 py-3 text-xs text-gray-500">
          <div className="flex items-center gap-3">
            {blog.author_image ? (
              <img
                src={blog.author_image}
                alt={blog.author}
                className="h-8 w-8 rounded-full border object-cover"
              />
            ) : (
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-100 text-gray-600">
                <FiUser className="h-4 w-4" />
              </div>
            )}
            <div>
              <p className="font-semibold text-gray-800">
                {blog.author || "Ahaan Software"}
              </p>
              <p className="text-[10px] text-gray-400">Author</p>
            </div>
          </div>

          <div className="flex items-center gap-1.5 text-gray-600">
            <FiCalendar className="h-4 w-4 text-yellow-600" />
            <span>{formatDate(publishedDate)}</span>
          </div>
        </div>

        {/* Featured Image */}
        {blog.image && (
          <div className="mb-8 overflow-hidden rounded-2xl border border-gray-100 bg-gray-50 shadow-sm">
            <img
              src={blog.image}
              alt={blog.title}
              className="max-h-[450px] w-full object-cover"
            />
          </div>
        )}

        {/* Blog Content HTML Body */}
        <article
          className="
            prose prose-sm sm:prose-base max-w-none prose-gray
            prose-headings:font-bold prose-headings:text-gray-900
            prose-p:text-gray-700 prose-p:leading-relaxed
            prose-a:text-yellow-600 prose-a:no-underline hover:prose-a:underline
            prose-img:rounded-xl prose-img:shadow-md
            prose-table:w-full prose-table:border-collapse prose-table:border prose-table:border-gray-200
            prose-th:border prose-th:border-gray-200 prose-th:bg-gray-50 prose-th:p-3 prose-th:text-left
            prose-td:border prose-td:border-gray-200 prose-td:p-3
            prose-ul:list-disc prose-ol:list-decimal
          "
          dangerouslySetInnerHTML={{ __html: blog.content }}
        />
      </div>
    </div>
  );
};

export default ViewBlog;