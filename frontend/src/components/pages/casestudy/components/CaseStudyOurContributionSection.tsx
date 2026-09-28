
interface OurContributionSectionProps {
  image?: string;
  contributionHtml?: string;
}

export const CaseStudyOurContributionSection = ({
  image,
  contributionHtml = "",
}: OurContributionSectionProps) => {
  // কন্টেন্ট এবং ইমেজ না থাকলে সেকশন হাইড থাকবে
  const hasContent = contributionHtml && contributionHtml.trim() !== "";
  if (!hasContent && !image) {
    return null;
  }

  return (
    <section 
      className="py-16 md:py-24"
      style={{ backgroundColor: "color-mix(in srgb, var(--theme-color) 4%, white)" }}
    >
      <div className="mx-auto grid max-w-[1400px] items-center gap-12 px-5 md:grid-cols-2 md:px-10 2xl:px-16">
        <div>
          <h2 className="mb-5 heading-primary">Our Contribution</h2>
          {hasContent && (
            <div
              className="lg:text-lg text-sm leading-relaxed text-gray-700 [&_p]:mb-4"
              dangerouslySetInnerHTML={{ __html: contributionHtml }}
            />
          )}
        </div>
        {image && (
          <div className="overflow-hidden rounded-2xl border border-gray-100 bg-white p-3 shadow-[0_10px_30px_rgba(0,0,0,0.08)] transition-all duration-300 hover:shadow-[0_15px_40px_rgba(0,0,0,0.12)]">
            <img
              src={image}
              alt="Our Contribution"
              className="w-full object-contain"
            />
          </div>
        )}
      </div>
    </section>
  );
};