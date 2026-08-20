import { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";

import { MainLayout } from "../components/layouts/MainLayout";
import { PageLoader } from "../components/loader/PageLoader";

// Lazy loaded pages
const HomeComponent = lazy(() =>
  import("../components/pages/home/HomeComponent").then((module) => ({
    default: module.HomeComponent,
  })),
);

const AboutComponent = lazy(() =>
  import("../components/pages/about/AboutComponent").then((module) => ({
    default: module.AboutComponent,
  })),
);

const ServiceComponent = lazy(() =>
  import("../components/pages/service/ServiceComponent").then((module) => ({
    default: module.ServiceComponent,
  })),
);

const BlogComponent = lazy(() =>
  import("../components/pages/blog/BlogComponent").then((module) => ({
    default: module.BlogComponent,
  })),
);

const PortfolioComponent = lazy(() =>
  import("../components/pages/portfolio/PortfolioComponent").then((module) => ({
    default: module.PortfolioComponent,
  })),
);

const AllDevelopment = lazy(() =>
  import("../components/pages/portfolio/components/AllDevelopment").then(
    (module) => ({
      default: module.AllDevelopment,
    }),
  ),
);

const AllUiUxDesign = lazy(() =>
  import("../components/pages/portfolio/components/AllUiUxDesign").then(
    (module) => ({
      default: module.AllUiUxDesign,
    }),
  ),
);

const AllSocialMediaMarketing = lazy(() =>
  import("../components/pages/portfolio/components/AllSocialMediaMarketing").then(
    (module) => ({
      default: module.AllSocialMediaMarketing,
    }),
  ),
);

const AllAppDevelopment = lazy(() =>
  import("../components/pages/portfolio/components/AllAppDevelopment").then(
    (module) => ({
      default: module.AllAppDevelopment,
    }),
  ),
);

const SolutionComponent = lazy(() =>
  import("../components/pages/solution/SolutionComponent").then((module) => ({
    default: module.SolutionComponent,
  })),
);

// Default export
const SolutionDetails = lazy(
  () => import("../components/pages/solution/components/SolutionDetails"),
);

const CareerComponent = lazy(() =>
  import("../components/pages/career/CareerComponent").then((module) => ({
    default: module.CareerComponent,
  })),
);

const CaseStudyComponent = lazy(() =>
  import("../components/pages/casestudy/CaseStudyComponent").then((module) => ({
    default: module.CaseStudyComponent,
  })),
);

const ContactComponent = lazy(() =>
  import("../components/pages/contact/ContactComponent").then((module) => ({
    default: module.ContactComponent,
  })),
);

const PolicyDetails = lazy(() =>
  import("../components/pages/quicklinks/PolicyDetails").then((module) => ({
    default: module.PolicyDetails,
  })),
);

const CaseStudyDetails = lazy(() =>
  import("../components/pages/casestudy/components/CaseStudyDetails").then(
    (module) => ({
      default: module.CaseStudyDetails,
    }),
  ),
);

const BlogDetails = lazy(() =>
  import("../components/pages/blog/components/BlogDetails").then((module) => ({
    default: module.BlogDetails,
  })),
);

const SearchResults = lazy(() =>
  import("../components/pages/blog/components/SearchResults").then(
    (module) => ({
      default: module.SearchResults,
    }),
  ),
);

const CareerDetails = lazy(() =>
  import("../components/pages/career/components/CareerDetails").then(
    (module) => ({
      default: module.CareerDetails,
    }),
  ),
);

const NotFoundComponent = lazy(() =>
  import("../components/pages/NotFound").then((module) => ({
    default: module.NotFoundComponent,
  })),
);

export const AllRoutes = () => {
  return (
    <Suspense fallback={<PageLoader />}>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<HomeComponent />} />

          <Route path="/about-us" element={<AboutComponent />} />

          <Route path="/service" element={<ServiceComponent />} />

          <Route path="/blog" element={<BlogComponent />} />

          <Route path="/portfolio" element={<PortfolioComponent />} />

          <Route path="/all-development" element={<AllDevelopment />} />

          <Route path="/all-design" element={<AllUiUxDesign />} />

          <Route path="/all-media-marketing" element={<AllSocialMediaMarketing />}/>

          <Route path="/all-app-development" element={<AllAppDevelopment />} />

          <Route path="/solution" element={<SolutionComponent />} />

          <Route path="/solution/:slug" element={<SolutionDetails />} />

          <Route path="/career" element={<CareerComponent />} />

          <Route path="/case-study" element={<CaseStudyComponent />} />

          <Route path="/contact-us" element={<ContactComponent />} />

          <Route path="/policy/:slug" element={<PolicyDetails />} />

          <Route path="/case-studies/:slug" element={<CaseStudyDetails />} />

          <Route path="/blog/:slug" element={<BlogDetails />} />

          <Route path="/blog/search" element={<SearchResults />} />

          <Route path="/careers/:jobId" element={<CareerDetails />} />

          <Route path="*" element={<NotFoundComponent />} />
        </Route>
      </Routes>
    </Suspense>
  );
};
