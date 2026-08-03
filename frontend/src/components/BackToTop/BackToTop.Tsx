import React, { useState, useEffect } from "react";

const BackToTop: React.FC = () => {
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [scrollProgress, setScrollProgress] = useState<number>(0);

  useEffect(() => {
    const handleScroll = () => {
      // মোট স্ক্রলেবল হাইট ক্যালকুলেশন
      const totalHeight =
        document.documentElement.scrollHeight -
        document.documentElement.clientHeight;
      const currentScroll = window.scrollY || document.documentElement.scrollTop;

      // প্রোগ্রেস পার্সেন্টেজ (0 থেকে 100)
      if (totalHeight > 0) {
        const progress = (currentScroll / totalHeight) * 100;
        setScrollProgress(progress);
      }

      // ২০০px স্ক্রল হলে দৃশ্যমান হবে
      if (currentScroll > 200) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Initial Check

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  // SVG Circle Calculations
  const radius = 20;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset =
    circumference - (scrollProgress / 100) * circumference;

  return (
    <div
      className={`fixed bottom-6 transition-all duration-300 ease-in-out ${
        isVisible ? "opacity-100 visible" : "opacity-0 invisible"
      }`}
      style={{
        right: "20px",
        zIndex: 99999,
      }}
    >
      <button
        type="button"
        onClick={scrollToTop}
        aria-label="Back to top"
        className="group relative flex h-14 w-14 items-center justify-center rounded-full shadow-2xl transition-transform duration-300 hover:scale-110 focus:outline-none"
        style={{ backgroundColor: "#000000" }} // Force Pure Black Background
      >
        {/* SVG Progress Circle */}
        <svg
          className="absolute h-full w-full -rotate-90 pointer-events-none"
          viewBox="0 0 50 50"
        >
          {/* Background Gray Border Ring */}
          <circle
            cx="25"
            cy="25"
            r={radius}
            stroke="#333333"
            strokeWidth="3"
            fill="none"
          />
          {/* Dynamic Active Progress Ring */}
          <circle
            cx="25"
            cy="25"
            r={radius}
            stroke="#CF951C"
            strokeWidth="3"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            fill="none"
            style={{
              transition: "stroke-dashoffset 100ms linear",
            }}
          />
        </svg>

        {/* Up Arrow Icon */}
        <svg
          className="relative z-10 h-6 w-6 text-white transition-transform duration-300 group-hover:-translate-y-1"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2.5}
            d="M5 10l7-7m0 0l7 7m-7-7v18"
          />
        </svg>
      </button>
    </div>
  );
};

export default BackToTop;