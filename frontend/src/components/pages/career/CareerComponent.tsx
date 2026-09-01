import { SEO } from "../../seo/SEO";
import { CareerBanner } from "./components/CareerBanner";
import { CareerList } from "./components/CareerList";

export const CareerComponent = () => {
  return (
    <div>
      <SEO
        title="Careers & Open Positions"
        description="Join our growing software engineering and design team at Ahaan Software Consulting."
        path="/career"
      />
      <CareerBanner />
      <CareerList />
    </div>
  );
};
