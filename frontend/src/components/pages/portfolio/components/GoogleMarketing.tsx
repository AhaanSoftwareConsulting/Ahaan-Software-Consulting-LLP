import AllGoogleMarketingBanner from "./AllGoogleMarketingBanner";
import googleSearchAds from "../../../../assets/Google Search Ads (Pay-Per-Click).png";
import googleShopping from "../../../../assets/Google Shopping & Performance Max Campaigns.png";
import localSeo from "../../../../assets/Local SEO & Google Business Profile (GBP) Optimization.png";
import googleDisplay from "../../../../assets/Google Display Network & Audience Re-targeting.png";
import ga4Analytics from "../../../../assets/Analytics, Conversion Tracking & GA4 Setup.png";
import aboutGoogleMarketing from "../../../../assets/Google_marketing_About.png";

const googleSolutions = [
  {
    number: "01",
    title: "Google Search Ads (Pay-Per-Click)",
    description:
      "Capture high-intent traffic instantly. We build, manage, and optimize targeted search campaigns with precise keyword matching, compelling ad copy, and high quality scores to lower your cost-per-click (CPC) and maximize lead volume.",
    image: googleSearchAds,
  },
  {
    number: "02",
    title: "Google Shopping & Performance Max Campaigns",
    description:
      "Drive qualified sales for your e-commerce store. We optimize product data feeds, structure multi-channel Performance Max campaigns, and position your products directly at the top of Google Search and Shopping tabs.",
    image: googleShopping,
  },
  {
    number: "03",
    title: "Local SEO & Google Business Profile (GBP) Optimization",
    description:
      "Dominate local search results. We optimize your Google Business Profile, manage local citations, and run targeted local search ads to drive foot traffic, local phone calls, and region-specific leads to your business.",
    image: localSeo,
  },
  {
    number: "04",
    title: "Google Display Network & Audience Re-targeting",
    description:
      "Stay top-of-mind across millions of websites and apps. We build visual banner campaigns and dynamic re-targeting flows that re-engage visitors who left your website without purchasing or filling out a form.",
    image: googleDisplay,
  },
  {
    number: "05",
    title: "Analytics, Conversion Tracking & GA4 Setup",
    description:
      "Measure what matters. We set up robust Google Analytics 4 (GA4) tracking, Google Tag Manager event flows, and real-time client dashboards so you can track exact revenue, cost-per-acquisition (CPA), and campaign ROI.",
    image: ga4Analytics,
  },
];

const GoogleMarketing = () => {
  return (
    <>
      <AllGoogleMarketingBanner />
      <section className="w-full bg-white py-16 md:py-20 lg:py-24">
        <div className="mx-auto w-full max-w-[1400px] px-5 sm:px-8 lg:px-10">
          <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
            {/* Left - Image */}
            <div className="w-full">
              <div className="overflow-hidden rounded-2xl shadow-xl">
                <img
                  src={aboutGoogleMarketing}
                  alt="Google Marketing"
                  className="max-h-[600px] object-contain"
                />
              </div>
            </div>

            {/* Right - Content */}
            <div className="flex flex-col items-start">
              <p className="mb-6 text-base leading-7 text-gray-600 md:text-lg">
                At Ahaan Software Consulting, we manage end-to-end Google
                Marketing campaigns designed to capture customers at the exact
                moment they are looking for your products or services. From
                strategic keyword bidding and ad creative design to continuous
                landing page optimization and ROI tracking, we help your
                business dominate search engine results.
              </p>

              {/* CTA Button */}
              <a
                href="https://calendly.com/leads-ahaansoftware/free-consultation"
                target="_blank"
                rel="noopener noreferrer"
                className="shine-btn inline-flex items-center justify-center rounded-full  bg-gradient-to-r from-[#C48A18] to-[#E6B33C] px-7 py-3.5 text-sm font-semibold text-black transition-all duration-300 hover:-translate-y-1 hover:shadow-lg md:text-base"
              >
                Book a Strategy Call
              </a>
            </div>
          </div>
        </div>
      </section>
      {/* =========================
          SECTION 2
          COMPREHENSIVE SOLUTIONS
      ========================== */}
      <section className="bg-gray-50 py-16 md:py-20 lg:py-24">
        <div className="mx-auto w-full max-w-[1400px] px-5 sm:px-8 lg:px-10">
          {/* Section Heading */}
          <div className="mx-auto mb-16 max-w-3xl text-center">
            <h2 className="heading-primary">
              Comprehensive Solutions across the Google Ecosystem
            </h2>
          </div>

          {/* Zigzag Items */}
          <div className="space-y-20 md:space-y-28">
            {googleSolutions.map((item, index) => {
              const isReversed = index % 2 !== 0;

              return (
                <div
                  key={item.number}
                  className={`grid items-center gap-10 lg:grid-cols-2 lg:gap-16 ${
                    isReversed ? "lg:[&>*:first-child]:order-2" : ""
                  }`}
                >
                  {/* Image */}
                  <div className="group overflow-hidden rounded-2xl shadow-lg">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="block h-auto w-full rounded-2xl transition-transform duration-700 group-hover:scale-105"
                    />
                  </div>

                  {/* Content */}
                  <div className="relative">
                    {/* Number */}
                    <span className="mb-5 block text-sm font-extrabold tracking-[0.2em] text-[#E6B33C]">
                      {item.number}
                    </span>

                    {/* Title */}
                    <h3 className="heading-primary">{item.title}</h3>

                    {/* Gold Divider */}
                    <div className="mt-5 h-[2px] w-16 bg-[#E6B33C]" />

                    {/* Description */}
                    <p className="mt-6 text-base leading-8 text-gray-600 md:text-lg">
                      {item.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* =====================================================
    SECTION 3 — OUR GOOGLE MARKETING PROCESS
====================================================== */}
      <section className="bg-white py-16 sm:py-20 lg:py-28">
        <div className="mx-auto w-full max-w-[1400px] px-5 sm:px-8 lg:px-10">
          {/* Section Heading */}
          <div className="mx-auto mb-16 max-w-3xl text-center sm:mb-20">
            <h2 className="heading-primary">Our Google Marketing Process</h2>

            <p className="mt-5 text-base leading-7 text-gray-600 sm:text-lg">
              A structured, data-driven approach designed to build, optimize,
              and scale campaigns for sustainable growth.
            </p>
          </div>

          {/* Process Wrapper */}
          <div className="relative">
            {/* Connecting Line - Desktop */}
            <div
              className="
          absolute
          left-[12.5%]
          right-[12.5%]
          top-[38px]
          hidden
          h-[2px]
          bg-[#E6B33C]
          lg:block
        "
            />

            <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
              {/* ================= STEP 01 ================= */}
              <div className="group relative text-center">
                {/* Number */}
                <div
                  className="
              relative z-10 mx-auto
              flex h-[76px] w-[76px]
              items-center justify-center
              rounded-full
              border-2 border-[#E6B33C]
              bg-white
              text-xl font-extrabold
              text-black
              shadow-[0_4px_15px_rgba(230,179,60,0.15)]
              transition-all duration-300
              group-hover:-translate-y-1
              group-hover:bg-[#E6B33C]
              group-hover:text-black
              group-hover:shadow-[0_8px_25px_rgba(230,179,60,0.30)]
            "
                >
                  01
                </div>

                <div className="mt-8">
                  <h3 className="text-xl font-extrabold leading-snug text-black sm:text-xl">
                    In-Depth Market & Competitor Audit
                  </h3>

                  {/* Gold Divider */}
                  <div
                    className="
                mx-auto mt-5
                h-[3px] w-10
                bg-[#E6B33C]
                transition-all duration-300
                group-hover:w-16
              "
                  />

                  <p className="mt-5 text-base leading-7 text-gray-600">
                    We analyze your industry, existing ad account performance,
                    competitor keyword strategies, and target audience behavior
                    to identify high-potential growth opportunities.
                  </p>
                </div>
              </div>

              {/* ================= STEP 02 ================= */}
              <div className="group relative text-center">
                {/* Number */}
                <div
                  className="
              relative z-10 mx-auto
              flex h-[76px] w-[76px]
              items-center justify-center
              rounded-full
              border-2 border-[#E6B33C]
              bg-white
              text-xl font-extrabold
              text-black
              shadow-[0_4px_15px_rgba(230,179,60,0.15)]
              transition-all duration-300
              group-hover:-translate-y-1
              group-hover:bg-[#E6B33C]
              group-hover:text-black
              group-hover:shadow-[0_8px_25px_rgba(230,179,60,0.30)]
            "
                >
                  02
                </div>

                <div className="mt-8">
                  <h3 className="text-xl font-extrabold leading-snug text-black sm:text-xl">
                    Campaign Architecture & Keyword Strategy
                  </h3>

                  {/* Gold Divider */}
                  <div
                    className="
                mx-auto mt-5
                h-[3px] w-10
                bg-[#E6B33C]
                transition-all duration-300
                group-hover:w-16
              "
                  />

                  <p className="mt-5 text-base leading-7 text-gray-600">
                    We structure targeted campaign groups, define negative
                    keyword lists to prevent wasted ad spend, and write
                    persuasive ad copy engineered for high click-through rates
                    (CTR).
                  </p>
                </div>
              </div>

              {/* ================= STEP 03 ================= */}
              <div className="group relative text-center">
                {/* Number */}
                <div
                  className="
              relative z-10 mx-auto
              flex h-[76px] w-[76px]
              items-center justify-center
              rounded-full
              border-2 border-[#E6B33C]
              bg-white
              text-xl font-extrabold
              text-black
              shadow-[0_4px_15px_rgba(230,179,60,0.15)]
              transition-all duration-300
              group-hover:-translate-y-1
              group-hover:bg-[#E6B33C]
              group-hover:text-black
              group-hover:shadow-[0_8px_25px_rgba(230,179,60,0.30)]
            "
                >
                  03
                </div>

                <div className="mt-8">
                  <h3 className="text-xl font-extrabold leading-snug text-black sm:text-xl">
                    Landing Page & Conversion Rate Optimization (CRO)
                  </h3>

                  {/* Gold Divider */}
                  <div
                    className="
                mx-auto mt-5
                h-[3px] w-10
                bg-[#E6B33C]
                transition-all duration-300
                group-hover:w-16
              "
                  />

                  <p className="mt-5 text-base leading-7 text-gray-600">
                    Traffic is only half the battle. We optimize your landing
                    page UI/UX, page speed, and trust signals to ensure incoming
                    ad clicks convert into paying customers.
                  </p>
                </div>
              </div>

              {/* ================= STEP 04 ================= */}
              <div className="group relative text-center">
                {/* Number */}
                <div
                  className="
              relative z-10 mx-auto
              flex h-[76px] w-[76px]
              items-center justify-center
              rounded-full
              border-2 border-[#E6B33C]
              bg-white
              text-xl font-extrabold
              text-black
              shadow-[0_4px_15px_rgba(230,179,60,0.15)]
              transition-all duration-300
              group-hover:-translate-y-1
              group-hover:bg-[#E6B33C]
              group-hover:text-black
              group-hover:shadow-[0_8px_25px_rgba(230,179,60,0.30)]
            "
                >
                  04
                </div>

                <div className="mt-8">
                  <h3 className="text-xl font-extrabold leading-snug text-black sm:text-xl">
                    A/B Testing & Continuous Optimization
                  </h3>

                  {/* Gold Divider */}
                  <div
                    className="
                mx-auto mt-5
                h-[3px] w-10
                bg-[#E6B33C]
                transition-all duration-300
                group-hover:w-16
              "
                  />

                  <p className="mt-5 text-base leading-7 text-gray-600">
                    We continuously test ad headlines, bidding strategies,
                    target demographics, and extension assets to scale winning
                    campaigns and reduce acquisition costs over time.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default GoogleMarketing;
