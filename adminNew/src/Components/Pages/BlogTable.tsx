import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FiEdit, FiEye, FiTrash2, FiSearch, FiAlertTriangle } from "react-icons/fi";
import { toast } from "react-toastify";
import { SearchContext } from "../../searchContext";
import { getBlogsAPI, deleteBlogAPI } from "../Api/api";

interface Blog {
  id: string | number;
  title: string;
  author?: string;
  image?: string;
  thumbs_up?: number;
  love?: number;
  created_at?: string;
  createdAt?: string;
}

const BlogTable = () => {
  const navigate = useNavigate();
  const { query } = useContext(SearchContext);

  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [selectedBlogId, setSelectedBlogId] = useState<string | number | null>(null);
  const [isDeleting, setIsDeleting] = useState<boolean>(false);

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
    } catch (error: any) {
      toast.error(
        error?.response?.data?.message || "Failed to load blogs"
      );
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (id: string | number) => {
    navigate(`/edit-blog/${id}`);
  };

  const handleView = (id: string | number) => {
    navigate(`/view-blog/${id}`);
  };

  const handleDeleteConfirm = (id: string | number) => {
    setSelectedBlogId(id);
    setShowModal(true);
  };

  const confirmDelete = async () => {
    if (!selectedBlogId) return;

    setIsDeleting(true);
    try {
      const res = await deleteBlogAPI(selectedBlogId.toString());

      if (res.data?.success) {
        setBlogs((prev) => prev.filter((blog) => blog.id !== selectedBlogId));
        toast.success(res.data.message || "Blog deleted successfully");
      } else {
        toast.error(res.data?.message || "Failed to delete blog");
      }
    } catch (error: any) {
      toast.error(
        error?.response?.data?.message || "Failed to delete blog"
      );
    } finally {
      setIsDeleting(false);
      setSelectedBlogId(null);
      setShowModal(false);
    }
  };

  const filteredBlogs = blogs.filter((blog) => {
    const q = (query || "").toLowerCase();
    return (
      blog.title?.toLowerCase().includes(q) ||
      blog.author?.toLowerCase().includes(q)
    );
  });

  return (
    <div className="w-full space-y-4">
      {/* Table Container */}
      <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-lg">
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-left text-sm">
            {/* Table Header */}
            <thead>
              <tr className="bg-[#111827] text-xs font-bold tracking-wider text-[#EBB428] uppercase">
                <th className="px-6 py-4 text-center">ID</th>
                <th className="px-6 py-4">Image</th>
                <th className="px-6 py-4">Title</th>
                <th className="px-6 py-4">Author</th>
                <th className="px-6 py-4">Date</th>
                <th className="px-4 py-4 text-center">👍</th>
                <th className="px-4 py-4 text-center">❤️</th>
                <th className="px-6 py-4 text-center">Actions</th>
              </tr>
            </thead>

            {/* Table Body */}
            <tbody className="divide-y divide-gray-100 bg-white">
              {loading ? (
                <tr>
                  <td colSpan={8} className="py-12 text-center text-gray-500">
                    <div className="flex flex-col items-center justify-center space-y-2">
                      <div className="h-8 w-8 animate-spin rounded-full border-4 border-yellow-500 border-t-transparent"></div>
                      <p className="text-sm font-medium">Loading blogs...</p>
                    </div>
                  </td>
                </tr>
              ) : filteredBlogs.length > 0 ? (
                filteredBlogs.map((blog, index) => {
                  const dateStr = blog.created_at || blog.createdAt;
                  const formattedDate = dateStr
                    ? new Date(dateStr).toLocaleString("en-US", {
                        dateStyle: "short",
                        timeStyle: "short",
                      })
                    : "N/A";

                  return (
                    <tr
                      key={blog.id}
                      className="transition-colors hover:bg-yellow-50/40"
                    >
                      <td className="px-6 py-4 text-center font-bold text-gray-700">
                        {index + 1}
                      </td>

                      <td className="px-6 py-4">
                        <div className="relative h-14 w-20 overflow-hidden rounded-xl border border-gray-200 bg-gray-50 shadow-sm">
                          {blog.image ? (
                            <img
                              src={blog.image}
                              alt={blog.title}
                              className="h-full w-full object-cover transition-transform duration-300 hover:scale-110"
                            />
                          ) : (
                            <div className="flex h-full w-full items-center justify-center text-xs text-gray-400">
                              No Image
                            </div>
                          )}
                        </div>
                      </td>

                      <td className="max-w-xs px-6 py-4 font-semibold text-gray-900">
                        <span className="line-clamp-2" title={blog.title}>
                          {blog.title}
                        </span>
                      </td>

                      <td className="px-6 py-4 font-medium text-gray-700">
                        <span className="inline-flex items-center rounded-full bg-gray-100 px-3 py-1 text-xs font-semibold text-gray-800">
                          {blog.author || "Ahaan Software"}
                        </span>
                      </td>

                      <td className="px-6 py-4 text-xs font-medium text-gray-500 whitespace-nowrap">
                        {formattedDate}
                      </td>

                      <td className="px-4 py-4 text-center font-semibold text-gray-700">
                        {blog.thumbs_up ?? 0}
                      </td>

                      <td className="px-4 py-4 text-center font-semibold text-gray-700">
                        {blog.love ?? 0}
                      </td>

                      <td className="px-6 py-4 text-center">
                        <div className="flex items-center justify-center gap-2">
                          <button
                            onClick={() => handleView(blog.id)}
                            title="View Blog"
                            className="rounded-lg bg-yellow-500 p-2 text-white shadow-md transition hover:bg-yellow-600 hover:shadow-lg active:scale-95"
                          >
                            <FiEye className="h-4 w-4" />
                          </button>

                          <button
                            onClick={() => handleEdit(blog.id)}
                            title="Edit Blog"
                            className="rounded-lg bg-emerald-600 p-2 text-white shadow-md transition hover:bg-emerald-700 hover:shadow-lg active:scale-95"
                          >
                            <FiEdit className="h-4 w-4" />
                          </button>

                          <button
                            onClick={() => handleDeleteConfirm(blog.id)}
                            title="Delete Blog"
                            className="rounded-lg bg-red-600 p-2 text-white shadow-md transition hover:bg-red-700 hover:shadow-lg active:scale-95"
                          >
                            <FiTrash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan={8} className="py-12 text-center text-gray-500">
                    <div className="flex flex-col items-center justify-center space-y-2">
                      <FiSearch className="h-8 w-8 text-gray-400" />
                      <p className="text-base font-medium">No blogs found.</p>
                      <p className="text-xs text-gray-400">
                        Try searching with a different keyword.
                      </p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modern Confirmation Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm animate-fadeIn">
          <div className="w-full max-w-md overflow-hidden rounded-2xl bg-white p-6 shadow-2xl transition-all">
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 text-red-600">
                <FiAlertTriangle className="h-6 w-6" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-gray-900">
                  Delete Blog Post
                </h3>
                <p className="text-sm text-gray-500">
                  Are you sure you want to delete this blog? This action cannot be undone.
                </p>
              </div>
            </div>

            <div className="mt-6 flex justify-end gap-3">
              <button
                type="button"
                onClick={() => setShowModal(false)}
                disabled={isDeleting}
                className="rounded-full border border-gray-300 bg-white px-5 py-2 text-sm font-semibold text-gray-700 shadow-sm transition hover:bg-gray-50 disabled:opacity-50"
              >
                Cancel
              </button>

              <button
                type="button"
                onClick={confirmDelete}
                disabled={isDeleting}
                className="rounded-full bg-red-600 px-5 py-2 text-sm font-semibold text-white shadow-md transition hover:bg-red-700 disabled:opacity-50"
              >
                {isDeleting ? "Deleting..." : "Delete"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BlogTable;