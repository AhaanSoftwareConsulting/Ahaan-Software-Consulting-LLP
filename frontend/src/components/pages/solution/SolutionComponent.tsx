import { SEO } from "../../seo/SEO";
import SolutionBanner from "./components/SolutionBanner";
import SolutionsGrid from "./components/SolutionsGrid";

export const SolutionComponent = () => {
  return (
    <>
      <SEO
        title="Industry Solutions & Tech Offerings"
        description="Dedicated software solutions tailored for healthcare, real estate, e-commerce, and logistics."
        path="/solution"
      />
      <SolutionBanner />
      <SolutionsGrid />
    </>
  );
};
