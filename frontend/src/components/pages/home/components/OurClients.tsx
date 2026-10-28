import { motion } from "framer-motion";

interface Client {
  id: number;
  src: string;
  alt: string;
}

const clients: Client[] = [
  {
    id: 1,
    src: "https://ahaanmedia.com/ahaanwebsite/clients/1.png",
    alt: "EKYAA",
  },
  {
    id: 2,
    src: "https://ahaanmedia.com/ahaanwebsite/clients/2.png",
    alt: "LOGIX",
  },
  {
    id: 3,
    src: "https://ahaanmedia.com/ahaanwebsite/clients/3.png",
    alt: "Fs",
  },
  {
    id: 4,
    src: "https://ahaanmedia.com/ahaanwebsite/clients/4.png",
    alt: "Helli",
  },
  {
    id: 5,
    src: "https://ahaanmedia.com/ahaanwebsite/clients/5.png",
    alt: "Jazzyln Nolen",
  },
  {
    id: 6,
    src: "https://ahaanmedia.com/ahaanwebsite/clients/6.png",
    alt: "NextDoor Urgent Care",
  },
  {
    id: 7,
    src: "https://ahaanmedia.com/ahaanwebsite/clients/8.png",
    alt: "Finanza Ally",
  },
  {
    id: 8,
    src: "https://ahaanmedia.com/ahaanwebsite/clients/7.png",
    alt: "Johat Enterprises",
  },
  {
    id: 9,
    src: "https://ahaanmedia.com/ahaanwebsite/clients/9.png",
    alt: "psitpops",
  },
  {
    id: 10,
    src: "https://ahaanmedia.com/ahaanwebsite/clients/10.png",
    alt: "johat trust",
  },
  {
    id: 11,
    src: "https://ahaanmedia.com/ahaanwebsite/clients/11.png",
    alt: "Orion Labs",
  },
  {
    id: 12,
    src: "https://ahaanmedia.com/ahaanwebsite/clients/12.png",
    alt: "Crestline Group",
  },
  {
    id: 13,
    src: "https://ahaanmedia.com/ahaanwebsite/clients/16.png",
    alt: "Crestline Group",
  },
  {
    id: 14,
    src: "https://ahaanmedia.com/ahaanwebsite/clients/14.png",
    alt: "Crestline Group",
  },
  {
    id: 15,
    src: "https://ahaanmedia.com/ahaanwebsite/clients/15.png",
    alt: "Crestline Group",
  },
];

const gridVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.05, delayChildren: 0.1 },
  },
};

const logoVariants = {
  hidden: { opacity: 0, scale: 0.8, filter: "blur(4px)", y: 12 },
  visible: {
    opacity: 1,
    scale: 1,
    filter: "blur(0px)",
    y: 0,
    transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] as const },
  },
};

export const OurClients = () => {
  return (
    <section className="bg-[#F3F2F0] py-16 lg:py-24">
      <div className="mx-auto max-w-[1600px] px-4 sm:px-6 lg:px-8 2xl:px-12">
        {/* Header */}
        <motion.div
          className="max-w-4xl mx-auto text-center px-4 mb-12 lg:mb-16"
          initial={{ opacity: 0, y: -24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.5 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <h2 className="heading-primary">Our Client's & Partners</h2>
          <p className="lg:text-lg text-sm px-0 sm:px-8 mt-3 leading-relaxed mx-auto text-gray-600">
            We partner with U.S. SMBs across industries, helping them turn their
            visions into reliable digital solutions that support their long-term
            business goals.
          </p>
        </motion.div>

        {/* Minimal Grid — 2nd Image Layout Style */}
        <motion.div
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-7 gap-x-8 gap-y-10 lg:gap-x-12 lg:gap-y-14 items-center justify-items-center"
          variants={gridVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.15 }}
        >
          {clients.map((client) => (
            <motion.div
              key={client.id}
              variants={logoVariants}
              className="group relative flex h-20 w-full items-center justify-center p-2 cursor-pointer"
            >
              <img
                src={client.src}
                alt={client.alt}
                className="max-h-16 max-w-[400px] w-auto h-auto object-contain grayscale opacity-60 contrast-125 transition-all duration-300 ease-out group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-105"
                loading="lazy"
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};