import React from "react";

export const AboutBanner: React.FC = () => {
  const bannerStyle: React.CSSProperties = {
    backgroundImage: `url(https://ahaanmedia.com/ahaanwebsite/Banner/About-Us.webp)`,
  };

  return (
    <div className="w-full overflow-hidden bg-white">
      <section
        className="relative flex min-h-[440px] md:min-h-[480px] lg:min-h-[600px] w-full items-center -mt-[80px] md:-mt-[100px] lg:-mt-[120px] bg-cover bg-center bg-no-repeat px-5"
        style={bannerStyle}
      >
        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-black/20 z-1" />

        {/* Banner Content Container */}
        <div className="relative z-10 mx-auto w-full max-w-[1600px] flex justify-start">
          <div className="max-w-[900px] translate-y-11 md:translate-y-9 lg:translate-y-0">
            <h1 className="mb-5 text-left text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-white">
              About Us
            </h1>
            <p className="max-w-[700px] text-left text-sm sm:text-base md:text-lg lg:text-xl leading-relaxed text-gray-100">
              Empowering businesses through innovation, creativity, and
              technology-driven transformation that accelerates growth, enhances
              efficiency, and builds long-term digital success.
            </p>
          </div>
        </div>
      </section>

      {/* ================= BELOW BANNER CONTENT ================= */}
      <div className="mx-auto my-12 max-w-[1600px] px-4 sm:px-6 lg:px-8">
        {/* WHO WE ARE SECTION */}
        <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-2 mb-16">
          {/* Desktop Image */}
          <div className="hidden lg:block">
            <img
              src="https://ahaanmedia.com/ahaanwebsite/All/ASC-Team.png"
              alt="Team Discussion"
              className="h-auto w-full max-w-[570px] rounded-lg object-cover"
            />
          </div>

          {/* Text Content */}
          <div className="flex flex-col gap-3">
              <h2 className="heading-primary">
                Who Are We?
              </h2>

            <h3 className="text-xl font-bold text-black">
              Your Tech, Development And Creative Transformation Partner!
            </h3>

            <p className="text-base leading-relaxed text-gray-600 text-left">
              Welcome to Ahaan Software Consulting! With a crew of 50+
              specialists, we’ve spent 6+ years crafting award-winning solutions
              for 200+ businesses worldwide. What defines us? We’re Tech
              Enthusiasts fuelled by passion, Brand Builders at heart, Creative
              Experts in execution, and Marketing Consultants at our core.
            </p>

            <p className="text-base leading-relaxed text-gray-600 text-left">
              Innovation runs deep in our DNA, driving us to create tangible
              impact for your business. Fuelled by a passion for delivering real
              value, we collaborate with industry leaders, in-house specialists,
              and tech pioneers to push the boundaries of digital evolution.
            </p>
          </div>

          {/* Mobile Image */}
          <div className="block lg:hidden">
            <img
              src="https://ahaanmedia.com/ahaanwebsite/All/ASC-Team.png"
              alt="Team Discussion"
              className="h-auto w-full max-w-[570px] rounded-lg object-cover mx-auto"
            />
          </div>
        </div>

        {/* MISSION & VISION SECTION */}
        <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-2">
          {/* Text Content */}
          <div className="flex flex-col gap-3">
           

              <h2 className="heading-primary">
                Our Mission & Vision
              </h2>


            <h4 className="text-xl font-bold text-black">Mission</h4>
            <p className="text-base leading-relaxed text-gray-600 text-left">
              Our mission is to deliver MORE—Growth, Revenue & Success! Aimed at
              driving your business forward, we optimize processes, people, and
              technology to create client-aligned solutions that reimagine
              workflows, modernize businesses, and transform experiences.
              Because when you win, we win!
            </p>

            <h4 className="text-xl font-bold text-black mt-2">Vision</h4>
            <p className="text-base leading-relaxed text-gray-600 text-left">
              We envision fostering a culture that shapes the way we create,
              collaborate, and innovate! Committed to delivering digital
              solutions with honesty, integrity, and accuracy, we uphold the
              highest standards of accountability, credibility, and ethical
              business practices. With excellence as our pursuit, we honor the
              dignity of labor, ensuring every effort creates meaningful impact
              and lasting success.
            </p>
          </div>

          {/* Vision Image */}
          <div className="flex justify-center lg:justify-end">
            <img
              src="https://ahaanmedia.com/ahaanwebsite/All/group2.webp"
              alt="Business Vision"
              className="h-auto w-full max-w-[570px] rounded-lg object-cover"
            />
          </div>
        </div>
      </div>

      {/* Tailwind Custom Keyframes for Text Gradient */}
      <style>{`
        @keyframes gradientFlow {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
      `}</style>
    </div>
  );
};