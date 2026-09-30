import { useEffect, useMemo, useState } from "react";
import { getAllDevelopmentsAPI } from "../../../../api/Api";
import AllDevBanner from "./AllDevBanner";
import { SEO } from "../../../seo/SEO";

import {
  SelectionAllIcon,
  ShoppingCartIcon,
  HeartbeatIcon,
  GraduationCapIcon,
  AirplaneTiltIcon,
  ForkKnifeIcon,
  CarProfileIcon,
  HouseIcon,
  BriefcaseIcon,
  CodeIcon,
  SoccerBallIcon,
  TShirtIcon,
  FilmReelIcon,
  UserCircleIcon,
  DotsThreeIcon,
} from "@phosphor-icons/react";

type DevelopmentItem = {
  id: number | string;
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

  "e-commerce": {
    label: "E-Commerce",
    icon: <ShoppingCartIcon />,
  },

  healthcare: {
    label: "Healthcare",
    icon: <HeartbeatIcon />,
  },

  education: {
    label: "Education",
    icon: <GraduationCapIcon />,
  },

  travel: {
    label: "Travel",
    icon: <AirplaneTiltIcon />,
  },

  "food-restaurant": {
    label: "Food / Restaurant",
    icon: <ForkKnifeIcon />,
  },

  automotive: {
    label: "Automotive",
    icon: <CarProfileIcon />,
  },

  "real-estate": {
    label: "Real Estate",
    icon: <HouseIcon />,
  },

  business: {
    label: "Business",
    icon: <BriefcaseIcon />,
  },

  technology: {
    label: "Technology",
    icon: <CodeIcon />,
  },

  sports: {
    label: "Sports",
    icon: <SoccerBallIcon />,
  },

  fashion: {
    label: "Fashion",
    icon: <TShirtIcon />,
  },

  entertainment: {
    label: "Entertainment",
    icon: <FilmReelIcon />,
  },

  portfolio: {
    label: "Portfolio",
    icon: <UserCircleIcon />,
  },

  others: {
    label: "Others",
    icon: <DotsThreeIcon />,
  },
};

export function AllDevelopment() {
  const [items, setItems] = useState<DevelopmentItem[]>([]);
  const [loading, setLoading] = useState(true);

  const [visibleCount, setVisibleCount] = useState(12);

  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  // =====================================================
  // LOAD DEVELOPMENTS
  // =====================================================

  useEffect(() => {
    let cancelled = false;

    const loadData = async () => {
      try {
        const res = await getAllDevelopmentsAPI();

        const rawData = res?.data?.data;

        console.log("Development API Response:", rawData);

        if (!Array.isArray(rawData)) {
          if (!cancelled) {
            setItems([]);
          }

          return;
        }

        /*
         * IMPORTANT:
         *
         * We use the category exactly as returned
         * from backend/database.
         *
         * Example:
         *
         * category: "e-commerce"
         * category: "healthcare"
         * category: "technology"
         * category: "others"
         */

        const data: DevelopmentItem[] = rawData.map((item: any) => ({
          id: item.id,

          title: item.title ?? "",

          image: item.image ?? "",

          link: item.link ?? "#",

          category:
            typeof item.category === "string" && item.category.trim() !== ""
              ? item.category.trim()
              : "others",
        }));

        console.log("Processed Development Data:", data);

        if (!cancelled) {
          setItems(data);
        }
      } catch (error) {
        console.error("Failed to load developments:", error);

        if (!cancelled) {
          setItems([]);
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    };

    loadData();

    return () => {
      cancelled = true;
    };
  }, []);

  // =====================================================
  // FILTER
  // =====================================================

  const filteredItems = useMemo(() => {
    // Show everything
    if (selectedCategory === "all") {
      return items;
    }

    // Show only selected backend category
    return items.filter((item) => item.category === selectedCategory);
  }, [items, selectedCategory]);

  // =====================================================
  // VISIBLE ITEMS
  // =====================================================

  const visibleItems = filteredItems.slice(0, visibleCount);

  // =====================================================
  // CATEGORY CHANGE
  // =====================================================

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);

    // Reset pagination when category changes
    setVisibleCount(12);
  };

  // =====================================================
  // LOAD MORE
  // =====================================================

  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + 12);
  };

  return (
    <>
      {/* =====================================================
          SEO
      ===================================================== */}

      <SEO
        title="Web & Software Development Portfolio"
        description="Showcase of custom web applications and full-stack software development projects."
        path="/all-development"
      />

      {/* =====================================================
          BANNER
      ===================================================== */}

      <AllDevBanner />

      {/* =====================================================
          DEVELOPMENT SECTION
      ===================================================== */}

      <section className="py-6 sm:py-10 lg:py-16">
        <div className="relative mx-auto max-w-[1600px] px-4">
          {/* =================================================
              LOADING
          ================================================= */}

          {loading ? (
            <div
              className="
                grid
                grid-cols-1
                gap-6
                sm:grid-cols-2
                lg:grid-cols-3
                xl:grid-cols-4
              "
            >
              {Array.from({
                length: 8,
              }).map((_, index) => (
                <div
                  key={index}
                  className="
                    overflow-hidden
                    rounded-xl
                    shadow-lg
                  "
                >
                  <div
                    className="
                      h-60
                      animate-pulse
                      bg-gradient-to-r
                      from-gray-200
                      via-gray-100
                      to-gray-200
                    "
                  />

                  <div
                    className="
                      h-14
                      animate-pulse
                      bg-gray-100
                    "
                  />
                </div>
              ))}
            </div>
          ) : (
            <div
              className="
                flex
                flex-col
                gap-8
                lg:flex-row
              "
            >
              {/* =================================================
                  SIDEBAR
              ================================================= */}

              <aside
                className="
                  lg:w-72
                  lg:min-w-[280px]
                  lg:sticky
                  lg:top-0
                  lg:h-[calc(100vh-7rem)]

                  overflow-x-auto
                  overflow-y-hidden

                  lg:overflow-x-hidden
                  lg:overflow-y-auto

                  scrollbar-none
                "
              >
                <div
                  className="
                    flex
                    gap-3
                    pb-2
                    lg:flex-col
                  "
                >
                  {Object.entries(categoryConfig).map(([slug, category]) => {
                    const isActive = selectedCategory === slug;

                    return (
                      <button
                        key={slug}
                        type="button"
                        onClick={() => handleCategoryChange(slug)}
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
                              isActive
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
                              shrink-0
                              items-center
                              justify-center
                              rounded-full
                              bg-gradient-to-br
                              from-[#F6C15C]
                              via-[#D9A300]
                              to-[#E8B22B]
                              text-xs

                              ${isActive ? "text-white" : "text-black"}
                            `}
                        >
                          {category.icon}
                        </span>

                        {/* Label */}

                        <span className="whitespace-nowrap">
                          {category.label}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </aside>

              {/* =================================================
                  RIGHT CONTENT
              ================================================= */}

              <div
                className="
                  min-w-0
                  flex-1
                "
              >
                {/* =================================================
                    NO RESULTS
                ================================================= */}

                {visibleItems.length === 0 ? (
                  <div
                    className="
                      flex
                      min-h-[300px]
                      items-center
                      justify-center
                      rounded-2xl
                      bg-gray-50
                      px-5
                    "
                  >
                    <p
                      className="
                        text-center
                        text-gray-500
                      "
                    >
                      No development projects found in this category.
                    </p>
                  </div>
                ) : (
                  <>
                    {/* =============================================
                        PROJECT GRID
                    ============================================= */}

                    <div
                      className="
                        grid
                        grid-cols-1
                        gap-5
                        sm:grid-cols-2
                        xl:grid-cols-3
                        lg:gap-7
                      "
                    >
                      {visibleItems.map((item) => (
                        <a
                          key={item.id}
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
                              decoding="async"
                              className="
                                  aspect-video
                                  w-full
                                  object-cover
                                  object-top
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
                                  font-semibold
                                  text-gray-900
                                  sm:text-lg
                                "
                            >
                              {item.title}
                            </h3>
                          </div>
                        </a>
                      ))}
                    </div>

                    {/* =============================================
                        LOAD MORE
                    ============================================= */}

                    {visibleCount < filteredItems.length && (
                      <div
                        className="
                          mt-10
                          flex
                          justify-center
                        "
                      >
                        <button
                          type="button"
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
              </div>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
