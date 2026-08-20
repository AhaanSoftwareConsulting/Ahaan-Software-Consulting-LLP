import React, { useEffect, useState, type FormEvent, type ChangeEvent } from "react";
import { useNavigate } from "react-router-dom";
import { MagnifyingGlass } from "@phosphor-icons/react";

interface Blog {
  id: string | number;
  title: string;
  image?: string;
  [key: string]: unknown;
}

export const BlogSearch: React.FC = () => {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [query, setQuery] = useState<string>("");
  const [filteredBlogs, setFilteredBlogs] = useState<Blog[]>([]);
  const navigate = useNavigate();

  const formatSlug = (title: string): string =>
    title
      .toLowerCase()
      .replace(/\s+/g, "-")
      .replace(/[^a-z0-9\-]/g, "");

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await fetch("https://ahaansoftware.com/blog-db.json");
        const data: Blog[] = await res.json();
        setBlogs(data);
      } catch (err) {
        console.error("Error fetching blogs:", err);
      }
    };
    fetchBlogs();
  }, []);

  useEffect(() => {
    if (query.trim() === "") {
      setFilteredBlogs([]);
      return;
    }

    const results = blogs.filter((b) =>
      b.title.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredBlogs(results.slice(0, 6));
  }, [query, blogs]);

  const handleSelect = (title: string) => {
    const slug = formatSlug(title);
    navigate(`/blog/${slug}`);
    setQuery("");
    setFilteredBlogs([]);
  };

  const handleSearchSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (query.trim() !== "") {
      navigate(`/blog/search?query=${encodeURIComponent(query)}`);
      setFilteredBlogs([]);
    }
  };

  return (
    <div className="bg-black/5 shadow-[0_0_8px_rgba(0,0,0,0.1)] p-5 font-sans text-black mb-8">
      <h3 className="font-sans font-bold text-lg mb-3">Search Blog</h3>

      <form onSubmit={handleSearchSubmit} className="flex gap-2">
        <input
          type="text"
          placeholder="Search by Title..."
          value={query}
          onChange={(e: ChangeEvent<HTMLInputElement>) => setQuery(e.target.value)}
          className="w-full border border-black/20 rounded-lg px-3.5 py-2.5 text-sm text-black bg-transparent outline-none placeholder:text-black focus:border-black focus:ring-1 focus:ring-black/50 transition-all"
        />
        <button
          type="submit"
          className="bg-black text-[#e3a926] hover:bg-[#e3a926] hover:text-black px-4 py-2.5 rounded-lg cursor-pointer font-sans transition-all duration-300 flex items-center gap-1.5 font-medium shrink-0"
        >
          <MagnifyingGlass size={18} weight="bold" />
          <span>Search</span>
        </button>
      </form>

      {filteredBlogs.length > 0 && (
        <ul className="mt-2.5 list-none p-0 max-h-[260px] overflow-y-auto rounded-lg bg-transparent [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
          {filteredBlogs.map((blog) => (
            <li
              key={blog.id}
              onClick={() => handleSelect(blog.title)}
              className="flex items-center gap-2.5 p-2 px-3 cursor-pointer text-black text-sm transition-colors duration-200 hover:bg-black/5"
            >
              <img
                src={
                  blog.image?.startsWith("http")
                    ? blog.image
                    : `https://ahaansoftware.com/${blog.image}`
                }
                alt={blog.title}
                className="w-[50px] h-[40px] object-cover rounded-md shrink-0"
              />
              <span className="line-clamp-2">{blog.title}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};