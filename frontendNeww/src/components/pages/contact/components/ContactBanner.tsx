export const ContactBanner: React.FC = () => {
  return (
    <section
      className="section-banner"
      style={{
        backgroundImage:
          'url("https://ahaanmedia.com/ahaanwebsite/Banner/Contact.webp")',
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 z-[1] bg-black/20" />

      {/* Content */}
      <div className="relative z-10 mx-auto w-full px-4 lg:px-6 max-w-[1600px] flex justify-start">
        <div className="max-w-[900px]">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-white">
            Contact Us
          </h1>

          <p className="max-w-[700px]  text-sm  md:text-base lg:text-lg leading-relaxed text-gray-100">
            Let’s connect and discuss how we can help transform your business
            with innovative digital solutions, strategic insights, and tailored
            technology that drives measurable growth and long-term success.
          </p>
        </div>
      </div>
    </section>
  );
};
