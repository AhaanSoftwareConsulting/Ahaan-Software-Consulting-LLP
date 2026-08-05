import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

interface Blog {
  id: string | number;
  title: string;
  author?: string;
  image?: string;
  content: string;
  created_at?: string;
}

const ViewBlog = () => {
  const { id } = useParams<{ id: string }>();

  const [blog, setBlog] = useState<Blog | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const res = await axios.get<Blog[]>(
          "https://ahaansoftware.com/blog-db.json"
        );

        const found = res.data.find((b) => String(b.id) === id);

        setBlog(found || null);
      } catch (error) {
        console.error("Error loading blog:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBlog();
  }, [id]);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <p className="text-lg font-medium text-gray-500">Loading...</p>
      </div>
    );
  }

  if (!blog) {
    return (
      <div className="flex items-center justify-center py-20">
        <p className="text-lg font-semibold text-red-500">
          Blog not found.
        </p>
      </div>
    );
  }

  const imageUrl =
    blog.image &&
    (blog.image.startsWith("http")
      ? blog.image
      : `https://ahaansoftware.com/${blog.image}`);

  return (
    <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8">

      {/* Image */}
      {imageUrl && (
        <img
          src={imageUrl}
          alt={blog.title}
          className="mb-8 w-full rounded-xl border border-gray-200 object-cover shadow-lg"
        />
      )}

      {/* Title */}
      <h1 className="mb-4 text-3xl font-bold text-gray-900 sm:text-4xl">
        {blog.title}
      </h1>

      {/* Author & Date */}
      <div className="mb-8 flex flex-col gap-2 rounded-lg bg-gray-100 p-4 text-sm text-gray-600 sm:flex-row sm:items-center sm:justify-between">

        <p>
          <span className="font-semibold text-gray-800">
            Author:
          </span>{" "}
          {blog.author || "Unknown"}
        </p>

        <p>
          <span className="font-semibold text-gray-800">
            Published:
          </span>{" "}
          {blog.created_at
            ? new Date(blog.created_at).toLocaleString()
            : "Not available"}
        </p>
      </div>

      {/* Blog Content */}
      <article
        className="
          prose
          prose-gray
          max-w-none

          prose-headings:font-bold
          prose-headings:text-gray-900

          prose-p:text-gray-700
          prose-p:leading-8

          prose-a:text-blue-600

          prose-img:rounded-lg

          prose-table:w-full
          prose-table:border
          prose-th:border
          prose-td:border
          prose-th:bg-gray-100
          prose-th:p-3
          prose-td:p-3

          prose-ul:list-disc
          prose-ol:list-decimal
        "
        dangerouslySetInnerHTML={{
          __html: blog.content,
        }}
      />
    </div>
  );
};

export default ViewBlog;