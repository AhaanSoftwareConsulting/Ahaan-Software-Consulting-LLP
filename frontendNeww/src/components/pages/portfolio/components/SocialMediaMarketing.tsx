import { memo, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getAllSocialMediaMarketingAPI } from "../../../../api/Api";

type SocialMediaItem = {
  id: number;
  image: string;
  projectName: string;
  backgroundColor: string;
};

type CardProps = {
  id: number;
  title: string;
  img: string;
  color: string;
};

// ---------------------------------------------
// Social Media Card
// ---------------------------------------------
const Card = memo(({ title, img, color }: CardProps) => {
  return (
    <div className="group relative aspect-square w-full max-w-[350px]">

      {/* Rotated color backdrop */}
      <div
        className="absolute inset-2 rotate-6 rounded-[28px] shadow-lg transition-transform duration-500 ease-out group-hover:rotate-0"
        style={{
          background: `linear-gradient(145deg, ${color}, ${color}99)`,
        }}
      />

      {/* Tilted photo frame */}
      <div className="absolute inset-2 -rotate-3 overflow-hidden rounded-[24px] border-4 border-white bg-white shadow-xl transition-transform duration-500 ease-out group-hover:rotate-0">

        <img
          src={img}
          alt={title}
          loading="lazy"
          decoding="async"
          draggable={false}
          className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-110"
        />

        {/* Bottom fade */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-black/60 to-transparent" />
      </div>

      {/* Project name */}
      <div className="absolute inset-x-3 bottom-1 z-20 flex justify-center">
        <span
          className="max-w-full truncate rounded-full px-4 py-1.5 text-[11px] font-semibold text-white shadow-md sm:text-xs"
          style={{
            background: color,
          }}
        >
          {title}
        </span>
      </div>

      {/* Common Ahaan logo */}
      <div
        className="absolute -right-2 -top-2 z-30 flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-lg ring-2 transition-transform duration-300 group-hover:-rotate-12 sm:h-11 sm:w-11"
        style={{
          ["--tw-ring-color" as string]: color,
        }}
      >
        <img
          src="https://ahaanmedia.com/asc/layouts/fav.png"
          alt="Ahaan Software Consulting"
          className="h-6 w-6 rounded-full object-contain sm:h-7 sm:w-7"
        />
      </div>
    </div>
  );
});

// ---------------------------------------------
// Social Media Marketing
// ---------------------------------------------
export default function SocialMediaMarketing() {
  const [posts, setPosts] = useState<SocialMediaItem[]>([]);
  const [loading, setLoading] = useState(true);

  // Only show 3 on homepage
  const [visibleCount] = useState<number>(3);

  useEffect(() => {
    let cancelled = false;

    const loadSocialMediaPosts = async () => {
      try {
        setLoading(true);

        const response = await getAllSocialMediaMarketingAPI();

        let data: SocialMediaItem[] = [];

        /*
         * Backend response:
         *
         * {
         *   success: true,
         *   total: 3,
         *   data: [...]
         * }
         */

        if (Array.isArray(response)) {
          data = response;
        } else if (Array.isArray(response?.data)) {
          data = response.data;
        }

        if (!cancelled) {
          setPosts(data);
        }
      } catch (error) {
        console.error(
          "Failed to load social media posts:",
          error
        );

        if (!cancelled) {
          setPosts([]);
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    };

    loadSocialMediaPosts();

    return () => {
      cancelled = true;
    };
  }, []);

  // Only show first 3 posts on homepage
  const visiblePosts = posts.slice(0, visibleCount);

  return (
    <section className="py-3">

      {/* Heading */}
      <div className="mb-12 text-center">
        <h2 className="heading-primary">
          Social Media Marketing
        </h2>

        <p className="mt-2 px-0 text-sm sm:px-8 lg:text-lg">
          A showcase of engaging and creative social media designs
        </p>
      </div>

      {/* Loading */}
      {loading && (
        <div className="flex justify-center py-10">
          <p className="text-sm text-gray-500">
            Loading social media posts...
          </p>
        </div>
      )}

      {/* No posts */}
      {!loading && posts.length === 0 && (
        <div className="flex justify-center py-10">
          <p className="text-sm text-gray-500">
            No social media posts available.
          </p>
        </div>
      )}

      {/* Grid */}
      {!loading && visiblePosts.length > 0 && (
        <div className="relative mx-auto grid max-w-[1400px] grid-cols-2 gap-x-1.5 gap-y-6 sm:gap-x-1.5 sm:gap-y-8 lg:grid-cols-3 lg:gap-x-2 lg:gap-y-15">

          {visiblePosts.map((post) => (
            <div
              key={post.id}
              className="flex justify-center"
            >
              <Card
                id={post.id}
                title={post.projectName}
                img={post.image}
                color={post.backgroundColor}
              />
            </div>
          ))}

        </div>
      )}

      {/* View All */}
      {!loading && posts.length > 3 && (
        <div className="mt-8 flex justify-center">
          <Link
            to="/all-media-marketing"
            className="
              shine-btn
              relative
              overflow-hidden
              uppercase
              bg-gradient-to-r
              from-[#C48A18]
              to-[#E6B33C]
              px-5
              py-3
              text-sm
              font-semibold
              text-black
              shadow-xl
              transition-all
              duration-300
              hover:-translate-y-0.5
              hover:from-[#B57A0C]
              hover:to-[#D69D20]
              xl:px-6
              xl:py-3.5
              xl:text-base
              2xl:px-8
            "
          >
            View All
          </Link>
        </div>
      )}

    </section>
  );
}