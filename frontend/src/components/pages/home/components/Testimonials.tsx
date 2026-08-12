
import { useEffect, useState } from "react";
import {CaretLeftIcon , CaretRightIcon } from "@phosphor-icons/react";

interface Testimonial {
  name: string;
  review: string;
  rating: number;
  color: string;
  image: string;
}

export default function Testimonials() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [index, setIndex] = useState(0);
  const [transition, setTransition] = useState(true);
  const [visibleCards, setVisibleCards] = useState(3);

  /* =========================
     FETCH TESTIMONIALS
  ========================= */

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const response = await fetch(
          "https://ahaan-admin.ahaanmedia.com/wp-json/wp/v2/testimonial"
        );

        if (!response.ok) {
          throw new Error("Failed to fetch testimonials");
        }

        const data = await response.json();

        const formatted: Testimonial[] = await Promise.all(
          data.map(async (item: any) => {
            let image = "";

            /* Fetch client image from WordPress media */
            if (item.acf?.client_image) {
              try {
                const mediaRes = await fetch(
                  `https://ahaan-admin.ahaanmedia.com/wp-json/wp/v2/media/${item.acf.client_image}`
                );

                if (mediaRes.ok) {
                  const media = await mediaRes.json();
                  image = media.source_url || "";
                }
              } catch (error) {
                console.error("Image fetch error:", error);
              }
            }

            return {
              name: item.acf?.client_name || "",
              review: item.acf?.client_review || "",
              rating: Number(item.acf?.rating) || 5,
              color: item.acf?.color || "#E6B33C",
              image,
            };
          })
        );

        setTestimonials(formatted);
      } catch (error) {
        console.error("Testimonials error:", error);
      }
    };

    fetchTestimonials();
  }, []);

  /* =========================
     RESPONSIVE CARD COUNT
  ========================= */

  useEffect(() => {
    const updateVisibleCards = () => {
      if (window.innerWidth < 768) {
        // Mobile
        setVisibleCards(1);
      } else if (window.innerWidth < 1024) {
        // Tablet
        setVisibleCards(2);
      } else {
        // Desktop
        setVisibleCards(3);
      }
    };

    updateVisibleCards();

    window.addEventListener("resize", updateVisibleCards);

    return () => {
      window.removeEventListener("resize", updateVisibleCards);
    };
  }, []);

  /* =========================
     RESET INDEX WHEN SCREEN
     SIZE CHANGES
  ========================= */

  useEffect(() => {
    setIndex(0);
    setTransition(false);

    requestAnimationFrame(() => {
      setTransition(true);
    });
  }, [visibleCards]);

  /* =========================
     SLIDER DATA
  ========================= */

  const sliderData =
    testimonials.length > 0
      ? [...testimonials, ...testimonials]
      : [];

  /* =========================
     AUTO SLIDE
  ========================= */

  useEffect(() => {
    if (!testimonials.length) return;

    const timer = setInterval(() => {
      setIndex((prev) => prev + 1);
    }, 3000);

    return () => clearInterval(timer);
  }, [testimonials]);

  /* =========================
     INFINITE LOOP RESET
  ========================= */

  useEffect(() => {
    if (!testimonials.length) return;

    /*
      Once we reach the duplicated
      testimonials, quietly jump back
      to the beginning.
    */

    if (index >= testimonials.length) {
      const timer = setTimeout(() => {
        setTransition(false);
        setIndex(0);

        requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            setTransition(true);
          });
        });
      }, 700);

      return () => clearTimeout(timer);
    }
  }, [index, testimonials]);

  /* =========================
     MANUAL SLIDER
  ========================= */

  const scroll = (direction: "left" | "right") => {
    if (!testimonials.length) return;

    const maxIndex = Math.max(
      0,
      testimonials.length - visibleCards
    );

    if (direction === "left") {
      setIndex((prev) => {
        if (prev <= 0) {
          return maxIndex;
        }

        return prev - 1;
      });
    } else {
      setIndex((prev) => {
        if (prev >= maxIndex) {
          return 0;
        }

        return prev + 1;
      });
    }
  };

  /* =========================
     CARD WIDTH
  ========================= */

  const cardWidth =
    visibleCards === 1
      ? "100%"
      : `calc(${100 / visibleCards}% - ${
          ((visibleCards - 1) * 32) / visibleCards
        }px)`;

  return (
    <section className="relative mx-auto max-w-[1600px] overflow-hidden px-4 py-12 sm:px-6 lg:px-6 lg:py-20 2xl:px-10">
      {/* =========================
          HEADING
      ========================= */}

      <div className="mx-auto mb-16 max-w-6xl text-center">
        <h2 className="heading-primary">
          What Our Clients Say
        </h2>

        <p className="mt-2 px-0 text-sm text-slate-600 sm:px-8 lg:text-base leading-relaxed">
          Driven to be future-ready, and push beyond the building
          blocks of technology, digital, and marketing.
        </p>
      </div>

      {/* =========================
          SLIDER
      ========================= */}

      <div className="relative overflow-hidden">
        {/* =========================
            LEFT BUTTON
        ========================= */}

        <button
          type="button"
          onClick={() => scroll("left")}
          aria-label="Previous testimonial"
          className="absolute left-0 top-1/2 z-20 hidden h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white shadow-lg transition duration-300 hover:scale-110 lg:flex"
        >
          <CaretLeftIcon className="h-5 w-5" />
        </button>

        {/* =========================
            RIGHT BUTTON
        ========================= */}

        <button
          type="button"
          onClick={() => scroll("right")}
          aria-label="Next testimonial"
          className="absolute right-0 top-1/2 z-20 hidden h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white shadow-lg transition duration-300 hover:scale-110 lg:flex"
        >
          <CaretRightIcon className="h-5 w-5" />
          
        </button>

        {/* =========================
            RIGHT BUTTON
        ========================= */}

        <button
          type="button"
          onClick={() => scroll("right")}
          aria-label="Next testimonial"
          className="absolute right-0 top-1/2 z-20 hidden h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white shadow-lg transition duration-300 hover:scale-110 lg:flex"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            className="h-5 w-5"
          >
            <path
              d="M9 18l6-6-6-6"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>

        {/* =========================
            TRACK
        ========================= */}

        <div
          className="flex py-10"
          style={{
            gap: "32px",
            transition: transition
              ? "transform 0.7s ease"
              : "none",

            /*
              The translation is based on
              the exact card slot width.
            */
            transform: `translateX(calc(-${
              index * (100 / visibleCards)
            }% - ${
              index * (32 / visibleCards)
            }px))`,
          }}
        >
          {sliderData.map((item, i) => (
            <div
              key={`${item.name}-${i}`}
              className="relative box-border shrink-0 overflow-visible rounded-[28px] bg-neutral-100 p-6 pt-20 sm:p-8 sm:pt-20"
              style={{
                width: cardWidth,
              }}
            >
              {/* =========================
                  TOP QUOTE
              ========================= */}

              <div
                className="absolute -top-8 left-5 text-6xl font-bold sm:left-6 sm:text-7xl"
                style={{
                  color: item.color,
                }}
              >
                ❝
              </div>

              {/* =========================
                  CLIENT
              ========================= */}

              <div
                className="absolute -top-7 right-3 flex max-w-[calc(100%-2rem)] items-center gap-2 rounded-full px-2 py-2 shadow-xl sm:right-5 sm:gap-3 sm:px-3"
                style={{
                  background: item.color,
                }}
              >
                {item.image ? (
                  <img
                    src={item.image}
                    alt={item.name}
                    className="h-10 w-10 shrink-0 rounded-full bg-white object-cover p-1 sm:h-12 sm:w-12"
                  />
                ) : (
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white text-sm font-bold text-slate-600 sm:h-12 sm:w-12">
                    {item.name?.charAt(0)?.toUpperCase()}
                  </div>
                )}

                <div className="min-w-0">
                  <h4 className="truncate text-sm font-semibold text-white sm:text-base">
                    {item.name}
                  </h4>
                </div>
              </div>

              {/* =========================
                  REVIEW
              ========================= */}

              <p className="line-clamp-8 text-sm leading-7 text-slate-600 sm:text-base sm:leading-8">
                {item.review}
              </p>

              {/* =========================
                  DIVIDER
              ========================= */}

              <div className="my-6 h-[2px] w-24 bg-slate-300 sm:my-8 sm:w-28" />

              {/* =========================
                  RATING
              ========================= */}

              <div className="flex gap-1 text-xl sm:text-2xl">
                {Array.from({ length: 5 }).map((_, j) => (
                  <span
                    key={j}
                    style={{
                      color:
                        j < item.rating
                          ? item.color
                          : "#ddd",
                    }}
                  >
                    ★
                  </span>
                ))}
              </div>

              {/* =========================
                  BOTTOM QUOTE
              ========================= */}

              <div
                className="absolute -bottom-10 right-4 text-6xl font-bold sm:-bottom-12 sm:right-6 sm:text-7xl"
                style={{
                  color: item.color,
                }}
              >
                ❞
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

