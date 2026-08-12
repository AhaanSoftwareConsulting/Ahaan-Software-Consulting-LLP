import { CheckCircle } from "@phosphor-icons/react"; // বা 'phosphor-react'

interface BusinessImpactSectionProps {
  image?: string;
  businessImpactHtml?: string;
}

export const CaseStudyBusinessImpactSection = ({
  image,
  businessImpactHtml = "",
}: BusinessImpactSectionProps) => {
  // HTML-কে Parse করে React এ রূপান্তর করার ফাংশন
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
                  className="leading-7 [&_p]:m-0"
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
    <section 
      className="py-16 md:py-20"
      style={{ backgroundColor: "color-mix(in srgb, var(--theme-color) 6%, white)" }}
    >
      <div className="mx-auto grid max-w-[1400px] items-center gap-12 px-5 md:grid-cols-2 md:px-10 2xl:px-16">
        <div className="overflow-hidden rounded-2xl border border-gray-100 bg-white p-3 shadow-[0_10px_30px_rgba(0,0,0,0.08)] transition-all duration-300 hover:shadow-[0_15px_40px_rgba(0,0,0,0.12)]">
          {image && (
            <img
              src={image}
              alt="Business Impact"
              className="w-full rounded-xl object-contain"
            />
          )}
        </div>

        <div>
          <h2 className="mb-5 heading-primary">Business Impact</h2>

          <div className="text-sm leading-7 text-gray-900 xl:text-base xl:leading-8">
            {parseHtmlContent(businessImpactHtml)}
          </div>
        </div>
      </div>
    </section>
  );
};