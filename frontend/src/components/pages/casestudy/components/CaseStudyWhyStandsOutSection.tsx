interface WhyStandsOutSectionProps {
  whyStandsOutText: string;
}

export const CaseStudyWhyStandsOutSection = ({
  whyStandsOutText,
}: WhyStandsOutSectionProps) => {
  if (!whyStandsOutText) return null;

  return (
    <section className="pb-20 pt-16">
      <div className="mx-auto max-w-[1400px] px-5 md:px-10 2xl:px-16">
        <div className="rounded-xl border-2 border-[#DCA32C] bg-white px-6 py-8 text-center md:px-12 xl:py-12">
          <h2 className="mb-5 text-2xl font-extrabold leading-tight text-[#DCA32C] lg:text-3xl xl:text-5xl">
            Why This Project Stands Out
          </h2>

          <div
            className="mx-auto max-w-5xl text-sm leading-7 text-gray-600 xl:text-base xl:leading-8"
            dangerouslySetInnerHTML={{
              __html: whyStandsOutText,
            }}
          />
        </div>
      </div>
    </section>
  );
};