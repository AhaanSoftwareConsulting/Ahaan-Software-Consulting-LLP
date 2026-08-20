import React, { useEffect, useState } from "react";
import { motion, useInView } from "framer-motion";

/* ------------------------------------------------------------------ */
/*  Custom icons — typed properly for React's SVG element             */
/* ------------------------------------------------------------------ */

// Typing this explicitly as React.SVGProps<SVGSVGElement> removes all TS complaints
const iconProps: React.SVGProps<SVGSVGElement> = {
  className: "h-5 w-5",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.8,
  strokeLinecap: "round",
  strokeLinejoin: "round",
};

const AwardIcon = () => (
  <svg {...iconProps} viewBox="0 0 24 24">
    <circle cx="12" cy="8" r="5.5" />
    <path d="M8.2 12.8 6.5 21l5.5-3 5.5 3-1.7-8.2" />
  </svg>
);

const TeamIcon = () => (
  <svg {...iconProps} viewBox="0 0 24 24">
    <circle cx="9" cy="8" r="3" />
    <path d="M3.5 19.5c0-3 2.5-5 5.5-5s5.5 2 5.5 5" />
    <circle cx="17" cy="9" r="2.4" />
    <path d="M15.5 14.2c2.4.3 4 2 4 5.3" />
  </svg>
);

const CheckIcon = () => (
  <svg {...iconProps} viewBox="0 0 24 24">
    <circle cx="12" cy="12" r="9" />
    <path d="M8 12.5l2.6 2.6L16.2 9" />
  </svg>
);

const SmileIcon = () => (
  <svg {...iconProps} viewBox="0 0 24 24">
    <circle cx="12" cy="12" r="9" />
    <path d="M8.5 14c1 1.3 2.2 2 3.5 2s2.5-.7 3.5-2" />
    <path d="M9 9.5h.01M15 9.5h.01" strokeWidth={2.4} />
  </svg>
);

/* ------------------------------------------------------------------ */
/*  Data                                                              */
/* ------------------------------------------------------------------ */

interface Stat {
  value: number;
  suffix?: string;
  label: string;
  icon: React.ReactNode;
  /** how far this plaque hangs below the rail on desktop's single row, in px */
  drop: number;
  /** how far this plaque hangs below its row's rail on the mobile 2x2 grid, in px */
  dropMobile: number;
}

const stats: Stat[] = [
  { value: 5, label: "International Awards", icon: <AwardIcon />, drop: 20, dropMobile: 15 },
  { value: 30, suffix: "+", label: "Our Teams", icon: <TeamIcon />, drop: 64, dropMobile: 35 },
  { value: 100, suffix: "+", label: "Completed Projects", icon: <CheckIcon />, drop: 34, dropMobile: 35 },
  { value: 125, suffix: "+", label: "Happy Clients", icon: <SmileIcon />, drop: 84, dropMobile: 15 },
];

/* ------------------------------------------------------------------ */
/*  Count-up hook — plaques tally up once they enter view, and reset   */
/*  back to zero once they scroll fully out of view again              */
/* ------------------------------------------------------------------ */

function useCountUp(target: number, active: boolean, duration = 1400) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!active) {
      setValue(0);
      return;
    }
    let start: number | null = null;
    let frame: number;

    const ease = (t: number) => 1 - Math.pow(1 - t, 3);

    const step = (ts: number) => {
      if (start === null) start = ts;
      const progress = Math.min((ts - start) / duration, 1);
      setValue(Math.round(ease(progress) * target));
      if (progress < 1) frame = requestAnimationFrame(step);
    };

    frame = requestAnimationFrame(step);
    return () => cancelAnimationFrame(frame);
  }, [active, target, duration]);

  return value;
}

/* ------------------------------------------------------------------ */
/*  Plaque — swings in on a "wire" like a hung frame, and swings back  */
/*  up out of view when scrolled past going up                        */
/*  `drop` is the px offset used for THIS render (desktop or mobile)   */
/* ------------------------------------------------------------------ */

const Plaque: React.FC<{ stat: Stat; index: number; drop: number; compact?: boolean }> = ({
  stat,
  index,
  drop,
  compact,
}) => {
  const ref = React.useRef(null);
  const visible = useInView(ref, { once: false, amount: 0.5 });
  const count = useCountUp(stat.value, visible, 1200 + index * 150);

  return (
    <div ref={ref} className="relative flex justify-center" style={{ marginTop: drop }}>
      {/* wire from rail down to the seal */}
      <span
        aria-hidden
        className="absolute left-1/2 -translate-x-1/2 w-px bg-gradient-to-b from-[#C9A227]/70 to-[#C9A227]/10"
        style={{ top: -drop-6, height: drop + (compact ? 20 : 28) }}
      />
      {/* nail on the rail */}
      <span
        aria-hidden
        className={`absolute left-1/2 -translate-x-1/2 rounded-full bg-[#E8C766] shadow-[0_0_6px_2px_rgba(232,199,102,0.5)] ${
          compact ? "w-1.5 h-1.5" : "w-2 h-2"
        }`}
        style={{ top: -drop - (compact ? 10 : 12) }}
      />

      <motion.div
        className="group relative w-full max-w-[150px] sm:max-w-[200px] lg:max-w-[240px] origin-top motion-reduce:transition-none"
        initial={{ opacity: 0, y: -40, rotate: index % 2 === 0 ? -10 : 10 }}
        animate={
          visible
            ? { opacity: 1, y: 0, rotate: 0 }
            : { opacity: 0, y: -40, rotate: index % 2 === 0 ? -10 : 10 }
        }
        transition={{
          type: "spring",
          stiffness: 140,
          damping: 11,
          delay: visible ? index * 0.12 : 0,
        }}
      >
        {/* seal */}
        <div
          className={`relative z-10 mx-auto -mb-6 flex items-center justify-center rounded-full bg-gradient-to-br from-[#E8C766] to-[#9C7A17] text-[#1C1B19] shadow-[0_6px_14px_rgba(0,0,0,0.45)] ring-1 ring-[#F5E7B8]/60 transition-transform duration-500 motion-reduce:transition-none group-hover:-rotate-6 ${
            compact ? "h-9 w-9 [&_svg]:h-4 [&_svg]:w-4" : "h-12 w-12"
          }`}
        >
          {stat.icon}
        </div>

        {/* plaque body */}
        <div
          className={`relative overflow-hidden rounded-sm bg-[#2A2724] text-center shadow-[0_18px_35px_rgba(0,0,0,0.5)] ring-1 ring-[#C9A227]/25 transition-transform duration-500 motion-reduce:transition-none group-hover:-translate-y-1 group-hover:rotate-[0.5deg] ${
            compact ? "pt-6 pb-5 px-3" : "pt-9 pb-8 px-6"
          }`}
        >
          {/* engraved inner border */}
          <span
            aria-hidden
            className="pointer-events-none absolute inset-[6px] rounded-[2px] border border-[#C9A227]/20"
          />

          {/* brass sheen sweep on hover */}
          <span
            aria-hidden
            className="pointer-events-none absolute inset-0 -translate-x-[150%] bg-gradient-to-r from-transparent via-white/10 to-transparent transition-transform duration-700 motion-reduce:transition-none group-hover:translate-x-[150%]"
          />

          <div
            className={`relative font-serif font-semibold tracking-tight text-[#F0EAD9] ${
              compact ? "text-2xl" : "text-4xl"
            }`}
          >
            {count}
            {stat.suffix}
          </div>
          <div
            className={`relative mt-2 font-mono uppercase tracking-[0.2em] text-[#B9A98A] ${
              compact ? "text-[0.6rem]" : "text-[0.7rem]"
            }`}
          >
            {stat.label}
          </div>
        </div>
      </motion.div>
    </div>
  );
};

/* ------------------------------------------------------------------ */
/*  Rail — the glowing gold connector line hung across a row           */
/* ------------------------------------------------------------------ */

const Rail: React.FC<{ className?: string }> = ({ className = "" }) => (
  <motion.div
    aria-hidden
    className={`absolute left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#C9A227]/80 to-transparent shadow-[0_0_10px_rgba(201,162,39,0.5)] origin-center ${className}`}
    initial={{ scaleX: 0 }}
    whileInView={{ scaleX: 1 }}
    viewport={{ once: false, amount: 0.6 }}
    transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
  />
);

/* ------------------------------------------------------------------ */
/*  Section                                                           */
/* ------------------------------------------------------------------ */

export const TotalProject = () => {
  const [row1, row2] = [stats.slice(0, 2), stats.slice(2, 4)];

  return (
    <section className="relative overflow-hidden bg-[#0A0A0A] px-4 lg:px-6 2xl:px-10 py-12">
      {/* subtle vignette / wall texture */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-60"
        style={{
          background:
            "radial-gradient(ellipse at 50% 0%, rgba(201,162,39,0.08), transparent 60%)",
        }}
      />

      <div className="relative mx-auto max-w-6xl">
        <motion.div
          className="mb-16 lg:mb-24 text-center"
          initial={{ opacity: 0, y: -24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.5 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          <h2 className="text-2xl lg:text-3xl xl:text-4xl font-extrabold text-[#fff] leading-tight">
            Measured in years, hung on the wall
          </h2>
          <p className="lg:text-lg text-sm px-0 sm:px-8 mt-3 text-[#8A8A8A] leading-relaxed  mx-auto">
            From strategy and planning to development, testing, and deployment,
            we follow a structured process that ensures every project is
            delivered with quality, efficiency, and measurable business results.
          </p>
        </motion.div>

        {/* ---------------------------------------------------------- */}
        {/* Desktop / large screens: single rail, 4-across row          */}
        {/* ---------------------------------------------------------- */}
        <div className="hidden lg:block relative">
          <Rail className="top-0" />
          <div className="grid grid-cols-4 gap-x-8 gap-y-24 pt-2">
            {stats.map((stat, i) => (
              <Plaque key={stat.label} stat={stat} index={i} drop={stat.drop} />
            ))}
          </div>
        </div>

        {/* ---------------------------------------------------------- */}
        {/* Mobile / tablet: 2x2 grid, each row hung on its own rail.   */}
        {/* Row 1 — rail above only. Row 2 — rail above AND below.     */}
        {/* ---------------------------------------------------------- */}
        <div className="lg:hidden">
          {/* row 1 */}
          <div className="relative">
            <Rail className="top-0" />
            <div className="grid grid-cols-2 gap-x-4 gap-y-14 pt-2">
              {row1.map((stat, i) => (
                <Plaque key={stat.label} stat={stat} index={i} drop={stat.dropMobile} compact />
              ))}
            </div>
          </div>

          {/* row 2 */}
          <div className="relative mt-14">
            <Rail className="top-0" />
            <div className="grid grid-cols-2 gap-x-4 gap-y-14 pt-2">
              {row2.map((stat, i) => (
                <Plaque
                  key={stat.label}
                  stat={stat}
                  index={i + 2}
                  drop={stat.dropMobile}
                  compact
                />
              ))}
            </div>
            
           
          </div>
        </div>
      </div>
    </section>
  );
};
