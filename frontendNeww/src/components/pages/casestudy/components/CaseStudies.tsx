import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  getAllCaseStudies,
  getMediaById,
} from "../../../../api/WordpressAPI";

export const CaseStudies = () => {
  const [caseStudies, setCaseStudies] = useState<
    Awaited<ReturnType<typeof getAllCaseStudies>>
  >([]);

  useEffect(() => {
    loadCaseStudies();
  }, []);

  const loadCaseStudies = async (): Promise<void> => {
    try {
      const data = await getAllCaseStudies();

      if (!Array.isArray(data)) return;

      // Project Overview Image URL fetch
      const updatedData = await Promise.all(
        [...data].reverse().map(async (item) => {
          const projectOverviewImage =
            item?.acf?.project_overview_image;

          let projectOverviewImageUrl = "";

          if (projectOverviewImage) {
            try {
              // If ACF returns Media ID
              if (typeof projectOverviewImage === "number") {
                const media = await getMediaById(projectOverviewImage);

                projectOverviewImageUrl =
                  media?.source_url || "";
              }

              // If ACF already returns URL
              if (typeof projectOverviewImage === "string") {
                projectOverviewImageUrl = projectOverviewImage;
              }
            } catch (error) {
              console.error(
                "Failed to fetch project overview image:",
                error
              );
            }
          }

          return {
            ...item,
            projectOverviewImageUrl,
          };
        })
      );

      setCaseStudies(updatedData);
    } catch (error) {
      console.error("Failed to fetch case studies:", error);
    }
  };

  const getLightThemeColor = (
    color?: string,
    opacity = 0.14
  ): string => {
    if (!color) {
      return "rgba(240, 244, 248, 1)";
    }

    // HEX color
    if (color.startsWith("#")) {
      let hex = color.replace("#", "");

      if (hex.length === 3) {
        hex = hex
          .split("")
          .map((char) => char + char)
          .join("");
      }

      if (hex.length === 6) {
        const r = parseInt(hex.substring(0, 2), 16);
        const g = parseInt(hex.substring(2, 4), 16);
        const b = parseInt(hex.substring(4, 6), 16);

        // Mix theme color with white
        const lightR = Math.round(r * opacity + 255 * (1 - opacity));
        const lightG = Math.round(g * opacity + 255 * (1 - opacity));
        const lightB = Math.round(b * opacity + 255 * (1 - opacity));

        return `rgb(${lightR}, ${lightG}, ${lightB})`;
      }
    }

    // Fallback for rgb/other formats
    return color;
  };

  return (
    <section className="bg-white py-16 md:py-24 overflow-hidden">
      <div className="mx-auto max-w-[1400px] px-4 lg:px-6 2xl:px-10">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {caseStudies.map((item) => {
            const imageUrl = (
              item as typeof item & {
                projectOverviewImageUrl?: string;
              }
            ).projectOverviewImageUrl;

            const themeColor = item?.acf?.theme_color;

            const lightThemeColor =
              getLightThemeColor(themeColor);

            return (
              <div key={item.id} className="flex">
                <div className="group flex w-full flex-col overflow-hidden rounded-lg bg-white shadow-[0_10px_30px_rgba(0,0,0,0.1)] transition-all duration-300 ease-in-out">
                  
                  {/* Image Section */}
                  <div
                    className="relative flex h-[220px] w-full items-center justify-center p-6 transition-colors duration-300"
                    style={{
                      backgroundColor: lightThemeColor,
                    }}
                  >
                    {imageUrl && (
                      <img
                        src={imageUrl}
                        alt={
                          item.title?.rendered ||
                          "Case Study"
                        }
                        className="max-h-[170px] w-auto rounded object-contain  transition-transform duration-300 group-hover:scale-[1.02]"
                        draggable="false"
                      />
                    )}
                  </div>

                  {/* Content Section */}
                  <div className="flex flex-1 flex-col p-6 text-left sm:p-8">
                    <h3 className="mb-2 text-center text-2xl font-extrabold tracking-tight text-[#333333] capitalize transition-colors duration-200">
                      {item.title?.rendered ||
                        "Untitled Case Study"}
                    </h3>

                    <div
                      className="mb-6 line-clamp-3 text-center text-[16px] leading-relaxed text-[#161616] [&_p]:m-0"
                      dangerouslySetInnerHTML={{
                        __html:
                          item.content?.rendered ?? "",
                      }}
                    />
                  </div>

                  {/* Button */}
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
    </section>
  );
};