import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getAllCaseStudies } from "../../../../api/WordpressAPI";
import type { CaseStudyItem } from "../../../../types/caseStudies";


export const CaseStudies = () => {
  const [caseStudies, setCaseStudies] = useState<CaseStudyItem[]>([]);

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

  const bgBanners = ["bg-[#f0f4f8]", "bg-[#f5ebe6]", "bg-[#d6e7f7]"];

  return (
    <section className="bg-[#fff] py-16 md:py-24 overflow-hidden">
      <div className="mx-auto max-w-[1600px] px-4 sm:px-6 lg:px-8">
        

        {/* 3-Column Responsive Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {caseStudies.map((item, index) => {
            const imageUrl =
              item?._embedded?.["wp:featuredmedia"]?.[0]?.source_url;
            const bannerBg = bgBanners[index % bgBanners.length];

            return (
              <div key={item.id} className="flex">
                {/* Card Element */}
                <div className="group flex w-full flex-col overflow-hidden rounded-lg bg-white shadow-[0_10px_30px_rgba(0,0,0,0.1)] transition-all duration-300 ease-in-out">
                  {/* Top Image Presentation Layer */}
                  <div
                    className={`relative flex h-[220px] w-full items-center justify-center p-6 transition-colors duration-300 ${bannerBg}`}
                  >
                    {imageUrl && (
                      <img
                        src={imageUrl}
                        alt={item.title.rendered}
                        className="max-h-[140px] w-auto rounded object-contain shadow-[0_10px_25px_rgba(0,0,0,0.12)] transition-transform duration-300"
                        draggable="false"
                      />
                    )}
                  </div>

                  {/* Content Section */}
                  <div className="flex flex-1 flex-col p-6 text-left sm:p-8">
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

                  {/* Link Button */}
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
    </section>
  );
};