import { Routes, Route } from "react-router-dom";
import { MainLayout } from "../components/layouts/MainLayout";
import { HomeComponent } from "../components/pages/home/HomeComponent";
import { AboutComponent } from "../components/pages/about/AboutComponent";
import { ServiceComponent } from "../components/pages/service/ServiceComponent";
import { CareerComponent } from "../components/pages/career/CareerComponent";
import { CaseStudyComponent } from "../components/pages/casestudy/CaseStudyComponent";
import { ContactComponent } from "../components/pages/contact/ContactComponent";
import { PortfolioComponent } from "../components/pages/portfolio/PortfolioComponent";
import { BlogComponent } from "../components/pages/blog/BlogComponent";
import { SolutionComponent } from "../components/pages/solution/SolutionComponent";
import { EcommerceSolution } from "../components/pages/solution/components/EcommerceSolution";
import { Education } from "../components/pages/solution/components/Education";
import { Construction } from "../components/pages/solution/components/Construction";
import { HealthcareSolution } from "../components/pages/solution/components/HealthcareSolution";
import { Logistics } from "../components/pages/solution/components/Logistics";
import { Manufacturing } from "../components/pages/solution/components/Manufacturing";
import { MediaEntertainment } from "../components/pages/solution/components/MediaEntertainment";
import { RealEstate } from "../components/pages/solution/components/RealEstate";
import { SocialNetworking } from "../components/pages/solution/components/SocialNetworking";
import { TravelHospitality } from "../components/pages/solution/components/TravelHospitality";
import { CaseStudyDetails } from "../components/pages/casestudy/components/CaseStudyDetails";

export const AllRoutes = () => {
  return (
    <Routes>
      <Route element={<MainLayout />}>
      <Route path="/" element={<HomeComponent />} />
      <Route path="/about-us" element={<AboutComponent />} />
      <Route path="/service" element={<ServiceComponent />} />
      <Route path="/blog" element={<BlogComponent />} />
      <Route path="/portfolio" element={<PortfolioComponent/>} />
      <Route path="/solution" element={<SolutionComponent />} />
      <Route path="/solution/ecommerce" element={<EcommerceSolution/>} />
      <Route path="/solution/education" element={<Education/>} />
      <Route path="/solution/construction" element={<Construction/>} />
      <Route path="/solution/healthcare" element={<HealthcareSolution/>} />
      <Route path="/solution/logistics" element={<Logistics/>} />
      <Route path="/solution/manufacturing" element={<Manufacturing/>} />
      <Route path="/solution/media-entertainment" element={<MediaEntertainment/>} />
      <Route path="/solution/real-estate" element={<RealEstate/>} />
      <Route path="/solution/social-networking" element={<SocialNetworking/>} />
      <Route path="/solution/travel-hospitality" element={<TravelHospitality/>} />
      <Route path="/career" element={<CareerComponent />} />
      <Route path="/case-study" element={<CaseStudyComponent />} />
      <Route path="/contact-us" element={<ContactComponent />} />
       <Route path="/case-studies/:slug" element={<CaseStudyDetails />} />
      </Route>
    </Routes>
  );
};
