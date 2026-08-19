import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "@phosphor-icons/react";

import { getAllSolutions, type WPSolution } from "../../../../api/WordpressAPI";

const SolutionsGrid: React.FC = () => {
  const [solutions, setSolutions] = useState<WPSolution[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSolutions = async () => {
      try {
        const data = await getAllSolutions();
        console.log(data);
        setSolutions(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchSolutions();
  }, []);

  const getFeaturedImage = (solution: WPSolution) => {
    return (
      solution._embedded?.["wp:featuredmedia"]?.[0]?.source_url ||
      "https://placehold.co/600x400?text=No+Image"
    );
  };

  const stripHtml = (html: string) => {
    const div = document.createElement("div");
    div.innerHTML = html;
    return div.textContent || div.innerText || "";
  };

  if (loading) {
    return (
      <section className="py-20">
        <div className="max-w-[1600px] mx-auto px-4">
          <h2 className="text-center text-3xl font-bold">
            Loading Solutions...
          </h2>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16  px-4 lg:px-6 2xl:px-10 bg-gradient-to-b from-yellow-100/5 via-amber-50/40 to-white">
      <div className="max-w-[1600px] mx-auto">
        {/* Heading */}

        <div className="text-center mb-16">
          <h2 className="heading-primary">
            Enterprise Software Development Services
          </h2>

          <p className="lg:text-lg text-sm px-0 sm:px-8 mt-3  max-w-4xl mx-auto leading-relaxed">
            Empower your business growth with enterprise-grade,
            industry-specific software solutions engineered to solve your unique
            operational challenges.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-6 gap-y-16">
          {solutions.length > 0 ? (
            solutions.map((item) => (
              <div
                key={item.id}
                className="group relative items-center bg-white p-5 pt-5 hover:shadow-xl transition-all duration-300 flex flex-col shadow-sm"
              >
                {/* Image */}
                <div className="w-full h-auto mb-8 overflow-hidden bg-gray-100 border border-gray-100">
                  <img
                    src={getFeaturedImage(item)}
                    alt={item.title?.rendered || ""}
                    className="w-full h-full object-cover rounded-3xl group-hover:scale-110 transition-transform duration-300"
                  />
                </div>

                {/* Title */}
                <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-[#d29b38] transition-colors">
                  {item.title?.rendered}
                </h3>

                {/* Description */}
                <p className="text-black text-sm leading-7 mb-10 line-clamp-4 flex-grow">
                  {stripHtml(item.content?.rendered || "")}
                </p>

                {/* Learn More Button */}
                <div className="absolute -bottom-5 left-1/2 -translate-x-1/2">
                  <Link to={`/solution/${item.slug}`}>
                    <button
                      aria-label={item.title?.rendered || ""}
                      className="shine-btn group/btn flex items-center gap-2 px-5 py-2.5 bg-black hover:bg-[#d29b38] text-[#d29b38] hover:text-white shadow-md transition-all duration-300 group-hover:scale-105"
                    >
                      <span className="text-sm font-semibold tracking-wide whitespace-nowrap">
                        Learn More
                      </span>

                      <ArrowRight
                        size={18}
                        weight="bold"
                        className="transform -rotate-45 group-hover/btn:rotate-0 transition-transform duration-300"
                      />
                    </button>
                  </Link>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full py-20 text-center">
              <h3 className="text-3xl font-bold text-gray-700">
                No Solutions Found
              </h3>

              <p className="mt-3 text-gray-500">
                Please add a Solution from WordPress Admin.
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default SolutionsGrid;
