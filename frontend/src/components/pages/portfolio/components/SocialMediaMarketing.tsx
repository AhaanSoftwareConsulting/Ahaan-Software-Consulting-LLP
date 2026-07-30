import { memo, useState } from "react";
import { Link } from "react-router-dom";

type CardItem = {
  id: number;
  title: string;
  img: string;
  shape: "yellow" | "purple" | "blue";
  color: string;
};

const cardsData: CardItem[] = [
  {
    id: 1,
    title: "Aster Hospital",
    img: "https://ahaanmedia.com/ahaanwebsite/SocialMedia/11.webp",
    shape: "yellow",
    color: "#F4A62A",
  },
  {
    id: 2,
    title: "Ahaan Software Consulting",
    img: "https://ahaanmedia.com/ahaanwebsite/SocialMedia/22.webp",
    shape: "purple",
    color: "#7C3AED",
  },
  {
    id: 3,
    title: "Ahaan Software Consulting",
    img: "https://ahaanmedia.com/ahaanwebsite/SocialMedia/33.webp",
    shape: "blue",
    color: "#2563EB",
  },
  {
    id: 4,
    title: "Ahaan Software Consulting",
    img: "https://ahaanmedia.com/ahaanwebsite/SocialMedia/44.webp",
    shape: "yellow",
    color: "#EF6C3B",
  },
  {
    id: 5,
    title: "Ahaan Software Consulting",
    img: "https://ahaanmedia.com/ahaanwebsite/SocialMedia/55.webp",
    shape: "purple",
    color: "#16A34A",
  },
  {
    id: 6,
    title: "Ahaan Software Consulting",
    img: "https://ahaanmedia.com/ahaanwebsite/SocialMedia/66.webp",
    shape: "blue",
    color: "#EC4899",
  },
  {
    id: 7,
    title: "Logix BPO",
    img: "https://ahaanmedia.com/ahaanwebsite/SocialMedia/7.webp",
    shape: "yellow",
    color: "#0D9488",
  },
  {
    id: 8,
    title: "Logix BPO",
    img: "https://ahaanmedia.com/ahaanwebsite/SocialMedia/8.webp",
    shape: "purple",
    color: "#F59E0B",
  },
  {
    id: 9,
    title: "Logix BPO",
    img: "https://ahaanmedia.com/ahaanwebsite/SocialMedia/9.webp",
    shape: "blue",
    color: "#6D28D9",
  },
];

// ---------------------------------------------
// Same "tilted backdrop" card design used on the
// full listing page:
// - a rotated colored panel sits behind the photo like a
//   floating shadow-card, straightening out on hover
// - the photo itself sits in a tilted, white-bordered frame
//   that also straightens on hover (playful, layered motion)
// - a small colored pill with the title floats at the bottom,
//   overlapping both layers
// - the logo becomes a corner badge that pops out past the
//   card edge, ringed in the card's own color
// Only the photo src, logo src, and title text are carried
// over unchanged from the original data.
// ---------------------------------------------
const Card = memo(({ title, img, color }: CardItem) => {
  return (
    <div className="group relative aspect-square w-full max-w-[350px]">
      {/* Rotated color backdrop */}
      <div
        className="absolute inset-2 rounded-[28px] rotate-6 shadow-lg transition-transform duration-500 ease-out group-hover:rotate-0"
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

        {/* Subtle bottom fade so the title pill always reads well */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-black/60 to-transparent" />
      </div>

      {/* Title pill, floating across both layers */}
      <div className="absolute inset-x-3 bottom-1 z-20 flex justify-center">
        <span
          className="max-w-full truncate rounded-full px-4 py-1.5 text-[11px] font-semibold text-white shadow-md sm:text-xs"
          style={{ background: color }}
        >
          {title}
        </span>
      </div>

      {/* Logo badge, popping past the corner */}
      <div
        className="absolute -right-2 -top-2 z-30 flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-lg ring-2 transition-transform duration-300 group-hover:-rotate-12 sm:h-11 sm:w-11"
        style={{ ["--tw-ring-color" as string]: color }}
      >
        <img
          src="https://ahaanmedia.com/asc/layouts/fav.png"
          alt="logo"
          className="h-6 w-6 rounded-full object-contain sm:h-7 sm:w-7"
        />
      </div>
    </div>
  );
});

export default function SocialMediaMarketing() {
  const [visibleCount] = useState<number>(3);

  // const handleLoadMore = () => {
  //   setVisibleCount((prev) => Math.min(prev + 3, cardsData.length));
  // };

  const visibleCards = cardsData.slice(0, visibleCount);

  return (
    <section className="py-3">
      {/* Heading */}
      <div className="mb-12 text-center">
        <h2 className="text-3xl sm:text-4xl font-extrabold text-[#1c1d20] leading-tight">
          Social Media Marketing
        </h2>

        <p className="lg:text-base text-sm px-4 sm:px-8 mt-2">
          A showcase of engaging and creative social media designs
        </p>
      </div>

      {/* Grid */}
      <div className="relative mx-auto grid max-w-[1400px] grid-cols-2 gap-x-1.5 gap-y-6 sm:gap-x-1.5 sm:gap-y-8 lg:grid-cols-3 lg:gap-x-2 lg:gap-y-15">
        {visibleCards.map((card) => (
          <div key={card.id} className="flex justify-center">
            <Card {...card} />
          </div>
        ))}
      </div>

      {/* Load More */}
      {visibleCount < cardsData.length && (
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
