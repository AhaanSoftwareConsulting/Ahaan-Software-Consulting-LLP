import { useState, useEffect } from "react";
import { Play, XIcon } from "@phosphor-icons/react";
import TechOrbit from "./TechOrbit";

const SERVICES_DATA = [
  {
    id: "web-dev",
    titleMain: "Powerful & Scalable",
    titleHighlight: "Web-App Development ",
    subheading:
      "We build fast, secure, scalable, and fully customized web applications tailored to your business goals.",
    highlightColorClass: "text-sky-600",
  
  },
  {
    id: "web-design",
    titleMain: "Modern & Engaging",
    titleHighlight: "Web Design Experiences",
    subheading:
      "Modern, responsive, and user-focused website designs that deliver exceptional user experiences across all devices.",
    highlightColorClass: "text-rose-400",
  
  },
  {
    id: "ecommerce",
    titleMain: "Enterprise-Grade",
    titleHighlight: "E-Commerce Development",
    subheading:
      "End-to-end eCommerce solutions with secure payments, inventory management, and conversion-focused online stores.",
    highlightColorClass: "text-blue-400",
  
  },
  {
    id: "shopify",
    titleMain: "Conversion-Focused",
    titleHighlight: "Shopify Development",
    subheading:
      "High-converting Shopify stores with custom design, seamless integrations, and optimized shopping experiences.",
    highlightColorClass: "text-emerald-600",
  
  },
  {
    id: "wordpress",
    titleMain: "High-Performance",
    titleHighlight: "WordPress Development ",
    subheading:
      "Powerful WordPress websites with custom themes, plugins, optimized performance, and easy content management.",
    highlightColorClass: "text-cyan-600",
  
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
    <div className="relative w-full min-h-[600px] lg:min-h-[700px] flex items-center justify-center bg-slate-50/70 ">
      {/* Brand Golden Ambient Glows */}
      <div className="absolute  w-[400px] sm:w-[600px] h-[400px] sm:h-[600px] rounded-full bg-[#E5C473]/15 blur-[130px] pointer-events-none" />
      <div className="absolute  w-[450px] sm:w-[650px] h-[450px] sm:h-[650px] rounded-full bg-[#C5A85A]/10 blur-[150px] pointer-events-none" />

      {/* Constrained to max-w-[1600px] & Fully Responsive */}
      <div className="relative max-w-[1600px] mx-autow-full grid grid-cols-1 md:grid-cols-12 gap-4 lg:gap-4 xl:gap-8 items-center relative z-10 ">
        {/* Left Typography Column */}
        <div className="order-2 md:order-1 md:col-span-6 flex flex-col justify-center space-y-6 md:space-y-8 text-left px-4 sm:px-8 lg:pl-12 pb-12 lg:py-20">
          <h1 className="text-2xl sm:text-4xl xl:text-5xl font-black text-slate-900 tracking-tight leading-[1.1] min-h-[90px] sm:min-h-[120px] md:min-h-[140px]">
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
            className={`text-slate-600 text-base sm:text-lg md:text-xl font-normal leading-relaxed max-w-2xl transition-all duration-300 delay-70 ${
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

          {/* Premium Call to Actions */}
          <div className="flex flex-wrap items-center gap-4 sm:gap-8 pt-2">
            <button
              className="shine-btn relative  uppercase
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
                hover:to-[#D69D20]"
            >
              Schedule a Meeting
            </button>

            <button  onClick={handlePlayClick} className="flex items-center gap-3 text-slate-700 hover:text-slate-900 font-bold py-3 group transition-colors text-sm sm:text-base">

  <span className="relative flex items-center justify-center w-14 h-14">

    {/* Ripple 1 */}
    <span className="absolute inset-0 rounded-full bg-[#C5A85A]/50 animate-ripple"></span>

    {/* Ripple 2 */}
    <span className="absolute inset-0 rounded-full bg-[#C5A85A]/50 animate-ripple animation-delay-700"></span>

    {/* Button */}
    <span className="relative z-10 w-11 h-11 rounded-full bg-[#161616] border border-slate-200 shadow-lg flex items-center justify-center group-hover:scale-105 transition-all duration-300">

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

        {/* Right Dynamic Big Image/Illustration Column */}
        {/* Right Tech Orbit */}
        <div className="order-1 md:order-2 md:col-span-6 flex justify-center lg:justify-end ">
          <TechOrbit />
        </div>
{/* VIDEO MODAL */}
              {isModalOpen && (
                <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/75 p-4">
                  <div className="relative w-full max-w-[900px] rounded-lg">
                    {/* Close Button */}
                    <button
                      className="absolute -top-12 right-0 sm:top-2 sm:right-2 z-[10001] flex h-8 w-8 sm:h-10 sm:w-10 items-center justify-center rounded-full border-2 border-black bg-white/20 text-[#c8c8c8] hover:text-[#c07f1e] transition-colors"
                      onClick={handleCloseModal}
                    >
                      <XIcon className="text-lg sm:text-xl" />
                    </button>
      
                    {/* Video Element */}
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
