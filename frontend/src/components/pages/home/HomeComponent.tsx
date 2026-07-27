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

export const HomeComponent = () => {
  return (
    <div>
      <HomeBanner />
      <ServicesSection />
      <AboutCompany />
      <OurTechnology />
      <WhyChooseUs />
      <BusinessCard />
      <OurProcess />
      <CaseStudies />
      <Testimonials />
      <TotalProject />
      <OurClients />
    </div>
  );
};
