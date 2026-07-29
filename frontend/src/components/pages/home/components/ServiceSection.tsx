import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";


interface Service {
    title: string;
    description: string;
    // Custom SVG component function
    Icon: React.FC<{ className?: string }>;
}

const services: Service[] = [
    {
        title: "Software Development",
        description:
            "Custom software solutions tailored to business needs, ensuring scalability, performance, and innovation for seamless digital transformation and growth.",
        Icon: ({ className }) => (
            <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2.5" y="4" width="19" height="15.6" rx="1.5" />
                <path d="M6.5 9.3l3.2 2.7-3.2 2.7" />
                <path d="M12.3 14.7h5.2" />
            </svg>
        ),
    },
    {
        title: "Web Development",
        description:
            "We build responsive, secure, and highly user-friendly websites tailored to your brand, enhancing online presence and driving sustainable business success.",
        Icon: ({ className }) => (
            <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
                <path d="M2.5 4h15.6a1 1 0 0 1 1 1v8.6a1 1 0 0 1-1 1H2.5a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1Z" />
                <path d="M7.2 14.6v2.6" />
                <path d="M12 14.6v2.6" />
                <path d="M5.3 18.1h8.4" />
                <g transform="translate(1.1, 0)">
                    <path d="M6.4 6.6L4.6 9l1.8 2.4" />
                    <path d="M10.3 6l-2 6" />
                    <path d="M12 6.6l1.8 2.4-1.8 2.6" />
                </g>
            </svg>
        ),
    },
    {
        title: "IT Business Consultancy",
        description:
            "Providing expert IT consulting to optimize operations, drive innovation, and align technology strategies with your business goals for maximum impact.",
        Icon: ({ className }) => (
            <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9.2 8.2V6.6a1.3 1.3 0 0 1 1.3-1.3h3a1.3 1.3 0 0 1 1.3 1.3v1.6" />
                <rect x="2.5" y="8.2" width="19" height="11.3" rx="1.5" />
                <path d="M2.5 13.2h19" />
                <path d="M6.2 16.2v-1.6" />
                <path d="M10.4 16.2v-3.4" />
                <path d="M14.6 16.2v-5.4" />
                <path d="M18.4 16.2v-2.4" />
            </svg>
        ),
    },
    {
        title: "UI & UX Design",
        description:
            "Crafting intuitive, engaging, and user-centered designs that enhance usability, improve user satisfaction, and elevate your brand's digital experience.",
        Icon: ({ className }) => (
            <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 3.2l9 5-9 5-9-5 9-5Z" />
                <path d="M3 12.2l9 5 9-5" />
                <path d="M3 16.2l9 5 9-5" />
            </svg>
        ),
    },
    {
        title: "Infrastructure Plan",
        description:
            "We provide the most responsive and functional IT design for companies and businesses worldwide.",
        Icon: ({ className }) => (
            <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
                <rect x="9" y="2.8" width="6" height="4" rx="1" />
                <rect x="2.5" y="15.2" width="6" height="4" rx="1" />
                <rect x="9" y="15.2" width="6" height="4" rx="1" />
                <rect x="15.5" y="15.2" width="6" height="4" rx="1" />
                <path d="M12 6.8v4.4" />
                <path d="M5.5 15.2v-2.4h13v2.4" />
                <path d="M12 12.8v2.4" />
            </svg>
        ),
    },
    {
        title: "IT Management",
        description:
            "It's possible to simultaneously manage and transform information from one server to another.",
        Icon: ({ className }) => (
            <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
                <rect x="5" y="4" width="14" height="17.6" rx="1.5" />
                <rect x="9" y="2.4" width="6" height="3" rx="1" />
                <path d="M8 10.8h8" />
                <path d="M8 14.2h8" />
                <path d="M8 17.6h5" />
            </svg>
        ),
    },
];

// Parent container drives the stagger — children reveal one after another
// and un-reveal in the same staggered order when scrolled back out of view.
const gridVariants = {
    hidden: {},
    visible: {
        transition: {
            staggerChildren: 0.12,
            delayChildren: 0.05,
        },
    },
};

// Alternate entrance direction per column so the grid doesn't feel uniform:
// even index cards drop in from above-left with a slight rotation,
// odd index cards rise in from below-right — a "shuffle into place" feel.
const cardVariants = (index: number) => {
    const fromLeft = index % 2 === 0;
    return {
        hidden: {
            opacity: 0,
            x: fromLeft ? -46 : 46,
            y: fromLeft ? -18 : 18,
            rotate: fromLeft ? -6 : 6,
            scale: 0.88,
        },
        visible: {
            opacity: 1,
            x: 0,
            y: 0,
            rotate: 0,
            scale: 1,
            transition: { type: "spring", stiffness: 120, damping: 16, mass: 0.7 }as const,
        },
    };
};

const iconVariants = {
    hidden: { opacity: 0, scale: 0.4, rotate: -25 },
    visible: {
        opacity: 1,
        scale: 1,
        rotate: 0,
        transition: { type: "spring", stiffness: 220, damping: 14, delay: 0.1 }as const,
    },
};

export const ServicesSection = () => {
    const sectionRef = useRef<HTMLElement | null>(null);
    const [inView, setInView] = useState(false);
    const [animGen, setAnimGen] = useState<number[]>(() => services.map(() => 0));

    useEffect(() => {
        const el = sectionRef.current;
        if (!el) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setInView(true);
                    observer.disconnect();
                }
            },
            { threshold: 0.15 }
        );

        observer.observe(el);
        return () => observer.disconnect();
    }, []);

    const replay = (index: number) => {
        setAnimGen((prev) => {
            const next = [...prev];
            next[index] = next[index] + 1;
            return next;
        });
    };

    return (
        <section ref={sectionRef} className="bg-[#ffffff] max-w-[1600px] mx-auto px-4 py-20 font-sans">
            <style>{`
        @keyframes drawStroke {
          to { stroke-dashoffset: 0; }
        }
        .svg-animate path, .svg-animate rect, .svg-animate circle, .svg-animate ellipse {
          stroke-dasharray: 70;
          stroke-dashoffset: 70;
        }
        .is-visible .svg-animate path,
        .is-visible .svg-animate rect,
        .is-visible .svg-animate circle,
        .is-visible .svg-animate ellipse {
          animation: drawStroke 1.8s cubic-bezier(0.4, 0, 0.2, 1) forwards;
        }
        @media (prefers-reduced-motion: reduce) {
          .svg-animate path, .svg-animate rect, .svg-animate circle, .svg-animate ellipse {
            stroke-dashoffset: 0 !important;
            animation: none !important;
          }
        }
      `}</style>

            <motion.div
                className="max-w-6xl mx-auto text-center mb-16"
                initial={{ opacity: 0, y: -24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, amount: 0.5 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
            >
                <h2 className="text-3xl sm:text-4xl font-extrabold text-[#1c1d20] leading-tight">
                    Our Core Services <br />
                </h2>
                <p className="lg:text-base text-sm px-4 sm:px-8 mt-2">
                    We are driven by a passion to deliver excellence through continuous
                    innovation and cutting-edge technology — creating intelligent,
                    scalable, and future-ready solutions that empower businesses,
                    transform industries, and inspire progress across the digital
                    landscape.
                </p>
            </motion.div>

            {/* 3 Columns Grid System */}
            <motion.div
                className="mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 lg:gap-6 px-0 lg:px-4"
                variants={gridVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: false, amount: 0.2 }}
            >
                {services.map(({ title, description, Icon }, index) => (
                    <motion.div
                        key={index}
                        variants={cardVariants(index)}
                        onMouseEnter={() => replay(index)}
                        className="group flex lg:gap-5 gap-2 items-start bg-transparent p-2 lg:p-4 rounded-xl transition-all duration-300 ease-out hover:bg-white hover:-translate-y-1 hover:shadow-[0_28px_40px_-14px_rgba(196,138,24,0.35)]"
                    >
                        {/* Custom Icon Container */}
                        <div className="flex-shrink-0 pt-1">
                            <motion.div
                                key={`${inView ? "in" : "out"}-${animGen[index]}`}
                                variants={iconVariants}
                                initial="hidden"
                                animate="visible"
                                className={`w-8 h-8 md:w-10 md:h-10 lg:w-14 lg:h-14 text-neutral-800 flex items-center justify-center transition-transform duration-300 group-hover:scale-105 ${inView ? "is-visible" : ""
                                    }`}
                            >
                                <Icon className="w-12 h-12 svg-animate group-hover:text-[#C48A18]" />
                            </motion.div>
                        </div>

                        {/* Typography Content */}
                        <div className="flex flex-col items-start text-left">
                            <h3 className="mb-2 text-sm lg:text-[21px] font-bold text-[#1c1d20] tracking-tight transition-colors duration-200 group-hover:text-[#C48A18]">
                                {title}
                            </h3>
                            <p className="text-xs lg:text-base leading-[1.65] text-gray-500 font-normal mb-3.5 max-w-[280px]">
                                {description}
                            </p>
                            <a
                                href="#"
                                className="text-[14px] font-bold text-[#C48A18] inline-flex items-center gap-1 transition-all duration-200 group-hover:gap-2 hover:underline"
                            >
                                Discover now <span className="text-[15px] font-normal">→</span>
                            </a>
                        </div>
                    </motion.div>
                ))}
            </motion.div>

            {/* Bottom Action Footer Buttons */}
            <motion.div
                className="mt-16 flex flex-col sm:flex-row items-center justify-center gap-4 px-4"
                initial={{ opacity: 0, scale: 0.85 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: false, amount: 0.7 }}
                transition={{ type: "spring", stiffness: 160, damping: 14 }}
            >
                <a 
                href="/contact-us"
                className="shine-btn relative overflow-hidden uppercase
                bg-gradient-to-r
                from-[#C48A18]
                to-[#E6B33C]
                px-5
                xl:px-6
                2xl:px-8
                py-3
                xl:py-3.5
                text-sm
                xl:text-base
                font-semibold
                text-black
                shadow-xl
                transition-all
                duration-300
                hover:-translate-y-0.5
                hover:from-[#B57A0C]
                hover:to-[#D69D20]">
                    Talk to a consultant
                </a>
                <a 
                href="https://calendly.com/leads-ahaansoftware/free-consultation"
                target="_blank" 
                className="shine-btn  w-full sm:w-auto px-7 py-3.5 text-[14px] font-bold text-[#C48A18] bg-transparent  border border-[#C48A18]/30 hover:border-[#C48A18] hover:bg-[#C48A18]/05 transition-all">
                    Schedule a Meeting
                </a>
            </motion.div>
        </section>
    );
};
