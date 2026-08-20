interface BadgeProps {
  title: string;
  value: string;
}

interface ServiceBannerVisualProps {
  imageSrc: string;
  isTransitioning: boolean;
  leftBadge: BadgeProps;
  rightBadge: BadgeProps;
  techIcon: string;
}

export default function ServiceBannerVisual({
  imageSrc,
  isTransitioning,
  leftBadge,
  rightBadge,
  techIcon,
}: ServiceBannerVisualProps) {
  return (
    <div className="relative w-full flex justify-center items-center h-[300px] sm:h-[360px] lg:h-[400px] xl:h-[440px]">
      {/* Visual Background Accent Glow */}
      <div className="absolute w-72 h-72 bg-gradient-to-tr from-amber-200/40 via-sky-200/40 to-indigo-200/30 rounded-full blur-2xl z-0" />

      {/* Laptop Image Container - Scaled to 600px Ratio */}
      <div
        className={`relative z-10 w-full max-w-[420px] sm:max-w-[500px] lg:max-w-[560px] xl:max-w-[600px] transition-all duration-300 transform ${
          isTransitioning
            ? "opacity-0 scale-95 blur-sm"
            : "opacity-100 scale-100 blur-none"
        }`}
      >
        <img
          src={imageSrc}
          alt="Service Visual"
          className="w-full h-auto object-contain drop-shadow-2xl relative z-10"
        />

        {/* Tech Icon Badge (Top Right) */}
        <div className="absolute -top-2 right-6 sm:right-10 z-20 w-9 h-9 sm:w-11 sm:h-11 bg-white/90 backdrop-blur-md rounded-full p-2 shadow-md border border-slate-100 flex items-center justify-center animate-bounce-slow">
          <img
            src={techIcon}
            alt="Tech Icon"
            className="w-full h-full object-contain"
          />
        </div>

        {/* Left Performance Badge */}
        <div className="absolute left-[-12px] sm:left-[-20px] top-[32%] z-20 bg-white/95 backdrop-blur-md px-3 py-2 sm:px-4 sm:py-3 rounded-xl shadow-lg border border-slate-100/80 transform -translate-y-1/2">
          <p className="text-[9px] sm:text-[11px] font-bold tracking-wider text-slate-400 uppercase">
            {leftBadge.title}
          </p>
          <p className="text-sm sm:text-lg lg:text-xl font-black text-slate-800">
            {leftBadge.value}
          </p>
          <div className="w-full bg-slate-100 rounded-full h-1 sm:h-1.5 mt-1 overflow-hidden">
            <div className="bg-sky-500 h-full rounded-full w-[85%]" />
          </div>
        </div>

        {/* Right Uptime Badge */}
        <div className="absolute right-[-12px] sm:right-[-20px] bottom-[18%] z-20 bg-white/95 backdrop-blur-md px-3 py-2 sm:px-4 sm:py-3 rounded-xl shadow-lg border border-slate-100/80">
          <p className="text-[9px] sm:text-[11px] font-bold tracking-wider text-slate-400 uppercase">
            {rightBadge.title}
          </p>
          <p className="text-sm sm:text-lg lg:text-xl font-black text-emerald-600">
            {rightBadge.value}
          </p>
          <div className="flex gap-1 mt-1">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
            <span className="w-2.5 h-1.5 rounded-full bg-emerald-500"></span>
          </div>
        </div>
      </div>
    </div>
  );
}