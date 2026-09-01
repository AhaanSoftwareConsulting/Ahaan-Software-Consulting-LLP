import { SEO } from "../../seo/SEO";
import { ContactBanner } from "./components/ContactBanner";
import { ContactUs } from "./components/ContactUs";
import WorldMap from "./components/WorldMap";

export const ContactComponent = () => {
  return (
    <div>
      <SEO
        title="Contact Us | Book Consultation"
        description="Get in touch with Ahaan Software Consulting for custom software development inquiries."
        path="/contact-us"
      />
      <ContactBanner />
      <ContactUs />
      <WorldMap />
    </div>
  );
};
