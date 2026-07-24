import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  Calendar,
  Clock,
  ShareNetwork,
  FacebookLogo,
  LinkedinLogo,
  WhatsappLogo,
  ThumbsUp,
  Heart,
} from "@phosphor-icons/react";
import {RelatedBlogs} from "./RelatedBlogs";
import {FollowUs} from "./FollowUs";
import {BlogSearch} from "./BlogSearch";
import {BlogDetailsBanner} from "./BlogDetailsBanner";

interface ReactionCounts {
  "thumbs up": number;
  love: number;
}

interface Blog {
  id: string | number;
  title: string;
  author?: string;
  author_image?: string;
  image?: string;
  content: string;
  created_at?: string;
  reactions?: Partial<ReactionCounts>;
}

const reactions = [
  { icon: ThumbsUp, label: "thumbs up", emoji: "👍" },
  { icon: Heart, label: "love", emoji: "❤️" },
];

export const BlogDetails: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const [blog, setBlog] = useState<Blog | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedReactions, setSelectedReactions] = useState<Record<string | number, string>>({});
  const [reactionCounts, setReactionCounts] = useState<Record<string | number, ReactionCounts>>({});

  const formatSlug = (title: string): string =>
    title ? title.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9\-]/g, "") : "";

  useEffect(() => {
    let isMounted = true;
    setLoading(true);

    const fetchBlog = async () => {
      try {
        const res = await fetch("https://ahaansoftware.com/blog-db.json");
        const blogs: Blog[] = await res.json();
        const matchedBlog = blogs.find((b) => formatSlug(b.title) === slug);

        if (isMounted) {
          setBlog(matchedBlog || null);

          if (matchedBlog) {
            const localReaction = localStorage.getItem(`reacted_${matchedBlog.id}`);
            if (localReaction) {
              setSelectedReactions({ [matchedBlog.id]: localReaction });
            }

            setReactionCounts({
              [matchedBlog.id]: {
                "thumbs up": matchedBlog.reactions?.["thumbs up"] || 0,
                love: matchedBlog.reactions?.["love"] || 0,
              },
            });
          }
        }
      } catch (err) {
        console.error("Error loading blog:", err);
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchBlog();

    return () => {
      isMounted = false;
    };
  }, [slug]);

  const handleReaction = async (blogId: string | number, newReaction: string) => {
    const prevReaction = selectedReactions[blogId];
    if (prevReaction === newReaction) return;

    // Optimistic UI Update
    localStorage.setItem(`reacted_${blogId}`, newReaction);
    setSelectedReactions((prev) => ({ ...prev, [blogId]: newReaction }));

    setReactionCounts((prev) => {
      const currentBlogReactions = prev[blogId] || { "thumbs up": 0, love: 0 };
      const updatedCounts: ReactionCounts = { ...currentBlogReactions };

      if (prevReaction && updatedCounts[prevReaction as keyof ReactionCounts] > 0) {
        updatedCounts[prevReaction as keyof ReactionCounts] -= 1;
      }
      
      updatedCounts[newReaction as keyof ReactionCounts] =
        (updatedCounts[newReaction as keyof ReactionCounts] || 0) + 1;

      return { ...prev, [blogId]: updatedCounts };
    });

    try {
      const formData = new URLSearchParams();
      formData.append("id", String(blogId));
      formData.append("reaction", newReaction);
      formData.append("prevReaction", prevReaction || "");

      const res = await fetch("https://ahaansoftware.com/update-json.php", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: formData,
      });

      if (!res.ok) throw new Error("Failed server update");
    } catch (err) {
      console.error("Failed to update reaction:", err);
      // Revert local state on error
      if (prevReaction) {
        localStorage.setItem(`reacted_${blogId}`, prevReaction);
      } else {
        localStorage.removeItem(`reacted_${blogId}`);
      }
      setSelectedReactions((prev) => ({ ...prev, [blogId]: prevReaction || "" }));
    }
  };

  if (loading) return <div className="mt-12 text-center text-lg font-medium text-gray-600">Loading blog details...</div>;
  if (!blog) return <div className="mt-12 text-center text-lg font-medium text-red-600">Blog not found.</div>;

  const formattedDate = blog.created_at
    ? new Date(blog.created_at).toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      })
    : "Not Available";

  const formattedTime = blog.created_at
    ? new Date(blog.created_at).toLocaleTimeString("en-GB", {
        hour: "2-digit",
        minute: "2-digit",
      })
    : "";

  const metaImage = blog.image?.startsWith("http")
    ? blog.image
    : `https://ahaansoftware.com/${blog.image}`;

  const pageUrl = `${window.location.origin}/blog/${slug}`;
  const blogReactions = reactionCounts[blog.id] || { "thumbs up": 0, love: 0 };

  return (
    <>
      <BlogDetailsBanner />

      <div className="mx-auto max-w-[1600px] px-4 lg:px-6 py-8">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
          {/* Main Content Area */}
          <div className="lg:col-span-8">
            {/* Meta Header */}
            <div className="mb-4 flex flex-wrap items-center justify-between border-b border-gray-200 pb-4 gap-3">
              <div className="flex items-center gap-2">
                {blog.author_image && (
                  <img
                    src={blog.author_image}
                    alt={blog.author}
                    className="h-8 w-8 rounded-full border-2 border-black object-cover p-0.5 shadow-sm transition-transform duration-200 hover:scale-105"
                  />
                )}
                <span className="font-semibold text-gray-900">{blog.author || "Ahaan Software"}</span>
              </div>

              <div className="flex items-center gap-4 text-sm font-medium text-black">
                <div className="flex items-center gap-2">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-black text-[#c99400]">
                    <Calendar size={18} weight="bold" />
                  </div>
                  <span>{formattedDate}</span>
                </div>

                {formattedTime && (
                  <div className="flex items-center gap-2">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-black text-[#c99400]">
                      <Clock size={18} weight="bold" />
                    </div>
                    <span>{formattedTime}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Title */}
            <h1 className="mb-4 text-3xl font-bold tracking-tight text-gray-900 md:text-4xl">
              {blog.title || "Untitled Blog"}
            </h1>

            {/* Social Share & Reactions */}
            <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
              {/* Share Buttons */}
              <div className="flex items-center gap-2">
                <ShareNetwork size={24} weight="bold" className="text-black" />
                <button
                  aria-label="Share on Facebook"
                  onClick={() =>
                    window.open(
                      `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(pageUrl)}`,
                      "_blank"
                    )
                  }
                  className="flex h-9 w-9 items-center justify-center rounded-full bg-black text-[#c99400] transition-colors hover:bg-[#c99400] hover:text-white"
                >
                  <FacebookLogo size={18} weight="fill" />
                </button>

                <button
                  aria-label="Share on LinkedIn"
                  onClick={() =>
                    window.open(
                      `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(pageUrl)}`,
                      "_blank"
                    )
                  }
                  className="flex h-9 w-9 items-center justify-center rounded-full bg-black text-[#c99400] transition-colors hover:bg-[#c99400] hover:text-white"
                >
                  <LinkedinLogo size={18} weight="fill" />
                </button>

                <button
                  aria-label="Share on WhatsApp"
                  onClick={() =>
                    window.open(
                      `https://api.whatsapp.com/send?text=${encodeURIComponent(
                        `📌 *${blog.title}*\n👤 By ${blog.author}\n🕒 ${formattedDate}\n\n🔗 Read more: ${pageUrl}`
                      )}`,
                      "_blank"
                    )
                  }
                  className="flex h-9 w-9 items-center justify-center rounded-full bg-black text-[#c99400] transition-colors hover:bg-[#c99400] hover:text-white"
                >
                  <WhatsappLogo size={18} weight="fill" />
                </button>
              </div>

              {/* Reaction Buttons */}
              <div className="flex items-center gap-2">
                {reactions.map(({ label, emoji }) => {
                  const isActive = selectedReactions[blog.id] === label;
                  return (
                    <button
                      key={label}
                      onClick={() => handleReaction(blog.id, label)}
                      className={`flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-sm font-medium transition-all hover:scale-105 ${
                        isActive
                          ? "border-[#c99400] bg-[#c99400] text-white"
                          : "border-gray-300 bg-white text-gray-800 hover:bg-gray-50"
                      }`}
                    >
                      <span>{emoji}</span>
                      <span>{blogReactions[label as keyof ReactionCounts] || 0}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Banner Image */}
            {blog.image && (
              <div className="mb-6">
                <img
                  src={metaImage}
                  alt={blog.title}
                  className="w-full rounded-2xl object-cover shadow-lg"
                />
              </div>
            )}

            {/* Dynamic Blog Content (using @tailwindcss/typography classes) */}
            <div
              className="prose prose-lg max-w-none text-justify text-black [&_h1]:mt-7 [&_h1]:mb-4 [&_h1]:font-bold [&_h2]:mt-7 [&_h2]:mb-4 [&_h2]:font-bold [&_h3]:mt-7 [&_h3]:mb-4 [&_h3]:font-bold [&_p]:text-justify [&_p]:leading-relaxed"
              dangerouslySetInnerHTML={{ __html: blog.content }}
            />
          </div>

          {/* Sticky Sidebar */}
          <div className="lg:col-span-4 lg:sticky lg:top-24 lg:self-start">
            <div className="flex flex-col gap-6">
              <BlogSearch />
              <RelatedBlogs currentSlug={slug} />
              <FollowUs />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

