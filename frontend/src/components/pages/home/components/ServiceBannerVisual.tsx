import React from "react";

interface BadgeData {
  title: string;
  value: string;
  type?: "chart" | "bars";
}

interface ServiceBannerVisualProps {
  imageSrc: string;
  isTransitioning: boolean;
  leftBadge?: BadgeData;
  rightBadge?: BadgeData;
  techIcon?: string;
}

export default function ServiceBannerVisual({
  imageSrc,
  isTransitioning,
  leftBadge,
  rightBadge,
  techIcon,
}: ServiceBannerVisualProps) {
  return (
    /* Increased container height for vertical breathing space */
    <div className="relative flex items-center justify-center w-full h-[320px] sm:h-[400px] lg:h-[480px] select-none">
      {/* Background glow scaled down */}
      <div className="absolute w-[180px] h-[180px] sm:w-[240px] sm:h-[240px] rounded-full bg-[#E6B33C]/10 blur-[80px] pointer-events-none" />

      {/* Compact Laptop scale max-w-[360px] lg:max-w-[420px] */}
      <div
        className={`relative z-10 w-full max-w-[340px] sm:max-w-[380px] lg:max-w-[420px] transition-all duration-500 ease-out transform ${
          isTransitioning
            ? "opacity-0 scale-95 translate-x-4 blur-sm"
            : "opacity-100 scale-100 translate-x-0 blur-none"
        }`}
      >
        {/* Compact Laptop Graphic */}
        <img
          src={imageSrc}
          alt="Laptop Mockup"
          className="w-full h-auto object-contain drop-shadow-[0_12px_20px_rgba(0,0,0,0.12)]"
          draggable={false}
        />

        {/* LEFT FLOATING BADGE */}
        {leftBadge && (
          <div className="absolute -left-4 sm:-left-8 top-[30%] -translate-y-1/2 bg-white/95 backdrop-blur-md px-2.5 py-2 sm:px-3 sm:py-2.5 rounded-xl shadow-[0_10px_25px_rgba(0,0,0,0.08)] border border-slate-100 animate-bounce-slow z-20 min-w-[95px] sm:min-w-[120px]">
            <p className="text-[9px] sm:text-[10px] font-semibold text-slate-400 uppercase tracking-wider">
              {leftBadge.title}
            </p>
            <p className="text-sm sm:text-base font-black text-slate-800 mt-0.5">
              {leftBadge.value}
            </p>
            <div className="w-full h-1 bg-slate-100 rounded-full mt-1 overflow-hidden">
              <div className="h-full bg-sky-500 rounded-full w-[92%]" />
            </div>
          </div>
        )}

        {/* RIGHT FLOATING BADGE */}
        {rightBadge && (
          <div className="absolute -right-2 sm:-right-6 bottom-[8%] bg-white/95 backdrop-blur-md px-2.5 py-2 sm:px-3 sm:py-2.5 rounded-xl shadow-[0_10px_25px_rgba(0,0,0,0.08)] border border-slate-100 animate-float-delayed z-20 min-w-[95px] sm:min-w-[120px]">
            <p className="text-[9px] sm:text-[10px] font-semibold text-slate-400 uppercase tracking-wider">
              {rightBadge.title}
            </p>
            <p className="text-sm sm:text-base font-black text-emerald-600 mt-0.5">
              {rightBadge.value}
            </p>
            <div className="flex items-end gap-1 h-2 mt-1">
              <div className="w-1.5 h-[40%] bg-emerald-200 rounded-xs" />
              <div className="w-1.5 h-[65%] bg-emerald-300 rounded-xs" />
              <div className="w-1.5 h-[50%] bg-emerald-400 rounded-xs" />
              <div className="w-1.5 h-[100%] bg-emerald-500 rounded-xs" />
            </div>
          </div>
        )}

        {/* TECH FLOATING BADGE */}
        {techIcon && (
          <div className="absolute right-[5%] -top-3 sm:-top-5 w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-white/95 backdrop-blur-md shadow-md border border-slate-100 flex items-center justify-center p-1.5 z-20 animate-float">
            <img
              src={techIcon}
              alt="Tech Icon"
              className="w-full h-full object-contain"
            />
          </div>
        )}
      </div>
    </div>
  );
}