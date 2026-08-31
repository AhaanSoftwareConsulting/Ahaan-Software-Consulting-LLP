import { memo, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getAllSocialMediaMarketingAPI } from "../../../../api/Api";

type SocialMediaItem = {
  id: number;
  image: string;
  projectName: string;
  backgroundColor: string;
};

const Card = memo(
  ({ projectName, image, backgroundColor }: SocialMediaItem) => {
    return (
      <div className="group relative aspect-square w-full max-w-[350px]">
        {/* Rotated color backdrop */}
        <div
          className="absolute inset-2 rounded-[28px] rotate-6 shadow-lg transition-transform duration-500 ease-out group-hover:rotate-0"
          style={{
            background: `linear-gradient(
              145deg,
              ${backgroundColor},
              ${backgroundColor}99
            )`,
          }}
        />

        {/* Tilted photo frame */}
        <div className="absolute inset-2 -rotate-3 overflow-hidden rounded-[24px] border-4 border-white bg-white shadow-xl transition-transform duration-500 ease-out group-hover:rotate-0">
          <img
            src={image}
            alt={projectName}
            loading="lazy"
            decoding="async"
            draggable={false}
            className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-110"
          />

          {/* Subtle bottom fade */}
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-black/60 to-transparent" />
        </div>

        {/* Title pill */}
        <div className="absolute inset-x-3 bottom-1 z-20 flex justify-center">
          <span
            className="max-w-full truncate rounded-full px-4 py-1.5 text-[11px] font-semibold text-white shadow-md sm:text-xs"
            style={{
              backgroundColor: backgroundColor,
            }}
          >
            {projectName}
          </span>
        </div>

        {/* Logo badge */}
        <div
          className="absolute -right-2 -top-2 z-30 flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-lg ring-2 transition-transform duration-300 group-hover:-rotate-12 sm:h-11 sm:w-11"
          style={{
            ["--tw-ring-color" as string]: backgroundColor,
          }}
        >
          <img
            src="https://ahaanmedia.com/asc/layouts/fav.png"
            alt="Ahaan Software Consulting logo"
            className="h-6 w-6 rounded-full object-contain sm:h-7 sm:w-7"
          />
        </div>
      </div>
    );
  }
);

export default function SocialMediaMarketing() {
  const [socialMedia, setSocialMedia] = useState<SocialMediaItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSocialMedia = async () => {
      try {
        setLoading(true);

        const data = await getAllSocialMediaMarketingAPI();

        console.log("Social Media Marketing API:", data);

        setSocialMedia(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error("❌ Failed to fetch social media marketing:", error);
        setSocialMedia([]);
      } finally {
        setLoading(false);
      }
    };

    fetchSocialMedia();
  }, []);

  // Show only first 3 on homepage
  const visibleCards = socialMedia.slice(0, 3);

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
          <p className="text-sm text-zinc-500">
            Loading social media designs...
          </p>
        </div>
      )}

      {/* Cards */}
      {!loading && visibleCards.length > 0 && (
        <div className="relative mx-auto grid max-w-[1400px] grid-cols-2 gap-x-1.5 gap-y-6 sm:gap-x-1.5 sm:gap-y-8 lg:grid-cols-3 lg:gap-x-2 lg:gap-y-15">
          {visibleCards.map((card) => (
            <div key={card.id} className="flex justify-center">
              <Card {...card} />
            </div>
          ))}
        </div>
      )}

      {/* No data */}
      {!loading && socialMedia.length === 0 && (
        <div className="flex justify-center py-10">
          <p className="text-sm text-zinc-500">
            No social media designs found.
          </p>
        </div>
      )}

      {/* View All */}
      {!loading && socialMedia.length > 3 && (
        <div className="mt-8 flex justify-center">
         <Link
            to="/all-media-marketing"
            className="shine-btn relative overflow-hidden uppercase
                bg-gradient-to-r
                from-[#C48A18]
                to-[#E6B33C]
                px-5
                xl:px-6
                2xl:px-8
                py-3
                xl:py-3.5
                text-sm
                xl:text-base
                font-semibold
                text-black
                shadow-xl
                transition-all
                duration-300
                hover:-translate-y-0.5
                hover:from-[#B57A0C]
                hover:to-[#D69D20]"
          >
            View All
          </Link>
        </div>
      )}
    </section>
  );
}

