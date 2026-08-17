import { useEffect, useState, useRef } from "react";
import type { TouchEvent } from "react";
import { Link } from "react-router-dom";
import {
  getAllCaseStudies,
  getMediaById,
} from "../../../../api/WordpressAPI";

interface WordPressRenderedText {
  rendered: string;
}

interface CaseStudyItem {
  id: number;
  slug: string;
  title: WordPressRenderedText;
  content: WordPressRenderedText;

  acf?: {
    theme_color?: string;
    project_overview_image?: string | number;
  };

  // Resolved Project Overview Image URL
  projectOverviewImageUrl?: string;
}

export const CaseStudies = () => {
  const [caseStudies, setCaseStudies] = useState<CaseStudyItem[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  const sliderRef = useRef<HTMLDivElement>(null);
  const touchStartX = useRef<number>(0);
  const touchEndX = useRef<number>(0);

  // ==========================================
  // Load Case Studies
  // ==========================================

  useEffect(() => {
    loadCaseStudies();
  }, []);

  const loadCaseStudies = async (): Promise<void> => {
    try {
      const data = await getAllCaseStudies();

      if (!Array.isArray(data)) {
        return;
      }

      const updatedData: CaseStudyItem[] = await Promise.all(
        [...data].reverse().map(async (item) => {
          const projectOverviewImage =
            item?.acf?.project_overview_image;

          let projectOverviewImageUrl = "";

          try {
            // ==========================================
            // ACF Image ID
            // ==========================================
            if (typeof projectOverviewImage === "number") {
              const media = await getMediaById(
                projectOverviewImage
              );

              projectOverviewImageUrl =
                media?.source_url || "";
            }

            // ==========================================
            // ACF Image URL
            // ==========================================
            else if (
              typeof projectOverviewImage === "string"
            ) {
              projectOverviewImageUrl =
                projectOverviewImage;
            }
          } catch (error) {
            console.error(
              `Failed to load project overview image for ${item.slug}:`,
              error
            );
          }

          return {
            ...item,
            projectOverviewImageUrl,
          };
        })
      );

      setCaseStudies(updatedData);
    } catch (error) {
      console.error(
        "Failed to fetch case studies:",
        error
      );
    }
  };

  // ==========================================
  // Responsive Visible Cards
  // ==========================================

  const getVisibleCount = () => {
    if (typeof window === "undefined") {
      return 1;
    }

    if (window.innerWidth >= 1024) {
      return 3;
    }

    if (window.innerWidth >= 640) {
      return 2;
    }

    return 1;
  };

  const totalDots = Math.max(
    1,
    caseStudies.length - getVisibleCount() + 1
  );

  // ==========================================
  // Pagination
  // ==========================================

  const handleDotClick = (index: number) => {
    setCurrentIndex(index);
  };

  // ==========================================
  // Touch / Swipe
  // ==========================================

  const handleTouchStart = (e: TouchEvent) => {
    touchStartX.current =
      e.targetTouches[0].clientX;

    touchEndX.current =
      e.targetTouches[0].clientX;
  };

  const handleTouchMove = (e: TouchEvent) => {
    touchEndX.current =
      e.targetTouches[0].clientX;
  };

  const handleTouchEnd = () => {
    const diff =
      touchStartX.current -
      touchEndX.current;

    const swipeThreshold = 50;

    // Swipe left
    if (
      diff > swipeThreshold &&
      currentIndex < totalDots - 1
    ) {
      setCurrentIndex((prev) => prev + 1);
    }

    // Swipe right
    else if (
      diff < -swipeThreshold &&
      currentIndex > 0
    ) {
      setCurrentIndex((prev) => prev - 1);
    }
  };

  // ==========================================
  // Convert Theme Color -> Light Background
  // ==========================================

  const getLightThemeColor = (
    color?: string,
    opacity = 0.14
  ): string => {
    // Default background
    if (!color) {
      return "#f0f4f8";
    }

    // HEX color
    if (color.startsWith("#")) {
      let hex = color.replace("#", "");

      // #fff -> #ffffff
      if (hex.length === 3) {
        hex = hex
          .split("")
          .map((char) => char + char)
          .join("");
      }

      // Valid 6 digit HEX
      if (hex.length === 6) {
        const r = parseInt(
          hex.substring(0, 2),
          16
        );

        const g = parseInt(
          hex.substring(2, 4),
          16
        );

        const b = parseInt(
          hex.substring(4, 6),
          16
        );

        // Mix theme color with white
        const lightR = Math.round(
          r * opacity + 255 * (1 - opacity)
        );

        const lightG = Math.round(
          g * opacity + 255 * (1 - opacity)
        );

        const lightB = Math.round(
          b * opacity + 255 * (1 - opacity)
        );

        return `rgb(${lightR}, ${lightG}, ${lightB})`;
      }
    }

    // Fallback
    return color;
  };

  // ==========================================
  // Render
  // ==========================================

  return (
    <section className="overflow-hidden bg-[#fff] pt-24 pb-16 md:pt-40 md:pb-24">
      <div className="mx-auto max-w-[1600px] px-4 lg:px-6 2xl:px-10">

        {/* ==========================================
            Section Header
        ========================================== */}

        <div className="mx-auto mb-16 max-w-6xl text-center">
          <h2 className="heading-primary">
            Our Success Stories
          </h2>

          <p className="mx-auto mt-3 px-0 text-sm leading-relaxed text-[#000] sm:px-8 lg:text-base">
            Explore how we've helped businesses transform
            their digital presence through innovative web
            solutions, strategic design, and scalable
            development that deliver measurable results.
          </p>
        </div>

        {/* ==========================================
            Outer Slider Window
        ========================================== */}

        <div
          className="primitive-slider overflow-hidden"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          {/* ==========================================
              Animated Track
          ========================================== */}

          <div
            ref={sliderRef}
            className="flex transition-transform duration-500 ease-out"
            style={{
              transform: `translateX(-${
                currentIndex *
                (100 / getVisibleCount())
              }%)`,
            }}
          >
            {caseStudies.map((item) => {
              // ==========================================
              // Project Overview Image
              // ==========================================

              const imageUrl =
                item.projectOverviewImageUrl;

              // ==========================================
              // Light Theme Background
              // ==========================================

              const bannerBg =
                getLightThemeColor(
                  item.acf?.theme_color
                );

              return (
                <div
                  key={item.id}
                  className="flex w-full shrink-0 px-4 sm:w-1/2 lg:w-1/3"
                >
                  {/* ==========================================
                      Card
                  ========================================== */}

                  <div className="group flex w-full flex-col overflow-hidden rounded-lg bg-white shadow-[0_10px_30px_rgba(0,0,0,0.1)] transition-all duration-300 ease-in-out">

                    {/* ==========================================
                        Project Overview Image Section
                    ========================================== */}

                    <div
                      className="relative flex h-[220px] w-full items-center justify-center p-6 transition-colors duration-300"
                      style={{
                        backgroundColor:
                          bannerBg,
                      }}
                    >
                      {imageUrl ? (
                        <img
                          src={imageUrl}
                          alt={
                            item.title?.rendered ||
                            "Case Study"
                          }
                          className="max-h-[170px] w-auto rounded object-contain  transition-transform duration-300"
                          draggable="false"
                        />
                      ) : (
                        <div className="text-sm text-gray-400">
                          No project image
                        </div>
                      )}
                    </div>

                    {/* ==========================================
                        Content Section
                    ========================================== */}

                    <div className="flex flex-1 flex-col p-6 text-left sm:p-8">
                      <h3 className="mb-2 text-center text-2xl font-extrabold capitalize tracking-tight text-[#333333] transition-colors duration-200">
                        {item.title?.rendered ||
                          "Untitled Case Study"}
                      </h3>

                      <div
                        className="mb-6 line-clamp-3 text-center text-[16px] leading-relaxed text-[#161616] [&_p]:m-0"
                        dangerouslySetInnerHTML={{
                          __html:
                            item.content?.rendered ??
                            "",
                        }}
                      />
                    </div>

                    {/* ==========================================
                        Button
                    ========================================== */}

                    <div>
                      <Link
                        to={`/case-studies/${item.slug}`}
                        className="
                          group relative flex w-full items-center justify-center gap-2
                          overflow-hidden rounded-md px-6 py-2.5
                          text-[15px] font-bold text-[#C48A18]
                          transition-colors duration-300 hover:text-white
                          before:absolute
                          before:inset-0
                          before:origin-bottom
                          before:scale-y-0
                          before:bg-[#000]
                          before:transition-transform
                          before:duration-300
                          before:ease-in-out
                          before:content-['']
                          hover:before:scale-y-100
                        "
                      >
                        <span className="relative z-10">
                          View case study
                        </span>

                        <span className="relative z-10 text-lg font-normal transition-transform duration-200 group-hover:translate-x-1">
                          &rarr;
                        </span>
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* ==========================================
            Pagination Dots
        ========================================== */}

        {totalDots > 1 && (
          <div className="mt-12 flex justify-center gap-2.5">
            {Array.from({
              length: totalDots,
            }).map((_, idx) => (
              <button
                key={idx}
                onClick={() =>
                  handleDotClick(idx)
                }
                className={`h-2.5 w-2.5 rounded-full transition-all duration-300 ${
                  currentIndex === idx
                    ? "scale-110 bg-[#000]"
                    : "bg-gray-300"
                }`}
                aria-label={`Go to slide page ${
                  idx + 1
                }`}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};