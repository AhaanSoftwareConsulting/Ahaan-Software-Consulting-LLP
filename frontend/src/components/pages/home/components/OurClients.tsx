import { motion } from "framer-motion";

interface Client {
  id: number;
  src: string;
  alt: string;
}

const clients: Client[] = [
  {
    id: 1,
    src: "https://ahaanmedia.com/ahaanwebsite/clients/1.webp",
    alt: "EKYAA",
  },
  {
    id: 2,
    src: "https://ahaanmedia.com/ahaanwebsite/clients/2.webp",
    alt: "LOGIX",
  },
  {
    id: 3,
    src: "https://ahaanmedia.com/ahaanwebsite/clients/3.webp",
    alt: "Fs",
  },
  {
    id: 4,
    src: "https://ahaanmedia.com/ahaanwebsite/clients/4.webp",
    alt: "Helli",
  },
  {
    id: 5,
    src: "https://ahaanmedia.com/ahaanwebsite/clients/5.webp",
    alt: "Jazzyln Nolen",
  },
  {
    id: 6,
    src: "https://ahaanmedia.com/ahaanwebsite/clients/6.webp",
    alt: "NextDoor Urgent Care",
  },
  {
    id: 7,
    src: "https://ahaanmedia.com/ahaanwebsite/clients/8.webp",
    alt: "Finanza Ally",
  },
  {
    id: 8,
    src: "https://ahaanmedia.com/ahaanwebsite/clients/7.webp",
    alt: "Johat Enterprises",
  },
  {
    id: 9,
    src: "https://ahaanmedia.com/ahaanwebsite/clients/9.webp",
    alt: "psitpops",
  },
  {
    id: 10,
    src: "https://ahaanmedia.com/ahaanwebsite/clients/10.jpg",
    alt: "johat trust",
  },
  {
    id: 11,
    src: "https://ahaanmedia.com/ahaanwebsite/clients/11.webp",
    alt: "Orion Labs",
  },
  {
    id: 12,
    src: "https://ahaanmedia.com/ahaanwebsite/clients/12.webp",
    alt: "Crestline Group",
  },
];

// Grid staggers in a diagonal wave (row + column offset combine into the
// delay), each logo popping up from a blur — like lights switching on
// across a wall in a diagonal sweep — and switching back off in reverse
// when scrolled up past the section.
const gridVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.06, delayChildren: 0.1 as const },
  },
};

const logoVariants = {
  hidden: { opacity: 0, scale: 0.6, filter: "blur(6px)", y: 18 },
  visible: {
    opacity: 1,
    scale: 1,
    filter: "blur(0px)",
    y: 0,
    transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] as const },
  },
};

export const OurClients = () => {
  return (
    <section className="bg-white py-16">
      <div className="mx-auto max-w-[1600px] px-6">
        {/* Simple Header */}
        <motion.div
          className="max-w-6xl mx-auto text-center px-4"
          initial={{ opacity: 0, y: -24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.5 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#1c1d20] leading-tight">
            Our Clients
          </h2>
          <p className="lg:text-base text-sm px-4 sm:px-8 mt-3 text-[#161616] leading-7  mx-auto mb-8">
            From strategy and planning to development, testing, and deployment,
            we follow a structured process that ensures every project is
            delivered with quality, efficiency, and measurable business results.
          </p>
        </motion.div>

        {/* Clean Logo Grid - 4 in a row */}
        <motion.div
          className="grid grid-cols-3 gap-2 lg:gap-4 md:grid-cols-6 items-center justify-items-center"
          variants={gridVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.15 }}
        >
          {clients.map((client) => (
            <motion.div
              key={client.id}
              variants={logoVariants}
              className="flex  w-full items-center justify-center rounded-md border border-gray-100 bg-white p-3 shadow-[0_2px_12px_rgba(0,0,0,0.06)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_8px_24px_rgba(0,0,0,0.12)]"
            >
              <img
                src={client.src}
                alt={client.alt}
                className="max-h-full max-w-full object-contain"
                loading="lazy"
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
