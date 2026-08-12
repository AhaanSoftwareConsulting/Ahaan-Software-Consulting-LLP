interface TechnologiesSectionProps {
  technologyHtml?: string;
  techLogos: string[];
}

export const CaseStudyTechnologiesSection = ({
  technologyHtml,
  techLogos,
}: TechnologiesSectionProps) => {
  return (
    <section className="bg-[#FFFCF5] pb-16 md:pb-24">
      <div className="mx-auto max-w-[1400px] px-5 md:px-10 2xl:px-16">
        <div className="relative pt-8">
          <div className="absolute left-1/2 top-0 z-10 -translate-x-1/2 whitespace-nowrap rounded-b-[16px] border border-t-0 border-[#E5B34F]/30 bg-[#FFFCF5] px-10 py-4 shadow-sm md:px-14 md:py-5 xl:px-16 xl:py-6">
            <h2 className="text-center heading-primary bg-gradient-to-b from-[#E5B34F] via-[#F3D382] to-[#C99128] bg-clip-text text-transparent">
  Technologies & Methodologies Used
</h2>
          </div>

          <div className="rounded-2xl bg-[#171717] px-6 pb-12 pt-16 md:px-12 md:pb-16 md:pt-24 xl:rounded-3xl xl:px-16 xl:pb-20 xl:pt-32">
            {technologyHtml ? (
              <div
                className="technology-editor flex min-h-[120px] flex-wrap items-center justify-center gap-6 md:gap-8 xl:gap-10 [&_img]:h-[130px] [&_img]:w-[130px] [&_img]:rounded-full [&_img]:bg-white [&_img]:p-6 [&_img]:object-contain [&_img]:shadow-md [&_img]:transition-transform [&_img]:duration-300 hover:[&_img]:scale-105 md:[&_img]:h-[120px] md:[&_img]:w-[120px] md:[&_img]:p-[28px]"
                dangerouslySetInnerHTML={{
                  __html: technologyHtml,
                }}
              />
            ) : (
              <div className="flex min-h-[120px] flex-wrap items-center justify-center gap-6 md:gap-8 xl:gap-10">
                {techLogos.map((logo, idx) => (
                  <div
                    key={idx}
                    className="flex h-[130px] w-[130px] items-center justify-center rounded-full bg-white p-6 shadow-md transition-transform duration-300 hover:scale-105 md:h-[120px] md:w-[120px] md:p-[28px]"
                  >
                    <img
                      src={logo}
                      alt={`Technology ${idx + 1}`}
                      className="h-full w-full object-contain"
                    />
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};