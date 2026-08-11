import { useEffect, useMemo, useState, memo } from "react";
import { getAllDevelopmentsAPI } from "../../../../api/Api";
import { Link } from "react-router-dom";

const COLUMN_COUNT = 4;

// One accent color per column — cycles if there are ever
// more than 4 columns. Purely a visual choice, unrelated
// to the API data shape.
const ACCENTS = ["#F4A62A", "#7C3AED", "#2563EB", "#EC4899"];

type Development = {
  _id?: string;
  image: string;
  title: string;
  link: string;
};

type GalleryImageProps = {
  src: string;
  alt: string;
  href: string;
  accent: string;
};

type ScrollColumnProps = {
  images: Development[];
  reverse?: boolean;
  accent: string;
};

const GalleryImage = memo(({ src, alt, href, accent }: GalleryImageProps) => {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="group relative block overflow-hidden rounded-2xl ring-1 ring-slate-200 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_12px_30px_-8px_var(--accent)] hover:ring-[color:var(--accent)]"
      style={{ ["--accent" as string]: accent }}
    >
      {/* Corner ribbon */}
      <span
        className="absolute left-0 top-3 z-20 -translate-x-4 rotate-[-45deg] px-6 py-0.5 text-[9px] font-bold uppercase tracking-wider text-white shadow-md sm:text-[10px]"
        style={{ background: accent }}
      >
        Live
      </span>

      <img
        src={src}
        alt={alt}
        loading="lazy"
        decoding="async"
        draggable={false}
        className="
          h-60
          w-full
          object-cover
          transition-transform
          duration-500
          ease-out
          group-hover:scale-110
          group-hover:rotate-1

          sm:h-105
          md:h-150
          lg:h-72
          xl:h-[500px]
        "
      />

      {/* Gradient scrim */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

      {/* Glass "View Project" pill, centered */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center opacity-0 transition-all duration-300 group-hover:opacity-100">
        <span
          className="translate-y-2 rounded-full border border-white/40 bg-white/20 px-4 py-1.5 text-xs font-semibold text-white shadow-lg backdrop-blur-md transition-transform duration-300 group-hover:translate-y-0 sm:text-sm"
        >
          View Project
        </span>
      </div>

      {/* Title, bottom-anchored */}
      <span className="pointer-events-none absolute inset-x-0 bottom-0 line-clamp-2 p-3 text-xs font-semibold text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100 sm:text-sm">
        {alt}
      </span>
    </a>
  );
});

GalleryImage.displayName = "GalleryImage";

const ScrollColumn = memo(({ images, reverse, accent }: ScrollColumnProps) => {
  const doubled = [...images, ...images];
  const [isPaused, setIsPaused] = useState(false);

  return (
    <div
      className={`
        h-full
        overflow-hidden
        rounded-2xl

        ${reverse ? "mt-10 h-[calc(100%-40px)]" : ""}
      `}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div
        className={`
          flex
          flex-col
          gap-4
          webdev-column-track ${reverse ? "webdev-track-reverse" : ""}
        `}
        style={{ animationPlayState: isPaused ? "paused" : "running" }}
      >
        {doubled.map((item, index) => (
          <GalleryImage
            key={`${item._id}-${index}`}
            src={item.image}
            alt={item.title}
            href={item.link}
            accent={accent}
          />
        ))}
      </div>
    </div>
  );
});

ScrollColumn.displayName = "ScrollColumn";

export default function WebDevelopment() {
  const [items, setItems] = useState<Development[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    let cancelled = false;

    async function loadData() {
      try {
        const res = await getAllDevelopmentsAPI();

        if (!cancelled) {
          setItems(res.data.data);
        }
      } catch (err) {
        console.error(err);

        if (!cancelled) {
          setError(true);
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    loadData();

    return () => {
      cancelled = true;
    };
  }, []);

  const columns = useMemo(() => {
    const cols: Development[][] = Array.from(
      { length: COLUMN_COUNT },
      () => []
    );

    items.forEach((item, index) => {
      cols[index % COLUMN_COUNT].push(item);
    });

    return cols;
  }, [items]);

  const Heading = () => (
    <div className="relative mb-12 text-center">

      <h2 className="text-3xl sm:text-4xl font-extrabold leading-tight text-[#1c1d20]">
        Web Development Projects
      </h2>

      <p className="lg:text-base text-sm px-4 sm:px-8 mt-3 text-[#000000]">
        Explore our recent website projects
      </p>
    </div>
  );

  if (loading) {
    return (
      <section className="relative mx-auto max-w-[1600px] px-4 py-8">
        <Heading />

        <div
          className="
            grid
            grid-cols-2
            gap-4
            md:grid-cols-3
            lg:grid-cols-4
          "
        >
          {Array.from({ length: COLUMN_COUNT }).map((_, column) => (
            <div key={column} className="flex flex-col gap-4">
              {Array.from({ length: 3 }).map((_, card) => (
                <div
                  key={card}
                  className="
                    h-52
                    animate-pulse
                    rounded-2xl
                    bg-gradient-to-br
                    from-slate-200
                    to-slate-100
                  "
                />
              ))}
            </div>
          ))}
        </div>
      </section>
    );
  }

  if (error || items.length === 0) {
    return (
      <section className="container mx-auto max-w-[1440px] px-4 py-16 text-center">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#FEF3C7] text-2xl">
          !
        </div>

        <h2 className="mt-4 text-3xl md:text-5xl font-bold text-[#1c1d20]">
          Web Development Projects
        </h2>

        <p className="mt-3 text-[#000000]">Could not load projects.</p>
      </section>
    );
  }

  return (
    <section className="relative mx-auto max-w-[1440px] px-4 py-8 overflow-hidden">
      {/* Decorative background blobs, matching the pattern already
          used elsewhere in this project (e.g. the footer's blur decor). */}
      <div className="pointer-events-none absolute -left-20 -top-20 -z-10 h-72 w-72 rounded-full bg-[#F4A62A]/10 blur-[140px]" />
      <div className="pointer-events-none absolute -bottom-32 -right-20 -z-10 h-72 w-72 rounded-full bg-[#7C3AED]/10 blur-[140px]" />

      <Heading />

      {/* Gallery — auto-scrolling marquee columns */}

      <div
        className="
          grid
          grid-cols-2
          lg:grid-cols-4
          gap-4
          h-[360px]
          md:h-[420px]
          lg:h-[560px]
          overflow-hidden
        "
      >
        {columns.map(
          (column, index) =>
            column.length > 0 && (
              <div
                key={index}
                className={`
                  overflow-hidden
                  rounded-2xl
                  ${
                    index % 2 === 1
                      ? "mt-8 lg:mt-10 h-[calc(100%-40px)]"
                      : ""
                  }
                `}
              >
                <ScrollColumn
                  images={column}
                  reverse={index % 2 === 1}
                  accent={ACCENTS[index % ACCENTS.length]}
                />
              </div>
            )
        )}
      </div>

      {/* Button — unchanged */}

      <div className="text-center mt-12">
        <Link
          to="/all-development"
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
        >
          View All
        </Link>
      </div>
    </section>
  );
}
