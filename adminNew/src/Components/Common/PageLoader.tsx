export default function PageLoader() {
  return (
    <div
      className="
        fixed
        inset-0
        z-[99999]
        flex
        items-center
        justify-center
        bg-white/80
        backdrop-blur-sm
      "
    >
      <div
        className="
          h-14
          w-14
          animate-spin
          rounded-full
          border-4
          border-amber-400
          border-t-transparent
        "
      />
    </div>
  );
}