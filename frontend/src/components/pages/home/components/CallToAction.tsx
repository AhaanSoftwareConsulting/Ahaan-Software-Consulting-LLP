import ctaBg from "../../../../assets/call-to-action.png";

export function CallToAction() {
  return (
    <section
      className="relative bg-cover bg-top md:bg-center bg-no-repeat"
      style={{ backgroundImage: `url(${ctaBg})` }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/65"></div>

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-7xl px-6 py-8">
        {/* Heading */}
        <h2 className="text-center text-lg md:text-3xl xl:text-5xl  font-extrabold text-[#fff] leading-tight">
          Ready to Innovate Your Business?
        </h2>

        {/* Contact Info */}
        <div className="mt-5 lg:mt-14 flex items-center justify-center gap-6 md:gap-10">
          {/* USA */}
          <div className="text-center">
            <h3 className="text-base font-bold uppercase text-[#E6B33C] sm:text-2xl lg:text-3xl">
              USA
            </h3>

            <a
              href="tel:+16465759575"
              className="mt-4 block text-sm font-semibold text-white transition hover:text-[#E6B33C] sm:text-base lg:text-2xl"
            >
              +1-646-575-9575
            </a>
          </div>

          {/* Divider - Desktop Only */}
          <div className="h-20 w-px bg-white/30 md:block"></div>

          {/* INDIA */}
          <div className="text-center">
            <h3 className="text-base font-bold uppercase text-[#E6B33C] sm:text-2xl lg:text-3xl">
              INDIA
            </h3>

            <a
              href="tel:+919830371143"
              className="mt-4 block text-sm font-semibold text-white transition hover:text-[#E6B33C] sm:text-base lg:text-2xl"
            >
              +91-983-037-1143
            </a>
          </div>
        </div>

        {/* CTA Button */}
        <div className="mt-5 lg:mt-16 flex justify-center">
          <a 
          href="/contact-us"
          className="
      shine-btn
      flex w-full items-center justify-center
      whitespace-nowrap
      rounded-lg
      bg-gradient-to-r
      from-[#C48A18]
      to-[#E6B33C]
      px-6
      py-3
      text-center
      text-xs
      sm:text-sm
      font-semibold
      uppercase
      text-black
      shadow-xl
      transition-all
      duration-300
      hover:-translate-y-0.5
      hover:from-[#B57A0C]
      hover:to-[#D69D20]
      sm:w-auto
      xl:px-8
      xl:py-3.5
      xl:text-base">
            Talk to a Technology Consultant
          </a>
        </div>
      </div>
    </section>
  );
}