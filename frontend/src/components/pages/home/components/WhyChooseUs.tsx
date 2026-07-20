import React, { useState } from "react";
import {
  MagnifyingGlassPlus,
  ShieldCheck,
  UsersThree,
  SealCheck,
  type IconProps,
} from "@phosphor-icons/react";

type Reason = {
  id: string;
  index: string;
  title: string;
  tagline: string;
  description: string;
  Icon: React.ComponentType<IconProps>;
};

const REASONS: Reason[] = [
  {
    id: "values",
    index: "01",
    title: "Our Values",
    tagline: "Uncompromising Ethical Standards",
    description:
      "We deliver services with absolute integrity, accuracy, and objectivity. By honoring the dignity of labor and upholding strict accountability, we build relationships grounded in long-term credibility.",
    Icon: MagnifyingGlassPlus,
  },
  {
    id: "authenticity",
    index: "02",
    title: "Authenticity",
    tagline: "Allied with Brands We Believe In",
    description:
      "We explicitly partner with businesses whose vision matches our standards, ensuring genuine passion drives every milestone. True growth is born from transparency and transparent corporate alignment.",
    Icon: ShieldCheck,
  },
  {
    id: "talent",
    index: "03",
    title: "Top Talent",
    tagline: "A Collective Win-Win Mindset",
    description:
      "Our elite experts integrate directly into your operations, treating your ultimate goals exactly like our own metrics. We invest deeply in cultivation, mutual growth, and tangible impact.",
    Icon: UsersThree,
  },
  {
    id: "quality",
    index: "04",
    title: "Quality",
    tagline: "Pioneering Edgy Technologies",
    description:
      "We break past typical industry best practices by deploying proprietary platforms and custom workflows. Our teams iterate continuously to turn complex strategies into smooth execution.",
    Icon: SealCheck,
  },
];

export const WhyChooseUs: React.FC = () => {
  const [activeId, setActiveId] = useState<string>(REASONS[0].id);
  const activeReason = REASONS.find((r) => r.id === activeId) ?? REASONS[0];

  return (

    <section className="w-full bg-[#0A0A0A] text-[#F5F1E8] py-28 px-6 md:px-12 lg:px-20 overflow-hidden font-['Outfit']">
      <div className="mx-auto max-w-[1600px]">
        
        {/* TOP INTERACTIVE CONTROLLER / HEADER */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end pb-12 ">
          <div className="lg:col-span-6">
            <div className="flex items-center gap-3 mb-4">
              <span className="h-1 w-8 bg-[#CD912A]" />
              <span className="text-xs tracking-[0.4em] uppercase text-[#CD912A] font-semibold">
                Strategic Advantages
              </span>
            </div>
            <h2 className="font-['Fraunces'] text-4xl md:text-5xl lg:text-6xl font-normal tracking-tight leading-[1.1]">
              Engineered for <br />
              <span className="italic font-light text-[#CD912A]">Performance</span> & Trust.
            </h2>
          </div>
          
         

    <section className="w-full bg-[#0A0A0A] text-[#F5F1E8] py-20 lg:py-28 overflow-hidden font-['Outfit']">
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-10 xl:px-14">
        {/* TOP HEADER */}
        <div className="max-w-6xl mx-auto text-center pb-4">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#fff] leading-tight">
            Engineered for
            <span className=""> Performance</span> & Trust.
          </h2>

          <p className="mt-8 mx-auto text-[#8A8A8A] text-base lg:text-lg leading-8">
            We aren't just another service provider. We act as a high-velocity
            extension of your core engine, combining modern workflows with
            precise tactical execution.
          </p>
        </div>

        {/* PERSISTENT TAB STEP INDICATOR BAR */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 py-8">
          {REASONS.map((item) => {
            const isSelected = item.id === activeId;
            return (
              <button
                key={item.id}
                onClick={() => setActiveId(item.id)}
                className="group flex flex-col text-left pt-4 border-t-2 transition-all duration-500 outline-none"
                style={{
                  borderColor: isSelected
                    ? "#CD912A"
                    : "rgba(255,255,255,0.07)",
                }}
              >
                <span
                  className={`text-xs font-mono tracking-widest transition-colors duration-300 ${isSelected ? "text-[#CD912A]" : "text-white/30 group-hover:text-white/60"}`}
                >
                  {item.index}
                </span>
                <span
                  className={`text-base font-medium mt-1 transition-colors duration-300 ${isSelected ? "text-white" : "text-white/40 group-hover:text-white/80"}`}
                >
                  {item.title}
                </span>
              </button>
            );
          })}
        </div>

        {/* CORE SHOWCASE CANVAS */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 mt-6 items-center">
          {/* LEFT CONTENT COLUMN: DYNAMIC SPOTLIGHT */}
          <div className="lg:col-span-6 space-y-8 min-h-[340px] flex flex-col justify-center">
            <div
              key={activeReason.id}
              className="animate-[slideUp_0.6s_cubic-bezier(0.16,_1,_0.3,_1)] space-y-6"
            >
              <div className="inline-flex p-3 rounded-xl bg-white/[0.03] border border-white/10 text-[#CD912A]">
                <activeReason.Icon size={32} weight="duotone" />
              </div>

              <div>
                <h3 className="text-3xl sm:text-4xl font-extrabold text-[#fff] leading-tight">
                  {activeReason.tagline}
                </h3>
              </div>

              <p className="text-[#A3A3A3] text-base md:text-lg leading-relaxed max-w-xl">
                {activeReason.description}
              </p>

              <div className="pt-4">
                {/* <a
                  href="#contact"
                  className="inline-flex items-center gap-2 text-sm font-medium text-[#CD912A] hover:text-[#E5A93B] group transition-colors duration-300"
                >
                  Explore partnership model
                  <ArrowRight
                    size={16}
                    className="transform group-hover:translate-x-1.5 transition-transform duration-300"
                  />
                </a> */}
              </div>
            </div>
          </div>

          {/* RIGHT VIEWPORT COLUMN: BRUSHED PHOTO SHUTTER */}
          <div className="lg:col-span-6 relative w-full aspect-[4/3] md:aspect-[16/10] lg:aspect-[4/3] rounded-2xl overflow-hidden group/frame border border-white/5 bg-[#121212]">
            {/* Embedded Static Clean Corporate Visual */}
            <img
              src="https://ahaanmedia.com/ahaanwebsite/whychooseus/Why-choose-us.webp"
              alt="Strategic execution environment"
              className="h-full w-full object-cover grayscale opacity-40 mix-blend-luminosity scale-100 group-hover/frame:scale-105 transition-transform duration-700 ease-out"
            />

            {/* Dynamic Layout Tint Layer */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#0A0A0A] via-transparent to-[#0A0A0A]/20" />
            <div className="absolute inset-0 bg-[#CD912A]/5 mix-blend-overlay" />

            {/* Float Geometric Watermark Matrix */}
            <div className="absolute top-6 right-8 font-mono text-[9px] tracking-widest text-white/20 select-none uppercase pointer-events-none hidden sm:block">
              System Matrix Status // Operational_
            </div>

            {/* Giant Architectural Letter Background Stamp */}
            <div
              key={`letter-${activeReason.id}`}
              className="absolute -bottom-16 -left-8 font-['Fraunces'] font-bold text-[280px] leading-none text-white/[0.02] tracking-tighter pointer-events-none select-none animate-[scalePop_0.7s_cubic-bezier(0.16,_1,_0.3,_1)]"
            >
              {activeReason.title.charAt(0)}
            </div>
          </div>
        </div>
      </div>

      {/* Embedded Framework Animation System */}
      <style>{`
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes scalePop {
          from { opacity: 0; transform: scale(0.9) translateY(10px); }
          to { opacity: 1; transform: scale(1) translateY(0); }
        }
      `}</style>
    </section>
  );
};
