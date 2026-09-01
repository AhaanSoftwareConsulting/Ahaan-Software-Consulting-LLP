import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { CalendarBlank, Clock } from "@phosphor-icons/react";
// 1. সেন্ট্রালাইজড API ফাংশন ইমপোর্ট করুন (আপনার ফাইল পাথ অনুযায়ী `./api` পরিবর্তন করুন)
import { getAllBlogsAPI } from "../../../../api/Api";

interface Blog {
  id: string | number;
  title: string;
  image?: string;
  createdAt?: string;
  created_at?: string;
  [key: string]: unknown;
}

interface RelatedBlogsProps {
  currentSlug?: string;
}

const formatSlug = (title: string): string =>
  title
    ? title
        .toLowerCase()
        .replace(/\s+/g, "-")
        .replace(/[^a-z0-9\-]/g, "")
    : "";

export const RelatedBlogs: React.FC<RelatedBlogsProps> = ({ currentSlug }) => {
  const [relatedBlogs, setRelatedBlogs] = useState<Blog[]>([]);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        // 2. সরাসরি fetch-এর বদলে কেন্দ্রীয় API ফাংশন ব্যবহার করা হলো
        const result = await getAllBlogsAPI();

        // Express Backend Response Structure Handling
        const blogs: Blog[] = Array.isArray(result) ? result : result.data || [];

        const sorted = blogs
          .filter((b) => formatSlug(b.title) !== currentSlug)
          .sort((a, b) => {
            const dateA = new Date(a.createdAt || a.created_at || 0).getTime();
            const dateB = new Date(b.createdAt || b.created_at || 0).getTime();
            return dateB - dateA;
          });

        setRelatedBlogs(sorted.slice(0, 70));
      } catch (err) {
        console.error("Error loading related blogs:", err);
      }
    };
    fetchBlogs();
  }, [currentSlug]);

  if (relatedBlogs.length === 0) return null;

  return (
    <div className="bg-black/5 shadow-[0_0_8px_rgba(0,0,0,0.1)] p-5 lg:p-7.5 font-sans min-h-[700px] lg:mt-0 mt-7.5">
      <h3 className="text-black text-2xl font-bold border-b border-black/20 pb-2.5 mb-4">
        Recent Posts
      </h3>

      <div className="max-h-none sm:max-h-[640px] overflow-y-auto [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
        {relatedBlogs.map((blog) => {
          const slug = formatSlug(blog.title);
          const blogUrl = `/blog/${slug}`;
          
          // 3. ডাইনামিক ইমেজ লিঙ্ক হ্যান্ডেল করা
          const image = blog.image?.startsWith("http")
            ? blog.image
            : blog.image;

          const dateVal = blog.createdAt || blog.created_at;
          const createdAt = dateVal ? new Date(dateVal) : new Date();

          const formattedDate = createdAt.toLocaleDateString("en-GB", {
            day: "2-digit",
            month: "short",
            year: "numeric",
          });
          const formattedTime = createdAt.toLocaleTimeString("en-GB", {
            hour: "2-digit",
            minute: "2-digit",
          });

          return (
            <Link
              key={blog.id}
              to={blogUrl}
              className="group block text-white bg-transparent no-underline transition-all duration-300 hover:-translate-y-0.5"
            >
              <div className="flex items-center gap-4 mb-4">
                {blog.image && (
                  <img
                    src={image}
                    alt={blog.title}
                    className="w-[100px] h-[50px] object-cover rounded-lg shrink-0"
                  />
                )}
                <div>
                  <h6 className="text-[0.86rem] font-light m-0 text-black group-hover:text-[#d4a701] transition-colors duration-300 line-clamp-2">
                    {blog.title}
                  </h6>
                  <div className="text-[10px] text-black/90 font-semibold mt-1 flex items-center gap-3">
                    <span className="flex items-center gap-1.5">
                      <CalendarBlank
                        size={16}
                        className="text-[#d9a300] bg-black p-1 rounded-md shrink-0"
                        weight="bold"
                      />
                      {formattedDate}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Clock
                        size={16}
                        className="text-[#d9a300] bg-black p-1 rounded-md shrink-0"
                        weight="bold"
                      />
                      {formattedTime}
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
};