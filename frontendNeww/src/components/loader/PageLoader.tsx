export const PageLoader = () => {
  return (
    <div className="fixed inset-0 z-[9999] flex min-h-screen items-center justify-center bg-white/60 backdrop-blur-lg">
      <div className="flex flex-col items-center gap-5">
        
        {/* Loader */}
        <div className="relative h-16 w-16">
          <div className="absolute inset-0 rounded-full border-4 border-[#161616]/20" />

          <div className="absolute inset-0 animate-spin rounded-full border-4 border-transparent border-t-[#161616]" />
        </div>

        {/* Text */}
        <p className="text-sm font-medium tracking-[0.3em] text-[#161616]">
          LOADING
        </p>

      </div>
    </div>
  );
};