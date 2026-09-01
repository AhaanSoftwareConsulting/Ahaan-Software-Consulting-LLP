import { SEO } from "../../seo/SEO";
import All from "./components/All";
import PortfolioBanner from "./components/PortfolioBanner";

export const PortfolioComponent = () => {
  return (
    <div>
      <SEO
        title="Our Work Portfolio & Case Highlights"
        description="Explore our client projects, UI/UX designs, mobile applications, and digital transformation solutions."
        path="/portfolio"
      />
      <PortfolioBanner />
      <All />
    </div>
  );
};
