import {
  memo,
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
  type CSSProperties,
} from "react";
import { Link } from "react-router-dom";
import { getAllDevelopmentsAPI } from "../../../../api/Api";

/* -------------------------------------------------------------------------- */
/*  Config                                                                    */
/* -------------------------------------------------------------------------- */

/** Scroll speed in pixels per second. Same visual speed on every screen size. */
const PX_PER_SECOND = 45;

/** Each column repeats its items until it has at least this many, so the
 *  loop is always taller than the visible window (no empty gap). */
const MIN_ITEMS_PER_COLUMN = 4;

/** One accent per column; cycles if there are ever more columns. */
const ACCENTS = ["#F4A62A", "#7C3AED", "#2563EB", "#EC4899"];

/** Vertical start offsets (0–1 of one loop) so columns never line up. */
const OFFSETS = [0, 0.4, 0.2, 0.6];

/* -------------------------------------------------------------------------- */
/*  Types                                                                     */
/* -------------------------------------------------------------------------- */

type Development = {
  _id?: string;
  image: string;
  title: string;
  link: string;
};

type GalleryCardProps = {
  item: Development;
  accent: string;
  /** Duplicate copy used only for the seamless loop. Hidden from AT/keyboard. */
  decorative?: boolean;
};

type ScrollColumnProps = {
  items: Development[];
  index: number;
  reverse: boolean;
  accent: string;
};

/* -------------------------------------------------------------------------- */
/*  Styles (animation lives here so the component is self-contained)          */
/*  You can move this into your global CSS and delete the old webdev-* rules. */
/* -------------------------------------------------------------------------- */

const CSS = `
@keyframes webdev-scroll {
  from { transform: translate3d(0, 0, 0); }
  to   { transform: translate3d(0, -50%, 0); }
}

.webdev-track {
  --wd-duration: 40s;
  animation: webdev-scroll var(--wd-duration) linear infinite;
  animation-delay: calc(var(--wd-duration) * var(--wd-offset, 0) * -1);
  will-change: transform;
  backface-visibility: hidden;
}
.webdev-track-reverse { animation-direction: reverse; }

/* Pause while the user is looking at / focusing a column */
.webdev-col:hover .webdev-track,
.webdev-col:focus-within .webdev-track { animation-play-state: paused; }

/* Soft fade at the top and bottom edge of the gallery */
.webdev-mask {
  -webkit-mask-image: linear-gradient(to bottom, transparent 0, #000 7%, #000 93%, transparent 100%);
          mask-image: linear-gradient(to bottom, transparent 0, #000 7%, #000 93%, transparent 100%);
}

@media (prefers-reduced-motion: reduce) {
  .webdev-track { animation: none; will-change: auto; }
  .webdev-col { overflow-y: auto; overscroll-behavior: contain; }
  .webdev-mask { -webkit-mask-image: none; mask-image: none; }
}
`;

/* -------------------------------------------------------------------------- */
/*  Hooks                                                                     */
/* -------------------------------------------------------------------------- */

/** 2 columns < 768px, 3 columns < 1024px, 4 columns above. */
function useColumnCount() {
  const read = () => {
    if (typeof window === "undefined") return 4;
    if (window.matchMedia("(min-width: 1024px)").matches) return 4;
    if (window.matchMedia("(min-width: 768px)").matches) return 3;
    return 2;
  };

  const [count, setCount] = useState(read);

  useEffect(() => {
    const queries = [
      window.matchMedia("(min-width: 1024px)"),
      window.matchMedia("(min-width: 768px)"),
    ];
    const update = () => setCount(read());
    queries.forEach((q) => q.addEventListener("change", update));
    update();
    return () => queries.forEach((q) => q.removeEventListener("change", update));
  }, []);

  return count;
}

/* -------------------------------------------------------------------------- */
/*  Small components                                                          */
/* -------------------------------------------------------------------------- */

const Heading = () => (
  <div className="relative mb-8 text-center sm:mb-12">
    <h2 className="heading-primary">Web Development Projects</h2>
    <p className="mt-3 px-0 text-sm sm:px-8 lg:text-lg">
      Explore our recent website projects
    </p>
  </div>
);

const GalleryCard = memo(({ item, accent, decorative }: GalleryCardProps) => (
  <div className="pb-3 sm:pb-4">
    <a
      href={item.link}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`${item.title} (opens in a new tab)`}
      aria-hidden={decorative || undefined}
      tabIndex={decorative ? -1 : undefined}
      style={{ "--accent": accent } as CSSProperties}
      className="group relative block aspect-[3/4] overflow-hidden rounded-xl bg-slate-100 ring-1 ring-slate-200 transition-shadow duration-300 hover:ring-2 hover:ring-[color:var(--accent)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--accent)] sm:aspect-[4/5] sm:rounded-2xl"
    >
      <img
        src={item.image}
        alt={decorative ? "" : item.title}
        loading="lazy"
        decoding="async"
        draggable={false}
        className="h-full w-full object-cover object-top transition-transform duration-500 ease-out group-hover:scale-105"
      />

      {/* Live badge */}
      <span
        className="absolute left-2 top-2 z-10 inline-flex items-center gap-1.5 rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-white shadow-md sm:left-3 sm:top-3 sm:px-2.5 sm:py-1 sm:text-[11px]"
        style={{ background: accent }}
      >
        <span className="h-1.5 w-1.5 rounded-full bg-white" />
        Live
      </span>

      {/* Scrim: on hover for mouse devices, always on for touch devices */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus-visible:opacity-100 [@media(hover:none)]:opacity-100" />

      {/* View Project pill (mouse / keyboard only) */}
      <div className="pointer-events-none absolute inset-0 hidden items-center justify-center opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus-visible:opacity-100 [@media(hover:hover)]:flex">
        <span className="translate-y-2 rounded-full border border-white/40 bg-white/20 px-4 py-1.5 text-xs font-semibold text-white shadow-lg backdrop-blur-md transition-transform duration-300 group-hover:translate-y-0 group-focus-visible:translate-y-0 sm:text-sm">
          View Project
        </span>
      </div>

      {/* Title */}
      <span className="pointer-events-none absolute inset-x-0 bottom-0 line-clamp-2 p-2.5 text-xs font-semibold leading-snug text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus-visible:opacity-100 sm:p-3 sm:text-sm [@media(hover:none)]:opacity-100">
        {item.title}
      </span>
    </a>
  </div>
));
GalleryCard.displayName = "GalleryCard";

const ScrollColumn = memo(({ items, index, reverse, accent }: ScrollColumnProps) => {
  const trackRef = useRef<HTMLDivElement>(null);

  // Constant pixel speed: duration = one loop height / speed.
  useLayoutEffect(() => {
    const el = trackRef.current;
    if (!el) return;

    const apply = () => {
      const loopHeight = el.scrollHeight / 2;
      if (loopHeight > 0) {
        el.style.setProperty(
          "--wd-duration",
          `${Math.max(loopHeight / PX_PER_SECOND, 8)}s`
        );
      }
    };

    apply();
    const ro = new ResizeObserver(apply);
    ro.observe(el);
    return () => ro.disconnect();
  }, [items.length]);

  return (
    <div className="webdev-col h-full overflow-hidden rounded-xl sm:rounded-2xl">
      <div
        ref={trackRef}
        className={`webdev-track ${reverse ? "webdev-track-reverse" : ""}`}
        style={{ "--wd-offset": OFFSETS[index % OFFSETS.length] } as CSSProperties}
      >
        {[0, 1].map((copy) =>
          items.map((item, i) => (
            <GalleryCard
              key={`${copy}-${item._id ?? item.link}-${i}`}
              item={item}
              accent={accent}
              decorative={copy === 1}
            />
          ))
        )}
      </div>
    </div>
  );
});
ScrollColumn.displayName = "ScrollColumn";

/* Shared responsive heights + grid so skeleton and gallery never shift */
const GRID_HEIGHT =
  "h-[440px] min-[400px]:h-[480px] sm:h-[540px] md:h-[580px] lg:h-[640px]";

const gridStyle = (count: number): CSSProperties => ({
  gridTemplateColumns: `repeat(${count}, minmax(0, 1fr))`,
});

/* -------------------------------------------------------------------------- */
/*  Page section                                                              */
/* -------------------------------------------------------------------------- */

export default function WebDevelopment() {
  const [items, setItems] = useState<Development[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [attempt, setAttempt] = useState(0);

  const columnCount = useColumnCount();

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError(false);

    (async () => {
      try {
        const res = await getAllDevelopmentsAPI();
        const data: unknown = res?.data?.data;
        if (cancelled) return;

        setItems(
          Array.isArray(data)
            ? (data as Development[]).filter((d) => d?.image && d?.link)
            : []
        );
      } catch (err) {
        console.error(err);
        if (!cancelled) setError(true);
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [attempt]);

  const retry = useCallback(() => setAttempt((n) => n + 1), []);

  const columns = useMemo(() => {
    const cols: Development[][] = Array.from({ length: columnCount }, () => []);
    items.forEach((item, i) => cols[i % columnCount].push(item));

    return cols
      .filter((c) => c.length > 0)
      .map((c) => {
        let filled = c;
        while (filled.length < MIN_ITEMS_PER_COLUMN) filled = [...filled, ...c];
        return filled;
      });
  }, [items, columnCount]);

  /* ----------------------------- Loading state ---------------------------- */
  if (loading) {
    return (
      <section
        className="relative mx-auto max-w-[1440px] px-4 py-8 sm:px-6 lg:py-12"
        aria-busy="true"
        aria-live="polite"
      >
        <Heading />
        <div
          className={`grid gap-3 overflow-hidden sm:gap-4 ${GRID_HEIGHT}`}
          style={gridStyle(columnCount)}
        >
          {Array.from({ length: columnCount }).map((_, col) => (
            <div key={col} className="flex flex-col gap-3 sm:gap-4">
              {Array.from({ length: 3 }).map((__, card) => (
                <div
                  key={card}
                  className="aspect-[3/4] w-full animate-pulse rounded-xl bg-gradient-to-br from-slate-200 to-slate-100 sm:aspect-[4/5] sm:rounded-2xl"
                />
              ))}
            </div>
          ))}
        </div>
      </section>
    );
  }

  /* ------------------------- Error / empty state -------------------------- */
  if (error || items.length === 0) {
    return (
      <section className="mx-auto max-w-[1440px] px-4 py-16 text-center sm:px-6">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#FEF3C7] text-2xl font-bold text-[#B45309]">
          !
        </div>
        <h2 className="mt-4 text-2xl font-bold text-[#1c1d20] sm:text-3xl md:text-5xl">
          Web Development Projects
        </h2>
        <p className="mt-3 text-sm text-black sm:text-base">
          {error
            ? "We couldn't load the projects. Please try again."
            : "No projects to show yet. Please check back soon."}
        </p>
        {error && (
          <button
            type="button"
            onClick={retry}
            className="mt-6 inline-block rounded-lg bg-gradient-to-r from-[#C48A18] to-[#E6B33C] px-6 py-2.5 text-sm font-semibold uppercase text-black shadow-md transition hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C48A18] focus-visible:ring-offset-2"
          >
            Try again
          </button>
        )}
      </section>
    );
  }

  /* ------------------------------- Gallery -------------------------------- */
  return (
    <section className="relative mx-auto max-w-[1440px] overflow-hidden px-4 py-8 sm:px-6 lg:py-12">
      <style>{CSS}</style>

      {/* Decorative background blobs */}
      <div className="pointer-events-none absolute -left-20 -top-20 -z-10 h-72 w-72 rounded-full bg-[#F4A62A]/10 blur-[140px]" />
      <div className="pointer-events-none absolute -bottom-32 -right-20 -z-10 h-72 w-72 rounded-full bg-[#7C3AED]/10 blur-[140px]" />

      <Heading />

      <div
        className={`webdev-mask grid gap-3 overflow-hidden sm:gap-4 ${GRID_HEIGHT}`}
        style={gridStyle(columns.length)}
      >
        {columns.map((column, index) => (
          <ScrollColumn
            key={index}
            items={column}
            index={index}
            reverse={index % 2 === 1}
            accent={ACCENTS[index % ACCENTS.length]}
          />
        ))}
      </div>

      <div className="mt-8 text-center sm:mt-12">
        <Link
          to="/all-development"
          className="shine-btn relative inline-block overflow-hidden bg-gradient-to-r from-[#C48A18] to-[#E6B33C] px-5 py-3 text-sm font-semibold uppercase text-black shadow-xl transition-all duration-300 hover:-translate-y-0.5 hover:from-[#B57A0C] hover:to-[#D69D20] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C48A18] focus-visible:ring-offset-2 xl:px-6 xl:py-3.5 xl:text-base 2xl:px-8"
        >
          View All
        </Link>
      </div>
    </section>
  );
}