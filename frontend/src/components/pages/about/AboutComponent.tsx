import { SEO } from "../../seo/SEO";
import { AboutBanner } from "./components/AboutBanner";
import { AboutContent } from "./components/AboutContent";
import { AboutSection } from "./components/AboutSection";
import { AboutVideo } from "./components/AboutVideo";
import { Showcase } from "./components/Showcase";
import { Team } from "./components/Team";
import { Timeline } from "./components/Timeline";

export const AboutComponent = () => {
  return (
    <div>
      <SEO
        title="About Us | Offshore Technology Team"
        description="Meet the team and delivery model behind Ahaan's custom software and digital product development."
        path="/about-us"
      />
      <AboutBanner />
      <AboutContent />
      <Timeline />
      <AboutVideo />
      <AboutSection />
      <Showcase />
      <Team />
    </div>
  );
};
