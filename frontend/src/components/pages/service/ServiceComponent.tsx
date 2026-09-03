import Grid from "./components/ServiceGrid";
import ServiceBanner from "./components/ServiceBanner";
import { SEO } from "../../seo/SEO";
import { ServiceFaq } from "./components/ServiceFaq";

export const ServiceComponent = () => {
  return (
    <div>
      <SEO
        title="Software & Web Development Services"
        description="Explore custom web apps, UI/UX design, mobile apps, and e-commerce solutions tailored for growing businesses."
        path="/service"
      />
      <ServiceBanner />
      <Grid />
      <ServiceFaq slug="service-faq" />
    </div>
  );
};
