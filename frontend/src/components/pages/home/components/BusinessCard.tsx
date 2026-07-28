import { motion } from "framer-motion";

// Left, Middle, and Right images
const leftImages: string[] = [
  "https://ahaanmedia.com/ahaanwebsite/gallery/gallery1.webp", // Image 1
  "https://ahaanmedia.com/ahaanwebsite/gallery/gallery2.webp", // Image 2
];

const middleImages: string[] = [
  "https://ahaanmedia.com/ahaanwebsite/gallery/gallery3.webp", // Image 3
  "https://ahaanmedia.com/ahaanwebsite/gallery/gallery4.webp", // Image 4
];

const rightImages: string[] = [
  "https://ahaanmedia.com/ahaanwebsite/gallery/gallery5.webp", // Image 5
  "https://ahaanmedia.com/ahaanwebsite/gallery/gallery6.webp", // Image 6
];

const middleRightImages: string[] = [
  "https://ahaanmedia.com/ahaanwebsite/gallery/gallery7.webp", // Image 7
  "https://ahaanmedia.com/ahaanwebsite/gallery/gallery8.webp", // Image 8
];

// Reusable class strings -----------------------------------------------

// .side-image-card
const cardBase =
  "max-w-[130px] h-[150px] overflow-hidden rounded-md " +
  "shadow-[0_10px_20px_rgba(0,0,0,0.15),0_20px_40px_rgba(0,0,0,0.25),0_30px_60px_rgba(0,0,0,0.15)]";

// .image-column
const imageColumn = "flex flex-col gap-2.5 min-[501px]:max-[991px]:gap-[5px]";

// .first-column  -> hidden below 992px, opacity 80% between 992-1023px
const firstColumn =
  "relative bottom-[-100px] hidden min-[992px]:flex min-[992px]:max-[1023px]:opacity-80";

// .second-column -> hidden below 992px, opacity 90% between 992-1023px
const secondColumn =
  "relative top-[20px] hidden min-[992px]:flex min-[992px]:max-[1023px]:opacity-90";

// .third-column -> always visible
const thirdColumn = "relative top-[100px]";

// .fourth-column -> hidden 992-1023px and hidden below/at 500px
const fourthColumn =
  "relative top-[30px] block min-[992px]:max-[1023px]:hidden max-[500px]:hidden";

// .final-column -> always visible, top offset changes per breakpoint
const finalColumn =
  "relative top-[80px] min-[992px]:max-[1023px]:top-[40px] min-[501px]:max-[991px]:top-[20px]";

// .third-column-mobile / .final-column-mobile -> only visible at <=500px
const thirdColumnMobile = "relative top-[50px] min-[501px]:hidden";
const finalColumnMobile = "relative top-[70px] min-[501px]:hidden";

// Each column drops in from a different vertical origin with a rotation,
// creating a "gallery wall being hung" feel — columns further from center
// travel further and rotate more, and un-hang in reverse on scroll-up.
const dropVariants = (fromTop: boolean, distance = 90, rotate = 8) => ({
  hidden: { opacity: 0, y: fromTop ? -distance : distance, rotate: fromTop ? -rotate : rotate },
  visible: {
    opacity: 1,
    y: 0,
    rotate: 0,
    transition: { type: "spring", stiffness: 110, damping: 14, mass: 0.8 }as const,
  },
});

// The row itself is the single element that watches the viewport — its own
// layout position never moves, so its intersection state is stable. Columns
// below just read "hidden"/"visible" from this parent via variants
// propagation instead of each running their own whileInView observer
// (which was re-triggering mid-flight because their own y-transform kept
// crossing the visibility threshold, causing the flicker/jitter).
const rowContainerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.08, delayChildren: 0.05 }as const,
  },
};

const centerTextVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as const } },
};

export const BusinessCard = () => {
  return (
    <div
      className="pt-5"
      style={{
        background:
          "linear-gradient(180deg, #f1e7c6 0%, #E6E6E6 80%, #e6dbbb 100%)",
      }}
    >
      <div className="max-w-[1600px] mx-auto flex flex-col items-center">
        {/* --- Main image layout row --- */}
        <motion.div
          className={
            "flex items-start relative justify-center gap-2.5 min-h-[200px] " +
            "min-[992px]:max-[1023px]:min-h-[150px] " +
            "min-[501px]:max-[991px]:gap-2 min-[501px]:max-[991px]:min-h-[150px] " +
            "max-[500px]:gap-1.5 max-[500px]:min-h-[250px]"
          }
          variants={rowContainerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.2 }}
        >
          {/* --- Left Column (Images 1, 2) --- */}
          <motion.div
            className={`${imageColumn} ${firstColumn}`}
            variants={dropVariants(true, 110, 10)}
          >
            {leftImages.map((url, index) => (
              <div key={`L-${index}`} className={cardBase}>
                <img
                  src={url}
                  alt={`Left Image ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </motion.div>

          {/* --- Middle Column (Images 3, 4) --- */}
          <motion.div
            className={`${imageColumn} ${secondColumn}`}
            variants={dropVariants(false, 70, 6)}
          >
            {middleImages.map((url, index) => (
              <div key={`M-${index}`} className={cardBase}>
                <img
                  src={url}
                  alt={`Middle Image ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </motion.div>

          <motion.div
            className={`${cardBase} ${thirdColumn}`}
            variants={dropVariants(true, 60, 5)}
          >
            <img
              src="https://ahaanmedia.com/ahaanwebsite/gallery/gallery8.webp"
              alt="Single Image"
              className="w-full h-full object-cover"
            />
          </motion.div>

          <motion.div
            className={`${cardBase} ${fourthColumn}`}
            variants={dropVariants(false, 50, 4)}
          >
            <img
              src="https://ahaanmedia.com/ahaanwebsite/gallery/gallery10.webp"
              alt="Single Image"
              className="w-full h-full object-cover"
            />
          </motion.div>
          <motion.div
            className={`${cardBase} ${finalColumn}`}
            variants={dropVariants(true, 55, 5)}
          >
            <img
              src="https://ahaanmedia.com/ahaanwebsite/gallery/gallery9.webp"
              alt="Single Image"
              className="w-full h-full object-cover"
            />
          </motion.div>
          <motion.div
            className={`${cardBase} ${fourthColumn}`}
            variants={dropVariants(false, 50, 4)}
          >
            <img
              src="https://ahaanmedia.com/ahaanwebsite/gallery/gallery12.webp"
              alt="Single Image"
              className="w-full h-full object-cover"
            />
          </motion.div>
          <motion.div
            className={`${cardBase} ${thirdColumn}`}
            variants={dropVariants(true, 60, 5)}
          >
            <img
              src="https://ahaanmedia.com/ahaanwebsite/gallery/gallery11.webp"
              alt="Single Image"
              className="w-full h-full object-cover"
            />
          </motion.div>

          {/* --- Right Column (Images 5, 6) --- */}
          <motion.div
            className={`${imageColumn} ${secondColumn}`}
            variants={dropVariants(false, 70, 6)}
          >
            {rightImages.map((url, index) => (
              <div key={`R-${index}`} className={cardBase}>
                <img
                  src={url}
                  alt={`Right Image ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </motion.div>

          {/* --- Middle-Right Column (Images 7, 8) --- */}
          <motion.div
            className={`${imageColumn} ${firstColumn}`}
            variants={dropVariants(true, 110, 10)}
          >
            {middleRightImages.map((url, index) => (
              <div key={`MR-${index}`} className={cardBase}>
                <img
                  src={url}
                  alt={`Middle-Right Image ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </motion.div>
        </motion.div>

        {/* --- Central content --- */}
        <motion.div
          className={
            "relative -top-5 text-center max-w-[60%] " +
            "min-[992px]:max-[1023px]:top-0 min-[992px]:max-[1023px]:max-w-[40%] " +
            "min-[501px]:max-[991px]:top-[40px] " +
            "max-[500px]:top-[20px] max-[500px]:max-w-[80%]"
          }
          variants={centerTextVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.6 }}
        >
          <h2
            className="text-3xl sm:text-4xl font-extrabold text-[#161616] leading-tight"
          >
            Trusted by Businesses Worldwide
          </h2>
          <p
            className=
            "lg:text-base text-sm px-4 sm:px-8 mt-3 text-[#000] leading-7  mx-auto"
          >
            We aren't just another service provider. We act as a high-velocity extension of your core engine, combining modern workflows with precise tactical execution.
          </p>
        </motion.div>

        {/* --- Mobile-only image row --- */}
        <motion.div
          className="flex items-start relative justify-center gap-2.5 min-h-[200px]"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.4 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <div className={`${cardBase} ${thirdColumnMobile}`}>
            <img
              src="https://ahaanmedia.com/asc/gallery/gallery1.jpg"
              alt="Single Image"
              className="w-full h-full object-cover"
            />
          </div>
          <div className={`${cardBase} ${finalColumnMobile}`}>
            <img
              src="https://ahaanmedia.com/asc/gallery/gallery2.jpg"
              alt="Single Image"
              className="w-full h-full object-cover"
            />
          </div>
          <div className={`${cardBase} ${thirdColumnMobile}`}>
            <img
              src="https://ahaanmedia.com/asc/gallery/gallery3.jpg"
              alt="Single Image"
              className="w-full h-full object-cover"
            />
          </div>
        </motion.div>
      </div>

      {/* Animated gradient text - not expressible via plain Tailwind utilities */}
      <style>{`
        .gradient-title {
          background: linear-gradient(90deg, #000000, #cfa74a, #000000);
          background-size: 300%;
          -webkit-background-clip: text;
          background-clip: text;
          -webkit-text-fill-color: transparent;
          animation: gradientFlow 4s ease-in-out infinite;
        }
        @keyframes gradientFlow {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
      `}</style>
    </div>
  );
};
