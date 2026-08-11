interface KeyFeaturesSectionProps {
  logo?: string;
  leftFeatures: string[];
  rightFeatures: string[];
  allFeatures: string[];
}

export const CaseStudyKeyFeaturesSection = ({
  logo,
  leftFeatures,
  rightFeatures,
  allFeatures,
}: KeyFeaturesSectionProps) => {
  return (
    <section className="bg-[#FFFCF5] py-16 md:py-24">
      <div className="mx-auto max-w-[1400px] px-5 md:px-10 2xl:px-16">
        <h2 className="mb-14 text-center text-2xl font-extrabold leading-tight text-[#1c1d20] lg:text-3xl xl:text-5xl">
          Key Features & Benefits
        </h2>

        {/* Desktop View with Animated SVG Curved Lines */}
        <div className="relative hidden min-h-[520px] lg:block">
          <svg
            className="pointer-events-none absolute inset-0 h-full w-full"
            viewBox="0 0 1000 520"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <style>{`
              @keyframes dash {
                to {
                  stroke-dashoffset: -20;
                }
              }
              .animated-line {
                stroke-dasharray: 6 6;
                animation: dash 1.5s linear infinite;
              }
            `}</style>

            {/* LEFT SIDE LINES */}
            <path
              d="M 500 170 L 500 42 Q 500 25 483 25 L 310 25"
              stroke="#E5B34F"
              strokeWidth="1.5"
              className="animated-line"
            />
            <path
              d="M 410 205 L 350 205 Q 330 205 330 185 L 330 142 Q 330 125 310 125 L 260 125"
              stroke="#E5B34F"
              strokeWidth="1.5"
              className="animated-line"
            />
            <path
              d="M 390 260 L 280 260"
              stroke="#E5B34F"
              strokeWidth="1.5"
              className="animated-line"
            />
            <path
              d="M 410 315 L 350 315 Q 330 315 330 335 L 330 378 Q 330 395 310 395 L 265 395"
              stroke="#E5B34F"
              strokeWidth="1.5"
              className="animated-line"
            />
            <path
              d="M 500 350 L 500 478 Q 500 495 483 495 L 330 495"
              stroke="#E5B34F"
              strokeWidth="1.5"
              className="animated-line"
            />

            {/* RIGHT SIDE LINES */}
            <path
              d="M 500 170 L 500 42 Q 500 25 517 25 L 690 25"
              stroke="#E5B34F"
              strokeWidth="1.5"
              className="animated-line"
            />
            <path
              d="M 590 205 L 650 205 Q 670 205 670 185 L 670 142 Q 670 125 690 125 L 740 125"
              stroke="#E5B34F"
              strokeWidth="1.5"
              className="animated-line"
            />
            <path
              d="M 610 260 L 720 260"
              stroke="#E5B34F"
              strokeWidth="1.5"
              className="animated-line"
            />
            <path
              d="M 590 315 L 650 315 Q 670 315 670 335 L 670 378 Q 670 395 690 395 L 735 395"
              stroke="#E5B34F"
              strokeWidth="1.5"
              className="animated-line"
            />
            <path
              d="M 500 350 L 500 478 Q 500 495 517 495 L 670 495"
              stroke="#E5B34F"
              strokeWidth="1.5"
              className="animated-line"
            />
          </svg>

          {/* Center Logo Circle */}
          <div className="absolute left-1/2 top-1/2 z-10 flex h-44 w-44 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-2 border-[#E5B34F] bg-white p-6 shadow-md">
            {logo ? (
              <img
                src={logo}
                alt="Case Study Logo"
                className="max-h-full max-w-full object-contain"
              />
            ) : (
              <span className="text-xs font-medium text-gray-400">Logo</span>
            )}
          </div>

          {/* Left Column Features */}
          <div className="absolute left-0 top-0 flex h-full w-[31%] flex-col justify-between py-0">
            {leftFeatures.map((feat, idx) => (
              <div key={idx} className="flex justify-end">
                <div className="rounded-md border border-[#E5B34F] bg-white px-5 py-2.5 text-center text-xs font-semibold text-gray-800 shadow-sm transition-transform duration-300 hover:scale-105 xl:text-sm">
                  {feat}
                </div>
              </div>
            ))}
          </div>

          {/* Right Column Features */}
          <div className="absolute right-0 top-0 flex h-full w-[31%] flex-col justify-between py-0">
            {rightFeatures.map((feat, idx) => (
              <div key={idx} className="flex justify-start">
                <div className="rounded-md border border-[#E5B34F] bg-white px-5 py-2.5 text-center text-xs font-semibold text-gray-800 shadow-sm transition-transform duration-300 hover:scale-105 xl:text-sm">
                  {feat}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Mobile View */}
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:hidden">
          {allFeatures.map((feature, index) => (
            <div
              key={index}
              className="rounded-md border border-[#E5B34F] bg-white px-4 py-3 text-center text-xs font-semibold text-gray-800 shadow-sm"
            >
              {feature}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};