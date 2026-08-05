import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import {
  ShareNetwork,
  FacebookLogo,
  LinkedinLogo,
  WhatsappLogo,
} from "@phosphor-icons/react";
import {BlogSearchBanner} from "./BlogSearchBanner";

interface Reactions {
  "thumbs up": number;
  love: number;
  [key: string]: number;
}

interface Blog {
  id: string | number;
  title: string;
  content: string;
  image?: string;
  author?: string;
  author_image?: string;
  created_at: string;
  reactions?: Reactions;
  [key: string]: unknown;
}

interface ReactionState {
  [blogId: string | number]: Reactions;
}

interface SelectedReactionState {
  [blogId: string | number]: string;
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

const trimToWords = (htmlContent: string, wordLimit = 20): string => {
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

const createSlug = (title: string): string =>
  title
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9\-]/g, "");

export const SearchResults: React.FC = () => {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [reactionCounts, setReactionCounts] = useState<ReactionState>({});
  const [selectedReactions, setSelectedReactions] = useState<SelectedReactionState>({});
  const [activeShare, setActiveShare] = useState<string | number | null>(null);

  const location = useLocation();
  const query = new URLSearchParams(location.search).get("query") || "";

  const fetchBlogs = async () => {
    try {
      const res = await axios.get<Blog[]>("https://ahaansoftware.com/blog-db.json");
      const filtered = res.data.filter((b) =>
        b.title.toLowerCase().includes(query.toLowerCase())
      );

      const counts: ReactionState = {};
      const local: SelectedReactionState = {};

      filtered.forEach((blog) => {
        counts[blog.id] = {
          "thumbs up": blog.reactions?.["thumbs up"] || 0,
          love: blog.reactions?.["love"] || 0,
        };
        const localReaction = localStorage.getItem(`reacted_${blog.id}`);
        if (localReaction) local[blog.id] = localReaction;
      });

      setBlogs(filtered);
      setReactionCounts(counts);
      setSelectedReactions(local);
    } catch (err) {
      console.error("Error fetching blogs:", err);
    }
  };

  useEffect(() => {
    if (query) fetchBlogs();
  }, [query]);

  const handleReaction = async (blogId: string | number, newReaction: string) => {
    const prevReaction = selectedReactions[blogId];
    if (prevReaction === newReaction) return;

    localStorage.setItem(`reacted_${blogId}`, newReaction);
    setSelectedReactions((prev) => ({ ...prev, [blogId]: newReaction }));

    setReactionCounts((prev) => {
      const updated = { ...prev };
      if (!updated[blogId]) updated[blogId] = { "thumbs up": 0, love: 0 };

      if (prevReaction && updated[blogId][prevReaction] > 0) {
        updated[blogId][prevReaction] -= 1;
      }
      updated[blogId][newReaction] = (updated[blogId][newReaction] || 0) + 1;
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
    } catch (err) {
      console.error("Failed to update reaction:", err);
    }
  };

  return (
    <>
      <BlogSearchBanner />
      <div className="max-w-[1600px] mx-auto px-4 lg:px-6 mt-12 font-sans">
        <h2 className="text-2xl sm:text-3xl font-bold text-center text-black mb-8">
          Search Results for "{query}"
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-3">
          {blogs.length > 0 ? (
            blogs.map((blog) => {
              const slug = createSlug(blog.title);
              const blogUrl = `${window.location.origin}/blog/${slug}`;
              const blogReactions = reactionCounts[blog.id] || { "thumbs up": 0, love: 0 };

              return (
                <div
                  key={blog.id}
                  onClick={() => window.open(`/blog/${slug}`, "_blank")}
                  className="bg-white rounded-md shadow-sm border border-gray-100 overflow-hidden flex flex-col h-full cursor-pointer transition-all duration-300 hover:shadow-md hover:-translate-y-1"
                >
                  {blog.image && (
                    <img
                      src={
                        blog.image.startsWith("http")
                          ? blog.image
                          : `https://ahaansoftware.com/${blog.image}`
                      }
                      alt={blog.title}
                      className="w-full h-48 object-content"
                    />
                  )}

                  <div className="p-5 flex flex-col flex-grow">
                    <h5 className="text-lg font-bold text-black mb-2 line-clamp-2">
                      {blog.title}
                    </h5>
                    <p className="text-gray-600 text-sm flex-grow mb-4">
                      {trimToWords(blog.content)}
                    </p>

                    <div className="flex items-center mb-3">
                      {blog.author_image && (
                        <img
                          src={blog.author_image}
                          alt={blog.author}
                          className="w-10 h-10 rounded-full object-cover mr-3"
                        />
                      )}
                      <div>
                        <p className="text-sm font-bold text-black m-0">
                          By {blog.author || "Unknown"}
                        </p>
                        <p className="text-xs text-gray-500 m-0">
                          {formatDateTime(blog.created_at)}
                        </p>
                      </div>
                    </div>

                    {/* Reactions */}
                    <div
                      className="flex gap-2 mb-4"
                      onClick={(e) => e.stopPropagation()}
                    >
                      {reactions.map(({ emoji, label }) => (
                        <button
                          key={label}
                          onClick={() => handleReaction(blog.id, label)}
                          className={`px-3 py-1 rounded-md text-xs font-medium transition-all duration-200 border ${
                            selectedReactions[blog.id] === label
                              ? "bg-amber-400 border-amber-400 text-black"
                              : "bg-transparent border-gray-300 text-gray-700 hover:bg-gray-50"
                          }`}
                        >
                          {emoji} {blogReactions[label] || 0}
                        </button>
                      ))}
                    </div>

                    {/* Actions */}
                    <div
                      className="flex justify-between items-center pt-2 border-t border-gray-100 mt-auto"
                      onClick={(e) => e.stopPropagation()}
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
                          className="p-2 text-gray-700 hover:text-black hover:bg-gray-100 rounded-full transition-colors"
                          aria-label="Share options"
                        >
                          <ShareNetwork size={18} weight="bold" />
                        </button>

                        {activeShare === blog.id && (
                          <div className="absolute right-0 bottom-full mb-2 bg-white rounded-lg shadow-lg border border-gray-100 p-2 z-10 animate-in fade-in zoom-in duration-200">
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
                                className="w-8 h-8 rounded-full border border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white flex items-center justify-center transition-colors"
                                aria-label="Share on Facebook"
                              >
                                <FacebookLogo size={16} weight="fill" />
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
                                className="w-8 h-8 rounded-full border border-blue-700 text-blue-700 hover:bg-blue-700 hover:text-white flex items-center justify-center transition-colors"
                                aria-label="Share on LinkedIn"
                              >
                                <LinkedinLogo size={16} weight="fill" />
                              </button>
                              <button
                                onClick={() =>
                                  window.open(
                                    `https://api.whatsapp.com/send?text=${encodeURIComponent(
                                      `🔗 Read: ${blogUrl}`
                                    )}`,
                                    "_blank"
                                  )
                                }
                                className="w-8 h-8 rounded-full border border-emerald-500 text-emerald-500 hover:bg-emerald-500 hover:text-white flex items-center justify-center transition-colors"
                                aria-label="Share on WhatsApp"
                              >
                                <WhatsappLogo size={16} weight="fill" />
                              </button>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <p className="text-center col-span-full text-gray-500 my-12 text-lg">
              No blogs found 😢
            </p>
          )}
        </div>
      </div>
    </>
  );
};