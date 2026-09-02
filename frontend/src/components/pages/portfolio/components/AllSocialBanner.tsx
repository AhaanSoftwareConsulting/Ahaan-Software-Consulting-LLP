export default function AllSocialBanner() { 
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
            Social Media Marketing
          </h1>

          <p className="max-w-[700px] lg:text-lg text-sm leading-relaxed text-gray-100">
            A showcase of engaging and creative social media designs
          </p>
        </div>
      </div>
    </section>
  );
};