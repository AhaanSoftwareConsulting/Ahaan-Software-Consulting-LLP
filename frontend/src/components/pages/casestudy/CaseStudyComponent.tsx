import { SEO } from "../../seo/SEO";
import { CaseStudies } from "./components/CaseStudies";
import { CaseStudiesBanner } from "./components/CaseStudiesBanner";

export const CaseStudyComponent = () => {
  return (
    <div>
      <SEO
        title="Client Case Studies & Success Stories"
        description="Real-world case studies demonstrating our technical solutions and business impact."
        path="/case-study"
      />
      <CaseStudiesBanner />
      <CaseStudies />
    </div>
  );
};
