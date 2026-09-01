import { SEO } from "../../seo/SEO";
import { BlogBanner } from "./components/BlogBanner";
import { BlogPage } from "./components/BlogPage";

export const BlogComponent = () => {
  return (
    <div>
      <SEO
        title="Tech & Software Development Insights"
        description="Read latest insights, guides, and trends on web design, UI/UX, and enterprise software engineering."
        path="/blog"
      />
      <BlogBanner />
      <BlogPage />
    </div>
  );
};
