import { useState, useEffect } from "react";
import { Play, XIcon } from "@phosphor-icons/react";
import ServiceBannerVisual from "./ServiceBannerVisual";
import webDevLaptop from "../../../../assets/web-dev.png";
import webDesignLaptop from "../../../../assets/web-design.png";
import shopifyLaptop from "../../../../assets/shopify-dev.png";
import ecommerceLaptop from "../../../../assets/ecommerce.png";
import wordpressLaptop from "../../../../assets/wordpress.png";

const SERVICES_DATA = [
  {
    id: "web-dev",
    titleMain: "Powerful & Scalable",
    titleHighlight: "Web-App Development ",
    subheading:
      "We build fast, secure, scalable, and fully customized web applications tailored to your business goals.",
    highlightColorClass: "text-sky-600",
    image: webDevLaptop,
    leftBadge: {
      title: "Performance",
      value: "99%",
    },
    rightBadge: {
      title: "Server Uptime",
      value: "99.99%",
    },
    techIcon: "https://ahaanmedia.com/ahaanwebsite/technology/React.webp",
  },
  {
    id: "web-design",
    titleMain: "Modern & Engaging",
    titleHighlight: "Web Design Experiences",
    subheading:
      "Modern, responsive, and user-focused website designs that deliver exceptional user experiences across all devices.",
    highlightColorClass: "text-rose-400",
    image: webDesignLaptop,
    leftBadge: {
      title: "Engagement",
      value: "+85%",
    },
    rightBadge: {
      title: "Responsive",
      value: "100%",
    },
    techIcon: "https://ahaanmedia.com/ahaanwebsite/technology/Figma.webp",
  },
  {
    id: "ecommerce",
    titleMain: "Enterprise-Grade",
    titleHighlight: "E-Commerce Development",
    subheading:
      "End-to-end eCommerce solutions with secure payments, inventory management, and conversion-focused online stores.",
    highlightColorClass: "text-blue-400",
    image: ecommerceLaptop,
    leftBadge: {
      title: "Sales Growth",
      value: "3.2x",
    },
    rightBadge: {
      title: "Checkout",
      value: "< 1.2s",
    },
    techIcon: "https://ahaanmedia.com/ahaanwebsite/technology/Next.webp",
  },
  {
    id: "shopify",
    titleMain: "Conversion-Focused",
    titleHighlight: "Shopify Theme Development",
    subheading:
      "High-converting Shopify stores with custom design, seamless integrations, and optimized shopping experiences.",
    highlightColorClass: "text-emerald-600",
    image: shopifyLaptop,
    leftBadge: {
      title: "Conversion",
      value: "4.8%",
    },
    rightBadge: {
      title: "Store Speed",
      value: "98/100",
    },
    techIcon: "https://ahaanmedia.com/ahaanwebsite/technology/Shopify.webp",
  },
  {
    id: "wordpress",
    titleMain: "High-Performance",
    titleHighlight: "WordPress Development ",
    subheading:
      "Powerful WordPress websites with custom themes, plugins, optimized performance, and easy content management.",
    highlightColorClass: "text-cyan-600",
    image: wordpressLaptop,
    leftBadge: {
      title: "SEO Score",
      value: "95+",
    },
    rightBadge: {
      title: "Page Speed",
      value: "0.8s",
    },
    techIcon: "https://ahaanmedia.com/ahaanwebsite/technology/Wordpress.webp",
  },
];

export function HomeBanner() {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const handlePlayClick = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsTransitioning(true);
      setTimeout(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % SERVICES_DATA.length);
        setIsTransitioning(false);
      }, 350);
    }, 4500);

    return () => clearInterval(interval);
  }, []);

  const currentService = SERVICES_DATA[currentIndex];

  return (
    <div className="relative w-full overflow-hidden flex items-center justify-center bg-gradient-to-r from-[#FAF6ED] via-[#F3F4FD] to-[#FFF6F0] py-4 sm:py-6 lg:py-8 min-h-[360px] lg:min-h-[400px]">
      {/* Background Floating Orbs & Vector Lines */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        {/* Soft Background Radial Blurs */}
        <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-96 h-96 bg-[#C5A85A]/15 rounded-full blur-3xl" />
        <div className="absolute top-1/3 right-1/4 w-[500px] h-[500px] bg-sky-200/30 rounded-full blur-3xl" />

        {/* Floating 3D Balls */}
        <div className="absolute top-10 left-[8%] w-6 h-6 rounded-full bg-gradient-to-tr from-amber-400 to-amber-200 shadow-md opacity-70 animate-pulse" />
        <div className="absolute bottom-12 left-[45%] w-8 h-8 rounded-full bg-gradient-to-tr from-sky-400 to-indigo-200 shadow-lg opacity-60 animate-bounce" />
        <div className="absolute top-12 right-[12%] w-10 h-10 rounded-full bg-gradient-to-br from-rose-300 to-amber-100 shadow-md opacity-50" />

        {/* Curved Orbit Lines */}
        <svg
          className="absolute inset-0 w-full h-full opacity-30"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M -100 250 Q 400 50 900 300 T 1900 100"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            className="text-slate-400"
            strokeDasharray="6 6"
          />
          <circle
            cx="40%"
            cy="35%"
            r="180"
            fill="none"
            stroke="currentColor"
            strokeWidth="1"
            className="text-slate-300"
          />
          <circle
            cx="75%"
            cy="50%"
            r="280"
            fill="none"
            stroke="currentColor"
            strokeWidth="1"
            className="text-amber-200"
          />
        </svg>
      </div>

      <div className="relative max-w-[1500px] mx-auto w-full grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 xl:gap-12 items-center z-10 px-4 sm:px-6 lg:px-8">
        {/* Left Typography Column */}
        <div className="order-2 md:order-1 flex flex-col justify-center space-y-6 xl:space-y-8 text-left">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-black text-slate-900 tracking-tight leading-[1.15] min-h-[85px] lg:min-h-[120px]">
            <span
              className={`block transition-all duration-300 transform ${
                isTransitioning
                  ? "opacity-0 translate-y-4 filter blur-sm"
                  : "opacity-100 translate-y-0 filter blur-none"
              }`}
            >
              {currentService.titleMain}
              <span
                className={`block mt-2 font-extrabold ${currentService.highlightColorClass}`}
              >
                {currentService.titleHighlight}
              </span>
            </span>
          </h1>

          <p
            className={`text-slate-600 lg:text-base xl:text-lg text-sm max-w-xl transition-all duration-300 delay-70 ${
              isTransitioning
                ? "opacity-0 -translate-y-1"
                : "opacity-100 translate-y-0"
            }`}
          >
            {currentService.subheading}
          </p>

          <p className="text-slate-400 font-medium text-xs sm:text-sm tracking-wide">
            Enterprise Solutions for{" "}
            <span className="text-slate-700 font-extrabold decoration-[#C5A85A] decoration-2 underline-offset-4">
              {currentService.titleHighlight}
            </span>
            .
          </p>

          <div className="flex flex-wrap items-center gap-4 sm:gap-6 pt-2">
            <a
              href="https://calendly.com/leads-ahaansoftware/free-consultation"
              target="_blank"
              rel="noreferrer"
              className="shine-btn relative uppercase bg-gradient-to-r from-[#C48A18] to-[#E6B33C] px-5 xl:px-6 py-3 xl:py-3.5 text-xs sm:text-sm font-semibold text-black shadow-lg transition-all duration-300 hover:-translate-y-0.5 hover:from-[#B57A0C] hover:to-[#D69D20]"
            >
              Schedule a Meeting
            </a>

            <button
              onClick={handlePlayClick}
              className="flex items-center gap-3 text-slate-700 hover:text-slate-900 font-bold py-3 group transition-colors text-sm sm:text-base"
            >
              <span className="relative flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14">
                <span className="absolute inset-0 rounded-full bg-[#C5A85A]/50 animate-ripple"></span>
                <span className="absolute inset-0 rounded-full bg-[#C5A85A]/50 animate-ripple animation-delay-700"></span>
                <span className="relative z-10 w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-[#161616] border border-slate-200 shadow-lg flex items-center justify-center group-hover:scale-105 transition-all duration-300">
                  <Play
                    size={16}
                    weight="fill"
                    className="text-[#C5A85A] ml-0.5"
                  />
                </span>
              </span>
            </button>
          </div>
        </div>

        {/* Right Laptop Visual Column */}
        <div className="order-1 md:order-2 flex justify-center lg:justify-end">
          <ServiceBannerVisual
            imageSrc={currentService.image}
            isTransitioning={isTransitioning}
            leftBadge={currentService.leftBadge}
            rightBadge={currentService.rightBadge}
            techIcon={currentService.techIcon}
          />
        </div>

        {/* Modal Section */}
        {isModalOpen && (
          <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/75 p-4">
            <div className="relative w-full max-w-[900px] rounded-lg">
              <button
                className="absolute -top-12 right-0 sm:top-2 sm:right-2 z-[10001] flex h-8 w-8 sm:h-10 sm:w-10 items-center justify-center rounded-full border-2 border-black bg-white/20 text-[#c8c8c8] hover:text-[#c07f1e] transition-colors"
                onClick={handleCloseModal}
              >
                <XIcon className="text-lg sm:text-xl" />
              </button>

              <div className="relative w-full overflow-hidden rounded-lg">
                <video className="w-full h-auto rounded-lg" controls autoPlay>
                  <source
                    src="https://ahaanmedia.com/ahaanwebsite/video/about-video.mp4"
                    type="video/mp4"
                  />
                  Your browser does not support the video tag.
                </video>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}