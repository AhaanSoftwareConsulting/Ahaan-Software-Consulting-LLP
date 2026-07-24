import {
  FacebookLogo,
  MapPin,
  PhoneCall,
  LinkedinLogo,
  EnvelopeSimple,
  GithubLogoIcon,
  BehanceLogoIcon,
  DribbbleLogoIcon,
  CaretDown,
} from "@phosphor-icons/react";
import { useState } from "react";
const socialLinks = [
  {
    name: "Facebook",
    url: "https://www.facebook.com/ahaansoftwareconsulting",
    Icon: FacebookLogo,
    gradient: "hover:bg-gradient-to-r hover:from-[#1877f2] hover:to-[#4a8df8]",
    tooltipGradient: "bg-gradient-to-r from-[#1877f2] to-[#4a8df8]",
  },

  {
    name: "LinkedIn",
    url: "https://www.linkedin.com/company/ahaansoftware",
    Icon: LinkedinLogo,
    gradient: "hover:bg-gradient-to-r hover:from-[#0077b5] hover:to-[#00a0dc]",
    tooltipGradient: "bg-gradient-to-r from-[#0077b5] to-[#00a0dc]",
  },
  {
    name: "Github",
    url: "https://github.com/AhaanSoftwareConsulting",
    Icon: GithubLogoIcon,
    gradient: "hover:bg-gradient-to-r hover:from-[#333333] hover:to-[#666666]",
    tooltipGradient: "bg-gradient-to-r from-[#333333] to-[#666666]",
  },
  {
    name: "Dribbble",
    url: "https://dribbble.com/ahaan-software",
    Icon: DribbbleLogoIcon,
    gradient: "hover:bg-gradient-to-r hover:from-[#9f0175] hover:to-[#e992d2]",
    tooltipGradient: "bg-gradient-to-r from-[#9f0175] to-[#e992d2]",
  },
  {
    name: "Behance",
    url: "https://www.behance.net/ahaansoftware01",
    Icon: BehanceLogoIcon,
    gradient: "hover:bg-gradient-to-r hover:from-[#0124e8] hover:to-[#758aff]",
    tooltipGradient: "bg-gradient-to-r from-[#0124e8] to-[#758aff]",
  },
];

export const Footer = () => {
  type SectionKey = 'about' | 'pages' | 'quickLinks' | 'contact';
  const [openSection, setOpenSection] = useState<SectionKey | null>(null)

  const toggleSection = (sectionKey: SectionKey) => {
    setOpenSection((prev) => (prev === sectionKey ? null : sectionKey));
  };

  const pages = [
    { name: "Home", url: "/" },
    { name: "About Us", url: "/about-us" },
    { name: "Services", url: "/service" },
    { name: "Solutions", url: "/solution" },
    { name: "Careers", url: "/career" },
  ];

  const quickLinks = [
    { name: "Cookie Policy", url: "/cookie-policy" },
    { name: "Environmental Policy", url: "/environmental-policy" },
    { name: "Grievance Policy", url: "/grievance-policy" },
    { name: "Information Security Policy", url: "/information-security-policy" },
    { name: "Intellectual Property Policy", url: "/intellectual-property-policy" },
  ];
  return (
    <footer className="relative overflow-hidden bg-[#000] text-white">

      <div className="mx-auto w-full max-w-[1600px] px-4 lg:px-6">
        {/* ================= Newsletter ================= */}

        <div className="flex flex-col items-center justify-between gap-10 py-14 lg:flex-row">
          {/* Left */}
          <div className="flex flex-col items-center gap-6 text-center lg:flex-row lg:items-center lg:text-left">
            {/* Logo */}
            <img
              src="https://ahaanmedia.com/ahaanwebsite/layouts/asc.webp"
              alt="Logo"
              className="h-14 w-auto object-contain sm:h-16"
            />

            {/* Divider */}
            <div className="hidden h-16 w-[2px] bg-[#E6B33C] lg:block" />

            {/* Content */}
            <div>
              <h2 className="text-2xl font-semibold leading-tight sm:text-2xl lg:text-3xl">
                News Subscription
              </h2>

              <p className="mt-2 text-sm text-white sm:text-base lg:mt-3">
                Get Latest Deals from Waker's Inbox & Subscribe Now
              </p>
            </div>
          </div>

          {/* Right */}
          <div className="flex w-full flex-col gap-4 md:flex-row lg:w-auto">
            <div className="relative">
              <input
                type="email"
                placeholder="Email Address"
                className="h-14 w-full  border border-gray-700 bg-transparent px-6 pr-14 outline-none placeholder:text-gray-400 md:w-[380px]"
              />

              <EnvelopeSimple
                size={22}
                className="absolute right-5 top-1/2 -translate-y-1/2 text-[#E6B33C]"
              />
            </div>

            <button
              className="shine-btn relative overflow-hidden uppercase
                bg-gradient-to-r
                from-[#C48A18]
                to-[#E6B33C]
                px-5
                xl:px-6
                2xl:px-8
                py-3
                xl:py-3.5
                text-sm
                xl:text-base
                font-semibold
                text-black
                shadow-xl
                transition-all
                duration-300
                hover:-translate-y-0.5
                hover:from-[#B57A0C]
                hover:to-[#D69D20]"
            >
              Subscribe
            </button>
          </div>
        </div>

        {/* Divider */}

        <div className="border-t border-gray-800"></div>

        {/* ================= Footer Grid Start ================= */}

        <div className="grid gap-4 py-5 sm:gap-10 xl:gap-14 sm:grid-cols-2 lg:[grid-template-columns:2fr_1fr_1.3fr_2fr] ">

          {/* ================= ABOUT COMPANY ================= */}
          <div className="border-b border-white/10 pb-4 sm:border-none sm:pb-0">
            <button
              onClick={() => toggleSection("about")}
              className="flex w-full items-center justify-between text-left sm:!cursor-default "
            >
              <div>
                <h3 className="text-2xl font-semibold uppercase">About Company</h3>
                <div className="hidden sm:block mt-2 h-[2px] w-24 bg-[#E6B33C] sm:mt-5"></div>
              </div>
              <CaretDown
                size={20}
                className={`transition-transform duration-300 sm:hidden ${openSection === "about" ? "rotate-180" : ""
                  }`}
              />
            </button>

            <div
  className={`grid transition-all duration-300 ease-in-out sm:grid-rows-[1fr] sm:opacity-100 sm:!mt-8 ${
    openSection === "about"
      ? "grid-rows-[1fr] opacity-100 mt-6"
      : "grid-rows-[0fr] opacity-0 mt-0"
  }`}
>
              <div className="overflow-hidden">
                <p className="leading-8 text-gray-400">
                  Professionally redefine transparent ROI through low-risk
                  high-yield imperatives. Progressively create empowered users via
                  team driven solutions.
                </p>

                <div className="mt-6 flex pl-4 gap-2.5 xl:gap-4 sm:mt-12">
                  {socialLinks.map(
                    ({ name, url, Icon, gradient, tooltipGradient }) => (
                      <a
                        key={name}
                        href={url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`group relative flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-xl text-[#757575] transition-all duration-350 ease-in-out hover:-translate-y-1 hover:text-white ${gradient}`}
                      >
                        {/* Tooltip */}
                        <span
                          className={`pointer-events-none absolute -top-12 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full px-2.5 py-1 text-xs text-white opacity-0 transition-all duration-300 ease-in-out group-hover:top-[-40px] group-hover:opacity-100 ${tooltipGradient}`}
                        >
                          {name}
                          <span
                            className={`absolute -bottom-1 left-1/2 h-2 w-2 -translate-x-1/2 rotate-45 ${tooltipGradient}`}
                          />
                        </span>

                        <Icon size={20} weight="fill" />
                      </a>
                    )
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* ================= PAGES ================= */}
          <div className="border-b border-white/10 pb-4 sm:border-none sm:pb-0">
            <button
              onClick={() => toggleSection("pages")}
              className="flex w-full items-center justify-between text-left sm:!cursor-default"
            >
              <div>
                <h3 className="text-2xl font-semibold uppercase">Pages</h3>
                <div className="hidden sm:block mt-2 h-[2px] w-24 bg-[#E6B33C] sm:mt-5"></div>
              </div>
              <CaretDown
                size={20}
                className={`transition-transform duration-300 sm:hidden ${openSection === "pages" ? "rotate-180" : ""
                  }`}
              />
            </button>

            <div
              className={`grid transition-all duration-300 ease-in-out sm:grid-rows-[1fr] sm:opacity-100 sm:!mt-8 ${openSection === "pages"
                ? "grid-rows-[1fr] opacity-100 mt-6"
                : "grid-rows-[0fr] opacity-0 mt-0"
                }`}
            >
              <div className="overflow-hidden">
                <ul className="space-y-4 sm:space-y-5">
                  {pages.map((item, index) => (
                    <li
                      key={index}
                      className="group flex cursor-pointer items-center gap-3 text-gray-300 transition hover:text-white"
                    >
                      <span className="text-[#E6B33C] transition group-hover:translate-x-1">
                        →
                      </span>
                      <a href={item.url} target="_blank" rel="noopener noreferrer">{item.name}</a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* ================= QUICK LINKS ================= */}
          <div className="border-b border-white/10 pb-4 sm:border-none sm:pb-0">
            <button
              onClick={() => toggleSection("quickLinks")}
              className="flex w-full items-center justify-between text-left sm:!cursor-default"
            >
              <div>
                <h3 className="text-2xl font-semibold uppercase">Quick Links</h3>
                <div className="hidden sm:block mt-2 h-[2px] w-24 bg-[#E6B33C] sm:mt-5"></div>
              </div>
              <CaretDown
                size={20}
                className={`transition-transform duration-300 sm:hidden ${openSection === "quickLinks" ? "rotate-180" : ""
                  }`}
              />
            </button>

            <div
              className={`grid transition-all duration-300 ease-in-out sm:grid-rows-[1fr] sm:opacity-100 sm:!mt-8 ${openSection === "quickLinks"
                ? "grid-rows-[1fr] opacity-100 mt-6"
                : "grid-rows-[0fr] opacity-0 mt-0"
                }`}
            >
              <div className="overflow-hidden">
                <ul className="space-y-4 sm:space-y-5">
                  {quickLinks.map((item, index) => (
                    <li
                      key={index}
                      className="group flex cursor-pointer items-center gap-3 text-gray-300 transition hover:text-white"
                    >
                      <span className="text-[#E6B33C] transition group-hover:translate-x-1">
                        →
                      </span>
                      <a href={item.url} target="_blank" rel="noopener noreferrer">{item.name}</a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* ================= CONTACT INFO ================= */}
          <div>
            <button
              onClick={() => toggleSection("contact")}
              className="flex w-full items-center justify-between text-left sm:!cursor-default"
            >
              <div>
                <h3 className="text-2xl font-semibold uppercase">Contact Info</h3>
                <div className="hidden sm:block mt-2 h-[2px] w-24 bg-[#E6B33C] sm:mt-5"></div>
              </div>
              <CaretDown
                size={20}
                className={`transition-transform duration-300 sm:hidden ${openSection === "contact" ? "rotate-180" : ""
                  }`}
              />
            </button>

            <div
              className={`grid transition-all duration-300 ease-in-out sm:grid-rows-[1fr] sm:opacity-100 sm:!mt-8 ${openSection === "contact"
                ? "grid-rows-[1fr] opacity-100 mt-6"
                : "grid-rows-[0fr] opacity-0 mt-0"
                }`}
            >
              <div className="overflow-hidden space-y-6 sm:space-y-8">
                {/* Address */}
                <div className="flex items-start gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white/10">
                    <MapPin size={22} weight="fill" className="text-[#E6B33C]" />
                  </div>
                  <div>
                    <p className="mt-1 leading-7 text-gray-400">
                      Bengal Eco Intelligent Park, EM <br />
                      Block, Sector V, Kolkata-700 091
                    </p>
                  </div>
                </div>

                {/* Phone */}
                <div className="flex items-start gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white/10">
                    <PhoneCall
                      size={22}
                      weight="fill"
                      className="text-[#E6B33C]"
                    />
                  </div>
                  <div>
                    <a
                      href="tel:+16465759575"
                      className="mt-1 block text-gray-400 hover:text-[#E6B33C]"
                    >
                      +1-646-575-9575
                    </a>
                    <a
                      href="tel:+919830371143"
                      className="block text-gray-400 hover:text-[#E6B33C]"
                    >
                      +91-983-037-1143
                    </a>
                  </div>
                </div>

                {/* Email */}
                <div className="flex items-start gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white/10">
                    <EnvelopeSimple
                      size={22}
                      weight="fill"
                      className="text-[#E6B33C]"
                    />
                  </div>
                  <div>
                    <a
                      href="mailto:support@ahaansoftware.com"
                      className="mt-1 block text-gray-400 hover:text-[#E6B33C]"
                    >
                      support@ahaansoftware.com
                    </a>
                    <a
                      href="mailto:hr@ahaansoftware.com"
                      className="mt-1 block text-gray-400 hover:text-[#E6B33C]"
                    >
                      hr@ahaansoftware.com
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Divider */}
        <div className="border-t border-gray-800"></div>

        {/* Bottom Footer */}
        <div className="flex flex-col items-center justify-between gap-6 py-8 text-center lg:flex-row">
          <p className="text-gray-400 text-sm">
            © 2026{" "}
            <span className="text-[#E6B33C] font-semibold">
              Ahaan Software Consulting LLP.{" "}
            </span>
            All Rights Reserved.
          </p>

          <div className="flex flex-wrap items-center gap-6 text-sm text-gray-400">
            <a href="/privacy-policy" target="_blank" rel="noopener noreferrer" className="transition hover:text-[#6c4cff]">
              Privacy Policy
            </a>

            <span className="text-gray-700">|</span>

            <a href="/terms-conditions" target="_blank" rel="noopener noreferrer" className="transition hover:text-[#6c4cff]">
              Terms & Conditions
            </a>
          </div>
        </div>
      </div>

      {/* Decorative Blur */}
      <div className="pointer-events-none absolute -bottom-32 -left-20 h-72 w-72 rounded-full bg-[#6c4cff]/20 blur-[140px]"></div>

      <div className="pointer-events-none absolute -top-20 -right-20 h-72 w-72 rounded-full bg-[#6c4cff]/10 blur-[140px]"></div>
    </footer>
  );
};
