interface TheResultSectionProps {
  image?: string;
  resultHtml?: string;
}

export const CaseStudyTheResultSection = ({
  image,
  resultHtml = "",
}: TheResultSectionProps) => {
  // যদি টেক্সট বা ইমেজ কিছুই না থাকে, তবে সেকশন রেন্ডার হবে না
  const hasContent = resultHtml && resultHtml.trim() !== "";
  if (!hasContent && !image) {
    return null;
  }

  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="mx-auto grid max-w-[1400px] items-center gap-12 px-5 md:grid-cols-2 md:px-10 2xl:px-16">
        {image && (
          <div className="overflow-hidden rounded-2xl border border-gray-100 bg-white p-3 shadow-[0_10px_30px_rgba(0,0,0,0.08)] transition-all duration-300 hover:shadow-[0_15px_40px_rgba(0,0,0,0.12)]">
            <img
              src={image}
              alt="The Result"
              className="w-full object-contain"
            />
          </div>
        )}
        <div>
          <h2 className="mb-5 heading-primary">The Result</h2>
          {hasContent && (
            <div
              className="lg:text-lg text-sm leading-relaxed text-gray-700 [&_p]:mb-4"
              dangerouslySetInnerHTML={{ __html: resultHtml }}
            />
          )}
        </div>
      </div>
    </section>
  );
};