

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
              <h2 className="heading-primary">
                Who Are We?
              </h2>

            <h3 className="text-sm lg:text-base font-bold text-black">
              Your Tech, Development And Creative Transformation Partner!
            </h3>

            <p className="lg:text-lg text-sm leading-relaxed text-left">
              Welcome to Ahaan Software Consulting! With a crew of 50+
              specialists, we’ve spent 6+ years crafting award-winning solutions
              for 200+ businesses worldwide. What defines us? We’re Tech
              Enthusiasts fuelled by passion, Brand Builders at heart, Creative
              Experts in execution, and Marketing Consultants at our core.
            </p>

            <p className="lg:text-lg text-sm leading-relaxed text-left">
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
              className="h-auto w-full  rounded-md object-cover mx-auto"
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


            <h4 className="text-sm lg:text-base font-bold text-black">Mission</h4>
            <p className="lg:text-lg text-sm leading-relaxed text-left">
              Our mission is to deliver MORE—Growth, Revenue & Success! Aimed at
              driving your business forward, we optimize processes, people, and
              technology to create client-aligned solutions that reimagine
              workflows, modernize businesses, and transform experiences.
              Because when you win, we win!
            </p>

            <h4 className="text-sm lg:text-base font-bold text-black mt-2">Vision</h4>
            <p className="lg:text-lg text-sm leading-relaxed text-left">
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
              src="https://ahaanmedia.com/ahaanwebsite/All/OurMission.png"
              alt="Business Vision"
              className="h-auto w-full  rounded-md object-cover"
            />
          </div>
        </div>
      </div>
    </div>
  )
}
