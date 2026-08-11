import { motion, useScroll, useSpring } from "framer-motion";
import { useRef } from "react";
import { CheckCircle, Lightbulb } from "@phosphor-icons/react";
import type { Solution } from "../../../../types/caseStudies";

interface SolutionsSectionProps {
  solutions: Solution[];
}

export const CaseStudySolutionsSection = ({
  solutions,
}: SolutionsSectionProps) => {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 60%", "end 85%"],
  });

  const pathLength = useSpring(scrollYProgress, {
    stiffness: 80,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <section
      ref={containerRef}
      className="relative overflow-hidden bg-white py-20 md:py-32"
    >
      <div className="mx-auto max-w-[1280px] px-5 md:px-10 2xl:px-16">
        {/* সেকশন হেডার */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-20 text-center"
        >
          <h2 className="text-3xl font-extrabold tracking-tight text-[#1c1d20] md:text-4xl xl:text-5xl">
            The Solutions Provided
          </h2>
        </motion.div>

        <div className="relative">
          {/* ========================================================= */}
          {/* SAFE OUTSIDE CURVED SNAKE PATH (ONLY THROUGH GAPS & MARGINS) */}
          {/* ========================================================= */}
          <div className="pointer-events-none absolute inset-0 hidden lg:block z-0">
            <svg
              className="h-full w-full"
              viewBox="0 0 1000 2400"
              fill="none"
              preserveAspectRatio="none"
            >
              {/* হালকা ব্যাকগ্রাউন্ড ট্রাক */}
              <path
                d="M 220,10 
                   C 800,-80 1020,180 960,380 
                   C 920,520 800,560 500,560 
                   C 200,560 40,600 40,780 
                   C 40,960 200,1020 500,1020 
                   C 800,1020 960,1080 960,1260 
                   C 960,1440 800,1500 500,1500 
                   C 200,1500 40,1560 40,1740 
                   C 40,1920 200,2000 500,2000"
                stroke="#E2A52F"
                strokeWidth="5"
                strokeDasharray="10 10"
                strokeOpacity="0.25"
                strokeLinecap="round"
              />

              {/* অ্যানিমেটেড ড্যাশড লাইন */}
              <motion.path
                d="M 220,10 
                   C 800,-80 1020,180 960,380 
                   C 920,520 800,560 500,560 
                   C 200,560 40,600 40,780 
                   C 40,960 200,1020 500,1020 
                   C 800,1020 960,1080 960,1260 
                   C 960,1440 800,1500 500,1500 
                   C 200,1500 40,1560 40,1740 
                   C 40,1920 200,2000 500,2000"
                stroke="#DCA32C"
                strokeWidth="5"
                strokeDasharray="10 10"
                strokeLinecap="round"
                style={{
                  pathLength: pathLength,
                }}
              />
            </svg>
          </div>

          {/* ========================================================= */}
          {/* SOLUTIONS CARDS LIST WITH MASKED BACKGROUNDS */}
          {/* ========================================================= */}
          <div className="relative z-10 flex flex-col gap-32 md:gap-40 xl:gap-52">
            {solutions.map((solution, index) => {
              const isOdd = index % 2 === 1;

              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className={`flex flex-col items-center gap-8 md:flex-row md:gap-12 xl:gap-20 ${
                    isOdd ? "md:flex-row-reverse" : ""
                  }`}
                >
                  {/* ইমেজ সেকশন */}
                  <div className="w-full md:w-1/2">
                    {solution.title && (
                      <h3 className="mb-4 flex items-center gap-2 text-xl font-extrabold tracking-tight text-[#1c1d20] md:text-2xl xl:text-3xl">
                        <span>{solution.title}</span>
                      </h3>
                    )}

                    {solution.image && (
                      <motion.div
                        whileHover={{ scale: 1.02, y: -6 }}
                        transition={{ duration: 0.3 }}
                        className="group relative inline-block overflow-hidden rounded-2xl border border-gray-100 bg-white p-3 shadow-[0_10px_30px_rgba(0,0,0,0.05)] hover:shadow-[0_20px_40px_rgba(220,163,44,0.15)] transition-all duration-300"
                      >
                        <img
                          src={solution.image}
                          alt={solution.title || "Solution"}
                          className="max-h-[300px] w-full max-w-full rounded-xl object-contain md:max-h-[320px] lg:max-h-[400px]"
                        />
                      </motion.div>
                    )}
                  </div>

                  {/* টেক্সট সেকশন (স্বচ্ছ ব্যাকগ্রাউন্ড যুক্ত করা হয়েছে যেন লাইন লেখার নিচে থাকে) */}
                  <div className="w-full md:w-1/2 rounded-2xl bg-white/90 p-4 md:p-6 backdrop-blur-[2px]">
                    {solution.description && (
                      <div
                        className="text-base leading-relaxed text-[#555555] md:text-lg md:leading-8 xl:text-xl xl:leading-9 [&_p]:mb-3"
                        dangerouslySetInnerHTML={{
                          __html: solution.description,
                        }}
                      />
                    )}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};