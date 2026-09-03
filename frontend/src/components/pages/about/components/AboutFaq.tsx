import { useEffect, useState } from "react";
import {
  getFAQBySlug,
  type WPFAQItem,
} from "../../../../api/WordpressAPI";

import faqImage from "../../../../assets/Faq.png";

interface FAQSectionProps {
  slug: string;
}

interface FAQ {
  question: string;
  answer: string;
}

export const AboutFaq = ({ slug }: FAQSectionProps) => {
  const [faqs, setFaqs] = useState<FAQ[]>([]);
  const [loading, setLoading] = useState(true);
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  useEffect(() => {
    const fetchFAQs = async () => {
      try {
        const data: WPFAQItem | null = await getFAQBySlug(slug);

        if (!data?.acf) {
          setFaqs([]);
          return;
        }

        const formattedFAQs: FAQ[] = [];

        for (let i = 1; i <= 10; i++) {
          const question =
            data.acf[`question_${i}` as keyof typeof data.acf];

          const answer =
            data.acf[`answer_${i}` as keyof typeof data.acf];

          if (
            typeof question === "string" &&
            typeof answer === "string" &&
            question.trim() &&
            answer.trim()
          ) {
            formattedFAQs.push({
              question,
              answer,
            });
          }
        }

        setFaqs(formattedFAQs);
      } catch (error) {
        console.error("About FAQ Error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchFAQs();
  }, [slug]);

  if (loading || faqs.length === 0) {
    return null;
  }

  return (
    <section className="relative overflow-hidden bg-[#faf9f6] py-16 lg:py-24">
      <div className="mx-auto max-w-[1400px] px-6">
        
        {/* Heading */}
        <div className="mx-auto mb-12 max-w-3xl text-center">
          <h2 className="heading-primary">
            Frequently Asked Questions
          </h2>

          <p className="mt-4 text-sm leading-relaxed text-zinc-600 sm:text-base lg:text-lg">
            Learn more about Ahaan, our team, our experience, and how we work
            with businesses to build reliable and long-term digital solutions.
          </p>
        </div>

        {/* FAQ Content */}
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-20">

          {/* Left FAQ */}
          <div className="space-y-3">
            {faqs.map((faq, index) => {
              const isOpen = openIndex === index;

              return (
                <div
                  key={index}
                  className="overflow-hidden border-b border-zinc-300"
                >
                  <button
                    onClick={() =>
                      setOpenIndex(isOpen ? null : index)
                    }
                    className="flex w-full items-center justify-between gap-6 py-5 text-left transition-all"
                  >
                    <span className="text-sm font-bold text-zinc-800 sm:text-base lg:text-lg">
                      {faq.question}
                    </span>

                    <span
                      className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-xl font-medium transition-all ${
                        isOpen
                          ? "bg-[#C48A18] text-white"
                          : "text-[#C48A18]"
                      }`}
                    >
                      {isOpen ? "−" : "+"}
                    </span>
                  </button>

                  {isOpen && (
                    <div className="pb-5 pr-12">
                      <p className="text-sm leading-relaxed text-zinc-600 sm:text-base">
                        {faq.answer}
                      </p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Right Image */}
          <div className="flex justify-center">
            <img
              src={faqImage}
              alt="About Ahaan - Frequently Asked Questions"
              className="w-full max-w-[800px] object-contain"
            />
          </div>

        </div>
      </div>
    </section>
  );
};