import { useEffect, useState } from "react";

interface Blog {
  id: string | number;
  title: string;
  author: string;
  author_image?: string;
  image?: string;
  content: string;
  created_at?: string;
}

const stripHtml = (html: string): string => {
  const div = document.createElement("div");
  div.innerHTML = html;
  return div.textContent || div.innerText || "";
};

const trimToWords = (
  htmlContent: string,
  wordLimit: number = 20
): string => {
  const text = stripHtml(htmlContent);
  const words = text.split(/\s+/);

  return words.length > wordLimit
    ? `${words.slice(0, wordLimit).join(" ")}...`
    : text;
};

const formatDateTime = (isoString?: string): string => {
  if (!isoString) return "Not available";

  try {
    return new Date(isoString).toLocaleString(undefined, {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: true,
    });
  } catch {
    return "Invalid date";
  }
};

const BlogList = () => {
  const [blogs, setBlogs] = useState<Blog[]>([]);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await fetch(
          "https://ahaansoftware.com/blog-db.json"
        );

        if (!res.ok) throw new Error("Failed to fetch blogs");

        const data: Blog[] = await res.json();

        setBlogs([...data].reverse());
      } catch (error) {
        console.error("Fetch error:", error);
      }
    };

    fetchBlogs();
  }, []);

  const getFullImageUrl = (imagePath?: string): string => {
    if (!imagePath) return "";

    return imagePath.startsWith("http")
      ? imagePath
      : `https://ahaansoftware.com/${imagePath}`;
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <h2 className="mb-8 text-center text-3xl font-bold text-gray-900">
        Blog List
      </h2>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
        {blogs.map((blog) => (
          <div
            key={blog.id}
            className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-md transition duration-300 hover:-translate-y-1 hover:shadow-xl"
          >
            {blog.image && (
              <img
                src={getFullImageUrl(blog.image)}
                alt={blog.title}
                className="h-60 w-full object-cover"
                onError={(e) => {
                  (e.target as HTMLImageElement).style.display = "none";
                }}
              />
            )}

            <div className="flex h-full flex-col p-5">
              <h3 className="mb-4 text-xl font-semibold text-gray-900">
                {blog.title}
              </h3>

              {/* Author */}
              <div className="mb-4 flex items-center gap-3">
                {blog.author_image && (
                  <img
                    src={getFullImageUrl(blog.author_image)}
                    alt={blog.author}
                    className="h-10 w-10 rounded-full border-2 border-gray-300 object-cover transition hover:scale-105 hover:border-yellow-500"
                    onError={(e) => {
                      (e.target as HTMLImageElement).style.display =
                        "none";
                    }}
                  />
                )}

                <div>
                  <p className="font-semibold text-gray-800">
                    {blog.author || "Unknown"}
                  </p>

                  <p className="text-xs text-gray-500">
                    {formatDateTime(blog.created_at)}
                  </p>
                </div>
              </div>

              <p className="text-sm leading-7 text-gray-600">
                {trimToWords(blog.content)}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BlogList;