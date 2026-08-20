import { memo, useEffect, useState } from "react";
import { getAllSocialMediaMarketingAPI } from "../../../../api/Api";
import AllSocialBanner from "./AllSocialBanner";


// ---------------------------------------------
// API data type
// ---------------------------------------------
type SocialMediaItem = {
  id: number;
  image: string;
  projectName: string;
  backgroundColor: string;
};


// ---------------------------------------------
// Card
// ---------------------------------------------
const Card = memo(
  ({ projectName, image, backgroundColor }: SocialMediaItem) => {
    return (
      <div className="group relative aspect-square w-full max-w-[350px]">

        {/* Rotated color backdrop */}
        <div
          className="
            absolute
            inset-2
            rounded-[28px]
            rotate-6
            shadow-lg
            transition-transform
            duration-500
            ease-out
            group-hover:rotate-0
          "
          style={{
            background: `linear-gradient(
              145deg,
              ${backgroundColor},
              ${backgroundColor}99
            )`,
          }}
        />

        {/* Tilted photo frame */}
        <div
          className="
            absolute
            inset-2
            -rotate-3
            overflow-hidden
            rounded-[24px]
            border-4
            border-white
            bg-white
            shadow-xl
            transition-transform
            duration-500
            ease-out
            group-hover:rotate-0
          "
        >
          <img
            src={image}
            alt={projectName}
            loading="lazy"
            decoding="async"
            draggable={false}
            className="
              h-full
              w-full
              object-cover
              transition-transform
              duration-500
              ease-out
              group-hover:scale-110
            "
          />

          {/* Bottom fade */}
          <div
            className="
              pointer-events-none
              absolute
              inset-x-0
              bottom-0
              h-16
              bg-gradient-to-t
              from-black/60
              to-transparent
            "
          />
        </div>


        {/* Project name */}
        <div
          className="
            absolute
            inset-x-3
            bottom-1
            z-20
            flex
            justify-center
          "
        >
          <span
            className="
              max-w-full
              truncate
              rounded-full
              px-4
              py-1.5
              text-[11px]
              font-semibold
              text-white
              shadow-md
              sm:text-xs
            "
            style={{
              background: backgroundColor,
            }}
          >
            {projectName}
          </span>
        </div>


        {/* Logo badge */}
        <div
          className="
            absolute
            -right-2
            -top-2
            z-30
            flex
            h-10
            w-10
            items-center
            justify-center
            rounded-full
            bg-white
            shadow-lg
            ring-2
            transition-transform
            duration-300
            group-hover:-rotate-12
            sm:h-11
            sm:w-11
          "
          style={{
            ["--tw-ring-color" as string]: backgroundColor,
          }}
        >
          <img
            src="https://ahaanmedia.com/asc/layouts/fav.png"
            alt="Ahaan Software Consulting"
            className="
              h-6
              w-6
              rounded-full
              object-contain
              sm:h-7
              sm:w-7
            "
          />
        </div>

      </div>
    );
  }
);


// ---------------------------------------------
// Main Component
// ---------------------------------------------
export function AllSocialMediaMarketing() {

  const [posts, setPosts] = useState<SocialMediaItem[]>([]);
  const [visibleCount, setVisibleCount] = useState<number>(9);
  const [loading, setLoading] = useState<boolean>(true);


  // ---------------------------------------------
  // Fetch Social Media Posts
  // ---------------------------------------------
  useEffect(() => {
    let cancelled = false;

    const loadSocialMediaPosts = async () => {
      try {
        setLoading(true);

        const res = await getAllSocialMediaMarketingAPI();

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

        if (Array.isArray(res)) {
          data = res;
        } else if (Array.isArray(res?.data)) {
          data = res.data;
        } else if (res?.data && typeof res.data === "object") {
          data = [res.data];
        }

        if (!cancelled) {
          setPosts(data);
        }

      } catch (error) {

        console.error(
          "❌ Failed to load social media posts:",
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


  // ---------------------------------------------
  // Visible posts
  // ---------------------------------------------
  const visiblePosts = posts.slice(0, visibleCount);


  // ---------------------------------------------
  // Load More
  // ---------------------------------------------
  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + 9);
  };


  return (
    <>
      <AllSocialBanner />

      <section
        className="
          overflow-x-hidden
          px-4
          py-6
          sm:py-10
          lg:py-16
        "
      >

        {/* Heading */}
        <div className="mb-12 text-center">

          <h2 className="heading-primary">
            Social Media Marketing
          </h2>

          <p className="mt-2 px-4 text-sm sm:px-8 lg:text-lg">
            A showcase of engaging and creative social media designs
          </p>

        </div>


        {/* Loading */}
        {loading && (
          <div className="flex justify-center py-20">

            <div
              className="
                h-10
                w-10
                animate-spin
                rounded-full
                border-4
                border-gray-200
                border-t-black
              "
            />

          </div>
        )}


        {/* No Posts */}
        {!loading && posts.length === 0 && (
          <div className="py-20 text-center">

            <p className="text-gray-500">
              No social media posts available.
            </p>

          </div>
        )}


        {/* Cards */}
        {!loading && posts.length > 0 && (
          <>
            <div
              className="
                relative
                mx-auto
                grid
                max-w-[1400px]
                grid-cols-2
                gap-x-1.5
                gap-y-6
                sm:gap-x-1.5
                sm:gap-y-8
                lg:grid-cols-3
                lg:gap-x-2
                lg:gap-y-15
              "
            >

              {visiblePosts.map((post) => (
                <div
                  key={post.id}
                  className="flex justify-center"
                >
                  <Card {...post} />
                </div>
              ))}

            </div>


            {/* Load More */}
            {visibleCount < posts.length && (
              <div className="mt-12 flex justify-center">

                <button
                  onClick={handleLoadMore}
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
                  Load More
                </button>

              </div>
            )}

          </>
        )}

      </section>
    </>
  );
}