import React from "react";

interface TimelineItem {
  year: string;
  title: string;
  description: string;
  image: string;
  color: string;
  waveClass: string;
}

const timelineData: TimelineItem[] = [
  {
    year: "2021",
    title: "Beginning",
    description:
      "Laid the foundation of our digital entrepreneurship journey. Started with small freelance projects, driven by passion and vision to create impactful digital solutions.",
    image: "https://ahaanmedia.com/ahaanwebsite/All/begining.webp",
    color: "#ff4b4b",
    waveClass: "border-[#ff4b4b]",
  },
  {
    year: "2022",
    title: "Growth",
    description:
      "Expanded our expertise by taking on larger and more diverse projects. Built strong client relationships and enhanced our capabilities in web development, design, and digital solutions.",
    image: "https://ahaanmedia.com/ahaanwebsite/All/Growth.webp",
    color: "#f9b233",
    waveClass: "border-[#f9b233]",
  },
  {
    year: "2023",
    title: "Founding",
    description:
      "Officially established Ahaan Software Consulting as a company. Structured services, onboarded a growing team, and started catering to international clients with end-to-end digital solutions.",
    image: "https://ahaanmedia.com/ahaanwebsite/All/Founding.webp",
    color: "#58c472",
    waveClass: "border-[#58c472]",
  },
  {
    year: "2024",
    title: "Leading",
    description:
      "Evolved into a trusted technology partner for businesses. Delivering innovative, scalable, and customer-centric solutions in web development, mobile apps, and digital transformation.",
    image: "https://ahaanmedia.com/ahaanwebsite/All/Leading.webp",
    color: "#0066d4",
    waveClass: "border-[#0066d4]",
  },
];

export const Timeline: React.FC = () => {
  return (
    <div className="relative mx-auto my-14 w-full max-w-[1600px] overflow-x-hidden overflow-y-visible px-4 py-8 font-['Outfit',sans-serif]">
      {/* TIMELINE CONTAINER */}
      <div className="relative flex flex-col items-center justify-between gap-24 lg:flex-row lg:gap-10 xl:gap-24">
        {/* BACKGROUND CONNECTING LINE */}
        {/* Horizontal line for desktop */}
        <div className="hidden lg:block absolute left-0 top-1/2 -z-10 h-1 w-full -translate-y-1/2 bg-gradient-to-r from-[#ff4b4b] via-[#f9b233] via-[#49b162] to-[#0066d4]" />
        {/* Vertical line for mobile & tablet */}
        <div className="block lg:hidden absolute left-1/2 top-0 -z-10 h-full w-1 -translate-x-1/2 bg-gradient-to-b from-[#ff4b4b] via-[#f9b233] via-[#49b162] to-[#0066d4]" />

        {/* TIMELINE ITEMS */}
        {timelineData.map((item, index) => {
          const isEven = index % 2 === 0;

          return (
            <div
              key={index}
              className="flex w-full flex-row items-center justify-between min-w-0 lg:min-w-[200px] xl:min-w-[250px] lg:flex-col lg:justify-center text-center"
            >
              {/* TOP / LEFT PORTION */}
              <div
                className={`flex w-[45%] flex-col items-end text-right lg:w-full lg:items-center lg:text-center ${
                  isEven ? "order-1" : "order-1 lg:order-1"
                }`}
              >
                {isEven ? (
                  <>
                    <h2
                      className="text-3xl font-bold lg:text-4xl xl:text-[45px]"
                      style={{ color: item.color }}
                    >
                      {item.year}
                    </h2>
                    <div className="relative my-3 h-[120px] w-[120px] lg:h-[130px] lg:w-[130px] xl:h-[150px] xl:w-[150px]">
                      <div
                        className="relative h-full w-full rounded-full border-2"
                        style={{ borderColor: item.color }}
                      >
                        {/* Wave pulse effect */}
                        <div
                          className={`absolute left-1/2 top-1/2 h-1/2 w-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 ${item.waveClass} animate-[borderZoom_2s_infinite_ease-out]`}
                        />
                        <img
                          src={item.image}
                          alt={item.title}
                          className="absolute left-1/2 top-1/2 h-[100px] w-[100px] lg:h-[100px] lg:w-[100px] xl:h-[120px] xl:w-[120px] -translate-x-1/2 -translate-y-1/2 rounded-full border-4 border-white object-cover shadow-[0_10px_25px_rgba(0,0,0,0.25),0_20px_45px_rgba(0,0,0,0.15)]"
                        />
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    <h6 className="text-xl font-semibold lg:text-2xl">
                      {item.title}
                    </h6>
                    <p className="mt-1 text-xs sm:text-sm text-gray-700 max-w-[260px] xl:max-w-[320px]">
                      {item.description}
                    </p>
                  </>
                )}
              </div>

              {/* BOTTOM / RIGHT PORTION */}
              <div
                className={`flex w-[45%] flex-col items-start text-left lg:w-full lg:items-center lg:text-center ${
                  isEven ? "order-2" : "order-2 lg:order-2"
                }`}
              >
                {isEven ? (
                  <>
                    <h6 className="text-xl font-semibold lg:text-2xl">
                      {item.title}
                    </h6>
                    <p className="mt-1 text-xs sm:text-sm text-gray-700 max-w-[260px] xl:max-w-[320px]">
                      {item.description}
                    </p>
                  </>
                ) : (
                  <>
                    <div className="relative my-3 h-[120px] w-[120px] lg:h-[130px] lg:w-[130px] xl:h-[150px] xl:w-[150px]">
                      <div
                        className="relative h-full w-full rounded-full border-2"
                        style={{ borderColor: item.color }}
                      >
                        {/* Wave pulse effect */}
                        <div
                          className={`absolute left-1/2 top-1/2 h-1/2 w-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 ${item.waveClass} animate-[borderZoom_2s_infinite_ease-out]`}
                        />
                        <img
                          src={item.image}
                          alt={item.title}
                          className="absolute left-1/2 top-1/2 h-[100px] w-[100px] lg:h-[100px] lg:w-[100px] xl:h-[120px] xl:w-[120px] -translate-x-1/2 -translate-y-1/2 rounded-full border-4 border-white object-cover shadow-[0_10px_25px_rgba(0,0,0,0.25),0_20px_45px_rgba(0,0,0,0.15)]"
                        />
                      </div>
                    </div>
                    <h2
                      className="text-3xl font-bold lg:text-4xl xl:text-[45px]"
                      style={{ color: item.color }}
                    >
                      {item.year}
                    </h2>
                  </>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Keyframe Definition for the expanding wave circle */}
      <style>{`
        @keyframes borderZoom {
          0% { transform: translate(-0%, -0%) scale(1); opacity: 1; }
          100% { transform: translate(-0%, -0%) scale(3); opacity: 0; }
        }
      `}</style>
    </div>
  );
};