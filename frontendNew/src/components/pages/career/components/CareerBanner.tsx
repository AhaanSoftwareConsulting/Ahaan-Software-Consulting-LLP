export const CareerBanner: React.FC = () => {
  return (
    <section
      className="section-banner"
      style={{
        backgroundImage:
          'url("https://ahaanmedia.com/ahaanwebsite/Banner/Career.webp")',
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 z-[1] bg-black/20" />

      {/* Content */}
      <div className="relative z-10 mx-auto w-full px-4 lg:px-6 max-w-[1600px] flex justify-start">
        <div className="max-w-[900px]">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-white">
            Career Opportunities
          </h1>

          <p className="max-w-[700px]  text-sm  md:text-base lg:text-lg leading-relaxed text-gray-100">
            Build your future with Ahaan Software by joining a passionate team
            focused on innovation, creativity, and growth. Explore exciting
            career opportunities where your skills, ideas, and dedication can
            make a real impact in delivering cutting-edge digital solutions.
          </p>
        </div>
      </div>
    </section>
  );
};

