import { memo, useState } from "react";
import AllSocialBanner from "./AllSocialBanner";

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
    title: "Creative Marketing Agency",
    img: "https://ahaanmedia.com/ahaanwebsite/SocialMedia/11.webp",
    shape: "yellow",
    color: "#F5B942",
  },
  {
    id: 2,
    title: "Creative Marketing Agency",
    img: "https://ahaanmedia.com/ahaanwebsite/SocialMedia/22.webp",
    shape: "purple",
    color: "#8028C9",
  },
  {
    id: 3,
    title: "Creative Marketing Agency",
    img: "https://ahaanmedia.com/ahaanwebsite/SocialMedia/33.webp",
    shape: "blue",
    color: "#2384E0",
  },
  {
    id: 4,
    title: "Creative Marketing Agency",
    img: "https://ahaanmedia.com/ahaanwebsite/SocialMedia/44.webp",
    shape: "yellow",
    color: "#FF5733",
  },
  {
    id: 5,
    title: "Creative Marketing Agency",
    img: "https://ahaanmedia.com/ahaanwebsite/SocialMedia/55.webp",
    shape: "purple",
    color: "#1BB55C",
  },
  {
    id: 6,
    title: "Creative Marketing Agency",
    img: "https://ahaanmedia.com/ahaanwebsite/SocialMedia/66.webp",
    shape: "blue",
    color: "#FF1493",
  },
  {
    id: 7,
    title: "Creative Marketing Agency",
    img: "https://ahaanmedia.com/ahaanwebsite/SocialMedia/7.webp",
    shape: "yellow",
    color: "#009688",
  },
  {
    id: 8,
    title: "Creative Marketing Agency",
    img: "https://ahaanmedia.com/ahaanwebsite/SocialMedia/8.webp",
    shape: "purple",
    color: "#FF9800",
  },
  {
    id: 9,
    title: "Creative Marketing Agency",
    img: "https://ahaanmedia.com/ahaanwebsite/SocialMedia/9.webp",
    shape: "blue",
    color: "#673AB7",
  },
];

const Card = memo(
  ({
    title,
    img,
    shape,
    color,
  }: CardItem) => {
    const clipPath =
      shape === "yellow"
        ? "polygon(0 25%,100% 75%,100% 100%,0 100%)"
        : shape === "purple"
        ? "polygon(0 15%,100% 65%,100% 100%,0 100%)"
        : "polygon(0 70%,0 100%,100% 100%,100% 30%)";

    return (
      <div
        className="
          relative
          aspect-square
          w-full
          max-w-[350px]
          overflow-hidden
          rounded-xl
          bg-white
          shadow-lg
        "
      >
        {/* Colored Shape */}

        <div
          className="absolute inset-0"
          style={{
            background: color,
            clipPath,
          }}
        />

        {/* Image */}

        <div
          className={`
            absolute
            bottom-6
            z-10
            overflow-hidden
            bg-white
            border-4
            sm:border-8
            ${
              shape === "blue"
                ? "left-6 rounded-lg"
                : shape === "purple"
                ? "right-6 rounded-full"
                : "right-6 rounded-md"
            }
          `}
          style={{
            borderColor: color,
            width: "calc(100% - 48px)",
            aspectRatio: "1",
            maxWidth: 230,
          }}
        >
          <img
            src={img}
            alt={title}
            loading="lazy"
            decoding="async"
            draggable={false}
            className={`
              w-full
              h-full
              object-cover
              transition-transform
              duration-300
              hover:scale-105
              ${
                shape === "purple"
                  ? "rounded-full"
                  : ""
              }
            `}
          />
        </div>

        {/* Logo */}

        <img
          src="https://ahaanmedia.com/asc/layouts/fav.png"
          alt="logo"
          className="
            absolute
            top-2
            right-2
            z-20
            h-6
            w-6
            rounded-full
            object-contain
            sm:h-8
            sm:w-8
          "
        />
      </div>
    );
  }
);

    export  function AllSocialMediaMarketing() {
  const [visibleCount] = useState<number>(9);



  const visibleCards = cardsData.slice(0, visibleCount);


return (
    <> 
    <AllSocialBanner />
  <section className="py-6 sm:py-10 lg:py-16">
   
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
    <div className="relative mx-auto grid max-w-[1600px] grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-3">
      {visibleCards.map((card) => (
        <div key={card.id} className="flex justify-center">
          <Card {...card} />
        </div>
      ))}
    </div>

   
  </section>
  </>
);
};