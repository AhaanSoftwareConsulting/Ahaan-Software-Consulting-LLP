import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FiCalendar, FiUser, FiArrowRight } from "react-icons/fi";
import { getBlogsAPI } from "../Api/api"; // API Function Import

interface Blog {
  id: string | number;
  title: string;
  author?: string;
  author_image?: string;
  image?: string;
  content?: string;
  created_at?: string;
  createdAt?: string;
}

const stripHtml = (html: string): string => {
  const div = document.createElement("div");
  div.innerHTML = html;
  return div.textContent || div.innerText || "";
};

const trimToWords = (htmlContent: string = "", wordLimit: number = 22): string => {
  const text = stripHtml(htmlContent);
  const words = text.split(/\s+/);
  return words.length > wordLimit
    ? `${words.slice(0, wordLimit).join(" ")}...`
    : text;
};

const formatDate = (isoString?: string): string => {
  if (!isoString) return "N/A";
  try {
    return new Date(isoString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  } catch {
    return "N/A";
  }
};

const BlogList = () => {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    setLoading(true);
    try {
      const res = await getBlogsAPI();
      if (res.data?.success) {
        setBlogs(res.data.data || []);
      } else {
        setBlogs(Array.isArray(res.data) ? res.data : []);
      }
    } catch (error) {
      console.error("Failed to fetch blogs:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full px-4 py-6 sm:px-6 lg:px-8">
      {/* Header Area */}
      <div className="mb-8 text-left">
        <h2 className="text-2xl font-black tracking-tight text-gray-900 sm:text-3xl">
          Latest Blog Posts
        </h2>
        <p className="mt-1 text-sm text-gray-500">
          Discover insights, updates, and articles written by our team.
        </p>
      </div>

      {/* Loading State */}
      {loading ? (
        <div className="flex h-64 flex-col items-center justify-center space-y-3">
          <div className="h-10 w-10 animate-spin rounded-full border-4 border-yellow-500 border-t-transparent"></div>
          <p className="text-sm font-medium text-gray-500">Loading articles...</p>
        </div>
      ) : blogs.length > 0 ? (
        /* Blog Cards Grid */
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {blogs.map((blog) => {
            const dateStr = blog.created_at || blog.createdAt;

            return (
              <div
                key={blog.id}
                className="group flex flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl"
              >
                {/* Banner Image */}
                <div className="relative h-48 w-full overflow-hidden bg-gray-100">
                  {blog.image ? (
                    <img
                      src={blog.image}
                      alt={blog.title}
                      className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                      onError={(e) => {
                        (e.target as HTMLImageElement).style.display = "none";
                      }}
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center text-xs text-gray-400">
                      No Image Available
                    </div>
                  )}
                </div>

                {/* Content Details */}
                <div className="flex flex-1 flex-col justify-between p-5">
                  <div>
                    {/* Author & Date Bar */}
                    <div className="mb-3 flex items-center justify-between text-xs text-gray-500">
                      <div className="flex items-center gap-2">
                        {blog.author_image ? (
                          <img
                            src={blog.author_image}
                            alt={blog.author}
                            className="h-6 w-6 rounded-full object-cover"
                          />
                        ) : (
                          <div className="flex h-6 w-6 items-center justify-center rounded-full bg-gray-100 text-gray-600">
                            <FiUser className="h-3.5 w-3.5" />
                          </div>
                        )}
                        <span className="font-semibold text-gray-700">
                          {blog.author || "Ahaan Software"}
                        </span>
                      </div>

                      <div className="flex items-center gap-1">
                        <FiCalendar className="h-3.5 w-3.5 text-gray-400" />
                        <span>{formatDate(dateStr)}</span>
                      </div>
                    </div>

                    {/* Blog Title */}
                    <h3 className="mb-2 text-lg font-bold text-gray-900 transition group-hover:text-yellow-600">
                      <span className="line-clamp-2">{blog.title}</span>
                    </h3>

                    {/* Article Description */}
                    <p className="mb-4 text-xs leading-relaxed text-gray-600">
                      {trimToWords(blog.content)}
                    </p>
                  </div>

                  {/* Read More Button */}
                  <button
                    onClick={() => navigate(`/view-blog/${blog.id}`)}
                    className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-black transition group-hover:text-yellow-600"
                  >
                    Read Full Article
                    <FiArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        /* Empty State */
        <div className="rounded-2xl border border-dashed border-gray-300 py-16 text-center">
          <p className="text-base font-semibold text-gray-600">No blogs found.</p>
          <p className="text-xs text-gray-400">Check back later for new updates.</p>
        </div>
      )}
    </div>
  );
};

export default BlogList;