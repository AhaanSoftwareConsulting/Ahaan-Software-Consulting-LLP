import { useEffect, useRef, useState } from "react";

const OUTER_ICONS = [
  {
    image: "https://ahaanmedia.com/ahaanwebsite/technology/React.webp",
    label: "React JS",
    angle: 0,
  },
  {
    image: "https://ahaanmedia.com/ahaanwebsite/technology/Node.webp",
    label: "Node JS",
    angle: 45,
  },
  {
    image: "https://ahaanmedia.com/ahaanwebsite/technology/Mongodb.webp",
    label: "MongoDB",
    angle: 90,
  },
  {
    image: "https://ahaanmedia.com/ahaanwebsite/technology/Wordpress.webp",
    label: "WordPress",
    angle: 135,
  },
  {
    image: "https://ahaanmedia.com/ahaanwebsite/technology/Shopify.webp",
    label: "Shopify",
    angle: 180,
  },
  {
    image: "https://ahaanmedia.com/ahaanwebsite/technology/Next.webp",
    label: "Next Js",
    angle: 225,
  },
  {
    image: "https://ahaanmedia.com/ahaanwebsite/technology/JS.webp",
    label: "JavaScript",
    angle: 270,
  },
  {
    image: "https://ahaanmedia.com/ahaanwebsite/technology/TS.webp",
    label: "TypeScript",
    angle: 315,
  },
];

const INNER_ICONS = [
  {
    image: "https://ahaanmedia.com/ahaanwebsite/technology/Figma.webp",
    label: "Figma",
    angle: 0,
  },
  {
    image: "https://ahaanmedia.com/ahaanwebsite/technology/Webflow.webp",
    label: "Webflow",
    angle: 120,
  },
  {
    image: "https://ahaanmedia.com/ahaanwebsite/technology/Framer.webp",
    label: "Framer",
    angle: 240,
  },
];

type OrbitIconProps = {
  image: string;
  label: string;
  angle: number;
  radius: number;
};

/**
 * Measures the *actual rendered* size of an element and returns half its
 * width as the orbit radius. This replaces hardcoded window-width
 * breakpoints (which drifted out of sync with the Tailwind classes that
 * size the circles, e.g. JS switching at 1024/1200 vs Tailwind's
 * lg:1024/xl:1280) — that mismatch is what pushed icons past the ring's
 * edge at in-between widths. Measuring the real box means the icons are
 * mathematically always on the ring, at any viewport width.
 */
function useMeasuredRadius<T extends HTMLElement>() {
  const ref = useRef<T | null>(null);
  const [radius, setRadius] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const update = () => setRadius(el.clientWidth / 2);
    update();

    const observer = new ResizeObserver(update);
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return { ref, radius };
}

function OrbitIcon({
  image,
  label,
  angle,
  radius,
}: OrbitIconProps) {
  return (
    <div
      className="absolute left-1/2 top-1/2"
      style={{
        transform: `
          translate(-50%, -50%)
          rotate(${angle}deg)
          translateX(${radius}px)
        `,
      }}
    >
      <div
        style={{
          transform: `rotate(-${angle}deg)`,
        }}
        className="group flex flex-col items-center"
      >
        <div
          className="w-10 h-10
            md:w-12 xl:w-14
            md:h-12 xl:h-14
            rounded-full
            bg-white
            border
            border-slate-200
            shadow-xl
            flex
            items-center
            justify-center
            transition-all
            duration-300
            hover:scale-110
            hover:border-[#E6B33C]
            hover:shadow-[0_18px_35px_-12px_rgba(196,138,24,0.35)]
          "
        >
          <img
            src={image}
            alt={label}
            className="w-8 h-8 xl:w-10 xl:h-10 object-contain"
            draggable={false}
          />
        </div>

        <span className="mt-2 text-xs font-medium text-slate-500 opacity-0 group-hover:opacity-100 transition-all duration-300 whitespace-nowrap">
          {label}
        </span>
      </div>
    </div>
  );
}

export default function TechOrbit() {
  const { ref: outerRef, radius: outerRadius } = useMeasuredRadius<HTMLDivElement>();
  const { ref: innerRef, radius: innerRadius } = useMeasuredRadius<HTMLDivElement>();

  return (
    <div className="relative flex items-center justify-center w-full h-[500px] lg:h-[650px] overflow-hidden">
      {/* Background Glow */}
      <div className="absolute w-[350px] h-[350px] rounded-full bg-[#E6B33C]/10 blur-[120px] px-2" />

      {/* Outer Orbit */}
      <div
        ref={outerRef}
        className="absolute w-[285px] h-[285px] lg:w-[425px] lg:h-[425px] xl:w-[450px] xl:h-[450px] rounded-full border border-[#E6B33C]/20 animate-[spin_35s_linear_infinite]"
      >
        <div className="absolute inset-0 rounded-full border border-dashed border-[#E6B33C]/20" />

        {outerRadius > 0 &&
          OUTER_ICONS.map((item) => (
            <OrbitIcon
              key={item.label}
              image={item.image}
              label={item.label}
              angle={item.angle}
              radius={outerRadius}
            />
          ))}
      </div>

      {/* Inner Orbit */}
      <div
        ref={innerRef}
        className="absolute w-[145px] h-[145px] lg:w-[245px] lg:h-[245px]  xl:w-[300px] xl:h-[300px] rounded-full border border-slate-300 animate-[spin_25s_linear_infinite_reverse]"
      >
        <div className="absolute inset-0 rounded-full border border-dashed border-slate-300/50" />

        {innerRadius > 0 &&
          INNER_ICONS.map((item) => (
            <OrbitIcon
              key={item.label}
              image={item.image}
              label={item.label}
              angle={item.angle}
              radius={innerRadius}
            />
          ))}
      </div>

      {/* Center Circle */}
      <div className="relative z-10 flex items-center justify-center  w-14 h-14  md:w-18 md:h-18 xl:w-40 xl:h-40 rounded-full bg-gradient-to-br from-[#161616] via-[#161616] to-amber-50 border border-slate-200 shadow-2xl">
        <div className="absolute  w-10 h-10  md:w-12 md:h-12 xl:w-24 xl:h-24 rounded-full bg-[#E6B33C]/20 blur-3xl animate-pulse" />

        <img
          src="https://ahaanmedia.com/asc/layouts/fav.png"
          alt="Logo"
          className="relative z-10 w-10 h-10 md:w-12 md:h-12 xl:w-20 xl:h-20 object-contain"
        />
      </div>
    </div>
  );
}
