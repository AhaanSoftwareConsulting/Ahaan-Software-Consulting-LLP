import { CheckCircleIcon } from "@phosphor-icons/react";
import { motion } from "framer-motion";

const features = [
  "Custom Website Development",
  "Business Web Applications",
  "Android & iOS App Development",
  "E-Commerce Solutions",
  "UI/UX Design",
  "SEO & Performance Optimization",
];

// Image panel reveals as a solid "curtain" slides away (rather than an
// animated clip-path, which conflicts with overflow-hidden + rounded
// corners on the same element in some browsers and can get stuck fully
// clipped). The curtain re-covers the image on scroll-up.
const curtainVariants = {
  hidden: { scaleX: 1 },
  visible: {
    scaleX: 0,
    transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] as const },
  },
};

const imageScaleVariants = {
  hidden: { scale: 1.15 },
  visible: {
    scale: 1,
    transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] as const },
  },
};

const headingVariants = {
  hidden: { opacity: 0, x: 60 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.7, ease: "easeOut" }as const },
};

const paraVariants = {
  hidden: { opacity: 0, x: 60 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.7, ease: "easeOut", delay: 0.12 }as const },
};

const featureListVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08, delayChildren: 0.3 }as const },
};

const featureItemVariants = {
  hidden: { opacity: 0, x: 24 },
  visible: { opacity: 1, x: 0, transition: { type: "spring", stiffness: 200, damping: 18 }as const },
};

const buttonVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, delay: 0.55, ease: "easeOut" }as const},
};

export const AboutCompany = () => {
  return (
    <section className="relative overflow-hidden bg-white pb-20 pt-28 lg:pb-24 lg:pt-36">
      {/* ================= Background Watermark ================= */}
      <motion.div
        className="pointer-events-none absolute inset-x-0 top-0 z-0 flex justify-center px-4"
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: false, amount: 0.4 }}
        transition={{ duration: 1, ease: "easeOut" }}
      >
        <h2
          className="select-none text-center font-black uppercase tracking-[0.08em] text-[#000000]"
          style={{
            fontSize: "clamp(52px, 8.9vw, 170px)",
            lineHeight: 0.9,
            WebkitMaskImage:
              "linear-gradient(to bottom, rgba(0,0,0,0.18) 0%, rgba(0,0,0,0.08) 60%, rgba(0,0,0,0) 100%)",
            maskImage:
              "linear-gradient(to bottom, rgba(0,0,0,0.18) 0%, rgba(0,0,0,0.08) 60%, rgba(0,0,0,0) 100%)",
          }}
        >
          AHAAN SOFTWARE
        </h2>
      </motion.div>

      {/* Left Ring */}
      <motion.div
        className="absolute -left-28 bottom-0 h-[280px] w-[280px] rounded-full border-[45px] border-[#D4AF37]/10"
        initial={{ rotate: -40, opacity: 0 }}
        whileInView={{ rotate: 0, opacity: 1 }}
        viewport={{ once: false, amount: 0.3 }}
        transition={{ duration: 1.1, ease: "easeOut" }}
      />

      {/* Gold Glow */}
      <div className="absolute left-0 top-1/2 h-60 w-60 -translate-y-1/2 rounded-full bg-[#D4AF37]/10 blur-[120px]" />

      <div className="relative z-10 mx-auto w-full max-w-[1600px] px-4 lg:px-6 2xl:px-10">
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-14">
          {/* ================= Image ================= */}
          <div className="relative">
            <div className="relative overflow-hidden rounded-[24px] shadow-xl">
              <motion.img
                src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=1200&q=80"
                alt="Ahaan Software"
                className="h-[420px] w-full object-cover hover:scale-105 lg:h-[520px]"
                variants={imageScaleVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: false, amount: 0.3 }}
                transition={{ duration: 0.7 }}
              />

              {/* Curtain overlay — covers the image, then slides out to reveal it */}
              <motion.div
                className="absolute inset-0 bg-[#1c1d20] origin-right"
                variants={curtainVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: false, amount: 0.3 }}
              />
            </div>

            {/* Glow */}
            <div className="absolute -bottom-8 -left-8 h-44 w-44 rounded-full bg-[#D4AF37]/20 blur-[100px]" />

            {/* Dot Pattern */}
            <motion.div
              className="absolute -right-6 bottom-8 grid grid-cols-6 gap-2"
              initial={{ opacity: 0, scale: 0.5 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: false, amount: 0.6 }}
              transition={{ duration: 0.5, delay: 0.4, type: "spring", stiffness: 180, damping: 14 }}
            >
              {[...Array(36)].map((_, i) => (
                <span
                  key={i}
                  className="h-1.5 w-1.5 rounded-full bg-[#D4AF37]"
                />
              ))}
            </motion.div>
          </div>

          {/* ================= Content ================= */}
          <div>
            <motion.h2
              className="relative z-20 heading-primary"
              variants={headingVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: false, amount: 0.5 }}
            >
              Your Trusted Partner In Software Development
            </motion.h2>

            <motion.p
              className="mt-3 lg:text-lg text-sm leading-relaxed"
              variants={paraVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: false, amount: 0.5 }}
            >
              <span className="font-semibold text-black">Ahaan Software</span>{" "}
              delivers innovative digital solutions that help businesses
              establish a strong online presence and accelerate growth.
              <br />
              We specialize in custom websites, scalable web applications,
              mobile apps, eCommerce platforms, UI/UX design, and business
              software. Our team combines creativity with cutting-edge
              technology to build secure, fast, and future-ready solutions
              tailored to your business goals.
            </motion.p>

            {/* Features */}
            <motion.div
              className="mt-8 grid gap-x-8 gap-y-5 md:grid-cols-2"
              variants={featureListVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: false, amount: 0.3 }}
            >
              {features.map((item) => (
                <motion.div key={item} variants={featureItemVariants} className="flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#D4AF37] text-white">
                    <CheckCircleIcon size={16} weight="bold" />
                  </div>

                  <span className="text-[15px] md:text-[15px] lg:text-[12px] xl:text-[15px] font-medium text-gray-800">
                    {item}
                  </span>
                </motion.div>
              ))}
            </motion.div>

            {/* Button */}
            <motion.a
              href="/about-us"
              className="shine-btn group mt-10 inline-flex items-center gap-3  bg-black px-7 py-3.5 text-[10px]
                sm:text-sm
                xl:text-base font-semibold text-white transition-all duration-300 hover:bg-[#D4AF37] hover:text-black"
              variants={buttonVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: false, amount: 0.7 }}
            >
              Explore More
            </motion.a>
          </div>
        </div>
      </div>

      {/* Bottom Right Dots */}
      <motion.div
        className="absolute bottom-20 right-12 hidden grid-cols-6 gap-2 md:grid"
        initial={{ opacity: 0, rotate: 15 }}
        whileInView={{ opacity: 1, rotate: 0 }}
        viewport={{ once: false, amount: 0.6 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        {[...Array(36)].map((_, i) => (
          <span key={i} className="h-1.5 w-1.5 rounded-full bg-[#D4AF37]" />
        ))}
      </motion.div>
    </section>
  );
};
