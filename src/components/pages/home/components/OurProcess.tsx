import { motion } from "framer-motion";

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

// Each cell slides in from alternating left/right edges with the big number
// scaling up behind it — a "typewriter carriage return" feel across the
// grid. Runs in reverse (slides back out) when scrolled past going up.
const cellVariants = (fromLeft: boolean) => ({
  hidden: { opacity: 0, x: fromLeft ? -60 : 60 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.65, ease: [0.16, 1, 0.3, 1] as const },
  },
});

const numberVariants = {
  hidden: { opacity: 0, scale: 0.5, clipPath: "inset(100% 0 0 0)" },
  visible: {
    opacity: 1,
    scale: 1,
    clipPath: "inset(0% 0 0 0)",
    transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.1 } as const,
  },
};

const barVariants = {
  hidden: { scaleY: 0, opacity: 0 },
  visible: { scaleY: 1, opacity: 1, transition: { duration: 0.4, delay: 0.35 } as const },
};

const textGroupVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08, delayChildren: 0.4 }as const },
};

const textItemVariants = {
  hidden: { opacity: 0, x: -14 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.4, ease: "easeOut" }as const },
};

export const OurProcess = () => {
  return (
    <div className="bg-[#0A0A0A] overflow-hidden py-[50px]">
      <div className="max-w-[1600px] mx-auto px-4 lg:px-6 2xl:px-10">
        {/* Header */}
        <motion.div
          className="max-w-5xl mx-auto text-center pb-16"
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.5 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#fff] leading-tight">
            Our Proven Development Process
          </h2>

          <p className="lg:text-base text-sm px-4 sm:px-8 mt-3 text-[#8A8A8A] leading-7  mx-auto">
            From strategy and planning to development, testing, and deployment,
            we follow a structured process that ensures every project is
            delivered with quality, efficiency, and measurable business results.
          </p>
        </motion.div>

        {/* Divider */}
        <div className="border-t border-[#2a2200]" />
        {/* Process Responsive Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 border-t border-[#1e1800]">
          {steps.map((step, idx) => {
            const fromLeft = idx % 2 === 0;

            return (
              <motion.div
                key={idx}
                variants={cellVariants(fromLeft)}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: false, amount: 0.45 }}
                className={`
                  group relative overflow-hidden border-b border-[#1e1800] p-[28px_28px_28px_0px]
                  flex items-start min-h-[130px] z-[1]
                  ${idx % 2 === 0 ? "sm:border-r sm:border-[#1e1800]" : "sm:border-r-0"}
                `}
              >
                {/* Scale-X Background Slide on Hover */}
                <div className="absolute inset-0 bg-gradient-to-r from-[rgba(192,192,192,0.08)] to-[rgba(212,175,55,0.14)] origin-left scale-x-0 transition-transform duration-[1500ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-x-100 -z-[1]" />

                {/* Big Number Layer Container */}
                <motion.div
                  variants={numberVariants}
                  className="text-[72px] sm:text-[96px] font-bold leading-[0.85] tracking-[-0.02em] shrink-0 w-[82px] sm:w-[108px] text-right relative select-none font-serif"
                >
                  <span className="block text-[#352906] transition-colors duration-500 ease-out group-hover:text-[#d8c7a1]">
                    {step.num}
                  </span>

                  <span
                    className="absolute inset-0 flex items-start justify-end text-transparent transition-all duration-[600ms] ease-out [webkit-text-stroke:2px_#beb9a5] group-hover:[webkit-text-stroke-color:#f5e8c8]"
                  >
                    {step.num}
                  </span>
                </motion.div>

                {/* Gold Separation Bar */}
                <motion.div
                  variants={barVariants}
                  className="w-[3px] shrink-0 self-stretch mx-[18px] origin-top bg-[#c8a030]"
                />

                {/* Content Segment */}
                <motion.div
                  variants={textGroupVariants}
                  className="pt-1 flex-1 font-['Outfit',sans-serif]"
                >
                  {/* Phase Subtitle */}
                  <motion.div
                    variants={textItemVariants}
                    className="text-[9px] tracking-[0.22em] uppercase mb-1.5 text-[#c8a030]"
                  >
                    {step.phase}
                  </motion.div>

                  {/* Step Title */}
                  <motion.div
                    variants={textItemVariants}
                    className="text-[15px] font-normal leading-[1.35] mb-1.5 tracking-[0.02em] text-[#f5edd8]"
                  >
                    {step.title}
                  </motion.div>

                  {/* Description */}
                  <motion.div
                    variants={textItemVariants}
                    className="text-[11px] leading-[1.6] text-[#6a5a38]"
                  >
                    {step.desc}
                  </motion.div>
                </motion.div>

                {/* Bottom Scanline Accent */}
                <motion.div
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 0.25 }}
                  viewport={{ once: false, amount: 0.45 }}
                  transition={{ duration: 0.5, delay: 0.6 }}
                  className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#c8a030] to-transparent"
                />
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
