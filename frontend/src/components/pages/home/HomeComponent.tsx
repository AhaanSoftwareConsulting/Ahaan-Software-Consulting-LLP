import { BusinessCard } from "./components/BusinessCard";
import { CaseStudies } from "./components/CaseStudies";
import { OurClients } from "./components/OurClients";
import { OurProcess } from "./components/OurProcess";
import { OurTechnology } from "./components/OurTechnology";
import { ServicesSection } from "./components/ServiceSection";
import { TotalProject } from "./components/TotalProject";
import { WhyChooseUs } from "./components/WhyChooseUs";
import { HomeBanner } from "./components/HomeBanner";
import Testimonials from "./components/Testimonials";
import { AboutCompany } from "./components/AboutCompany";
import { Connection } from "./components/Connection";
import { SEO } from "../../seo/SEO";
 
export const HomeComponent = () => {
  return (
    <div>
      <SEO
        title="Custom Software Partner for U.S. SMBs"
        description="Design and build secure websites, apps, e-commerce platforms, and custom software with Ahaan's dedicated offshore team."
        path="/"
      />
      <HomeBanner />
      <ServicesSection />
      <AboutCompany />
      <Connection />
      <OurTechnology />
      <WhyChooseUs />
      <BusinessCard />
      <CaseStudies />
      <OurProcess />
      <Testimonials />
      <TotalProject />
      <OurClients />
    </div>
  );
};
