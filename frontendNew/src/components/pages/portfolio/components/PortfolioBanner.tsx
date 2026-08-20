export default function PortfolioBanner() { 
  return (
    <section
      className=" section-banner"
      style={{
        backgroundImage:
          'url("https://ahaanmedia.com/ahaanwebsite/Banner/Portfolios.png")',
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 z-[1] bg-black/20" />
      <div className="relative z-10 mx-auto w-full px-4 lg:px-6 max-w-[1600px] flex justify-start">
        <div className="max-w-[900px]">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-white">
           Our Portfolio
          </h1>

          <p className="max-w-[700px]  text-sm  md:text-base lg:text-lg leading-relaxed text-gray-100">
            We create innovative digital solutions through web development, UI/UX design, branding, eCommerce, and custom software development. Our portfolio reflects creativity, technical expertise, and a commitment to delivering exceptional user experiences.
          </p>
        </div>
      </div>
    </section>
  );
};