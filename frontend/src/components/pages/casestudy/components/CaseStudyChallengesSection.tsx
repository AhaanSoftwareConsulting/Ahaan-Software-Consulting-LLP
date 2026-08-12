interface ChallengesSectionProps {
  image?: string;
  challengesHtml?: string;
}

export const CaseStudyChallengesSection = ({
  image,
  challengesHtml,
}: ChallengesSectionProps) => {
  return (
    <section className="bg-white pb-16 md:pb-24">
      <div className="mx-auto grid max-w-[1400px] items-center gap-12 px-5 md:grid-cols-2 md:px-10 2xl:px-16">
        <div className="order-2 md:order-1">
          <h2 className="mb-4 text-2xl font-extrabold leading-tight text-[#1c1d20] lg:text-3xl xl:text-5xl">
            Challenges
          </h2>

          <div
            className="text-[16px] font-normal leading-[26px] tracking-normal text-[#333333] [&_li]:mb-1.5 [&_ol]:list-decimal [&_ol]:pl-5 [&_ul]:my-4 [&_ul]:list-disc [&_ul]:pl-5"
            dangerouslySetInnerHTML={{
              __html: challengesHtml || "",
            }}
          />
        </div>

        <div className="order-1 flex justify-center md:order-2">
          {image && (
            <img
              src={image}
              alt="Challenges"
              className="max-h-[430px] w-auto object-contain xl:max-h-[550px]"
            />
          )}
        </div>
      </div>
    </section>
  );
};