import React, { useState } from "react";
import { CheckCircleIcon, PlayCircleIcon } from "@phosphor-icons/react";
import { XIcon } from "@phosphor-icons/react";

export const AboutSection: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const handlePlayClick = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <section className="w-full bg-[#f8f9fa] py-10 sm:py-16 md:py-20 mt-[15em] sm:mt-0 font-['Outfit',sans-serif]">
      <div className="mx-auto w-full max-w-[1600px] px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 items-center gap-12 lg:gap-8">

          {/* LEFT COLUMN: IMAGES & PLAY BUTTON */}
          <div className="w-full max-w-[500px] lg:max-w-[600px] mx-auto text-center sm:text-left">
            <div className="relative w-full">
              {/* Main Image */}
              <div className="relative overflow-hidden rounded-xl mb-2 sm:mb-0">
                <img
                  src="https://ahaanmedia.com/ahaanwebsite/All/team1.webp"
                  alt="Team"
                  className="w-full sm:w-[60%] h-auto block rounded-tl-[70px] sm:rounded-tl-[85px] sm:rounded-tr-2xl sm:rounded-bl-2xl sm:rounded-br-2xl shadow-[0_8px_20px_rgba(0,0,0,0.15)] mx-auto sm:mx-0"
                />
              </div>

              {/* Overlapping Secondary Image */}
              <div className="relative sm:absolute sm:-bottom-8 sm:-right-2 w-[90%] sm:w-[50%] -mt-[140px] sm:mt-0 mx-auto sm:mx-0 z-0 sm:z-10 overflow-hidden rounded-2xl shadow-[0_5px_15px_rgba(0,0,0,0.2)]">
                <img
                  src="https://ahaanmedia.com/ahaanwebsite/All/team2.webp"
                  alt="Team Working"
                  className="w-full h-auto rounded-xl sm:rounded-br-[85px]"
                />
              </div>

              {/* Animated Play Button */}
              <div
                onClick={handlePlayClick}
                className="group relative sm:absolute top-[22%] left-[90%]
  -translate-x-1/2 -translate-y-1/2    p-4
  rounded-full border-2 border-black
  bg-white flex items-center justify-center
  cursor-pointer transition-all duration-300
  animate-[rotateBorder_2s_linear_infinite]
  hover:bg-[#c07f1e]
  "
              >

                <PlayCircleIcon weight="fill"
                  className="w-15 h-15 text-3xl transition-colors duration-300 text-[#c07f1e] group-hover:text-white"
                />

              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: TEXT CONTENT */}
          <div className="flex flex-col text-center lg:text-left">
            {/* Subtitle */}
            

            {/* Main Gradient Title */}
            <h2 className="heading-primary">
              Highly Tailored Technology, Develop & Support Services.
            </h2>

            {/* Description */}
            <p className="text-black text-sm sm:text-base mb-8 leading-relaxed">
              Accelerate innovation with world-class tech teams. We’ll match
              you to an entire remote team of incredible freelance talent for
              all your software development needs.
            </p>

            {/* Bullet List */}
            <ul className="mb-8 space-y-3 p-0 list-none text-left">
              <li className="flex items-center justify-center sm:justify-start text-black text-sm sm:text-base">
                <CheckCircleIcon className="text-[#c07f1e] text-lg mr-2.5 shrink-0" />
                <span>Website & Mobile application design & Development</span>
              </li>
              <li className="flex items-center justify-center sm:justify-start text-black text-sm sm:text-base">
                <CheckCircleIcon className="text-[#c07f1e] text-lg mr-2.5 shrink-0" />
                <span>Dramatically re-engineer value added IT systems via mission</span>
              </li>
              <li className="flex items-center justify-center sm:justify-start text-black text-sm sm:text-base">
                <CheckCircleIcon className="text-[#c07f1e] text-lg mr-2.5 shrink-0" />
                <span>Professional User Experience & Interface researching</span>
              </li>
            </ul>

            {/* Bottom Support Section */}
            <div className="mt-2 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 sm:gap-5">
              <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-3 text-center sm:text-left">
                <img
                  src="https://ahaanmedia.com/ahaanwebsite/All/blog-dp.webp"
                  alt="Support"
                  className="w-[45px] h-[45px] sm:w-[40px] sm:h-[40px] rounded-full object-cover p-1 bg-black"
                />
                <div>
                  <small className="text-black font-semibold block text-xs sm:text-sm">
                    Call to ask any question
                  </small>
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

      {/* Tailwind Keyframes Extensions */}
      <style>{`
        @keyframes rotateBorder {
          0% { transform: translate(-50%, -50%) rotate(0deg); }
          100% { transform: translate(-50%, -50%) rotate(360deg); }
        }
        @keyframes gradientFlow {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
      `}</style>
    </section>
  );
};