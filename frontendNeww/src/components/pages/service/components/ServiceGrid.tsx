import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getAllServices, type WPServiceItem } from "../../../../api/WordpressAPI"; // Adjust your import path

// ---------------------------------------------
// Helper: Convert Hex Color to RGBA Safely
// ---------------------------------------------
const hexToRgba = (hex: string, alpha: number = 0.25): string => {
  if (!hex) return `rgba(255, 77, 77, ${alpha})`;
  let r = 0,
    g = 0,
    b = 0;

  let cleanHex = hex.replace("#", "");

  if (cleanHex.length === 3) {
    r = parseInt(cleanHex[0] + cleanHex[0], 16);
    g = parseInt(cleanHex[1] + cleanHex[1], 16);
    b = parseInt(cleanHex[2] + cleanHex[2], 16);
  } else if (cleanHex.length === 6 || cleanHex.length === 8) {
    r = parseInt(cleanHex.slice(0, 2), 16);
    g = parseInt(cleanHex.slice(2, 4), 16);
    b = parseInt(cleanHex.slice(4, 6), 16);
  }

  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
};

// Helper: Extract img src links from WYSIWYG HTML String
const extractImageSrcs = (htmlString: string): string[] => {
  if (!htmlString) return [];
  const parser = new DOMParser();
  const doc = parser.parseFromString(htmlString, "text/html");
  const imgs = doc.querySelectorAll("img");
  return Array.from(imgs).map((img) => img.src);
};

// Helper: Clean Tech Stack text from WYSIWYG HTML String
const parseTechStack = (htmlString: string): string[] => {
  if (!htmlString) return [];
  const parser = new DOMParser();
  const doc = parser.parseFromString(htmlString, "text/html");
  const text = doc.body.textContent || "";
  return text
    .split(/[,•]/)
    .map((item) => item.trim())
    .filter(Boolean);
};

// Helper: Strip HTML tags for clean paragraph display
const stripHtml = (htmlString: string): string => {
  if (!htmlString) return "";
  const parser = new DOMParser();
  const doc = parser.parseFromString(htmlString, "text/html");
  return doc.body.textContent || "";
};

const Grid: React.FC = () => {
  const [services, setServices] = useState<WPServiceItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getAllServices();
      setServices(data);
      setLoading(false);
    };
    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-gray-300 border-t-red-500"></div>
      </div>
    );
  }

  return (
    <>
      <style>{`
        @keyframes grid-shine {
          0% { background-position: 200% 0; }
          100% { background-position: -200% 0; }
        }
        @keyframes grid-wave-radius {
          0% { border-radius: 20px 120px; }
          20% { border-radius: 35px 105px; }
          40% { border-radius: 50px 90px; }
          60% { border-radius: 65px 75px; }
          80% { border-radius: 40px 100px; }
          100% { border-radius: 20px 120px; }
        }
        .grid-animated-heading {
          background: linear-gradient(90deg, var(--main-color), #1d1d1d 40%, var(--main-color));
          background-size: 200% auto;
          -webkit-background-clip: text;
          background-clip: text;
          -webkit-text-fill-color: transparent;
          animation: grid-shine 3s infinite linear;
        }
        .grid-image-box {
          animation: grid-wave-radius 5s ease-in-out infinite;
          border-radius: 20px 120px;
        }
        .grid-image-box img {
          animation: grid-wave-radius 5s ease-in-out infinite;
          border-radius: 20px 120px;
        }
        .grid-icon-bubble:hover {
          filter: grayscale(100%);
        }
      `}</style>

      <div className="mx-auto my-5 w-full max-w-[1600px]  px-4 lg:px-6 2xl:px-10 py-2 lg:py-5">
        {services.map((service, index) => {
          const isReverse = index % 2 !== 0;

          // Extracts
          const featuredImg =
            service._embedded?.["wp:featuredmedia"]?.[0]?.source_url ||
            "https://via.placeholder.com/600x400";
          const title = service.title?.rendered || "";
          const description = stripHtml(service.content?.rendered || "");
          const brandColor = service.acf?.brand_color || "#ff4d4d";
          const buttonText = service.acf?.button_text || "Explore More";
          const buttonLink = service.acf?.button_link || "/portfolio";

          const features = parseTechStack(service.acf?.tech_stack);
          const iconUrls = extractImageSrcs(service.acf?.service_icon);

          const iconList = iconUrls.map((url, i) => (
            <div
              key={i}
              className="grid-icon-bubble flex h-[50px] w-[50px] flex-shrink-0 items-center justify-center rounded-full border-[0.2px] border-[#363535] bg-white/80 p-0 backdrop-blur-[6px] transition-all duration-300 ease-in-out hover:scale-[1.15] hover:bg-white/95 hover:shadow-[0_4px_10px_rgba(0,0,0,0.08)]"
            >
              <img
                src={url}
                alt="tech icon"
                loading="lazy"
                className="h-auto w-[40px] p-0 transition-transform duration-300 ease-in-out"
              />
            </div>
          ));

          return (
            <div
              key={service.id || index}
              className={`my-5 flex flex-col items-center gap-x-8 lg:gap-x-12 md:flex-row ${
                isReverse ? "md:flex-row-reverse" : ""
              }`}
            >
              {/* Image Column */}
              <div className="w-full md:w-5/12">
                <div
                  className="grid-image-box relative m-5 overflow-hidden p-[30px] shadow-[0_2px_25px_rgba(0,0,0,0.1)] transition-transform duration-300 ease-in-out hover:-translate-y-[5px] hover:scale-[1.03] md:m-0"
                  style={
                    {
                      "--border-color": brandColor,
                      background: `linear-gradient(135deg, ${hexToRgba(
                        brandColor,
                        0.25
                      )}, #ffffff00)`,
                    } as React.CSSProperties
                  }
                >
                  <img
                    src={featuredImg}
                    alt={title}
                    className="block h-auto w-full transition-[border-radius] duration-500 ease-in-out"
                  />
                </div>
              </div>

              {/* Content Column */}
              <div className="w-full md:flex-1">
                <div className="mt-4 px-3 md:mt-0">
                  <h1
                    className="grid-animated-heading text-2xl lg:text-3xl xl:text-4xl font-black capitalize tracking-[2px] mb-2"
                    style={{ "--main-color": brandColor } as React.CSSProperties}
                  >
                    {title}
                  </h1>

                  <div className="mb-2 lg:text-lg text-sm font-semibold text-black">
                    {features.map((item, i) => (
                      <span key={i}>
                        {item}
                        {i < features.length - 1 && (
                          <span className="mx-1.5 text-[#888]"> • </span>
                        )}
                      </span>
                    ))}
                  </div>

                  <p className="mb-5 lg:text-lg text-sm leading-relaxed">
                    {description}
                  </p>

                  <div className="flex flex-col flex-wrap items-center justify-between gap-4 sm:flex-row">
                    <Link
                      to={buttonLink}
                      className="shine-btn grid-explore-btn flex h-[42px] min-w-[140px] items-center justify-center border border-solid px-[25px] py-[7px] font-semibold text-white transition-all duration-300 ease-in-out"
                      style={{
                        backgroundColor: brandColor,
                        borderColor: brandColor,
                      }}
                    >
                      {buttonText}
                    </Link>

                    <div className="flex flex-wrap items-center justify-center gap-2.5 text-[15px] sm:justify-start">
                      {iconList}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default Grid;