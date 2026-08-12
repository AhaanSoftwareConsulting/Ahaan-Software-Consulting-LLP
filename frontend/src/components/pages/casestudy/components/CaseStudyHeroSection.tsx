import type { CaseStudy } from "../../../../types/caseStudies";

interface HeroSectionProps {
  caseStudy: CaseStudy;
  heroImage: string;
  mainDescription: string;
  industry: string;
  platform: string;
  servicesProvided: string;
}

export const CaseStudyHeroSection = ({
  caseStudy,
  heroImage,
  mainDescription,
  industry,
  platform,
  servicesProvided,
}: HeroSectionProps) => {
  return (
    <section className="relative min-h-[500px] overflow-hidden bg-black">
      {heroImage && (
        <img
          src={heroImage}
          alt={caseStudy.title.rendered}
          className="absolute inset-0 h-full w-full object-cover opacity-60"
        />
      )}

      <div className="absolute inset-0 bg-gradient-to-r from-black via-black/85 to-black/30" />

      <div className="relative z-10 mx-auto flex min-h-[500px] max-w-[1400px] items-center px-5 py-20 md:px-10 2xl:px-16">
        <div className="max-w-3xl xl:max-w-4xl">
          <h1 className="mb-5 text-4xl font-bold uppercase tracking-tight text-[#DCA32C] md:text-6xl xl:text-7xl">
            {caseStudy.title.rendered}
          </h1>

          {mainDescription && (
            <div
              className="max-w-2xl text-sm leading-6 text-white/80 xl:max-w-3xl xl:text-base [&_p]:mb-2"
              dangerouslySetInnerHTML={{
                __html: mainDescription,
              }}
            />
          )}

          <div className="mt-8 max-w-xl overflow-hidden rounded-lg border border-white/40 bg-black/40 backdrop-blur-sm xl:max-w-2xl">
            <div className="grid grid-cols-2">
              <div className="border-b border-r border-white/30 p-5 xl:p-6">
                <p className="mb-2 text-xs font-semibold text-[#DCA32C] xl:text-sm">
                  Industry
                </p>
                <p className="text-sm text-white xl:text-base">
                  {industry || "—"}
                </p>
              </div>

              <div className="border-b border-white/30 p-5 xl:p-6">
                <p className="mb-2 text-xs font-semibold text-[#DCA32C] xl:text-sm">
                  Platform
                </p>
                <p className="text-sm text-white xl:text-base">
                  {platform || "—"}
                </p>
              </div>

              <div className="col-span-2 p-5 xl:p-6">
                <p className="mb-2 text-xs font-semibold text-[#DCA32C] xl:text-sm">
                  Services Provided
                </p>
                <p className="text-sm leading-6 text-white xl:text-base">
                  {servicesProvided || "—"}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};