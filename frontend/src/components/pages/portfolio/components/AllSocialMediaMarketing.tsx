import { memo, useEffect, useState } from "react";
import AllSocialBanner from "./AllSocialBanner";
import { getAllSocialMediaMarketingAPI } from "../../../../api/Api";
import { SEO } from "../../../seo/SEO";

type SocialMediaItem = {
  id: number;
  image: string;
  projectName: string;
  backgroundColor: string;
};

type CardProps = SocialMediaItem;

const Card = memo(({ projectName, image, backgroundColor }: CardProps) => {
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

        {/* Bottom fade */}
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
});

export function AllSocialMediaMarketing() {
  const [socialMedia, setSocialMedia] = useState<SocialMediaItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSocialMedia = async () => {
      try {
        setLoading(true);

        const data = await getAllSocialMediaMarketingAPI();

        console.log("Social Media API Data:", data);

        setSocialMedia(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error("❌ Failed to load social media posts:", error);
        setSocialMedia([]);
      } finally {
        setLoading(false);
      }
    };

    fetchSocialMedia();
  }, []);

  return (
    <>
      <SEO
        title="Social Media Marketing Portfolio"
        description="Strategic branding and social media marketing campaigns managed for clients."
        path="/all-media-marketing"
      />
      <AllSocialBanner />

      <section className="overflow-x-hidden px-4 py-6 sm:py-10 lg:py-16">
        {/* Heading */}
        <div className="mb-12 text-center">
          <h2 className="heading-primary">Social Media Marketing</h2>

          <p className="mt-2 px-4 text-sm sm:px-8 lg:text-lg">
            A showcase of engaging and creative social media designs
          </p>
        </div>

        {/* Loading */}
        {loading && (
          <div className="flex justify-center py-16">
            <p className="text-sm text-zinc-500">
              Loading social media designs...
            </p>
          </div>
        )}

        {/* Empty state */}
        {!loading && socialMedia.length === 0 && (
          <div className="flex justify-center py-16">
            <p className="text-sm text-zinc-500">
              No social media designs found.
            </p>
          </div>
        )}

        {/* Grid */}
        {!loading && socialMedia.length > 0 && (
          <div className="relative mx-auto grid max-w-[1400px] grid-cols-2 gap-x-1.5 gap-y-6 sm:gap-x-1.5 sm:gap-y-8 lg:grid-cols-3 lg:gap-x-2 lg:gap-y-15">
            {socialMedia.map((item) => (
              <div key={item.id} className="flex justify-center">
                <Card {...item} />
              </div>
            ))}
          </div>
        )}
      </section>
    </>
  );
}
