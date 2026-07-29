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
import { PolicyDetails } from "../components/pages/quicklinks/PolicyDetails";
import { CaseStudyDetails } from "../components/pages/casestudy/components/CaseStudyDetails";
import { BlogDetails } from "../components/pages/blog/components/BlogDetails";
import { SearchResults } from "../components/pages/blog/components/SearchResults";
import { CareerDetails } from "../components/pages/career/components/CareerDetails";
import { AllDevelopment } from "../components/pages/portfolio/components/AllDevelopment";
import { AllUiUxDesign } from "../components/pages/portfolio/components/AllUiUxDesign";
import SolutionDetails from "../components/pages/solution/components/SolutionDetails";

export const AllRoutes = () => {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<HomeComponent />} />
        <Route path="/about-us" element={<AboutComponent />} />
        <Route path="/service" element={<ServiceComponent />} />
        <Route path="/blog" element={<BlogComponent />} />
        <Route path="/portfolio" element={<PortfolioComponent />} />
        <Route path="/all-development" element={<AllDevelopment />} />
        <Route path="/all-design" element={<AllUiUxDesign />} />
        <Route path="/solution" element={<SolutionComponent />} />
        <Route path="/solution/:slug" element={<SolutionDetails />} />
        <Route path="/career" element={<CareerComponent />} />
        <Route path="/case-study" element={<CaseStudyComponent />} />
        <Route path="/contact-us" element={<ContactComponent />} />
        <Route path="/:slug" element={<PolicyDetails />} />
        <Route path="/case-studies/:slug" element={<CaseStudyDetails />} />
        <Route path="/blog/:slug" element={<BlogDetails />} />
        <Route path="/blog/search" element={<SearchResults />} />
        <Route path="/careers/:jobId" element={<CareerDetails />} />
      </Route>
    </Routes>
  );
};
