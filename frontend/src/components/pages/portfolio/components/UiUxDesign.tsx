import { memo, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { getAllUiUxDesignsAPI } from "../../../../api/Api";

type DesignItem = {
  _id?: string;
  title: string;
  image: string;
  link: string;
};

// Cycles through if there are more cards than colors —
// purely a visual accent, unrelated to the API data shape.
const ACCENTS = ["#DFA53A", "#7C3AED", "#2563EB", "#16A34A", "#EC4899", "#0D9488"];

const getDomain = (url: string) => {
  try {
    return new URL(url).hostname.replace("www.", "");
  } catch {
    return "preview";
  }
};

// ---------------------------------------------
// "Interactive browser mockup" card:
// - real 3D tilt that follows the cursor (perspective +
//   rotateX/rotateY, driven by mouse position — no library)
// - a live browser chrome bar showing the actual domain
//   parsed from item.link, with a little colored "status" dot
// - a diagonal shimmer sweep across the screenshot on hover
// - a numbered accent badge floating off the top-left corner
// - glass "View Design" pill + gradient title reveal, same
//   as before, now riding on top of the tilt
// Loading state (skeleton), the <img>/onLoad logic, and the
// link/href behavior are all unchanged.
// ---------------------------------------------
const DesignCard = memo(
  ({ item, accent }: { item: DesignItem; accent: string }) => {
    const [loaded, setLoaded] = useState(false);
    const [tilt, setTilt] = useState({ x: 0, y: 0 });
    const cardRef = useRef<HTMLAnchorElement>(null);

    const handleMouseMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
      const el = cardRef.current;
      if (!el) return;

      const rect = el.getBoundingClientRect();
      const px = (e.clientX - rect.left) / rect.width - 0.5;
      const py = (e.clientY - rect.top) / rect.height - 0.5;

      setTilt({ x: py * -10, y: px * 10 });
    };

    const resetTilt = () => setTilt({ x: 0, y: 0 });

    return (
      <a
        ref={cardRef}
        href={item.link}
        target="_blank"
        rel="noopener noreferrer"
        onMouseMove={handleMouseMove}
        onMouseLeave={resetTilt}
        className="uiux-card group relative block overflow-hidden rounded-xl bg-white ring-1 ring-slate-200 [transform-style:preserve-3d] transition-shadow duration-300 hover:shadow-[0_20px_40px_-12px_var(--accent)] hover:ring-[color:var(--accent)]"
        style={
          {
            ["--accent" as string]: accent,
            transform: `perspective(900px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
            transition: "transform 150ms ease-out, box-shadow 300ms, ring-color 300ms",
          } as React.CSSProperties
        }
      >
        {/* Fake browser top-bar with real domain + status dot */}
        <div className="flex items-center gap-2 border-b border-slate-100 bg-slate-50 px-3 py-2">
          <span className="h-2 w-2 rounded-full bg-red-400" />
          <span className="h-2 w-2 rounded-full bg-yellow-400" />
          <span className="h-2 w-2 rounded-full bg-green-400" />
          <span className="ml-2 flex-1 truncate rounded-full bg-white px-2 py-0.5 text-[10px] text-slate-400 ring-1 ring-slate-200">
            {getDomain(item.link)}
          </span>
          <span
            className="h-1.5 w-1.5 shrink-0 animate-pulse rounded-full"
            style={{ background: accent }}
          />
        </div>

        <div className="relative overflow-hidden">
          {!loaded && (
            <div className="absolute inset-0 animate-pulse bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200" />
          )}

          <img
            src={item.image}
            alt={item.title}
            loading="lazy"
            decoding="async"
            onLoad={() => setLoaded(true)}
            className={`w-full transition-all duration-500 ease-out ${
              loaded ? "opacity-100" : "opacity-0"
            } group-hover:scale-105`}
          />

          {/* Diagonal shimmer sweep on hover */}
          <div className="uiux-shimmer pointer-events-none absolute inset-0" />

          {/* Soft scrim so the panel below always reads well, even before it fully reveals */}
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

          {/* Colored slide-up panel — the design's name, highlighted */}
          <div
            className="pointer-events-none absolute inset-x-0 bottom-0 flex translate-y-full flex-col items-center justify-center px-4 py-2.5 text-center shadow-[0_-8px_20px_-4px_rgba(0,0,0,0.25)] transition-transform duration-300 ease-out group-hover:translate-y-0"
            style={{
              background: `linear-gradient(135deg, ${accent}, ${accent}CC)`,
            }}
          >
            <h3 className="line-clamp-2 text-sm font-bold uppercase tracking-wide text-white sm:text-base">
              {item.title}
            </h3>
            <span className="mt-0.5 block text-[11px] font-medium text-white/80">
              View Design
            </span>
          </div>
        </div>
      </a>
    );
  }
);

export default function UiUxDesign() {
  const [designs, setDesigns] = useState<DesignItem[]>([]);
  const [loading, setLoading] = useState(true);

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

        // Show newest first
        data = [...data].reverse();

        if (!cancelled) {
          setDesigns(data);
        }
      } catch (error) {
        console.error("UI/UX load error:", error);

        if (!cancelled) {
          setDesigns([]);
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    };

    loadDesigns();

    return () => {
      cancelled = true;
    };
  }, []);

  const visibleDesigns = designs.slice(0, 6);
  return (
    <section className="py-2">
      {/* Keyframes for the shimmer sweep — scoped to this component */}
      <style>{`
        .uiux-shimmer {
          background: linear-gradient(
            115deg,
            transparent 20%,
            rgba(255, 255, 255, 0.35) 35%,
            transparent 50%
          );
          background-size: 250% 250%;
          background-position: 200% 0%;
          opacity: 0;
          transition: opacity 0.2s ease;
        }
        .uiux-card:hover .uiux-shimmer {
          opacity: 1;
          animation: uiux-sweep 1s ease forwards;
        }
        @keyframes uiux-sweep {
          from { background-position: 200% 0%; }
          to { background-position: -50% 100%; }
        }
      `}</style>

      <div className="relative mx-auto max-w-[1440px] px-4">
        {/* Heading — colors unchanged */}
        <div className="mb-12 text-center">
          <h2 className="heading-primary">
            UI/UX Design Portfolio
          </h2>

          <p className="lg:text-base text-sm px-0 sm:px-8 mt-2">
            Browse through our creative UI/UX layout designs
          </p>
        </div>

        {/* Skeleton */}
        {loading ? (
          <div className="grid grid-cols-2 gap-6 md:grid-cols-3 md:gap-8">
            {Array.from({ length: 6 }).map((_, index) => (
              <div
                key={index}
                className="
              aspect-[4/3]
              animate-pulse
              rounded-xl
              bg-gradient-to-r
              from-gray-200
              via-gray-100
              to-gray-200
            "
              />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-6 md:grid-cols-3 md:gap-8">
            {visibleDesigns.map((item, index) => (
              <DesignCard
                key={item._id ?? index}
                item={item}
                accent={ACCENTS[index % ACCENTS.length]}
              />
            ))}
          </div>
        )}

        {/* View All */}
        {!loading && designs.length > 6 && (
          <div className="mt-10 flex justify-center">
            <Link to="/all-design"
              className="shine-btn relative overflow-hidden uppercase
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
                hover:to-[#D69D20]"
            >View All
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
