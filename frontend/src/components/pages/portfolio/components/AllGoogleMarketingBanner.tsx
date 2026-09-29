const AllGoogleMarketingBanner = () => {
  return (
    <section
      className="section-banner "
      style={{
        backgroundImage:
          'url("https://ahaanmedia.com/ahaanwebsite/Banner/Google_Marketing.png")',
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 z-[1] bg-black/70" />
      <div className="relative z-10 mx-auto w-full px-4 lg:px-6 max-w-[1600px] flex justify-start">
        <div className="max-w-[900px]">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-white">
            Google Marketing
          </h1>

          <p className="max-w-[700px]  text-sm  md:text-base lg:text-lg leading-relaxed text-gray-100">
            Under our Google marketing services, we cover strategic search
            campaigns, pay-per-click (PPC) optimization, keyword research,
            localized SEO, audience re-targeting, and detailed conversion
            tracking.
          </p>
        </div>
      </div>
    </section>
  );
};

export default AllGoogleMarketingBanner;
