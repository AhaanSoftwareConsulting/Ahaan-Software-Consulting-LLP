import React from "react";

export const AboutBanner: React.FC = () => {
 

  return (
    <div className="w-full overflow-hidden bg-white">
      <section
        className="section-banner"
        style={{ backgroundImage: `url(https://ahaanmedia.com/ahaanwebsite/Banner/About-Us.webp)`}}
      >
        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-black/20 z-1" />

        {/* Banner Content Container */}
        <div className="relative z-10 mx-auto w-full px-4 lg:px-6 max-w-[1600px] flex justify-start">
          <div className="max-w-[900px] ">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-white">
              About Us
            </h1>
            <p className="max-w-[700px]  text-sm  md:text-base lg:text-lg leading-relaxed text-gray-100">
              Empowering businesses through innovation, creativity, and
              technology-driven transformation that accelerates growth, enhances
              efficiency, and builds long-term digital success.
            </p>
          </div>
        </div>
      </section>

      {/* ================= BELOW BANNER CONTENT ================= */}
     

      {/* Tailwind Custom Keyframes for Text Gradient */}
      <style>{`
        @keyframes gradientFlow {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
      `}</style>
    </div>
  );
};