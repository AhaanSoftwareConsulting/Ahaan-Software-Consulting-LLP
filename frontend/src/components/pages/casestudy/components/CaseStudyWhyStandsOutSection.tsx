import { motion } from "framer-motion";

interface WhyStandsOutSectionProps {
  whyStandsOutText: string;
}

export const CaseStudyWhyStandsOutSection = ({
  whyStandsOutText,
}: WhyStandsOutSectionProps) => {
  if (!whyStandsOutText) return null;

  return (
    <section className="pb-20 pt-16">
      <div className="mx-auto max-w-[1400px] px-5 md:px-10 2xl:px-16">
        {/* Animated Gradient Card Wrapper */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          whileHover={{ scale: 1.01 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="relative overflow-hidden rounded-2xl p-[6px] shadow-lg transition-shadow duration-300 hover:shadow-2xl"
        >
          {/* Animated Moving Dynamic Gradient Border */}
          <motion.div
            animate={{
              rotate: [0, 360],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "linear",
            }}
            className="absolute -inset-[200%] z-0"
            style={{
              background: `conic-gradient(
                from 0deg,
                var(--theme-color),
                color-mix(in srgb, var(--theme-color) 40%, white),
                color-mix(in srgb, var(--theme-color) 70%, white),
                var(--theme-color)
              )`,
            }}
          />

          {/* Card Inner Content */}
          <div className="relative z-10 rounded-[10px] bg-white px-6 py-8 text-center md:px-12 xl:py-12">
            <motion.h2
              initial={{ opacity: 0, y: -10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="mb-5 heading-primary"
              style={{ color: "var(--theme-color)" }}
            >
              Why This Project Stands Out
            </motion.h2>

            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="mx-auto max-w-5xl text-sm leading-7 text-gray-600 xl:text-base xl:leading-8"
              dangerouslySetInnerHTML={{
                __html: whyStandsOutText,
              }}
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
};