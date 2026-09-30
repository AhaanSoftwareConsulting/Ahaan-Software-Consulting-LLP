import { useEffect, useState } from "react";
import {
  getAllUiUxDesignsAPI,
  getAllDevelopmentsAPI,
} from "../../../../api/Api";

import AllEcommerceBanner from "./AllEcommerceBanner";
import { SEO } from "../../../seo/SEO";

type DesignItem = {
  id?: number | string;
  _id?: string;
  title: string;
  image: string;
  link: string;
  category: string;
};

type DevelopmentItem = {
  id?: number | string;
  _id?: string;
  title: string;
  image: string;
  link: string;
  developer?: string;
  category: string;
};

const AllEcommerce = () => {
  // =====================================================
  // DESIGN STATE
  // =====================================================

  const [designs, setDesigns] = useState<DesignItem[]>([]);
  const [visibleDesignCount, setVisibleDesignCount] = useState(12);

  // =====================================================
  // DEVELOPMENT STATE
  // =====================================================

  const [developments, setDevelopments] = useState<DevelopmentItem[]>([]);

  const [visibleDevelopmentCount, setVisibleDevelopmentCount] = useState(12);

  // =====================================================
  // LOAD DATA
  // =====================================================

  useEffect(() => {
    let cancelled = false;

    const loadData = async () => {
      try {
        // =================================================
        // LOAD UI/UX DESIGNS
        // =================================================

        const designRes = await getAllUiUxDesignsAPI();

        let designData: DesignItem[] = [];

        /*
         * Handle different possible API response shapes
         */

        if (Array.isArray(designRes)) {
          designData = designRes;
        } else if (Array.isArray(designRes?.data?.data)) {
          designData = designRes.data.data;
        } else if (Array.isArray(designRes?.data)) {
          designData = designRes.data;
        }

        // Filter E-Commerce designs

        const ecommerceDesigns = designData.filter(
          (item) =>
            String(item.category || "")
              .trim()
              .toLowerCase() === "e-commerce",
        );

        // =================================================
        // LOAD DEVELOPMENTS
        // =================================================

        const developmentRes = await getAllDevelopmentsAPI();

        /*
         * IMPORTANT
         *
         * Backend response:
         *
         * {
         *   success: true,
         *   data: [...]
         * }
         *
         * Axios response:
         *
         * developmentRes.data.data
         */

        let developmentData: DevelopmentItem[] = [];

        if (Array.isArray(developmentRes?.data?.data)) {
          developmentData = developmentRes.data.data;
        } else if (Array.isArray(developmentRes?.data)) {
          developmentData = developmentRes.data;
        } else if (Array.isArray(developmentRes)) {
          developmentData = developmentRes;
        }

        console.log("Development API Response:", developmentRes);

        console.log("All Development Data:", developmentData);

        // =================================================
        // FILTER E-COMMERCE DEVELOPMENTS
        // =================================================

        const ecommerceDevelopments = developmentData.filter(
          (item) =>
            String(item.category || "")
              .trim()
              .toLowerCase() === "e-commerce",
        );

        console.log("E-Commerce Developments:", ecommerceDevelopments);

        // =================================================
        // SET STATE
        // =================================================

        if (!cancelled) {
          setDesigns(ecommerceDesigns);

          setDevelopments(ecommerceDevelopments);
        }
      } catch (error) {
        console.error("Failed to load E-Commerce projects:", error);

        if (!cancelled) {
          setDesigns([]);
          setDevelopments([]);
        }
      }
    };

    loadData();

    return () => {
      cancelled = true;
    };
  }, []);

  // =====================================================
  // VISIBLE DATA
  // =====================================================

  const visibleDesigns = designs.slice(0, visibleDesignCount);

  const visibleDevelopments = developments.slice(0, visibleDevelopmentCount);

  // =====================================================
  // LOAD MORE
  // =====================================================

  const handleLoadMoreDesigns = () => {
    setVisibleDesignCount((prev) => prev + 12);
  };

  const handleLoadMoreDevelopments = () => {
    setVisibleDevelopmentCount((prev) => prev + 12);
  };

  // =====================================================
  // RENDER
  // =====================================================

  return (
    <>
      {/* =================================================
          SEO
      ================================================= */}

      <SEO
        title="E-Commerce Projects"
        description="Explore our E-Commerce UI/UX design and web development projects, online stores, product interfaces, and shopping experiences."
        path="/all-ecommerce"
      />

      {/* =================================================
          BANNER
      ================================================= */}

      <AllEcommerceBanner />

      {/* =================================================
          E-COMMERCE DESIGN SECTION
      ================================================= */}

      <section className="py-8 sm:py-12 lg:py-16">
        <div className="mx-auto max-w-[1600px] px-4">
          {/* SECTION HEADING */}

          <div className="mb-8 text-center">
            <h2
              className="
                text-2xl
                font-bold
                text-gray-900
                sm:text-3xl
                lg:text-4xl
              "
            >
              E-Commerce Design Projects
            </h2>

            <p
              className="
                mx-auto
                mt-3
                max-w-2xl
                text-sm
                text-gray-500
                sm:text-base
              "
            >
              Explore our E-Commerce UI/UX design projects, online stores,
              product interfaces, and shopping experiences.
            </p>
          </div>

          {/* DESIGN CARDS */}

          {designs.length > 0 ? (
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
              {visibleDesigns.map((item, index) => (
                <a
                  key={item.id ?? item._id ?? `design-${index}`}
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
                  {/* IMAGE */}

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
                          transition-transform
                          duration-500
                          group-hover:scale-105
                        "
                    />
                  </div>

                  {/* TITLE */}

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
          ) : (
            <div className="py-12 text-center">
              <p className="text-lg text-gray-500">
                No E-Commerce design projects found.
              </p>
            </div>
          )}

          {/* LOAD MORE DESIGN */}

          {visibleDesignCount < designs.length && (
            <div className="mt-10 flex justify-center">
              <button
                type="button"
                onClick={handleLoadMoreDesigns}
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
        </div>
      </section>

      {/* =================================================
          E-COMMERCE DEVELOPMENT SECTION
      ================================================= */}

      <section
        className="
          border-t
          border-gray-100
          bg-gray-50
          py-8
          sm:py-12
          lg:py-16
        "
      >
        <div className="mx-auto max-w-[1600px] px-4">
          {/* SECTION HEADING */}

          <div className="mb-8 text-center">
            <h2
              className="
                text-2xl
                font-bold
                text-gray-900
                sm:text-3xl
                lg:text-4xl
              "
            >
              E-Commerce Development Projects
            </h2>

            <p
              className="
                mx-auto
                mt-3
                max-w-2xl
                text-sm
                text-gray-500
                sm:text-base
              "
            >
              Explore our E-Commerce web development projects, online stores,
              shopping platforms, and custom e-commerce solutions.
            </p>
          </div>

          {/* DEVELOPMENT CARDS */}

          {developments.length > 0 ? (
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
              {visibleDevelopments.map((item, index) => (
                <a
                  key={item.id ?? item._id ?? `development-${index}`}
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
                  {/* IMAGE */}

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
                          transition-transform
                          duration-500
                          group-hover:scale-105
                        "
                    />
                  </div>

                  {/* CONTENT */}

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

                    {item.developer && (
                      <p
                        className="
                            mt-2
                            text-center
                            text-sm
                            text-gray-500
                          "
                      >
                        Developed by {item.developer}
                      </p>
                    )}
                  </div>
                </a>
              ))}
            </div>
          ) : (
            <div className="py-12 text-center">
              <p className="text-lg text-gray-500">
                No E-Commerce development projects found.
              </p>
            </div>
          )}

          {/* LOAD MORE DEVELOPMENT */}

          {visibleDevelopmentCount < developments.length && (
            <div className="mt-10 flex justify-center">
              <button
                type="button"
                onClick={handleLoadMoreDevelopments}
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
        </div>
      </section>
    </>
  );
};

export default AllEcommerce;
