import React, { useState } from "react";
import { CheckCircleIcon, XIcon } from "@phosphor-icons/react";

export const AboutSection: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const handlePlayClick = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <section className="w-full bg-[#f8f9fa] py-12 sm:py-16 md:py-20 overflow-hidden">
      <div className="mx-auto w-full max-w-[1350px] px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 items-center gap-10 lg:gap-12">
          
          {/* LEFT COLUMN: IMAGES & ROTATING PLAY BUTTON */}
          <div className="lg:col-span-6 w-full max-w-[580px] mx-auto lg:max-w-none">
            <div className="relative w-full flex items-center justify-start pb-6 pt-10 sm:pt-14">
              
              {/* Main Image (Left) with White Border */}
              <div className="relative w-[58%] sm:w-[55%] rounded-tl-[65px] sm:rounded-tl-[85px] rounded-br-2xl rounded-tr-2xl rounded-bl-2xl shadow-xl z-10 border-4 sm:border-8 border-white bg-white">
                <img
                  src="https://ahaanmedia.com/ahaanwebsite/All/DevelopSupport.png"
                  alt="Development Support Team"
                  className="w-full h-[260px] sm:h-[360px] md:h-[400px] object-cover block rounded-tl-[55px] sm:rounded-tl-[75px] rounded-br-xl rounded-tr-xl rounded-bl-xl"
                />
              </div>

              {/* ROTATING PLAY BUTTON 
                  - Mobile/Tablet: Anchored over first image
                  - Desktop (lg:): Placed directly in the center gap between both images
              */}
              <div className="absolute -top-8 left-[80%] -translate-x-1/2 sm:-top-10 sm:left-[75%] lg:top-10 lg:left-[70%] z-30">
                <button
                  onClick={handlePlayClick}
                  type="button"
                  aria-label="Play Video"
                  className="group relative flex items-center justify-center cursor-pointer transition-transform duration-300 hover:scale-105 focus:outline-none"
                >
                  {/* Outer Rotating Dashed Ring */}
                  <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full border-2 border-dashed border-black bg-white shadow-lg animate-[spin_8s_linear_infinite]" />
                  
                  {/* Inner Gold Play Button (Stays Upright) */}
                  <div className="absolute inset-0 m-auto w-10 h-10 sm:w-13 sm:h-13 rounded-full bg-[#c07f1e] flex items-center justify-center shadow-md transition-colors duration-300 group-hover:bg-black">
                    <svg
                      className="w-5 h-5 sm:w-6 sm:h-6 text-white ml-0.5 transition-transform duration-300 group-hover:scale-110"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </div>
                </button>
              </div>

              {/* Overlapping Secondary Image (Right) with White Border */}
              <div className="relative -ml-[12%] sm:-ml-[14%] mt-[14%] w-[52%] sm:w-[48%] overflow-hidden rounded-br-[65px] sm:rounded-br-[85px] rounded-tl-2xl rounded-tr-2xl rounded-bl-2xl shadow-2xl z-20 border-4 sm:border-8 border-white bg-white">
                <img
                  src="https://ahaanmedia.com/ahaanwebsite/All/HighlyTailored.png"
                  alt="Tailored Solutions"
                  className="w-full h-[220px] sm:h-[300px] md:h-[340px] object-cover block"
                />
              </div>

            </div>
          </div>

          {/* RIGHT COLUMN: TEXT CONTENT */}
          <div className="lg:col-span-6 flex flex-col text-left space-y-4 sm:space-y-5">
            {/* Main Title */}
            <h2 className="heading-primary">
              Highly Tailored Technology, Develop & Support Services.
            </h2>

            {/* Description */}
            <p className="lg:text-lg text-sm leading-relaxed">
              Accelerate innovation with world-class tech teams. We’ll match
              you to an entire remote team of incredible freelance talent for
              all your software development needs.
            </p>

            {/* Bullet List */}
            <ul className="space-y-2.5 sm:space-y-3 pt-1 list-none text-left">
              <li className="flex items-start justify-start text-gray-800 text-sm sm:text-base">
                <CheckCircleIcon className="text-[#c07f1e] text-xl mt-0.5 mr-3 shrink-0" />
                <span>Website & Mobile application design & Development</span>
              </li>
              <li className="flex items-start justify-start text-gray-800 text-sm sm:text-base">
                <CheckCircleIcon className="text-[#c07f1e] text-xl mt-0.5 mr-3 shrink-0" />
                <span>Dramatically re-engineer value added IT systems via mission</span>
              </li>
              <li className="flex items-start justify-start text-gray-800 text-sm sm:text-base">
                <CheckCircleIcon className="text-[#c07f1e] text-xl mt-0.5 mr-3 shrink-0" />
                <span>Professional User Experience & Interface researching</span>
              </li>
            </ul>

            {/* Support Call Section */}
            <div className="pt-3 flex items-center justify-start">
              <div className="flex items-center gap-3.5">
                <img
                  src="https://ahaanmedia.com/ahaanwebsite/All/blog-dp.webp"
                  alt="Support Specialist"
                  className="w-11 h-11 sm:w-12 sm:h-12 rounded-full object-cover p-0.5 bg-black shrink-0"
                />
                <div className="flex flex-col">
                  <span className="text-gray-900 font-semibold text-xs sm:text-sm">
                    Call to ask any question
                  </span>
                  <a
                    href="tel:+91-983-037-1143"
                    className="font-bold text-[#c07f1e] text-base sm:text-lg hover:underline"
                  >
                    +91-983-037-1143
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* VIDEO MODAL */}
        {isModalOpen && (
          <div 
            className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
            onClick={handleCloseModal}
          >
            <div 
              className="relative w-full max-w-[850px] bg-black rounded-2xl overflow-hidden shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                className="absolute top-3 right-3 z-50 flex h-9 w-9 items-center justify-center rounded-full bg-black/60 text-white hover:bg-[#c07f1e] transition-colors"
                onClick={handleCloseModal}
                aria-label="Close modal"
              >
                <XIcon className="text-xl" />
              </button>

              {/* Video Element */}
              <div className="relative w-full aspect-video">
                <video className="w-full h-full object-cover" controls autoPlay>
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
    </section>
  );
};