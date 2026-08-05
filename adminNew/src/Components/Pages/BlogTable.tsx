import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FiEdit, FiEye, FiTrash2 } from "react-icons/fi";
import { toast } from "react-toastify";
import { SearchContext } from "../../searchContext";

interface Blog {
  id: string;
  title: string;
  author?: string;
  image?: string;
  created_at: string;
  reactions?: {
    ["thumbs up"]?: number;
    love?: number;
  };
}

const BlogTable = () => {
  const navigate = useNavigate();

  const { query } = useContext(SearchContext);

  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedBlogId, setSelectedBlogId] = useState<string | null>(null);

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      const res = await axios.get<Blog[]>(
        "https://ahaansoftware.com/blog-db.json"
      );

      setBlogs(Array.isArray(res.data) ? res.data : []);
    } catch (error: any) {
      toast.error(
        error?.response?.data?.message ??
          "Failed To Load Blogs"
      );
    }
  };

  const handleEdit = (id: string) => {
    navigate(`/edit-blog/${id}`);
  };

  const handleView = (id: string) => {
    navigate(`/view-blog/${id}`);
  };

  const handleDeleteConfirm = (id: string) => {
    setSelectedBlogId(id);
    setShowModal(true);
  };

  const confirmDelete = async () => {
    if (!selectedBlogId) return;

    try {
      const formData = new FormData();
      formData.append("id", selectedBlogId);

      const res = await axios.post(
        "https://ahaansoftware.com/delete-blog.php",
        formData
      );

      if (res.data.status === "success") {
        setBlogs((prev) =>
          prev.filter((blog) => blog.id !== selectedBlogId)
        );

        toast.success(
          res.data.message ??
            "Blog Deleted Successfully"
        );
      } else {
        toast.error(
          res.data.message ??
            "Failed To Delete Blog"
        );
      }
    } catch (error: any) {
      toast.error(
        error?.response?.data?.message ??
          "Server Error"
      );
    } finally {
      setSelectedBlogId(null);
      setShowModal(false);
    }
  };

  const filteredBlogs = blogs.filter((blog) => {
    const q = query.toLowerCase();

    return (
      blog.title.toLowerCase().includes(q) ||
      blog.author?.toLowerCase().includes(q)
    );
  });

  return (
    <>
      <div className="overflow-x-auto rounded-xl bg-white shadow">
        <table className="min-w-full">
          <thead className="bg-neutral-900 text-[#EEB829] uppercase tracking-wider text-sm">
            <tr>
              <th className="px-4 py-4">ID</th>
              <th className="px-4 py-4">Image</th>
              <th className="px-4 py-4">Title</th>
              <th className="px-4 py-4">Author</th>
              <th className="px-4 py-4">Date</th>
              <th className="px-4 py-4">👍</th>
              <th className="px-4 py-4">❤️</th>
              <th className="px-4 py-4">Actions</th>
            </tr>
          </thead>

          <tbody>
            {filteredBlogs.map((blog, index) => (
              <tr
                key={blog.id}
                className="border-b hover:bg-gray-50"
              >
                <td className="px-4 py-4 text-center">
                  {index + 1}
                </td>

                <td className="px-4 py-4">
                  <img
                    src={
                      blog.image?.startsWith("http")
                        ? blog.image
                        : `https://ahaansoftware.com/${blog.image}`
                    }
                    alt={blog.title}
                    className="mx-auto h-16 w-20 rounded-md border object-cover transition hover:scale-105"
                  />
                </td>

                <td className="px-4 py-4 font-medium">
                  {blog.title}
                </td>

                <td className="px-4 py-4 font-semibold">
                  {blog.author ?? "Unknown"}
                </td>

                <td className="px-4 py-4 text-sm text-gray-500">
                  {new Date(
                    blog.created_at
                  ).toLocaleString()}
                </td>

                <td className="px-4 py-4 text-center">
                  {blog.reactions?.["thumbs up"] ?? 0}
                </td>

                <td className="px-4 py-4 text-center">
                  {blog.reactions?.love ?? 0}
                </td>

                <td className="px-4 py-4">
                  <div className="flex justify-center gap-2">
                    <button
                      onClick={() => handleView(blog.id)}
                      className="rounded bg-yellow-500 p-2 text-white transition hover:bg-yellow-600"
                    >
                      <FiEye />
                    </button>

                    <button
                      onClick={() => handleEdit(blog.id)}
                      className="rounded bg-green-600 p-2 text-white transition hover:bg-green-700"
                    >
                      <FiEdit />
                    </button>

                    <button
                      onClick={() =>
                        handleDeleteConfirm(blog.id)
                      }
                      className="rounded bg-red-600 p-2 text-white transition hover:bg-red-700"
                    >
                      <FiTrash2 />
                    </button>
                  </div>
                </td>
              </tr>
            ))}

            {filteredBlogs.length === 0 && (
              <tr>
                <td
                  colSpan={8}
                  className="py-10 text-center text-gray-500"
                >
                  No blogs found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Modal */}

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
          <div className="w-full max-w-md rounded-xl bg-white p-6 shadow-xl">
            <h2 className="mb-4 text-xl font-bold">
              Delete Blog
            </h2>

            <p className="mb-6 text-gray-600">
              This will permanently delete this blog.
              This action cannot be undone.
            </p>

            <div className="flex justify-end gap-3">
              <button
                onClick={() => setShowModal(false)}
                className="rounded-lg bg-gray-200 px-5 py-2 hover:bg-gray-300"
              >
                Cancel
              </button>

              <button
                onClick={confirmDelete}
                className="rounded-lg bg-red-600 px-5 py-2 text-white hover:bg-red-700"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default BlogTable;