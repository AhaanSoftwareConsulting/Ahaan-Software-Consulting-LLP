import { useEffect, useState } from "react";
import type { MouseEvent } from "react";
import {
    ShareNetwork,
    FacebookLogo,
    LinkedinLogo,
    WhatsappLogo,
} from "@phosphor-icons/react";
import { getAllBlogsAPI, updateBlogReactionAPI } from "../../../../api/Api"; // আপনার API ফাইলের Path দিন

interface Blog {
    id: number;
    title: string;
    author: string;
    author_image: string;
    content: string;
    image: string;
    thumbs_up: number;
    love: number;
    created_at: string;
}

interface ReactionCounts {
    [blogId: number]: {
        "thumbs up": number;
        love: number;
    };
}

interface SelectedReactions {
    [blogId: number]: string;
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
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [activeShare, setActiveShare] = useState<number | null>(null);

    const blogsPerPage = 9;

    const fetchAndUpdateBlogs = async (): Promise<void> => {
        try {
            const res = await getAllBlogsAPI();
            if (res.success && Array.isArray(res.data)) {
                const fetchedBlogs: Blog[] = res.data;
                setBlogs(fetchedBlogs);

                const counts: ReactionCounts = {};
                const local: SelectedReactions = {};

                fetchedBlogs.forEach((blog) => {
                    counts[blog.id] = {
                        "thumbs up": blog.thumbs_up || 0,
                        love: blog.love || 0,
                    };

                    const localReaction = localStorage.getItem(`reacted_${blog.id}`);
                    if (localReaction) {
                        local[blog.id] = localReaction;
                    }
                });

                setReactionCounts(counts);
                setSelectedReactions(local);
            }
        } catch (error) {
            console.error("Failed to fetch blogs:", error);
        }
    };

    useEffect(() => {
        fetchAndUpdateBlogs();
    }, []);

    const handleReaction = async (
        blogId: number,
        newReaction: string
    ): Promise<void> => {
        const prevReaction = selectedReactions[blogId];
        if (prevReaction === newReaction) return;

        localStorage.setItem(`reacted_${blogId}`, newReaction);
        setSelectedReactions((prev) => ({ ...prev, [blogId]: newReaction }));

        let updatedThumbsUp = reactionCounts[blogId]?.["thumbs up"] || 0;
        let updatedLove = reactionCounts[blogId]?.love || 0;

        if (prevReaction === "thumbs up" && updatedThumbsUp > 0) updatedThumbsUp -= 1;
        if (prevReaction === "love" && updatedLove > 0) updatedLove -= 1;

        if (newReaction === "thumbs up") updatedThumbsUp += 1;
        if (newReaction === "love") updatedLove += 1;

        setReactionCounts((prev) => ({
            ...prev,
            [blogId]: {
                "thumbs up": updatedThumbsUp,
                love: updatedLove,
            },
        }));

        try {
            await updateBlogReactionAPI(blogId, {
                thumbs_up: updatedThumbsUp,
                love: updatedLove,
            });
        } catch (err) {
            console.error("Failed to update reaction:", err);
        }
    };

    const totalPages = Math.ceil(blogs.length / blogsPerPage);
    const paginatedBlogs = blogs.slice(
        (currentPage - 1) * blogsPerPage,
        currentPage * blogsPerPage
    );

    function getPageList(current: number, total: number): (number | "...")[] {
        if (total <= 5) {
            return Array.from({ length: total }, (_, i) => i + 1);
        }

        const pages: (number | "...")[] = [1];
        const start = Math.max(2, current - 1);
        const end = Math.min(total - 1, current + 1);

        if (start > 2) pages.push("...");
        for (let i = start; i <= end; i++) pages.push(i);
        if (end < total - 1) pages.push("...");

        pages.push(total);
        return pages;
    }

    return (
        <div className="container mx-auto lg:px-6 px-4 py-8 max-w-[1400px]">
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
                                    src={blog.image}
                                    alt={blog.title}
                                    className="w-full h-auto object-cover border-b border-gray-100"
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
                                            className="w-10 h-10 rounded-full object-cover bg-black p-1 shadow-md"
                                        />
                                    )}
                                    <div>
                                        <p className="font-sans text-sm font-semibold text-gray-800 m-0">
                                            By {blog.author || "Ahaan Software"}
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
                                                className={`text-xs px-3 py-1.5 rounded-md border transition-all duration-300 flex items-center gap-1 font-sans ${isSelected
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
                                            <div className="absolute right-45 top-1/2 -translate-y-1/2 translate-x-full ml-2 z-20 bg-white p-2 rounded-md shadow-lg border border-gray-100">
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
                                                        className="shine-btn w-8 h-8 rounded-md bg-[#25d366] text-white flex items-center justify-center text-base transition-transform duration-200 hover:scale-110"
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
                <nav className="flex justify-center mb-8" aria-label="Pagination">
                    <ul className="flex items-center gap-1 p-1 m-0 list-none bg-neutral-900 rounded-full">
                        <li>
                            <button
                                disabled={currentPage === 1}
                                onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
                                aria-label="Previous page"
                                className="w-8 h-8 flex items-center justify-center rounded-full text-neutral-400 hover:text-[#E3A926] disabled:opacity-30 disabled:pointer-events-none transition-colors duration-200"
                            >
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                                    <path d="M15 18l-6-6 6-6" />
                                </svg>
                            </button>
                        </li>

                        {getPageList(currentPage, totalPages).map((page, idx) =>
                            page === "..." ? (
                                <li key={`dots-${idx}`} className="px-1.5 text-neutral-500 select-none">
                                    &middot;&middot;&middot;
                                </li>
                            ) : (
                                <li key={page}>
                                    <button
                                        onClick={() => setCurrentPage(page as number)}
                                        aria-current={currentPage === page ? "page" : undefined}
                                        className={`relative min-w-8 h-8 px-2.5 flex items-center justify-center text-sm font-medium font-sans rounded-full transition-all duration-200 ${currentPage === page
                                            ? "text-black bg-[#E3A926]"
                                            : "text-neutral-400 hover:text-white"
                                            }`}
                                    >
                                        {page}
                                    </button>
                                </li>
                            )
                        )}

                        <li>
                            <button
                                disabled={currentPage === totalPages}
                                onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
                                aria-label="Next page"
                                className="w-8 h-8 flex items-center justify-center rounded-full text-neutral-400 hover:text-[#E3A926] disabled:opacity-30 disabled:pointer-events-none transition-colors duration-200"
                            >
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                                    <path d="M9 18l6-6-6-6" />
                                </svg>
                            </button>
                        </li>
                    </ul>
                </nav>
            )}
        </div>
    );
};