import { motion, useScroll, useSpring } from "framer-motion";
import { useRef } from "react";

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

  /*
   * IMPORTANT:
   * The SVG path is intentionally routed through the EMPTY SPACES
   * between the content blocks.
   *
   * It should never cross the text/image content.
   */
  //  const snakePath = `
  //   M 220,20

  //   C 520,-40 820,-30 930,150
  //   C 1010,280 1000,470 900,590

  //   C 820,680 700,700 520,700
  //   C 350,700 190,700 105,800

  //   C 15,895 15,1110 135,1180
  //   C 190,1220 300,1220 800,1220

  //   C 900,1280 700,1220 900,1270
  //   C 985,1390 985,1540 900,1640

  //   C 820,1730 690,1760 510,1760
  //   C 340,1760 190,1770 105,1870

  //   C 35,1950 35,2120 110,2190
  //   C 200,2295 460,2245 820,2255

  //   C 680,2225 790,2240 850,2310
  // `;

const snakePath = `
    M 220,20

    C 520,-40 820,-30 930,150
    C 1010,280 1000,470 900,590

    C 820,680 700,700 520,700
    C 350,700 190,700 105,800

    C 35,885 35,1010 105,1080
    C 190,1150 350,1150 520,1150

    C 700,1150 830,1170 900,1270
    C 985,1390 985,1540 900,1640

    C 820,1730 690,1760 510,1760
    C 340,1760 190,1770 105,1870

    C 35,1950 35,2070 110,2140
    C 200,2225 350,2225 520,2225

    C 680,2225 790,2240 850,2310
  `;

  return (
    <section
      ref={containerRef}
      className="relative overflow-hidden bg-white py-20 md:py-32"
    >
      <div className="mx-auto max-w-[1280px] px-5 md:px-10 2xl:px-16">

        {/* ========================================================= */}
        {/* SECTION HEADER */}
        {/* ========================================================= */}

        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative z-20 mb-20 text-center"
        >
          <h2 className="text-3xl font-extrabold tracking-tight text-[#1c1d20] md:text-4xl xl:text-5xl">
            The Solutions Provided
          </h2>
        </motion.div>

        <div className="relative">

          {/* ========================================================= */}
          {/* DECORATIVE SNAKE LINE */}
          {/* ========================================================= */}

          <div
            className="
              pointer-events-none
              absolute
              inset-0
              z-0
              hidden
              lg:block
            "
          >
            <svg
              className="h-full w-full"
              viewBox="0 0 1000 2400"
              fill="none"
              preserveAspectRatio="none"
              aria-hidden="true"
            >
              {/* ===================================================== */}
              {/* STATIC LIGHT DASHED GUIDE */}
              {/* ===================================================== */}

              <path
                d={snakePath}
                stroke="#E2A52F"
                strokeWidth="5"
                strokeDasharray="10 10"
                strokeOpacity="0.20"
                strokeLinecap="round"
                fill="none"
              />

              {/* ===================================================== */}
              {/* ANIMATED DASHED LINE */}
              {/* ===================================================== */}

              <motion.path
                d={snakePath}
                stroke="#DCA32C"
                strokeWidth="5"
                strokeDasharray="10 10"
                strokeLinecap="round"
                fill="none"
                style={{
                  pathLength,
                }}
              />
            </svg>
          </div>

          {/* ========================================================= */}
          {/* SOLUTION CONTENT */}
          {/* ========================================================= */}

          <div
            className="
              relative
              z-10
              grid grid-cols-1
              gap-32
              md:gap-40
              xl:gap-52
            "
          >
            {solutions.map((solution, index) => {
              const isOdd = index % 2 === 1;

              return (
                <motion.div
                  key={index}
                  initial={{
                    opacity: 0,
                    y: 40,
                  }}
                  whileInView={{
                    opacity: 1,
                    y: 0,
                  }}
                  viewport={{
                    once: true,
                    margin: "-80px",
                  }}
                  transition={{
                    duration: 0.6,
                    delay: index * 0.1,
                  }}
                  className={`
                    relative
                    grid grid-cols-1
                    items-center
                  
                    gap-8 md:gap-12 xl:gap-20
                    md:grid-cols-2
                  `}
                >

                  {/* ================================================= */}
                  {/* IMAGE SECTION */}
                  {/* ================================================= */}

                  <div className={`
    relative z-20 justify-center items-center
    ${isOdd ? "md:col-start-2" : "md:col-start-1"}
  `}>

                    {solution.title && (
                      <h3
                        className="
                          relative
                          z-30
                          mb-4
                          flex
                          items-center
                          
                          gap-2
                          text-xl
                          font-extrabold
                          tracking-tight
                          text-[#1c1d20]
                          md:text-2xl
                          xl:text-3xl
                        "
                      >
                        <span>{solution.title}</span>
                      </h3>
                    )}

                    {solution.image && (
                      <motion.div
                        whileHover={{
                          scale: 1.02,
                          y: -6,
                        }}
                        transition={{
                          duration: 0.3,
                        }}
                        className="
                          relative
                          z-20
                          inline-block w-fit lg:w-md
                          overflow-hidden
                          rounded-2xl
                          border
                          border-gray-100
                          bg-white
                          p-3
                          shadow-[0_10px_30px_rgba(0,0,0,0.05)]
                          transition-all
                          duration-300
                          hover:shadow-[0_20px_40px_rgba(220,163,44,0.15)]
                        "
                      >
                        <img
                          src={solution.image}
                          alt={solution.title || "Solution"}
                          className=" relative
                            max-h-[300px]
                            w-full
                            max-w-full 
                            rounded-xl
                            object-contain
                            md:max-h-[320px]
                            lg:max-h-[400px]
                          "
                        />
                      </motion.div>
                    )}
                  </div>

                  {/* ================================================= */}
                  {/* TEXT SECTION */}
                  {/* ================================================= */}

                  <div
                    className={`
                      relative
                      z-30
                      w-full
                      rounded-2xl
                      bg-white
                      p-4                      
                      md:p-6
                      ${isOdd ? "md:col-start-1 md:row-start-1" : "md:col-start-2"}
                    `}
                  >
                    {solution.description && (
                      <div
                        className="
                          relative
                          z-30
                          text-base lg:text-center
                          leading-relaxed
                          text-[#555555]
                          md:text-lg
                          md:leading-8
                          xl:text-xl
                          xl:leading-9
                          [&_p]:mb-3
                        "
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