import { motion, useAnimationFrame } from "framer-motion";
import { useRef, useState } from "react";

interface Technology {
  name: string;
  image: string;
}

const technologies: Technology[] = [
  {
    name: "Figma",
    image: "https://ahaanmedia.com/ahaanwebsite/technology/Figma.webp",
  },
  {
    name: "Framer",
    image: "https://ahaanmedia.com/ahaanwebsite/technology/Framer.webp",
  },
  {
    name: "Photoshop",
    image: "https://ahaanmedia.com/ahaanwebsite/technology/Photoshop.webp",
  },
  {
    name: "Wix",
    image: "https://ahaanmedia.com/ahaanwebsite/technology/Wix.webp",
  },
  {
    name: "React JS",
    image: "https://ahaanmedia.com/ahaanwebsite/technology/React.webp",
  },
  {
    name: "Next JS",
    image: "https://ahaanmedia.com/ahaanwebsite/technology/Next.webp",
  },
  {
    name: "Node JS",
    image: "https://ahaanmedia.com/ahaanwebsite/technology/Node.webp",
  },
  {
    name: "MongoDB",
    image: "https://ahaanmedia.com/ahaanwebsite/technology/Mongodb.webp",
  },
  {
    name: "Python",
    image: "https://ahaanmedia.com/ahaanwebsite/technology/Python.webp",
  },
  {
    name: "MySQL",
    image: "https://ahaanmedia.com/ahaanwebsite/technology/Mysql.webp",
  },
  {
    name: "WordPress",
    image: "https://ahaanmedia.com/ahaanwebsite/technology/Wordpress.webp",
  },
  {
    name: "Shopify",
    image: "https://ahaanmedia.com/ahaanwebsite/technology/Shopify.webp",
  },
  {
    name: "Webflow",
    image: "https://ahaanmedia.com/ahaanwebsite/technology/Webflow.webp",
  },
  {
    name: "PHP",
    image: "https://ahaanmedia.com/ahaanwebsite/technology/Php.webp",
  },
  {
    name: "Odoo",
    image: "https://ahaanmedia.com/ahaanwebsite/technology/Odoo.webp",
  },
  {
    name: "Tailwind",
    image: "https://ahaanmedia.com/ahaanwebsite/technology/Tailwind.webp",
  },
  {
    name: "JavaScript",
    image: "https://ahaanmedia.com/ahaanwebsite/technology/JS.webp",
  },
  {
    name: "TypeScript",
    image: "https://ahaanmedia.com/ahaanwebsite/technology/TS.webp",
  },
];

const firstRow = technologies.slice(0, 9);
const secondRow = technologies.slice(9);

const TechnologyCard = ({ item }: { item: Technology }) => {
  return (
    <div
      className="
        group
        flex
        items-center
        gap-3
        px-5
        py-4
        bg-white
        border
        border-gray-200
        rounded-xl
        cursor-pointer
        transition-all
        duration-300
        hover:-translate-y-1
        hover:border-[#C48A18]
        hover:shadow-[0_20px_35px_-12px_rgba(196,138,24,0.22)]
        flex-shrink-0
        min-w-max
      "
    >
      <img
        src={item.image}
        alt={item.name}
        className="w-8 h-8 object-contain"
        draggable={false}
      />

      <span className="text-[16px] font-semibold whitespace-nowrap text-[#1F2937] transition-colors duration-300 group-hover:text-[#C48A18]">
        {item.name}
      </span>
    </div>
  );
};

const InfiniteMarquee = ({
  items,
  reverse = false,
}: {
  items: Technology[];
  reverse?: boolean;
}) => {
  const [offset, setOffset] = useState(0);
  const [paused, setPaused] = useState(false);

  const trackRef = useRef<HTMLDivElement>(null);

  useAnimationFrame(() => {
    if (paused) return;

    const track = trackRef.current;
    if (!track) return;

    const halfWidth = track.scrollWidth / 2;
    const speed = 0.6;

    setOffset((prev) => {
      if (!reverse) {
        const next = prev - speed;
        return next <= -halfWidth ? 0 : next;
      }

      const next = prev + speed;
      return next >= 0 ? -halfWidth : next;
    });
  });

  return (
    <div
      className="overflow-hidden w-full py-1 -my-3"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <motion.div
        ref={trackRef}
        style={{ x: offset }}
        className="flex gap-4 w-max"
      >
        {[...items, ...items].map((item, index) => (
          <TechnologyCard
            key={index}
            item={item}
          />
        ))}
      </motion.div>
    </div>
  );
};

// Each marquee row skews in from a different side with a slight tilt that
// settles flat — like two conveyor belts sliding into frame from opposite
// edges, then reversing back out as the section leaves the viewport.
const rowVariants = (reverse: boolean) => ({
  hidden: {
    opacity: 0,
    x: reverse ? 120 : -120,
    skewX: reverse ? 6 : -6,
  },
  visible: {
    opacity: 1,
    x: 0,
    skewX: 0,
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }as const,
  },
});

export const OurTechnology = () => {
  return (
    <section className="md:py-5 lg:py-15 bg-white overflow-hidden">
      <div className="max-w-[1600px] mx-auto">

        {/* Header */}
        <motion.div
          className="max-w-6xl mx-auto text-center px-4"
          initial={{ opacity: 0, filter: "blur(8px)", y: -20 }}
          whileInView={{ opacity: 1, filter: "blur(0px)", y: 0 }}
          viewport={{ once: false, amount: 0.5 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          <h2 className="text-2xl lg:text-3xl xl:text-4xl font-extrabold text-[#1c1d20] leading-tight">
            Our Technology Use
          </h2>

          <p className="lg:text-base text-sm px-0 sm:px-8 mt-3 text-[#00000] leading-relaxed  mx-auto">
            We leverage modern technologies to build secure, scalable, and
            future-ready digital solutions that streamline business operations,
            enhance user experiences, and help businesses innovate, grow, and
            achieve long-term success.
          </p>
        </motion.div>

        {/* Technology Marquee */}
        <div className="mt-16 mb-10 lg:mb-4 space-y-5">

          {/* First Row */}
          <motion.div
            variants={rowVariants(false)}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.4 }}
          >
            <InfiniteMarquee items={firstRow} />
          </motion.div>

          {/* Second Row */}
          <motion.div
            variants={rowVariants(true)}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.4 }}
          >
            <InfiniteMarquee items={secondRow} reverse />
          </motion.div>

        </div>
      </div>
    </section>
  );
};
