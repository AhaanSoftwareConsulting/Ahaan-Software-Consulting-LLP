const ServiceBanner: React.FC = () => {
  return (
    <section
      className="section-banner"
      style={{
        backgroundImage:
          'url("https://ahaanmedia.com/ahaanwebsite/Banner/Service.webp")',
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 z-[1] bg-black/20" />

      {/* Content */}
      <div className="relative z-10 mx-auto w-full px-4 lg:px-6 max-w-[1600px] flex justify-start">
        <div className="max-w-[900px]">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-white">
            Our Services
          </h1>

          <p className="max-w-[700px]  text-sm  md:text-base lg:text-lg leading-relaxed text-gray-100">
            We deliver innovative digital solutions including web development,
            UI/UX design, branding, and performance marketing to help your
            business grow faster and smarter in the digital world.
          </p>
        </div>
      </div>
    </section>
  );
};

export default ServiceBanner;