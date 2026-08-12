interface BusinessImpactSectionProps {
  image?: string;
  businessImpactHtml?: string;
}

export const CaseStudyBusinessImpactSection = ({
  image,
  businessImpactHtml,
}: BusinessImpactSectionProps) => {
  return (
    <section className="bg-[#F7F5F2] py-16 md:py-20">
      <div className="mx-auto grid max-w-[1400px] items-center gap-12 px-5 md:grid-cols-2 md:px-10 2xl:px-16">
        <div>
          {image && (
            <img
              src={image}
              alt="Business Impact"
              className="w-full rounded-xl object-contain"
            />
          )}
        </div>

        <div>
          <h2 className="mb-5 text-2xl font-extrabold leading-tight text-[#1c1d20] lg:text-3xl xl:text-5xl">
            Business Impact
          </h2>

          <div
            className="text-sm leading-7 text-gray-900 xl:text-base xl:leading-8 [&_li]:mb-2 [&_ul]:my-4 [&_ul]:list-disc [&_ul]:pl-5"
            dangerouslySetInnerHTML={{
              __html: businessImpactHtml || "",
            }}
          />
        </div>
      </div>
    </section>
  );
};