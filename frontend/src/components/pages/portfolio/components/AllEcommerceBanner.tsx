const AllEcommerceBanner = () => {
  return (
    <section
      className="section-banner "
      style={{
        backgroundImage:
          'url("https://ahaanmedia.com/ahaanwebsite/Banner/Ecommerce.jpeg")',
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 z-[1] bg-black/70" />
      <div className="relative z-10 mx-auto w-full px-4 lg:px-6 max-w-[1600px] flex justify-start">
        <div className="max-w-[900px]">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-white">
            Ecommerce Projects
          </h1>

          <p className="max-w-[700px]  text-sm  md:text-base lg:text-lg leading-relaxed text-gray-100">
            Explore our ecommerce projects built to deliver seamless shopping
            experiences, powerful product management, secure payments, and
            scalable online stores that help businesses grow and increase sales.
          </p>
        </div>
      </div>
    </section>
  );
};

export default AllEcommerceBanner;
