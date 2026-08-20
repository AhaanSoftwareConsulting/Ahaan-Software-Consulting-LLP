import { CheckCircle } from "@phosphor-icons/react"; // বা 'phosphor-react'

interface ChallengesSectionProps {
  image?: string;
  challengesHtml?: string;
}

export const CaseStudyChallengesSection = ({
  image,
  challengesHtml = "",
}: ChallengesSectionProps) => {
  // HTML-কে DOMParser দিয়ে Parse করে React Elements এ রূপান্তর করার ফাংশন
  const parseHtmlContent = (html: string) => {
    if (typeof window === "undefined") return null;

    const parser = new DOMParser();
    const doc = parser.parseFromString(html, "text/html");
    const elements = Array.from(doc.body.childNodes);

    return elements.map((node, index) => {
      // যদি <ul> বা <ol> ট্যাগ হয়
      if (node.nodeName === "UL" || node.nodeName === "OL") {
        const listItems = Array.from((node as HTMLElement).querySelectorAll("li"));
        return (
          <ul key={index} className="my-4 space-y-4">
            {listItems.map((li, liIndex) => (
              <li key={liIndex} className="flex items-start gap-3">
                <CheckCircle
                  size={22}
                  color="var(--theme-color)"
                  weight="bold"
                  className="mt-1 shrink-0"
                />
                <div
                  className="leading-[26px] [&_p]:m-0"
                  dangerouslySetInnerHTML={{ __html: li.innerHTML }}
                />
              </li>
            ))}
          </ul>
        );
      }

      // সাধারণ প্যারাগ্রাফ বা হেডিং ট্যাগ
      if (node.nodeType === Node.ELEMENT_NODE) {
        return (
          <div
            key={index}
            dangerouslySetInnerHTML={{ __html: (node as HTMLElement).outerHTML }}
          />
        );
      }

      // Plain Text
      if (node.nodeType === Node.TEXT_NODE && node.textContent?.trim()) {
        return <p key={index}>{node.textContent}</p>;
      }

      return null;
    });
  };

  return (
    <section className="bg-white pb-16 md:pb-24">
      <div className="mx-auto grid max-w-[1400px] items-center gap-12 px-5 md:grid-cols-2 md:px-10 2xl:px-16">
        <div className="order-2 md:order-1">
          <h2 className="mb-4 heading-primary">
            Challenges
          </h2>

          <div className="lg:text-lg text-sm font-normal leading-relaxed tracking-normal">
            {parseHtmlContent(challengesHtml)}
          </div>
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