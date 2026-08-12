interface ProjectOverviewProps {
  image?: string;
  projectOverviewHtml?: string;
  buttonUrl: string;
  buttonText: string;
}

export const CaseStudyProjectOverviewSection = ({
  image,
  projectOverviewHtml,
  buttonUrl,
  buttonText,
}: ProjectOverviewProps) => {
  return (
    <section className="bg-white py-16 md:py-24">
      <div className="mx-auto grid max-w-[1400px] items-center gap-12 px-5 md:grid-cols-2 md:px-10 2xl:px-16">
        <div className="flex justify-center">
          {image && (
            <img
              src={image}
              alt="Project Overview"
              className="max-h-[320px] w-auto object-contain xl:max-h-[440px]"
            />
          )}
        </div>

        <div>
          <h2 className="mb-4 heading-primary">
            Project Overview
          </h2>
          <div
            className="text-[16px] font-normal leading-[26px] tracking-normal text-[#333333]"
            dangerouslySetInnerHTML={{
              __html: projectOverviewHtml || "",
            }}
          />

          {buttonUrl && buttonUrl !== "#" && (
            <a
              href={buttonUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="shine-btn mt-6 inline-flex items-center gap-2 rounded-full bg-[#DCA32C] px-6 py-3 text-sm font-semibold text-black transition hover:bg-[#c38e21] xl:px-8 xl:py-4 xl:text-base"
            >
              {buttonText}
            </a>
          )}
        </div>
      </div>
    </section>
  );
};