import React, { useEffect, useRef, useState } from "react";

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
  /** how far this plaque hangs below the rail, in px — the gallery-wall stagger */
  drop: number;
}

const stats: Stat[] = [
  { value: 5, label: "International Awards", icon: <AwardIcon />, drop: 0 },
  { value: 30, suffix: "+", label: "Our Teams", icon: <TeamIcon />, drop: 64 },
  { value: 100, suffix: "+", label: "Completed Projects", icon: <CheckIcon />, drop: 24 },
  { value: 125, suffix: "+", label: "Happy Clients", icon: <SmileIcon />, drop: 84 },
];

/* ------------------------------------------------------------------ */
/*  Count-up hook — plaques tally up once they enter view              */
/* ------------------------------------------------------------------ */

function useCountUp(target: number, active: boolean, duration = 1400) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!active) return;
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
/*  Plaque                                                            */
/* ------------------------------------------------------------------ */

 const Plaque: React.FC<{ stat: Stat; index: number; visible: boolean }> = ({
  stat,
  index,
  visible,
}) => {
  const count = useCountUp(stat.value, visible, 1200 + index * 150);

  return (
    <div className="relative flex justify-center" style={{ marginTop: stat.drop }}>
      {/* wire from rail down to the seal */}
      <span
        aria-hidden
        className="absolute left-1/2 -translate-x-1/2 w-px bg-gradient-to-b from-[#C9A227]/70 to-[#C9A227]/10"
        style={{ top: -stat.drop, height: stat.drop + 28 }}
      />
      {/* nail on the rail */}
      <span
        aria-hidden
        className="absolute left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-[#E8C766] shadow-[0_0_6px_2px_rgba(232,199,102,0.5)]"
        style={{ top: -stat.drop - 4 }}
      />

      <div
        className={`group relative w-full max-w-[240px] transition-all duration-700 ease-out motion-reduce:transition-none ${
          visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
        }`}
        style={{ transitionDelay: `${index * 120}ms` }}
      >
        {/* seal */}
        <div className="relative z-10 mx-auto -mb-6 flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-[#E8C766] to-[#9C7A17] text-[#1C1B19] shadow-[0_6px_14px_rgba(0,0,0,0.45)] ring-1 ring-[#F5E7B8]/60 transition-transform duration-500 motion-reduce:transition-none group-hover:-rotate-6">
          {stat.icon}
        </div>

        {/* plaque body */}
        <div className="relative overflow-hidden rounded-sm bg-[#2A2724] pt-9 pb-8 px-6 text-center shadow-[0_18px_35px_rgba(0,0,0,0.5)] ring-1 ring-[#C9A227]/25 transition-transform duration-500 motion-reduce:transition-none group-hover:-translate-y-1 group-hover:rotate-[0.5deg]">
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

          <div className="relative font-serif text-4xl font-semibold tracking-tight text-[#F0EAD9]">
            {count}
            {stat.suffix}
          </div>
          <div className="relative mt-2 font-mono text-[0.7rem] uppercase tracking-[0.2em] text-[#B9A98A]">
            {stat.label}
          </div>
        </div>
      </div>
    </div>
  );
};

/* ------------------------------------------------------------------ */
/*  Section                                                           */
/* ------------------------------------------------------------------ */

export const TotalProject= () => {
  const [visible, setVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="relative overflow-hidden bg-[#1C1B19] px-6 py-28">
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
        <div className="mb-24 text-center">
          <p className="font-mono text-xs uppercase tracking-[0.35em] text-[#C9A227]">
            Hall of Record
          </p>
          <h2 className="mt-3 font-serif text-3xl font-semibold text-[#F0EAD9] sm:text-4xl">
            Measured in years, hung on the wall
          </h2>
        </div>

        {/* rail */}
        <div className="relative">
          <div
            aria-hidden
            className="absolute left-0 right-0 top-0 h-px bg-gradient-to-r from-transparent via-[#C9A227]/80 to-transparent shadow-[0_0_10px_rgba(201,162,39,0.5)]"
          />

          <div className="grid grid-cols-1 gap-x-8 gap-y-24 pt-2 sm:grid-cols-2 lg:grid-cols-4">
            {stats.map((stat, i) => (
              <Plaque key={stat.label} stat={stat} index={i} visible={visible} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
