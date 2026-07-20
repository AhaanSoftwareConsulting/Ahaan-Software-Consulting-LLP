import { useEffect, useRef, useState } from "react";

// 1. Strongly typed data structures for safety
interface Step {
  num: string;
  phase: string;
  title: string;
  desc: string;
}

const steps: Step[] = [
  {
    num: "01",
    phase: "phase 01",
    title: "Discovery & Planning",
    desc: "Define goals, scope, audience & wireframe the full roadmap.",
  },
  {
    num: "02",
    phase: "phase 02",
    title: "Design & Prototyping",
    desc: "Craft UI/UX system & deliver interactive high-fidelity mockups.",
  },
  {
    num: "03",
    phase: "phase 03",
    title: "Development & Testing",
    desc: "Full-stack build, API integration & rigorous QA across all devices.",
  },
  {
    num: "04",
    phase: "phase 04",
    title: "Launch & Growth",
    desc: "Deploy to production, SEO setup & post-launch monitoring.",
  },
];

export const OurProcess = () => {
  const [visible, setVisible] = useState<number[]>([]);
  const [done, setDone] = useState<number[]>([]);
  const cellRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const observers = cellRefs.current.map((el, idx) => {
      if (!el) return null;
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setVisible((prev) => (prev.includes(idx) ? prev : [...prev, idx]));
            setDone((prev) => {
              const next = [...prev];
              for (let i = 0; i < idx; i++) {
                if (!next.includes(i)) next.push(i);
              }
              return next;
            });
          }
        },
        { threshold: 0.45 },
      );
      obs.observe(el);
      return obs;
    });
    return () => observers.forEach((o) => o && o.disconnect());
  }, []);

  return (

    <div className="bg-[#0a0800] overflow-hidden py-[50px]">
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8">
        

    <div className="bg-[#0A0A0A] overflow-hidden py-[50px]">
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-14">

        <div className="max-w-5xl mx-auto text-center pb-16">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#fff] leading-tight">
            Our Proven Development Process
          </h2>

          <p className="lg:text-base text-sm px-4 sm:px-8 mt-3 text-[#8A8A8A] leading-7  mx-auto">
            From strategy and planning to development, testing, and deployment,
            we follow a structured process that ensures every project is
            delivered with quality, efficiency, and measurable business results.
          </p>
        </div>

        {/* Divider */}
        <div className="border-t border-[#2a2200]" />
        {/* Process Responsive Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 border-t border-[#1e1800]">
          {steps.map((step, idx) => {
            const isVisible = visible.includes(idx);
            const isDone = done.includes(idx);

            return (
              <div
                key={idx}
                ref={(el) => {
                  cellRefs.current[idx] = el;
                }}
                className={`
                  relative overflow-hidden group border-b border-[#1e1800] p-[28px_28px_28px_0px]
                  flex items-start min-h-[130px] z-[1] transition-all duration-700 ease-out
                  ${idx % 2 === 0 ? "sm:border-r sm:border-[#1e1800]" : "sm:border-r-0"}
                  ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-[40px]"}
                `}
                style={{ transitionDelay: `${(idx % 2) * 0.15}s` }}
              >
                {/* Scale-X Background Slide on Hover */}
                <div className="absolute inset-0 bg-gradient-to-r from-[rgba(192,192,192,0.08)] to-[rgba(212,175,55,0.14)] origin-left scale-x-0 transition-transform duration-[1500ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-x-100 -z-[1]" />

                {/* Big Number Layer Container */}
                <div className="text-[72px] sm:text-[96px] font-bold leading-[0.85] tracking-[-0.02em] shrink-0 w-[82px] sm:w-[108px] text-right relative select-none font-serif">
                  {/* Base Layer */}
                  <span
                    className={`block transition-colors duration-500 ease-out ${isDone ? "text-[#352906]" : "text-[#352906] group-hover:text-[#d8c7a1]"}`}
                  >
                    {step.num}
                  </span>

                  {/* Stroke Layer */}
                  <span
                    className={`
                      absolute inset-0 flex items-start justify-end text-transparent transition-all duration-[600ms] ease-out
                      ${
                        isDone
                          ? "[webkit-text-stroke:2px_#d3d0ca]"
                          : "[webkit-text-stroke:2px_#beb9a5] group-hover:[webkit-text-stroke-color:#f5e8c8]"
                      }
                    `}
                  >
                    {step.num}
                  </span>

                  {/* Dynamic Color Clip Fill Layer */}
                  <span
                    style={{ color: "#1c1500" }}
                    className={`
                      absolute inset-0 flex items-start justify-end text-[72px] sm:text-[96px] font-bold leading-[0.85] tracking-[-0.02em] font-serif
                      ${
                        isDone
                          ? "text-[#d8c7a1] [clip-path:inset(0%_0_0_0)] transition-none"
                          : `text-[#443a1d] group-hover:text-[#f0d38a] transition-[clip-path,color] duration-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)] delay-200
                           ${isVisible ? "[clip-path:inset(0%_0_0_0)]" : "[clip-path:inset(100%_0_0_0)]"}`
                      }
                    `}
                  >
                    {step.num}
                  </span>
                </div>

                {/* Gold Separation Bar */}
                <div
                  className={`
                    w-[3px] shrink-0 self-stretch mx-[18px] origin-top transition-all duration-500 delay-[400ms]
                    ${
                      isDone
                        ? "bg-[#e8a820] opacity-100 scale-y-100"
                        : isVisible
                          ? "bg-[#c8a030] opacity-90 scale-y-100"
                          : "bg-[#c8a030] opacity-0 scale-y-0"
                    }
                  `}
                />

                {/* Content Segment */}
                <div className="pt-1 flex-1 font-['Outfit',sans-serif]">
                  {/* Phase Subtitle */}
                  <div
                    className={`
                      text-[9px] tracking-[0.22em] uppercase mb-1.5 transition-all duration-500 delay-500
                      ${isDone ? "text-[#c5a154]" : "text-[#c8a030]"}
                      ${isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-[10px]"}
                    `}
                  >
                    {step.phase}
                  </div>

                  {/* Step Title */}
                  <div
                    className={`
                      text-[15px] font-normal leading-[1.35] mb-1.5 tracking-[0.02em] transition-all duration-500 delay-[600ms]
                      ${isDone ? "text-white" : "text-[#f5edd8]"}
                      ${isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-[10px]"}
                    `}
                  >
                    {step.title}
                  </div>

                  {/* Description */}
                  <div
                    className={`
                      text-[11px] leading-[1.6] transition-opacity duration-500 delay-[750ms]
                      ${isDone ? "text-[#9a8050]" : "text-[#6a5a38]"}
                      ${isVisible ? "opacity-100" : "opacity-0"}
                    `}
                  >
                    {step.desc}
                  </div>
                </div>

                {/* Bottom Scanline Accent */}
                <div
                  className={`
                    absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#c8a030] to-transparent transition-opacity duration-[600ms] delay-[800ms]
                    ${isDone ? "opacity-50" : isVisible ? "opacity-25" : "opacity-0"}
                  `}
                />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
