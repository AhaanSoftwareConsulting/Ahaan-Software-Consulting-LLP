import React from "react";

const SolutionBanner: React.FC = () => {
  return (
    <section
      className="section-banner"
      style={{
        backgroundImage: `url(https://ahaanmedia.com/ahaanwebsite/Banner/Solution.webp)`,
      }}
    >
      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/20 z-10" />

      {/* Banner Content */}
      <div className="relative z-10 mx-auto w-full px-4 lg:px-6 max-w-[1600px] flex justify-start">
        <div className="max-w-[900px]">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-white">
            Our Solutions
          </h1>

          <p className="max-w-[700px]  text-sm  md:text-base lg:text-lg leading-relaxed text-gray-100">
            Delivering scalable enterprise software solutions tailored to your
            industry needs, driving efficiency and sustainable growth.
          </p>
        </div>
      </div>
    </section>
  );
};

export default SolutionBanner;