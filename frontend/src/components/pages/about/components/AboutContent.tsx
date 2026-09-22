export const AboutContent = () => {
  return (
    <div>
      <div className="mx-auto my-12 max-w-[1600px] px-4 lg:px-6 2xl:px-10">
        {/* WHO WE ARE SECTION */}
        <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-2 mb-16">
          {/* Desktop Image */}
          <div className="hidden lg:block">
            <img
              src="https://ahaanmedia.com/ahaanwebsite/All/ASC-Team.png"
              alt="Team Discussion"
              className="h-auto w-full rounded-md object-cover"
            />
          </div>

          {/* Text Content */}
          <div className="flex flex-col gap-3">
            <h2 className="heading-primary">Who Are We?</h2>

            <h3 className="text-sm lg:text-base font-bold text-black">
              Your Technology, Development, and Creative Transformation Partner
            </h3>

            <p className="lg:text-lg text-sm leading-relaxed text-left">
              13+ specialists. One conviction: that technology should only power
              up businesses! That’s why we built Ahaan Software Consulting, an
              offshore team of tech and digital experts, that delivers custom
              solutions, without the usual cost or complexity.
              <br /> 4+ years in, that conviction has taken us from a small crew
              to an offshore development partner serving small and midsize
              businesses across India, the U.S., and beyond.
            </p>

            <p className="lg:text-lg text-sm leading-relaxed text-left">
              We have watched small U.S. businesses grow from side projects into
              top players. From first websites into full-blown product suites.
              Behind every project, we've worked alongside industry leaders,
              tech pioneers, and in-house experts, pushing the work further than
              any of us could alone.
              <br />
              At Ahaan, we don’t just build software, apps or websites. We build
              the BRANDS behind them.
            </p>
          </div>

          {/* Mobile Image */}
          <div className="block lg:hidden">
            <img
              src="https://ahaanmedia.com/ahaanwebsite/All/ASC-Team.png"
              alt="Team Discussion"
              className="h-auto w-full  rounded-md object-cover mx-auto"
            />
          </div>
        </div>

        {/* MISSION & VISION SECTION */}
        <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-2">
          {/* Text Content */}
          <div className="flex flex-col gap-3">
            <h2 className="heading-primary">Our Mission & Vision</h2>

            <h4 className="text-sm lg:text-base font-bold text-black">
              Mission
            </h4>
            <p className="lg:text-lg text-sm leading-relaxed text-left">
              One word drives everything we aim to do – empower! Our team,
              through ownership of the work and the urge to do it well. Our U.S.
              SMB clients, through custom development services that grow with
              their business. Our partners, through collaboration that lets
              small teams stay competitive. Our community, through work that
              raises the bar for what offshore can mean. Because your success is
              our ultimate satisfaction.
            </p>

            <h4 className="text-sm lg:text-base font-bold text-black mt-2">
              Vision
            </h4>
            <p className="lg:text-lg text-sm leading-relaxed text-left">
              Our vision is to become a trusted technology partner for growing
              businesses across the globe. We focus on building long-term
              relationships, creating solutions that grow with our clients, and
              delivering work that reflects high quality and deep expertise.
            </p>
          </div>

          {/* Vision Image */}
          <div className="flex justify-center lg:justify-end">
            <img
              src="https://ahaanmedia.com/ahaanwebsite/All/OurMission.png"
              alt="Business Vision"
              className="h-auto w-full  rounded-md object-cover"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
