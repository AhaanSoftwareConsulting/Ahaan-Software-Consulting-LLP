import ctaBg from "../../../../assets/call-to-action.png";

export function CallToAction() {
  return (
    <section
      className="relative overflow-hidden bg-cover bg-top bg-no-repeat md:bg-center"
      style={{ backgroundImage: `url(${ctaBg})` }}
    >
      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/70" />

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-7xl px-6 py-10 md:py-12 lg:py-14">
        
        {/* Heading */}
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="text-2xl font-extrabold leading-tight text-white md:text-4xl xl:text-5xl">
            Ready to Scale Your Business?
          </h2>

          {/* Supporting Text */}
          <p className="mx-auto mt-3 max-w-3xl text-sm leading-relaxed text-white/80 md:text-base lg:text-lg">
            Partner with our experienced technology team to build, improve,
            and scale digital solutions designed around your business goals.
          </p>
        </div>

        {/* Contact Info */}
        <div className="mt-8 flex items-center justify-center gap-8 md:mt-12 md:gap-12 lg:mt-14">
          
          {/* USA */}
          <div className="text-center">
            <h3 className="text-lg font-bold uppercase text-[#E6B33C] sm:text-2xl lg:text-3xl">
              USA
            </h3>

            <p className="mt-1 text-xs uppercase tracking-wider text-white/60">
              Business Enquiries
            </p>

            <a
              href="tel:+16465759575"
              className="mt-3 block text-sm font-semibold text-white transition-colors hover:text-[#E6B33C] sm:text-base lg:text-2xl"
            >
              +1-646-575-9575
            </a>
          </div>

          {/* Divider */}
          <div className="h-20 w-px bg-white/30" />

          {/* INDIA */}
          <div className="text-center">
            <h3 className="text-lg font-bold uppercase text-[#E6B33C] sm:text-2xl lg:text-3xl">
              INDIA
            </h3>

            <p className="mt-1 text-xs uppercase tracking-wider text-white/60">
              Business Enquiries
            </p>

            <a
              href="tel:+919830371143"
              className="mt-3 block text-sm font-semibold text-white transition-colors hover:text-[#E6B33C] sm:text-base lg:text-2xl"
            >
              +91-983-037-1143
            </a>
          </div>
        </div>

        {/* CTA Button */}
        <div className="mt-8 flex justify-center lg:mt-12">
          <a
            href="/contact-us"
            className="
              shine-btn
              flex
              w-full
              items-center
              justify-center
              whitespace-nowrap
              rounded-full
              bg-gradient-to-r
              from-[#C48A18]
              to-[#E6B33C]
              px-7
              py-3.5
              text-center
              text-sm
              font-semibold
              uppercase
              tracking-wide
              text-black
              shadow-xl
              transition-all
              duration-300
              hover:-translate-y-0.5
              hover:from-[#B57A0C]
              hover:to-[#D69D20]
              sm:w-auto
              sm:px-10
              xl:px-12
              xl:py-4
              xl:text-base
            "
          >
            Book a Discovery Call
          </a>
        </div>

      </div>
    </section>
  );
}