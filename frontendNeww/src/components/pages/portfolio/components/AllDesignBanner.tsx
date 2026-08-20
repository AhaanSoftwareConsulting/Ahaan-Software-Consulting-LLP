export default function AllDesignBanner() { 
  return (
    <section
      className=" section-banner"
      style={{
        backgroundImage:
          'url("https://ahaanmedia.com/ahaanwebsite/Banner/Design.webp")',
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 z-[1] bg-black/20" />
      <div className="relative z-10 mx-auto w-full px-4 lg:px-6 max-w-[1600px] flex justify-start">
        <div className="max-w-[900px]">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-white">
            UI/UX Design Projects
          </h1>

          <p className="max-w-[700px]  text-sm  md:text-base lg:text-lg leading-relaxed text-gray-100">
            Explore our creative web design projects crafted with innovation,
            strategy, and modern technology to deliver impactful digital
            experiences that elevate brands and drive real business growth.
          </p>
        </div>
      </div>
    </section>
  );
};