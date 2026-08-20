import React, { useEffect, useRef, useState } from "react";

export const Showcase: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [animKey, setAnimKey] = useState<number>(0);

  // Trigger animation on scroll into view
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // Re-trigger animation on middle circle hover by bumping key
  const handleCenterHover = () => {
    setAnimKey((prev) => prev + 1);
  };

  return (
    <div
      ref={containerRef}
      className="relative flex min-h-auto w-full flex-col items-center justify-center overflow-hidden bg-[#020a0f] px-4 py-4 sm:py-6 font-['Share_Tech_Mono',monospace]"
    >
      {/* CRT Scanlines Overlay Effect */}
      <div className="pointer-events-none fixed inset-0 z-10 bg-[repeating-linear-gradient(0deg,transparent,transparent_2px,rgba(0,255,160,0.012)_2px,rgba(0,255,160,0.012)_4px)]" />

      {/* Main Title Heading */}
      <h1 className="z-20 mb-4 text-center text-xl sm:text-2xl md:text-3xl lg:text-[36px] font-bold text-white tracking-wide">
        Innovative Solutions for Modern Businesses
      </h1>

      {/* SVG Diagram Container constrained in both width & height */}
      <div className="relative z-20 w-full max-w-[1600px] px-2 sm:px-4 flex justify-center">
        <svg
          key={animKey}
          viewBox="0 0 1100 640"
          xmlns="http://www.w3.org/2000/svg"
          className={`block w-auto h-auto max-h-[420px] sm:max-h-[480px] md:max-h-[520px] lg:max-h-[560px] ${
            isVisible ? "run-svg-anim" : ""
          }`}
        >
          <defs>
            <filter id="neon" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="2.5" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
            <filter
              id="circleGlow"
              x="-60%"
              y="-60%"
              width="220%"
              height="220%"
            >
              <feGaussianBlur stdDeviation="14" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
            <filter id="pillGlow" x="-15%" y="-35%" width="130%" height="170%">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>

            <linearGradient id="pillGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#001a2e" />
              <stop offset="100%" stopColor="#b19a18" />
            </linearGradient>

            <marker
              id="arrG"
              markerWidth="8"
              markerHeight="7"
              refX="7.5"
              refY="3.5"
              orient="auto"
              markerUnits="strokeWidth"
            >
              <path d="M0,0.5 L0,6.5 L7.5,3.5 Z" fill="#c07f1e" />
            </marker>
            <marker
              id="arrC"
              markerWidth="8"
              markerHeight="7"
              refX="7.5"
              refY="3.5"
              orient="auto"
              markerUnits="strokeWidth"
            >
              <path d="M0,0.5 L0,6.5 L7.5,3.5 Z" fill="#c07f1e" />
            </marker>

            <radialGradient id="spaceBg" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#001a2e" />
              <stop offset="100%" stopColor="#020a0f" />
            </radialGradient>

            <radialGradient id="centerBg" cx="50%" cy="40%" r="55%">
              <stop offset="0%" stopColor="#041e30" />
              <stop offset="100%" stopColor="#010d18" />
            </radialGradient>
          </defs>

          {/* Canvas Background */}
          <rect width="1100" height="640" fill="url(#spaceBg)" />

          {/* Subtle Grid Lines */}
          <g stroke="rgba(255, 255, 255, 0.06)" strokeWidth="1">
            <line x1="0" y1="80" x2="1100" y2="80" />
            <line x1="0" y1="160" x2="1100" y2="160" />
            <line x1="0" y1="240" x2="1100" y2="240" />
            <line x1="0" y1="320" x2="1100" y2="320" />
            <line x1="0" y1="400" x2="1100" y2="400" />
            <line x1="0" y1="480" x2="1100" y2="480" />
            <line x1="0" y1="560" x2="1100" y2="560" />
            <line x1="100" y1="0" x2="100" y2="640" />
            <line x1="200" y1="0" x2="200" y2="640" />
            <line x1="300" y1="0" x2="300" y2="640" />
            <line x1="400" y1="0" x2="400" y2="640" />
            <line x1="500" y1="0" x2="500" y2="640" />
            <line x1="600" y1="0" x2="600" y2="640" />
            <line x1="700" y1="0" x2="700" y2="640" />
            <line x1="800" y1="0" x2="800" y2="640" />
            <line x1="900" y1="0" x2="900" y2="640" />
            <line x1="1000" y1="0" x2="1000" y2="640" />
          </g>

          {/* Left Arrow Paths */}
          <g className="stroke-path">
            <path
              d="M 470,213 Q 412,122 368,96"
              fill="none"
              stroke="#c07f1e"
              strokeWidth="1.8"
              strokeLinecap="round"
              opacity="0.95"
              markerEnd="url(#arrG)"
              filter="url(#neon)"
            />
            <path
              d="M 426,264 Q 388,220 326,218"
              fill="none"
              stroke="#c07f1e"
              strokeWidth="1.8"
              strokeLinecap="round"
              opacity="0.95"
              markerEnd="url(#arrG)"
              filter="url(#neon)"
            />
            <path
              d="M 426,352 Q 368,376 282,362"
              fill="none"
              stroke="#c07f1e"
              strokeWidth="1.8"
              strokeLinecap="round"
              opacity="0.95"
              markerEnd="url(#arrG)"
              filter="url(#neon)"
            />
            <path
              d="M 478,427 Q 412,480 360,490"
              fill="none"
              stroke="#c07f1e"
              strokeWidth="1.8"
              strokeLinecap="round"
              opacity="0.95"
              markerEnd="url(#arrG)"
              filter="url(#neon)"
            />
          </g>

          {/* Right Arrow Paths */}
          <g className="stroke-path">
            <path
              d="M 632,213 Q 688,122 732,96"
              fill="none"
              stroke="#c07f1e"
              strokeWidth="1.8"
              strokeLinecap="round"
              opacity="0.95"
              markerEnd="url(#arrC)"
              filter="url(#neon)"
            />
            <path
              d="M 674,264 Q 732,230 764,228"
              fill="none"
              stroke="#c07f1e"
              strokeWidth="1.8"
              strokeLinecap="round"
              opacity="0.95"
              markerEnd="url(#arrC)"
              filter="url(#neon)"
            />
            <path
              d="M 674,352 Q 732,376 786,362"
              fill="none"
              stroke="#c07f1e"
              strokeWidth="1.8"
              strokeLinecap="round"
              opacity="0.95"
              markerEnd="url(#arrC)"
              filter="url(#neon)"
            />
            <path
              d="M 632,427 Q 688,480 740,490"
              fill="none"
              stroke="#c07f1e"
              strokeWidth="1.8"
              strokeLinecap="round"
              opacity="0.95"
              markerEnd="url(#arrC)"
              filter="url(#neon)"
            />
          </g>

          {/* Interactive Center Circle & Logo */}
          <g
            className="cursor-pointer transition-transform duration-300 hover:scale-105 origin-[550px_320px]"
            onMouseEnter={handleCenterHover}
          >
            <circle cx="550" cy="320" r="90" fill="url(#centerBg)" />
            <circle
              cx="550"
              cy="320"
              r="90"
              fill="none"
              stroke="#c07f1e"
              strokeWidth="2"
              opacity="0.75"
              filter="url(#neon)"
            />
            <image
              href="https://ahaanmedia.com/asc/layouts/fav.png"
              x="490"
              y="265"
              width="120"
              height="120"
            />
          </g>

          {/* Left Side Feature Nodes */}
          <g className="stroke-path">
            {/* Node 1 */}
            <g>
              <rect x="42" y="44" width="276" height="68" rx="8" fill="url(#pillGrad)" />
              <rect x="42" y="44" width="276" height="68" rx="8" fill="none" stroke="#c07f1e" strokeWidth="1.5" opacity="0.85" filter="url(#pillGlow)" />
              <line x1="42" y1="56" x2="42" y2="44" stroke="#ffffff" strokeWidth="2.5" />
              <line x1="42" y1="44" x2="58" y2="44" stroke="#ffffff" strokeWidth="2.5" />
              <line x1="318" y1="100" x2="318" y2="112" stroke="#ffffff" strokeWidth="2.5" />
              <line x1="302" y1="112" x2="318" y2="112" stroke="#ffffff" strokeWidth="2.5" />
              <text x="180" y="82" textAnchor="middle" fill="#ffffff" style={{ fontSize: "16px" }}>
                Web/Graphics Design
              </text>
            </g>

            {/* Node 2 */}
            <g>
              <rect x="42" y="188" width="236" height="54" rx="8" fill="url(#pillGrad)" />
              <rect x="42" y="188" width="236" height="54" rx="8" fill="none" stroke="#c07f1e" strokeWidth="1.5" opacity="0.85" filter="url(#pillGlow)" />
              <line x1="42" y1="200" x2="42" y2="188" stroke="#ffffff" strokeWidth="2.5" />
              <line x1="42" y1="188" x2="58" y2="188" stroke="#ffffff" strokeWidth="2.5" />
              <line x1="278" y1="242" x2="278" y2="230" stroke="#ffffff" strokeWidth="2.5" />
              <line x1="262" y1="242" x2="278" y2="242" stroke="#ffffff" strokeWidth="2.5" />
              <text x="160" y="220" textAnchor="middle" fill="#ffffff" style={{ fontSize: "14px" }}>
                UI/UX Design
              </text>
            </g>

            {/* Node 3 */}
            <g>
              <rect x="42" y="328" width="186" height="54" rx="8" fill="url(#pillGrad)" />
              <rect x="42" y="328" width="186" height="54" rx="8" fill="none" stroke="#c07f1e" strokeWidth="1.5" opacity="0.85" filter="url(#pillGlow)" />
              <line x1="42" y1="340" x2="42" y2="328" stroke="#ffffff" strokeWidth="2.5" />
              <line x1="42" y1="328" x2="58" y2="328" stroke="#ffffff" strokeWidth="2.5" />
              <line x1="228" y1="382" x2="228" y2="370" stroke="#ffffff" strokeWidth="2.5" />
              <line x1="212" y1="382" x2="228" y2="382" stroke="#ffffff" strokeWidth="2.5" />
              <text x="135" y="360" textAnchor="middle" fill="#ffffff" style={{ fontSize: "14px" }}>
                Web Development
              </text>
            </g>

            {/* Node 4 */}
            <g>
              <rect x="42" y="470" width="260" height="54" rx="8" fill="url(#pillGrad)" />
              <rect x="42" y="470" width="260" height="54" rx="8" fill="none" stroke="#c07f1e" strokeWidth="1.5" opacity="0.85" filter="url(#pillGlow)" />
              <line x1="42" y1="482" x2="42" y2="470" stroke="#ffffff" strokeWidth="2.5" />
              <line x1="42" y1="470" x2="58" y2="470" stroke="#ffffff" strokeWidth="2.5" />
              <line x1="302" y1="524" x2="302" y2="512" stroke="#ffffff" strokeWidth="2.5" />
              <line x1="286" y1="524" x2="302" y2="524" stroke="#ffffff" strokeWidth="2.5" />
              <text x="172" y="502" textAnchor="middle" fill="#ffffff" style={{ fontSize: "16px" }}>
                IT Business Consultancy
              </text>
            </g>
          </g>

          {/* Right Side Feature Nodes */}
          <g className="stroke-path">
            {/* Node 1 */}
            <g>
              <rect x="782" y="44" width="292" height="68" rx="8" fill="url(#pillGrad)" />
              <rect x="782" y="44" width="292" height="68" rx="8" fill="none" stroke="#c07f1e" strokeWidth="1.5" opacity="0.85" filter="url(#pillGlow)" />
              <line x1="782" y1="56" x2="782" y2="44" stroke="#ffffff" strokeWidth="2.5" />
              <line x1="782" y1="44" x2="798" y2="44" stroke="#ffffff" strokeWidth="2.5" />
              <line x1="1074" y1="100" x2="1074" y2="112" stroke="#ffffff" strokeWidth="2.5" />
              <line x1="1058" y1="112" x2="1074" y2="112" stroke="#ffffff" strokeWidth="2.5" />
              <text x="928" y="82" textAnchor="middle" fill="#ffffff" style={{ fontSize: "16px" }}>
                Custom Web Application
              </text>
            </g>

            {/* Node 2 */}
            <g>
              <rect x="782" y="188" width="292" height="68" rx="8" fill="url(#pillGrad)" />
              <rect x="782" y="188" width="292" height="68" rx="8" fill="none" stroke="#c07f1e" strokeWidth="1.5" opacity="0.85" filter="url(#pillGlow)" />
              <line x1="782" y1="200" x2="782" y2="188" stroke="#ffffff" strokeWidth="2.5" />
              <line x1="782" y1="188" x2="798" y2="188" stroke="#ffffff" strokeWidth="2.5" />
              <line x1="1074" y1="244" x2="1074" y2="256" stroke="#ffffff" strokeWidth="2.5" />
              <line x1="1058" y1="256" x2="1074" y2="256" stroke="#ffffff" strokeWidth="2.5" />
              <text x="928" y="226" textAnchor="middle" fill="#ffffff" style={{ fontSize: "14px" }}>
                Mobile App Design & Development
              </text>
            </g>

            {/* Node 3 */}
            <g>
              <rect x="812" y="328" width="186" height="54" rx="8" fill="url(#pillGrad)" />
              <rect x="812" y="328" width="186" height="54" rx="8" fill="none" stroke="#c07f1e" strokeWidth="1.5" opacity="0.85" filter="url(#pillGlow)" />
              <line x1="812" y1="340" x2="812" y2="328" stroke="#ffffff" strokeWidth="2.5" />
              <line x1="812" y1="328" x2="828" y2="328" stroke="#ffffff" strokeWidth="2.5" />
              <line x1="998" y1="382" x2="998" y2="370" stroke="#ffffff" strokeWidth="2.5" />
              <line x1="982" y1="382" x2="998" y2="382" stroke="#ffffff" strokeWidth="2.5" />
              <text x="905" y="360" textAnchor="middle" fill="#ffffff" style={{ fontSize: "13px" }}>
                Digital Marketing & SEO
              </text>
            </g>

            {/* Node 4 */}
            <g>
              <rect x="782" y="470" width="268" height="54" rx="8" fill="url(#pillGrad)" />
              <rect x="782" y="470" width="268" height="54" rx="8" fill="none" stroke="#c07f1e" strokeWidth="1.5" opacity="0.85" filter="url(#pillGlow)" />
              <line x1="782" y1="482" x2="782" y2="470" stroke="#ffffff" strokeWidth="2.5" />
              <line x1="782" y1="470" x2="798" y2="470" stroke="#ffffff" strokeWidth="2.5" />
              <line x1="1050" y1="524" x2="1050" y2="512" stroke="#ffffff" strokeWidth="2.5" />
              <line x1="1034" y1="524" x2="1050" y2="524" stroke="#ffffff" strokeWidth="2.5" />
              <text x="916" y="502" textAnchor="middle" fill="#ffffff" style={{ fontSize: "14px" }}>
                Maintenance & Technical Support
              </text>
            </g>
          </g>
        </svg>
      </div>

      {/* Animation Styles scoped to .run-svg-anim */}
      <style>{`
        @keyframes drawStroke {
          0% {
            stroke-dasharray: 300;
            stroke-dashoffset: 300;
          }
          100% {
            stroke-dasharray: 300;
            stroke-dashoffset: 0;
          }
        }

        .run-svg-anim .stroke-path path,
        .run-svg-anim .stroke-path rect,
        .run-svg-anim .stroke-path line {
          animation: drawStroke 1.8s cubic-bezier(0.4, 0, 0.2, 1) forwards;
        }

        @media (prefers-reduced-motion: reduce) {
          .run-svg-anim .stroke-path path,
          .run-svg-anim .stroke-path rect,
          .run-svg-anim .stroke-path line {
            animation: none !important;
          }
        }
      `}</style>
    </div>
  );
};