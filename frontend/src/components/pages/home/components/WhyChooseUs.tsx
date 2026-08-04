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
      "Our experts build strong partnerships with a win-win mindset, treating every client’s success as our own achievement. Through trust, collaboration, and shared goals, we create meaningful solutions that deliver impactful results, foster mutual growth, and drive sustainable long-term success.",
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

export const WhyChooseUs: React.FC = () => {
  const [activeId, setActiveId] = useState<string>(REASONS[0].id);
  const activeReason = REASONS.find((r) => r.id === activeId) ?? REASONS[0];

  return (
    <section className="w-full bg-[#0A0A0A] text-[#F5F1E8] py-20 lg:py-28 overflow-hidden font-['Outfit']">
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-10 xl:px-14">
        {/* TOP HEADER */}
        <motion.div
          className="max-w-6xl mx-auto text-center pb-4"
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.5 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#fff] leading-tight">
            Engineered for
            <span className=""> Performance</span> & Trust.
          </h2>

          <p className="mt-8 mx-auto text-[#8A8A8A] text-base lg:text-lg leading-8">
            We aren't just another service provider. We act as a high-velocity
            extension of your core engine, combining modern workflows with
            precise tactical execution.
          </p>
        </motion.div>

        {/* PERSISTENT TAB STEP INDICATOR BAR */}
        <motion.div
          className="grid grid-cols-2 md:grid-cols-4 gap-4 py-8"
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
              </motion.button>
            );
          })}
        </motion.div>

        {/* CORE SHOWCASE CANVAS */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 mt-6 items-center">
          {/* LEFT CONTENT COLUMN: DYNAMIC SPOTLIGHT */}
          <motion.div
            className="lg:col-span-6 space-y-8 min-h-[340px] flex flex-col justify-center"
            variants={contentVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.4 }}
          >
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
            </div>
          </motion.div>
          <motion.div
            className="lg:col-span-6 relative w-full aspect-[4/3] md:aspect-[16/10] lg:aspect-[4/3] rounded-2xl overflow-hidden group/frame border border-white/5 bg-[#121212]"
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
                    transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] }
                  }}
                  exit={{
                    opacity: 0,
                    y: -50,
                    scale: 0.95,
                    transition: { duration: 0.4, ease: "easeInOut" }
                  }}
                  className="absolute inset-0 h-full w-full object-cover grayscale mix-blend-luminosity group-hover/frame:scale-105 transition-transform duration-700 ease-out"
                />
              </AnimatePresence>
            </div>

            {/* Dynamic Layout Tint Layer */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#0A0A0A] via-transparent to-[#0A0A0A]/20 pointer-events-none z-10" />
            <div className="absolute inset-0 bg-[#CD912A]/5 mix-blend-overlay pointer-events-none z-10" />

            {/* Float Geometric Watermark Matrix */}
            <div className="absolute top-6 right-8 font-mono text-[9px] tracking-widest text-white/20 select-none uppercase pointer-events-none hidden sm:block z-20">
              System Matrix Status // Operational_
            </div>

            {/* Giant Architectural Letter Background Stamp */}
            <div className="absolute inset-0 pointer-events-none z-20 overflow-hidden rounded-2xl">
              <AnimatePresence mode="wait">
                <motion.div
                  key={`letter-${activeReason.id}`}
                  initial={{ opacity: 0, y: 100, scale: 0.9 }}
                  animate={{
                    opacity: 1,
                    y: 0,
                    scale: 1,
                    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.2 }
                  }}
                  exit={{
                    opacity: 0,
                    y: -50,
                    transition: { duration: 0.4, ease: "easeInOut" }
                  }}
                  className="absolute -bottom-16 -left-8 font-['Fraunces'] font-bold text-[280px] leading-none text-white/[0.06] tracking-tighter select-none"
                >
                  {activeReason.title.charAt(0)}
                </motion.div>
              </AnimatePresence>
            </div>
          </motion.div>
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
