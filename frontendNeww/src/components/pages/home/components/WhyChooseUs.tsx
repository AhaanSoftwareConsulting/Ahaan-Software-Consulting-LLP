import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
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
  image: string;
  Icon: React.ComponentType<IconProps>;
};

const REASONS: Reason[] = [
  {
    id: "values",
    index: "01",
    title: "Our Values",
    tagline: "Our Values",
    description:
      "We deliver our services with integrity, accuracy, and objectivity, maintaining the highest standards of ethics, accountability, and professionalism. By respecting the dignity of labor and fostering trust, transparency, and continuous improvement, we strive for excellence and create lasting value for our clients and partners.",
    image:
      "https://ahaanmedia.com/ahaanwebsite/All/Our-values.png",
    Icon: MagnifyingGlassPlus,
  },
  {
    id: "authenticity",
    index: "02",
    title: "Authenticity",
    tagline: "Authenticity",
    description:
      "We partner with businesses we believe in, bringing passion, authenticity, and purpose to every collaboration. By building meaningful relationships based on trust and shared goals, we create lasting growth, sustainable value, and long-term success for our clients and partners.",
    image:
      "https://ahaanmedia.com/ahaanwebsite/All/Authenticity.png",
    Icon: ShieldCheck,
  },
  {
    id: "talent",
    index: "03",
    title: "Top Talent",
    tagline: "Top Talent",
    description:
      "Our experts build strong partnerships with a win-win mindset, treating every client's success as our own achievement. Through trust, collaboration, and shared goals, we create meaningful solutions that deliver impactful results, foster mutual growth, and drive sustainable long-term success.",
    image:
      "https://ahaanmedia.com/ahaanwebsite/All/Top-Talent.png",
    Icon: UsersThree,
  },
  {
    id: "quality",
    index: "04",
    title: "Quality",
    tagline: "Quality",
    description:
      "We leverage cutting-edge technologies, tools, and platforms to deliver innovative solutions and breakthrough results. Going beyond industry best practices, our experts continuously explore new ideas, embrace emerging technologies, and push boundaries to drive excellence, efficiency, and sustainable business growth.",
    image:
      "https://ahaanmedia.com/ahaanwebsite/All/Quality.png",
    Icon: SealCheck,
  },
];

// --- kept exactly as-is, still driving the tab rail's entrance ---
const tabListVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.15 } as const },
};

const tabItemVariants = {
  hidden: { opacity: 0, y: -20 },
  visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 180, damping: 16 } as const },
};

// The image panel reveals by scaling open from the top-left corner
// (rather than an animated clip-path, which conflicts with overflow-hidden
// + rounded corners on the same element in some browsers) — and shrinks
// back into the corner on scroll-up.
const panelVariants = {
  hidden: { scale: 0.3, opacity: 0, rotate: -3 },
  visible: {
    scale: 1,
    opacity: 1,
    rotate: 0,
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as const },
  },
};

const contentVariants = {
  hidden: { opacity: 0, x: -50 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: "easeOut", delay: 0.1 } as const },
};

// --- new variants for the icon/heading overlay and the sub-heading block below the image ---
const overlayVariants = {
  enter: { opacity: 0, x: 16, y: -6 },
  center: {
    opacity: 1,
    x: 0,
    y: 0,
    transition: { duration: 0.45, ease: [0.16, 1, 0.3, 1] as const, delay: 0.15 },
  },
  exit: { opacity: 0, x: 16, transition: { duration: 0.25 } as const },
};

const subheadingVariants = {
  enter: { opacity: 0, y: 18 },
  center: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] as const, delay: 0.1 },
  },
  exit: { opacity: 0, y: -12, transition: { duration: 0.25 } as const },
};

// New: each tab's inner content (number / icon / title) fades+lifts on select,
// on top of the shared tabItemVariants entrance.
const tabInnerVariants = {
  rest: { y: 0 },
  active: { y: -2, transition: { duration: 0.35, ease: [0.16, 1, 0.3, 1] as const } },
};

export const WhyChooseUs: React.FC = () => {
  const [activeId, setActiveId] = useState<string>(REASONS[0].id);
  const activeReason = REASONS.find((r) => r.id === activeId) ?? REASONS[0];

  return (
    <section className="w-full bg-[#0A0A0A] text-[#F5F1E8] py-10 sm:py-16 lg:py-28 overflow-hidden">
      <div className="max-w-[1600px] mx-auto px-4 lg:px-6 2xl:px-10">
        {/* TOP HEADER */}
        <motion.div
          className="max-w-6xl mx-auto text-center pb-4"
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.5 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          <h2 className="text-2xl lg:text-3xl xl:text-4xl font-extrabold text-[#fff] leading-tight">
            Engineered for
            <span className=""> Performance</span> & Trust.
          </h2>

          <p className="mt-4 sm:mt-8 mx-auto text-[#8A8A8A] lg:text-lg text-sm leading-relaxed">
            We aren't just another service provider. We act as a high-velocity
            extension of your core engine, combining modern workflows with
            precise tactical execution.
          </p>
        </motion.div>

        {/* CORE SHOWCASE CANVAS: tabs left, image right — items-stretch keeps both columns the SAME height as each other, driven by the image's aspect ratio */}
        <div className="grid grid-cols-12 gap-2 md:gap-4 lg:gap-6 mt-6 sm:mt-8 items-stretch">
          {/* LEFT: TAB RAIL — grid-rows-4 forces the 4 buttons to evenly divide whatever height this row resolves to (no gap, no overflow) */}
          <motion.div
            className="col-span-2 md:col-span-4 grid grid-cols-1 md:grid-rows-4 gap-2 md:gap-4 lg:gap-6"
            variants={tabListVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.4 }}
          >
           {REASONS.map((item) => {
  const isSelected = item.id === activeId;

  return (
    <motion.button
      key={item.id}
      variants={tabItemVariants}
      onClick={() => setActiveId(item.id)}
      className="group relative flex flex-col justify-between text-left rounded-md px-1 py-1 sm:px-5 sm:py-5 h-full overflow-hidden outline-none border-0 md:border transition-colors duration-500"
      style={{
        borderColor: isSelected
          ? "rgba(205,145,42,0.5)"
          : "rgba(255,255,255,0.06)",
      }}
    >
      {/* Shared-layout active background — desktop/tablet only */}
      {isSelected && (
        <motion.span
          layoutId="activeTabBg"
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          className="hidden md:block absolute inset-0 -z-10 bg-gradient-to-br from-[rgba(205,145,42,0.12)] to-[rgba(205,145,42,0.02)]"
        />
      )}

      {/* Number watermark — desktop only */}
      <span
        className={`hidden md:block absolute -bottom-3 -right-1 font-['Fraunces'] font-bold text-[64px] sm:text-[76px] leading-none select-none transition-colors duration-500 ${
          isSelected ? "text-[#CD912A]/10" : "text-white/[0.03]"
        }`}
      >
        {item.index}
      </span>

      <motion.div
        animate={isSelected ? "active" : "rest"}
        variants={tabInnerVariants}
        className="flex items-center justify-center md:justify-between"
      >
        {/* Rounded number/icon */}
        <span
          className={`flex items-center justify-center w-9 h-9 sm:w-10 sm:h-10 rounded-md border transition-colors duration-500 ${
            isSelected
              ? "bg-[#CD912A]/15 border-[#CD912A]/40 text-[#CD912A]"
              : "bg-white/[0.03] border-white/10 text-white/30 group-hover:text-white/60"
          }`}
        >
          <item.Icon
            size={16}
            weight={isSelected ? "duotone" : "regular"}
            className="hidden md:block"
          />

          <span
            className={`md:hidden text-[11px] font-mono tracking-widest ${
              isSelected ? "text-[#CD912A]" : "text-white/40"
            }`}
          >
            {item.index}
          </span>
        </span>

        {/* Desktop index */}
        <span
          className={`hidden md:block text-[10px] font-mono tracking-widest transition-colors duration-500 ${
            isSelected ? "text-[#CD912A]" : "text-white/25"
          }`}
        >
          {item.index}
        </span>
      </motion.div>

      {/* Title — desktop only */}
      <span
        className={`hidden md:block mt-4 sm:mt-6 text-sm sm:text-base font-medium transition-colors duration-500 ${
          isSelected
            ? "text-white"
            : "text-white/40 group-hover:text-white/75"
        }`}
      >
        {item.title}
      </span>

      {/* Bottom accent — desktop/tablet only */}
      {isSelected && (
        <motion.span
          layoutId="activeTabBar"
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          className="hidden md:block absolute bottom-0 left-0 h-[2px] w-full bg-[#CD912A]"
        />
      )}
    </motion.button>
  );
})}
          </motion.div>

          {/* RIGHT: IMAGE PANEL — flex flex-col + flex-1 image restores the height that the left column stretches to match */}
          <motion.div
            className="col-span-10 md:col-span-8 flex flex-col"
            variants={contentVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.4 }}
          >
            <motion.div
              className="relative w-full flex-1 aspect-[4/3] sm:aspect-[16/10] lg:aspect-auto lg:min-h-[360px] rounded-md overflow-hidden group/frame border border-white/5 bg-[#121212]"
              variants={panelVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: false, amount: 0.35 }}
            >
              {/* Image Switcher with Slide-up Animation */}
              <div className="absolute inset-0 w-full h-full overflow-hidden">
                <AnimatePresence mode="wait">
                  <motion.img
                    key={activeReason.id}
                    src={activeReason.image}
                    alt={activeReason.title}
                    initial={{ opacity: 0, y: 50, scale: 1.05 }}
                    animate={{
                      opacity: 0.4,
                      y: 0,
                      scale: 1,
                      transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] },
                    }}
                    exit={{
                      opacity: 0,
                      y: -50,
                      scale: 0.95,
                      transition: { duration: 0.4, ease: "easeInOut" },
                    }}
                    className="absolute inset-0 h-full w-full object-cover grayscale mix-blend-luminosity group-hover/frame:scale-105 transition-transform duration-700 ease-out"
                  />
                </AnimatePresence>
              </div>

              {/* Dynamic Layout Tint Layer */}
              <div className="absolute inset-0 bg-gradient-to-r from-[#0A0A0A] via-transparent to-[#0A0A0A]/20 pointer-events-none z-10" />
              <div className="absolute inset-0 bg-[#CD912A]/5 mix-blend-overlay pointer-events-none z-10" />

              {/* Icon + heading overlaid top-right (replaces the old System Matrix Status text) */}
              <div className="absolute top-3 right-3 sm:top-5 sm:right-5 z-20">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={`overlay-${activeReason.id}`}
                    variants={overlayVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    className="flex items-center gap-2 sm:gap-3 bg-black/40 backdrop-blur-sm border border-[#CD912A]/30 rounded-md p-1.5"
                  >
                    <span className="flex items-center justify-center w-6 h-6 sm:w-8 sm:h-8 rounded-md bg-[#CD912A]/15 shrink-0">
                      <activeReason.Icon
                        size={16}
                        weight="duotone"
                        className="text-[#CD912A]"
                      />
                    </span>
                    <span className="text-[11px] sm:text-sm font-medium tracking-[0.02em] text-white whitespace-nowrap">
                      {activeReason.title}
                    </span>
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Giant Architectural Letter Background Stamp */}
              <div className="absolute inset-0 pointer-events-none z-10 overflow-hidden rounded-md">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={`letter-${activeReason.id}`}
                    initial={{ opacity: 0, y: 100, scale: 0.9 }}
                    animate={{
                      opacity: 1,
                      y: 0,
                      scale: 1,
                      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.2 },
                    }}
                    exit={{
                      opacity: 0,
                      y: -50,
                      transition: { duration: 0.4, ease: "easeInOut" },
                    }}
                    className="absolute -bottom-16 -left-8 font-['Fraunces'] font-bold text-[140px] sm:text-[200px] lg:text-[280px] leading-none text-white/[0.06] tracking-tighter select-none"
                  >
                    {activeReason.title.charAt(0)}
                  </motion.div>
                </AnimatePresence>
                
              </div>
              
            </motion.div>
             <div className="pt-5 sm:pt-8 min-h-[80px] sm:min-h-[90px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={`copy-${activeReason.id}`}
              variants={subheadingVariants}
              initial="enter"
              animate="center"
              exit="exit"
            >
              <p className="text-[#A3A3A3] lg:text-lg text-sm leading-relaxed max-w-7xl">
                {activeReason.description}
              </p>
            </motion.div>
          </AnimatePresence>
        </div>
          </motion.div>
        </div>

        {/* SUB-HEADING + DESCRIPTION BELOW IMAGE — full width, outside the height-matched row so it never affects tab/image sizing */}
       
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
