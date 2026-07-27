import { useEffect, useMemo, useState } from "react";
import { getAllUiUxDesignsAPI } from "../../../../api/Api";
import AllDesignBanner from "./AllDesignBanner";


import {SelectionAllIcon, AirplaneTiltIcon,BrowserIcon, CarProfileIcon,DotsThreeIcon, HeartbeatIcon, CodeIcon, HouseIcon, IdentificationCardIcon,BriefcaseIcon, ShieldCheckIcon, ForkKnifeIcon, GraduationCapIcon, FilmReelIcon,TagIcon, UsersThreeIcon,  TShirtIcon, SoccerBallIcon ,LaptopIcon} from "@phosphor-icons/react";

type DesignItem = {
  _id?: string;
  title: string;
  image: string;
  link: string;
  category: string;
};

type CategoryItem = {
  label: string;
  icon: React.ReactNode;
};

const categoryConfig: Record<string, CategoryItem> = {
  all: {
    label: "All",
    icon: <SelectionAllIcon />,
  },

  "business-services": {
    label: "Business Services",
    icon: <BriefcaseIcon />,
  },

  "education-books": {
    label: "Education",
    icon: <GraduationCapIcon />,
  },

  "defense-security": {
    label: "Defense / Security",
    icon: <ShieldCheckIcon />,
  },

  travel: {
    label: "Travel",
    icon: <AirplaneTiltIcon />,
  },

  entertainment: {
    label: "Entertainment",
    icon: <FilmReelIcon />,
  },

  "food-restaurant": {
    label: "Food / Restaurant",
    icon: <ForkKnifeIcon />,
  },

  "cars-motorcycles": {
    label: "Cars",
    icon: <CarProfileIcon />,
  },

  "fashion-beauty": {
    label: "Fashion",
    icon: <TShirtIcon />,
  },

  electronics: {
    label: "Electronics",
    icon: <LaptopIcon />,
  },

  "it-tech": {
    label: "IT / Tech",
    icon: <CodeIcon />,
  },

  "medical-healthcare": {
    label: "Healthcare",
    icon: <HeartbeatIcon />,
  },

  "real-estate": {
    label: "Real Estate",
    icon: <HouseIcon />,
  },

  "society-people": {
    label: "Society",
    icon: <UsersThreeIcon />,
  },

  "sports-outdoors-travel": {
    label: "Sports",
    icon: <SoccerBallIcon />,
  },

  "web-banner": {
    label: "Web Banner",
    icon: <BrowserIcon />,
  },

  "business-card": {
    label: "Business Card",
    icon: <IdentificationCardIcon />,
  },

  "product-label": {
    label: "Product Label",
    icon: <TagIcon />,
  },

  others: {
    label: "Others",
    icon: <DotsThreeIcon />,
  },
};

export  function AllUiUxDesign() {
  const [designs, setDesigns] = useState<DesignItem[]>([]);
  const [visibleCount, setVisibleCount] = useState(12);
  const [selectedCategory, setSelectedCategory] =
    useState<string>("all");

  

  useEffect(() => {
    let cancelled = false;

    const loadDesigns = async () => {
      try {
        const res = await getAllUiUxDesignsAPI();

        let data: DesignItem[] = [];

        if (Array.isArray(res)) {
          data = res;
        } else if (Array.isArray(res?.data)) {
          data = res.data;
        } else if (res?.data && typeof res.data === "object") {
          data = [res.data];
        }

        if (!cancelled) {
          setDesigns(data);
        }
      } catch (error) {
        console.error("Failed to load UI/UX designs:", error);

        if (!cancelled) {
          setDesigns([]);
        }
      } 
    };

    loadDesigns();

    return () => {
      cancelled = true;
    };
  }, []);

  const filteredDesigns = useMemo(() => {
    if (selectedCategory === "all") {
      return designs;
    }

    return designs.filter(
      (item) => item.category === selectedCategory
    );
  }, [designs, selectedCategory]);

  const visibleDesigns = filteredDesigns.slice(
    0,
    visibleCount
  );

  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + 12);
  };

  return (
  <>
    <AllDesignBanner />

    <section className="py-8 lg:py-12">
      <div className="relative mx-auto max-w-[1600px] px-4">

        {/* Layout */}
        <div className="flex flex-col gap-8 lg:flex-row">

          {/* Sidebar */}
          <aside
            className="
              lg:w-72
              lg:min-w-[280px]
              lg:sticky
              lg:top-0
              lg:h-[calc(100vh-7rem)]

              overflow-x-auto
              overflow-y-hidden
              lg:overflow-y-auto
              lg:overflow-x-hidden

              scrollbar-none
            "
          >
            <div
              className="
                flex
                gap-3
                lg:flex-col
                pb-2
              "
            >
              {Object.entries(categoryConfig).map(([slug, category]) => (
                <button
                  key={slug}
                  onClick={() => {
                    setSelectedCategory(slug);
                    setVisibleCount(12);
                  }}
                  className={`
                    flex
                    shrink-0
                    items-center
                    gap-3
                    rounded-xl
                    border
                    px-5
                    py-3
                    text-left
                    text-sm
                    font-medium
                    transition-all
                    duration-300

                    ${
                      selectedCategory === slug
                        ? "border-black bg-black text-white"
                        : "border-gray-200 bg-white text-gray-900 hover:translate-x-1 hover:border-gray-300 hover:bg-gray-50"
                    }
                  `}
                >
                  {/* Icon */}
                  <span
                    className={`
                      flex
                      h-6
                      w-6
                      items-center
                      justify-center
                      rounded-full
                      bg-gradient-to-br
                      from-[#F6C15C]
                      via-[#D9A300]
                      to-[#E8B22B]
                      text-xs

                      ${
                        selectedCategory === slug
                          ? "text-white"
                          : "text-black"
                      }
                    `}
                  >
                    {category.icon}
                  </span>

                  <span className="whitespace-nowrap">
                    {category.label}
                  </span>
                </button>
              ))}
            </div>
          </aside>

          {/* Right Content */}
         {/* ================= CONTENT ================= */}
<div className="flex-1 min-w-0">

  {/* Cards */}
  <div
    className="
      grid
      grid-cols-1
      sm:grid-cols-2
      xl:grid-cols-3
      gap-5
      lg:gap-7
    "
  >
    {visibleDesigns.map((item, index) => (
      <a
        key={item._id ?? index}
        href={item.link}
        target="_blank"
        rel="noopener noreferrer"
        className="
          group
          overflow-hidden
          rounded-2xl
          bg-white
          shadow-lg
          transition-all
          duration-300
          hover:-translate-y-2
          hover:shadow-2xl
        "
      >
        {/* Image */}
        <div className="overflow-hidden">
          <img
            src={item.image}
            alt={item.title}
            loading="lazy"
            className="
              w-full
              aspect-video
              object-cover
              transition-transform
              duration-500
              group-hover:scale-105
            "
          />
        </div>

        {/* Title */}
        <div className="p-5">
          <h3
            className="
              text-center
              text-base
              sm:text-lg
              font-semibold
              text-gray-900
            "
          >
            {item.title}
          </h3>
        </div>
      </a>
    ))}
  </div>

  {/* Load More */}
  {visibleCount < filteredDesigns.length && (
    <div className="mt-10 flex justify-center">
      <button
        onClick={handleLoadMore}
        className="
          shine-btn relative overflow-hidden uppercase
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
                hover:to-[#D69D20]
        "
      >
        Load More
      </button>
    </div>
  )}

</div>
</div>
</div>
</section>
  </>
  );
}