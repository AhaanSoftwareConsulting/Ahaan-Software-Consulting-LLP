import  { useEffect, useState } from "react";
import type { MouseEvent } from "react";
import axios from "axios";
import {
  ShareNetwork,
  FacebookLogo,
  LinkedinLogo,
  WhatsappLogo,
} from "@phosphor-icons/react";

interface Blog {
  id: string | number;
  title: string;
  author?: string;
  author_image?: string;
  content: string;
  image?: string;
  created_at: string;
  reactions?: {
    "thumbs up"?: number;
    love?: number;
  };
}

interface ReactionCounts {
  [blogId: string]: {
    "thumbs up": number;
    love: number;
  };
}

interface SelectedReactions {
  [blogId: string]: string;
}

const reactions = [
  { emoji: "👍", label: "thumbs up" },
  { emoji: "❤️", label: "love" },
];

const stripHtml = (html: string): string => {
  const div = document.createElement("div");
  div.innerHTML = html;
  return div.textContent || div.innerText || "";
};

const trimToWords = (htmlContent: string, wordLimit: number = 20): string => {
  const text = stripHtml(htmlContent);
  const words = text.split(" ");
  return words.length > wordLimit
    ? words.slice(0, wordLimit).join(" ") + "..."
    : text;
};

const formatDateTime = (isoString: string): string => {
  try {
    const date = new Date(isoString);
    return date.toLocaleString(undefined, {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  } catch {
    return "Invalid Date";
  }
};

const createSlug = (title: string): string => {
  return title
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9\-]/g, "");
};

export const BlogPage = () => {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [selectedReactions, setSelectedReactions] = useState<SelectedReactions>({});
  const [reactionCounts, setReactionCounts] = useState<ReactionCounts>({});
//   const [searchQuery, setSearchQuery] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [activeShare, setActiveShare] = useState<string | number | null>(null);

  const blogsPerPage = 9;

  const fetchAndUpdateBlogs = async (): Promise<void> => {
    try {
      const res = await axios.get<Blog[]>("https://ahaansoftware.com/blog-db.json");
      const fetchedBlogs = Array.isArray(res.data) ? res.data.reverse() : [];
      setBlogs(fetchedBlogs);

      const counts: ReactionCounts = {};
      const local: SelectedReactions = {};

      fetchedBlogs.forEach((blog) => {
        counts[blog.id] = {
          "thumbs up": blog.reactions?.["thumbs up"] || 0,
          love: blog.reactions?.love || 0,
        };

        const localReaction = localStorage.getItem(`reacted_${blog.id}`);
        if (localReaction) {
          local[blog.id] = localReaction;
        }
      });

      setReactionCounts(counts);
      setSelectedReactions(local);
    } catch (error) {
      console.error("Failed to fetch blogs:", error);
    }
  };

  useEffect(() => {
    fetchAndUpdateBlogs();
  }, []);

//   useEffect(() => {
//     setCurrentPage(1);
//   }, [searchQuery]);

  const handleReaction = async (
    blogId: string | number,
    newReaction: string
  ): Promise<void> => {
    const prevReaction = selectedReactions[blogId];
    if (prevReaction === newReaction) return;

    localStorage.setItem(`reacted_${blogId}`, newReaction);
    setSelectedReactions((prev) => ({ ...prev, [blogId]: newReaction }));

    setReactionCounts((prev) => {
      const updated = { ...prev };
      if (!updated[blogId]) updated[blogId] = { "thumbs up": 0, love: 0 };
      if (prevReaction && updated[blogId][prevReaction as "thumbs up" | "love"] > 0) {
        updated[blogId][prevReaction as "thumbs up" | "love"] -= 1;
      }
      updated[blogId][newReaction as "thumbs up" | "love"] =
        (updated[blogId][newReaction as "thumbs up" | "love"] || 0) + 1;
      return updated;
    });

    try {
      const formData = new URLSearchParams();
      formData.append("id", String(blogId));
      formData.append("reaction", newReaction);
      formData.append("prevReaction", prevReaction || "");

      await fetch("https://ahaansoftware.com/update-json.php", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: formData,
      });
      await fetchAndUpdateBlogs();
    } catch (err) {
      console.error("Failed to update reaction:", err);
    }
  };

//   const filteredBlogs = blogs.filter(
//     (blog) =>
//       blog.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
//       blog.author?.toLowerCase().includes(searchQuery.toLowerCase())
//   );

// After
const totalPages = Math.ceil(blogs.length / blogsPerPage);
const paginatedBlogs = blogs.slice(
  (currentPage - 1) * blogsPerPage,
  currentPage * blogsPerPage
);

  return (
    <div className="container mx-auto lg:px-6 px-4 py-8 max-w-[1600px]">
      {/* Search Bar */}
      {/* <div className="mb-6 text-right">
        <input
          type="text"
          placeholder="Search blogs..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full max-w-md px-4 py-2 border border-[#c78a2b] rounded-md text-sm font-sans focus:outline-none focus:border-black transition-colors"
        />
      </div> */}

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8 mt-5">
        {paginatedBlogs.map((blog) => {
          const slug = createSlug(blog.title);
          const blogUrl = `${window.location.origin}/blog/${slug}`;
          const blogReactions = reactionCounts[blog.id] || {
            "thumbs up": 0,
            love: 0,
          };

          return (
            <div
              key={blog.id}
              onClick={() => window.open(`/blog/${slug}`, "_blank")}
              className="group flex flex-col h-full bg-white rounded-md overflow-hidden border border-gray-100 shadow-[0_10px_20px_rgba(80,80,80,0.08),0_4px_4px_rgba(97,97,97,0.12)] transition-transform duration-300 hover:-translate-y-1 cursor-pointer"
            >
              {blog.image && (
                <img
                  src={
                    blog.image.startsWith("http")
                      ? blog.image
                      : `https://ahaansoftware.com/${blog.image}`
                  }
                  alt={blog.title}
                  className="w-full h-48 object-content border-b border-gray-100"
                />
              )}

              <div className="p-5 flex flex-col flex-grow">
                <h5 className="font-sans font-bold text-lg text-gray-900 mb-2 line-clamp-2">
                  {blog.title}
                </h5>
                <p className="font-sans text-sm text-gray-700 flex-grow mb-4 leading-relaxed">
                  {trimToWords(blog.content)}
                </p>

                {/* Author Section */}
                <div className="flex items-center gap-3 mb-4 mt-auto">
                  {blog.author_image && (
                    <img
                      src={blog.author_image}
                      alt={blog.author || "Author"}
                      className=" w-10 h-10 rounded-full object-cover bg-black p-1 shadow-md"
                    />
                  )}
                  <div>
                    <p className="font-sans text-sm font-semibold text-gray-800 m-0">
                      By {blog.author || "Unknown"}
                    </p>
                    <p className="font-sans text-xs text-gray-500 m-0">
                      {formatDateTime(blog.created_at)}
                    </p>
                  </div>
                </div>

                {/* Reactions */}
                <div
                  className="flex flex-wrap gap-2 mb-4"
                  onClick={(e: MouseEvent) => e.stopPropagation()}
                >
                  {reactions.map(({ emoji, label }) => {
                    const isSelected = selectedReactions[blog.id] === label;
                    return (
                      <button
                        key={label}
                        onClick={() => handleReaction(blog.id, label)}
                        className={`text-xs px-3 py-1.5 rounded-md border transition-all duration-300 flex items-center gap-1 font-sans ${
                          isSelected
                            ? "bg-gray-200 border-gray-400 font-bold"
                            : "bg-gray-50 border-gray-200 hover:bg-gray-100 text-black"
                        }`}
                      >
                        <span>{emoji}</span>
                        <span>
                          {blogReactions[label as "thumbs up" | "love"] || 0}
                        </span>
                      </button>
                    );
                  })}
                </div>

                {/* Actions */}
                <div
                  className="flex items-center justify-between pt-2 border-t border-gray-50"
                  onClick={(e: MouseEvent) => e.stopPropagation()}
                >
                  <button
                    onClick={() => window.open(`/blog/${slug}`, "_blank")}
                    className="shine-btn bg-black text-[#c78a2b] hover:bg-[#c78a2b] hover:text-black font-sans text-xs px-4 py-2 rounded-md font-medium transition-all duration-300"
                  >
                    Read More
                  </button>

                  <div className="relative">
                    <button
                      type="button"
                      onClick={() =>
                        setActiveShare(activeShare === blog.id ? null : blog.id)
                      }
                      className="text-[#c78a2b] hover:text-black hover:bg-gray-100 p-2 rounded-full transition-colors duration-300 flex items-center justify-center text-xl"
                    >
                      <ShareNetwork weight="bold" />
                    </button>

                    {activeShare === blog.id && (
                      <div className="absolute right-45 top-1/2 -translate-y-1/2 translate-x-full ml-2 z-20 bg-white p-2 rounded-md shadow-lg border border-gray-100 ">
                        <div className="flex gap-2">
                          <button
                            onClick={() =>
                              window.open(
                                `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
                                  blogUrl
                                )}`,
                                "_blank"
                              )
                            }
                            className="shine-btn w-8 h-8 rounded-md bg-[#3b5998] text-white flex items-center justify-center text-base transition-transform duration-200 hover:scale-110"
                          >
                            <FacebookLogo weight="fill" />
                          </button>
                          <button
                            onClick={() =>
                              window.open(
                                `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
                                  blogUrl
                                )}`,
                                "_blank"
                              )
                            }
                            className="shine-btn w-8 h-8 rounded-md bg-[#0077b5] text-white flex items-center justify-center text-base transition-transform duration-200 hover:scale-110"
                          >
                            <LinkedinLogo weight="fill" />
                          </button>
                          <button
                            onClick={() =>
                              window.open(
                                `https://api.whatsapp.com/send?text=${encodeURIComponent(
                                  `🔗 Read more: ${blogUrl}`
                                )}`,
                                "_blank"
                              )
                            }
                            className="shine-btn w-8 h-8 rounded-full bg-[#25d366] text-white flex items-center justify-center text-base transition-transform duration-200 hover:scale-110"
                          >
                            <WhatsappLogo weight="fill" />
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Pagination UI */}
      {totalPages > 1 && (
        <nav className="flex justify-center mb-8">
          <ul className="flex flex-wrap items-center gap-1 sm:gap-2 p-0 m-0 list-none">
            <li>
              <button
                disabled={currentPage === 1}
                onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
                className="px-3.5 py-2 text-sm font-medium font-sans rounded-md bg-gray-100 text-gray-800 hover:bg-[#E3A926] hover:text-black disabled:opacity-50 disabled:bg-gray-200 disabled:text-gray-400 disabled:pointer-events-none transition-colors duration-200 whitespace-nowrap"
              >
                Prev
              </button>
            </li>

            {Array.from({ length: totalPages }, (_, i) => (
              <li key={i + 1}>
                <button
                  onClick={() => setCurrentPage(i + 1)}
                  className={`px-3.5 py-2 text-sm font-medium font-sans rounded-md transition-colors duration-200 ${
                    currentPage === i + 1
                      ? "bg-black text-[#E3A926] font-bold"
                      : "bg-gray-100 text-gray-800 hover:bg-[#E3A926] hover:text-black"
                  }`}
                >
                  {i + 1}
                </button>
              </li>
            ))}

            <li>
              <button
                disabled={currentPage === totalPages}
                onClick={() =>
                  setCurrentPage((p) => Math.min(p + 1, totalPages))
                }
                className="px-3.5 py-2 text-sm font-medium font-sans rounded-md bg-gray-100 text-gray-800 hover:bg-[#E3A926] hover:text-black disabled:opacity-50 disabled:bg-gray-200 disabled:text-gray-400 disabled:pointer-events-none transition-colors duration-200 whitespace-nowrap"
              >
                Next
              </button>
            </li>
          </ul>
        </nav>
      )}
    </div>
  );
};