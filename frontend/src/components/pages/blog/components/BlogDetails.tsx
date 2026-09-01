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
import { RelatedBlogs } from "./RelatedBlogs";
import { FollowUs } from "./FollowUs";
import { BlogSearch } from "./BlogSearch";
import { BlogDetailsBanner } from "./BlogDetailsBanner";

// 1. Centralized API Call Import
import { getAllBlogsAPI, updateBlogReactionAPI } from "../../../../api/Api"; 

// 2. SEO Component Import (আপনার প্রজেক্টের সঠিক পথ অনুযায়ী অ্যাডজাস্ট করুন)
import { SEO } from "../../../seo/SEO";

interface Blog {
  id: string | number;
  title: string;
  author?: string;
  author_image?: string;
  image?: string;
  content: string;
  thumbs_up?: number;
  love?: number;
  createdAt?: string;
  created_at?: string;
}

const reactions = [
  { icon: ThumbsUp, label: "thumbs_up", emoji: "👍" },
  { icon: Heart, label: "love", emoji: "❤️" },
];

export const BlogDetails: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const [blog, setBlog] = useState<Blog | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedReaction, setSelectedReaction] = useState<string>("");
  const [reactionCounts, setReactionCounts] = useState<{ thumbs_up: number; love: number }>({
    thumbs_up: 0,
    love: 0,
  });

  const formatSlug = (title: string): string =>
    title ? title.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9\-]/g, "") : "";

  useEffect(() => {
    let isMounted = true;
    setLoading(true);

    const fetchBlog = async () => {
      try {
        const result = await getAllBlogsAPI();
        
        const blogs: Blog[] = result.data || result;
        const matchedBlog = blogs.find((b) => formatSlug(b.title) === slug || String(b.id) === slug);

        if (isMounted && matchedBlog) {
          setBlog(matchedBlog);

          const localReaction = localStorage.getItem(`reacted_${matchedBlog.id}`);
          if (localReaction) {
            setSelectedReaction(localReaction);
          }

          setReactionCounts({
            thumbs_up: matchedBlog.thumbs_up || 0,
            love: matchedBlog.love || 0,
          });
        }
      } catch (err) {
        console.error("Error loading blog details:", err);
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchBlog();

    return () => {
      isMounted = false;
    };
  }, [slug]);

  const handleReaction = async (newReaction: "thumbs_up" | "love") => {
    if (!blog || selectedReaction === newReaction) return;

    const blogId = blog.id;
    const prevReaction = selectedReaction;

    localStorage.setItem(`reacted_${blogId}`, newReaction);
    setSelectedReaction(newReaction);

    setReactionCounts((prev) => {
      const updated = { ...prev };
      if (prevReaction && prevReaction in updated) {
        updated[prevReaction as keyof typeof updated] = Math.max(0, updated[prevReaction as keyof typeof updated] - 1);
      }
      updated[newReaction] = (updated[newReaction] || 0) + 1;
      return updated;
    });

    try {
      const newCount = (reactionCounts[newReaction] || 0) + 1;
      await updateBlogReactionAPI(blogId, { [newReaction]: newCount });
    } catch (err) {
      console.error("Failed to update reaction:", err);
      if (prevReaction) {
        localStorage.setItem(`reacted_${blogId}`, prevReaction);
      } else {
        localStorage.removeItem(`reacted_${blogId}`);
      }
      setSelectedReaction(prevReaction);
    }
  };

  if (loading) return <div className="mt-12 text-center text-lg font-medium text-gray-600">Loading blog details...</div>;
  if (!blog) return <div className="mt-12 text-center text-lg font-medium text-red-600">Blog not found.</div>;

  const dateSource = blog.createdAt || blog.created_at;
  const formattedDate = dateSource
    ? new Date(dateSource).toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      })
    : "Not Available";

  const formattedTime = dateSource
    ? new Date(dateSource).toLocaleTimeString("en-GB", {
        hour: "2-digit",
        minute: "2-digit",
      })
    : "";

  const pageUrl = window.location.href;

  // Clean HTML tags from content to make description for SEO
  const cleanDescription = blog.content
    ? blog.content.replace(/(<([^>]+)>)/gi, "").slice(0, 160).trim()
    : "Read this insightful blog post by Ahaan Software Consulting.";

  return (
    <>
      {/* Dynamic SEO Integration */}
      <SEO
        title={blog.title}
        description={cleanDescription}
        path={`/blog/${slug}`}
      />

      <BlogDetailsBanner />

      <div className="mx-auto max-w-[1400px] px-4 lg:px-6 py-8">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
          {/* Main Content Area */}
          <div className="lg:col-span-8">
            {/* Meta Header */}
            <div className="mb-4 flex flex-wrap items-center justify-between border-b border-gray-200 pb-4 gap-3">
              <div className="flex items-center gap-2">
                {blog.author_image && (
                  <img
                    src={blog.author_image}
                    alt={blog.author || "Author"}
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
            <h1 className="heading-primary">{blog.title || "Untitled Blog"}</h1>

            {/* Social Share & Reactions */}
            <div className="my-6 flex flex-wrap items-center justify-between gap-4">
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
                  const isActive = selectedReaction === label;
                  const countKey = label as keyof typeof reactionCounts;
                  return (
                    <button
                      key={label}
                      onClick={() => handleReaction(label as "thumbs_up" | "love")}
                      className={`flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-sm font-medium transition-all hover:scale-105 ${
                        isActive
                          ? "border-[#c99400] bg-[#c99400] text-white"
                          : "border-gray-300 bg-white text-gray-800 hover:bg-gray-50"
                      }`}
                    >
                      <span>{emoji}</span>
                      <span>{reactionCounts[countKey] || 0}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Banner Image */}
            {blog.image && (
              <div className="mb-6">
                <img
                  src={blog.image}
                  alt={blog.title}
                  className="w-full rounded-2xl object-cover shadow-lg max-h-[500px]"
                />
              </div>
            )}

            {/* Dynamic Blog Content */}
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