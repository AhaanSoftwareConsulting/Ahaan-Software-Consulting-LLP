import { useEffect, useState, useRef } from "react";
import type { TouchEvent } from "react";
import { Link } from "react-router-dom";
import { getAllCaseStudies } from "../../../../api/WordpressAPI";

interface WordPressRenderedText {
  rendered: string;
}

interface WordPressFeaturedMedia {
  source_url: string;
}

interface CaseStudyItem {
  id: number;
  slug: string;
  title: WordPressRenderedText;
  content: WordPressRenderedText;
  _embedded?: {
    "wp:featuredmedia"?: WordPressFeaturedMedia[];
  };
}

export const CaseStudies = () => {
  const [caseStudies, setCaseStudies] = useState<CaseStudyItem[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  const sliderRef = useRef<HTMLDivElement>(null);
  const touchStartX = useRef<number>(0);
  const touchEndX = useRef<number>(0);

  useEffect(() => {
    loadCaseStudies();
  }, []);

  const loadCaseStudies = async (): Promise<void> => {
    try {
      const data = await getAllCaseStudies();
      if (Array.isArray(data)) {
        setCaseStudies([...data].reverse());
      }
    } catch (error) {
      console.error("Failed to fetch case studies:", error);
    }
  };

  const getVisibleCount = () => {
    if (typeof window === "undefined") return 1;
    if (window.innerWidth >= 1024) return 3;
    if (window.innerWidth >= 640) return 2;
    return 1;
  };

  const totalDots = Math.max(1, caseStudies.length - getVisibleCount() + 1);

  const handleDotClick = (index: number) => {
    setCurrentIndex(index);
  };

  const handleTouchStart = (e: TouchEvent) => {
    touchStartX.current = e.targetTouches[0].clientX;
  };

  const handleTouchMove = (e: TouchEvent) => {
    touchEndX.current = e.targetTouches[0].clientX;
  };

  const handleTouchEnd = () => {
    const diff = touchStartX.current - touchEndX.current;
    const swipeThreshold = 50;

    if (diff > swipeThreshold && currentIndex < totalDots - 1) {
      setCurrentIndex((prev) => prev + 1);
    } else if (diff < -swipeThreshold && currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
    }
  };

  const bgBanners = ["bg-[#f0f4f8]", "bg-[#f5ebe6]", "bg-[#d6e7f7]"];

  return (
    <section className="bg-[#fff] pt-24 md:pt-40 pb-16 md:pb-24 overflow-hidden">
      <div className="mx-auto max-w-[1600px] px-4 lg:px-6 2xl:px-10">

        {/* Section Header */}
<div className="max-w-6xl mx-auto text-center mb-16">

  <h2 className="heading-primary">
    Our Success Stories
  </h2>

  <p className="lg:text-base text-sm px-0 sm:px-8 mt-3 text-[#00000] leading-relaxed  mx-auto">
    Explore how we've helped businesses transform their digital presence
    through innovative web solutions, strategic design, and scalable
    development that deliver measurable results.
  </p>
</div>
        {/* Outer Slider Window */}
        <div
          className="overflow-hidden primitive-slider"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          {/* Animated Track Container */}
          <div
            ref={sliderRef}
            className="flex transition-transform duration-500 ease-out"
            style={{
              transform: `translateX(-${currentIndex * (100 / getVisibleCount())}%)`,
            }}
          >
            {caseStudies.map((item, index) => {
              const imageUrl =
                item?._embedded?.["wp:featuredmedia"]?.[0]?.source_url;
              const bannerBg = bgBanners[index % bgBanners.length];

              return (
                <div
                  key={item.id}
                  className="w-full sm:w-1/2 lg:w-1/3 shrink-0 px-4 flex"
                >
                  {/* Card Element */}
                  <div className="group flex w-full flex-col overflow-hidden rounded-lg bg-white shadow-[0_10px_30px_rgba(0,0,0,0.1)] transition-all duration-300 ease-in-out ">
                    {/* Top Image Presentation Layer */}
                    <div
                      className={`relative flex h-[220px] w-full items-center justify-center p-6 transition-colors duration-300 ${bannerBg}`}
                    >
                      {imageUrl && (
                        <img
                          src={imageUrl}
                          alt={item.title.rendered}
                          className="max-h-[140px] w-auto rounded object-contain shadow-[0_10px_25px_rgba(0,0,0,0.12)] transition-transform duration-300 "
                          draggable="false"
                        />
                      )}
                    </div>

                    {/* Content Section */}
                    <div className="flex flex-1 flex-col p-6 text-left sm:p-8 ">
                      <h3 className="mb-2 text-2xl font-extrabold tracking-tight text-[#333333] transition-colors duration-200 text-center capitalize">
                        {item.title.rendered}
                      </h3>

                      <div
                        className="mb-6 text-[16px] leading-relaxed text-[#161616] line-clamp-3 [&_p]:m-0 text-center"
                        dangerouslySetInnerHTML={{
                          __html: item.content.rendered,
                        }}
                      />
                    </div>
                    <div className="">
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
                        <span className="relative z-10">View case study</span>

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

        {/* Custom Pagination Indicator Dots */}
        {totalDots > 1 && (
          <div className="mt-12 flex justify-center gap-2.5">
            {Array.from({ length: totalDots }).map((_, idx) => (
              <button
                key={idx}
                onClick={() => handleDotClick(idx)}
                className={`h-2.5 w-2.5 rounded-full transition-all duration-300 ${
                  currentIndex === idx ? "bg-[#000] scale-110" : "bg-gray-300"
                }`}
                aria-label={`Go to slide page ${idx + 1}`}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};
