import React, { useEffect, useRef, useState } from "react";

export const Showcase: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [animKey, setAnimKey] = useState<number>(0);

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

  const handleCenterHover = () => {
    setAnimKey((prev) => prev + 1);
  };

  return (
    <div
      ref={containerRef}
      className="relative flex min-h-screen w-full flex-col items-center justify-center overflow-hidden bg-[#070c14] px-4 py-8 font-sans selection:bg-amber-500/30"
    >
      {/* Background Ambient Glow & Light Mesh Grid */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-amber-500/10 blur-[150px] pointer-events-none rounded-full" />
    

      {/* Title Header */}
      <div className="z-20 mb-8 text-center space-y-2">
        <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-100 to-amber-200 tracking-tight">
          Innovative Solutions for Modern Businesses
        </h2>
        <div className="h-[2px] w-24 mx-auto bg-gradient-to-r from-transparent via-amber-500 to-transparent" />
      </div>

      {/* Diagram Area */}
      <div className="relative z-20 w-full max-w-[1280px] px-2 flex justify-center items-center">
        <svg
          key={animKey}
          viewBox="0 0 1100 640"
          xmlns="http://www.w3.org/2000/svg"
          className={`block w-full h-auto max-h-[620px] drop-shadow-2xl ${
            isVisible ? "run-svg-anim" : ""
          }`}
        >
          <defs>
            {/* Glow and Blur Filters */}
            <filter id="amberGlow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="4" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>

            <filter id="centerGlow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="15" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>

            {/* Gradient Definitions */}
            <linearGradient id="cardGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#0f172a" stopOpacity="0.9" />
              <stop offset="100%" stopColor="#030712" stopOpacity="0.95" />
            </linearGradient>

            <linearGradient id="goldBorder" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#fbbf24" stopOpacity="0.9" />
              <stop offset="50%" stopColor="#78350f" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#d97706" stopOpacity="0.8" />
            </linearGradient>

            <radialGradient id="centerCore" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#1e1b4b" />
              <stop offset="60%" stopColor="#0f172a" />
              <stop offset="100%" stopColor="#020617" />
            </radialGradient>
          </defs>

          {/* Central Orbit Ring (Center Node Positioning) */}
          <g className="orbit-group">
            <circle cx="550" cy="320" r="140" fill="none" stroke="#f59e0b" strokeWidth="1" strokeDasharray="4,6" opacity="0.3" />
            <circle cx="550" cy="320" r="220" fill="none" stroke="#f59e0b" strokeWidth="1" strokeDasharray="6,8" opacity="0.15" />
          </g>

          {/* Orthogonal / Stepped Connectors (2nd Image Style) */}
          <g className="connector-lines" stroke="#f59e0b" strokeWidth="1.8" fill="none" opacity="0.8">
            {/* Left Side Connectors */}
            <path d="M 378,86 L 550,86 L 550,220" strokeDasharray="5,5" className="animated-dash" />
            <path d="M 378,242 L 440,242 Q 450,242 450,252 L 450,320 L 470,320" strokeDasharray="5,5" className="animated-dash" />
            <path d="M 378,398 L 440,398 Q 450,398 450,388 L 450,320 L 470,320" strokeDasharray="5,5" className="animated-dash" />
            <path d="M 378,554 L 550,554 L 550,420" strokeDasharray="5,5" className="animated-dash" />

            {/* Right Side Connectors */}
            <path d="M 722,86 L 550,86 L 550,220" strokeDasharray="5,5" className="animated-dash" />
            <path d="M 722,242 L 660,242 Q 650,242 650,252 L 650,320 L 630,320" strokeDasharray="5,5" className="animated-dash" />
            <path d="M 722,398 L 660,398 Q 650,398 650,388 L 650,320 L 630,320" strokeDasharray="5,5" className="animated-dash" />
            <path d="M 722,554 L 550,554 L 550,420" strokeDasharray="5,5" className="animated-dash" />
          </g>

          {/* Center Logo Hub */}
          <g
            className="cursor-pointer transition-transform duration-500 ease-out hover:scale-110 origin-[550px_320px]"
            onMouseEnter={handleCenterHover}
          >
            {/* Outer Glow Circle */}
            <circle cx="550" cy="320" r="100" fill="#f59e0b" opacity="0.08" filter="url(#centerGlow)" />
            {/* Center Circle */}
            <circle cx="550" cy="320" r="80" fill="url(#centerCore)" stroke="url(#goldBorder)" strokeWidth="2.5" filter="url(#amberGlow)" />
            <circle cx="550" cy="320" r="74" fill="none" stroke="#ffffff" strokeWidth="1" opacity="0.2" />

            {/* Brand Logo */}
            <image
              href="https://ahaanmedia.com/asc/layouts/fav.png"
              x="495"
              y="265"
              width="110"
              height="110"
              className="drop-shadow-[0_0_12px_rgba(245,158,11,0.6)]"
            />
          </g>

          {/* Left Feature Boxes */}
          <g className="boxes-group">
            {/* Node 1 */}
            <g transform="translate(62, 54)">
              <rect width="316" height="64" rx="10" fill="url(#cardGrad)" stroke="url(#goldBorder)" strokeWidth="1.5" />
              <text x="158" y="38" textAnchor="middle" fill="#f8fafc" fontSize="15" fontWeight="600" letterSpacing="0.2">
                Web/Graphics Design
              </text>
            </g>

            {/* Node 2 */}
            <g transform="translate(62, 210)">
              <rect width="316" height="64" rx="10" fill="url(#cardGrad)" stroke="url(#goldBorder)" strokeWidth="1.5" />
              <text x="158" y="38" textAnchor="middle" fill="#f8fafc" fontSize="15" fontWeight="600" letterSpacing="0.2">
                UI/UX Design
              </text>
            </g>

            {/* Node 3 */}
            <g transform="translate(62, 366)">
              <rect width="316" height="64" rx="10" fill="url(#cardGrad)" stroke="url(#goldBorder)" strokeWidth="1.5" />
              <text x="158" y="38" textAnchor="middle" fill="#f8fafc" fontSize="15" fontWeight="600" letterSpacing="0.2">
                Web Development
              </text>
            </g>

            {/* Node 4 */}
            <g transform="translate(62, 522)">
              <rect width="316" height="64" rx="10" fill="url(#cardGrad)" stroke="url(#goldBorder)" strokeWidth="1.5" />
              <text x="158" y="38" textAnchor="middle" fill="#f8fafc" fontSize="15" fontWeight="600" letterSpacing="0.2">
                IT Business Consultancy
              </text>
            </g>
          </g>

          {/* Right Feature Boxes */}
          <g className="boxes-group">
            {/* Node 1 */}
            <g transform="translate(722, 54)">
              <rect width="316" height="64" rx="10" fill="url(#cardGrad)" stroke="url(#goldBorder)" strokeWidth="1.5" />
              <text x="158" y="38" textAnchor="middle" fill="#f8fafc" fontSize="15" fontWeight="600" letterSpacing="0.2">
                Custom Web Application
              </text>
            </g>

            {/* Node 2 */}
            <g transform="translate(722, 210)">
              <rect width="316" height="64" rx="10" fill="url(#cardGrad)" stroke="url(#goldBorder)" strokeWidth="1.5" />
              <text x="158" y="38" textAnchor="middle" fill="#f8fafc" fontSize="14" fontWeight="600" letterSpacing="0.2">
                Mobile App Design & Dev
              </text>
            </g>

            {/* Node 3 */}
            <g transform="translate(722, 366)">
              <rect width="316" height="64" rx="10" fill="url(#cardGrad)" stroke="url(#goldBorder)" strokeWidth="1.5" />
              <text x="158" y="38" textAnchor="middle" fill="#f8fafc" fontSize="15" fontWeight="600" letterSpacing="0.2">
                Digital Marketing & SEO
              </text>
            </g>

            {/* Node 4 */}
            <g transform="translate(722, 522)">
              <rect width="316" height="64" rx="10" fill="url(#cardGrad)" stroke="url(#goldBorder)" strokeWidth="1.5" />
              <text x="158" y="38" textAnchor="middle" fill="#f8fafc" fontSize="14" fontWeight="600" letterSpacing="0.2">
                Maintenance & Tech Support
              </text>
            </g>
          </g>
        </svg>
      </div>

      {/* Orbit & Line Animations */}
      <style>{`
        @keyframes dashFlow {
          0% {
            stroke-dashoffset: 40;
          }
          100% {
            stroke-dashoffset: 0;
          }
        }

        .run-svg-anim .animated-dash {
          animation: dashFlow 1.2s linear infinite;
        }

        @keyframes orbitRotate {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }

        .run-svg-anim .orbit-group {
          transform-origin: 550px 320px;
          animation: orbitRotate 40s linear infinite;
        }

        @media (prefers-reduced-motion: reduce) {
          .run-svg-anim .animated-dash,
          .run-svg-anim .orbit-group {
            animation: none !important;
          }
        }
      `}</style>
    </div>
  );
};