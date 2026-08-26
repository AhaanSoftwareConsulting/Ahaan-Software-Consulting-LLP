import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { getAllSolutions, type WPSolution } from "../../../api/WordpressAPI";
import {
  FacebookLogo,
  InstagramLogo,
  LinkedinLogo,
  SortAscendingIcon,
  X,
  PhoneOutgoingIcon,
  MapPinIcon,
  AlarmIcon,
  CaretDownIcon,
} from "@phosphor-icons/react";

import { menuData } from "./menuData";
import { MobileSidebar } from "./MobileSidebar";
import { MegaMenu } from "./MegaMenu";

export const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [solutions, setSolutions] = useState<WPSolution[]>([]);

  useEffect(() => {
    const fetchSolutions = async () => {
      try {
        const data = await getAllSolutions();
        setSolutions(data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchSolutions();
  }, []);

  return (
    <header className="relative w-full bg-white shadow-sm z-50">
      {/* ================= TOP HEADER (1024px এবং তার উপরে থাকবে) ================= */}
      <div className="hidden border-b border-gray-200 lg:block">
        <div className="mx-auto flex p-4 lg:py-5 lg:px-6 xl:p-6 max-w-[1600px] items-center justify-between 2xl:px-10">
          {/* Logo */}
          <a href="/">
            <img
              src="https://ahaanmedia.com/ahaanwebsite/layouts/asc.webp"
              alt="Logo"
              className="h-11 lg:h-12 xl:h-14 object-contain shrink-0"
            />
          </a>

          {/* Right Section */}
          <div className="flex items-center">
            {/* Phone */}
            <div className="flex items-center gap-2 lg:gap-3 xl:gap-4 px-3 lg:px-4 xl:px-7">
              <PhoneOutgoingIcon
                size={34}
                weight="light"
                className="text-[#CE8827] w-8 h-8 xl:w-9 xl:h-9 shrink-0"
              />
              <div className="whitespace-nowrap">
                <a href="tel:+16465759575" className="text-xs lg:text-[15px] xl:text-[17px] font-semibold block">
                  +1-646-575-9575
                </a>
                <a href="mailto:support@ahaansoftware.com" className="text-[11px] lg:text-xs xl:text-sm text-gray-500">
                  support@ahaansoftware.com
                </a>
              </div>
            </div>

            <div className="h-11 lg:h-12 xl:h-14 w-px bg-gray-300" />

            {/* Address */}
            <div className="flex items-center gap-2 lg:gap-3 xl:gap-4 px-3 lg:px-4 xl:px-7">
              <MapPinIcon size={34} weight="light" className="text-[#CE8827] w-8 h-8 xl:w-9 xl:h-9 shrink-0" />
              <div className="whitespace-nowrap">
                <h5 className="text-xs lg:text-[15px] xl:text-[17px] font-semibold">
                  Bengal Eco Intelligent Park
                </h5>
                <p className="text-[11px] lg:text-xs xl:text-sm text-gray-500">Sector V, Kolkata </p>
              </div>
            </div>

            <div className="h-11 lg:h-12 xl:h-14 w-px bg-gray-300" />

            {/* Time */}
            <div className="flex items-center gap-2 lg:gap-3 xl:gap-4 px-3 lg:px-4 xl:px-7">
              <AlarmIcon size={34} weight="light" className="text-[#CE8827] w-8 h-8 xl:w-9 xl:h-9 shrink-0" />
              <div className="whitespace-nowrap">
                <h5 className="text-xs lg:text-[15px] xl:text-[17px] font-semibold">10:00 AM to 8:00 PM</h5>
                <p className="text-[11px] lg:text-xs xl:text-sm text-gray-500">Monday to Friday</p>
              </div>
            </div>

            {/* Social Icons */}
            <div className="ml-3 lg:ml-4 xl:ml-7 flex items-center gap-3 xl:gap-5 shrink-0">
              <a href="https://www.instagram.com/ahaansoftware" target="_blank" rel="noopener noreferrer">
                <InstagramLogo size={24} weight="light" className="text-[#CE8827] w-6 h-6 xl:w-7 xl:h-7" />
              </a>
              <a href="https://www.facebook.com/ahaansoftware" target="_blank" rel="noopener noreferrer">
                <FacebookLogo size={24} weight="light" className="text-[#CE8827] w-6 h-6 xl:w-7 xl:h-7" />
              </a>
              <a href="https://www.linkedin.com/company/ahaansoftware" target="_blank" rel="noopener noreferrer">
                <LinkedinLogo size={24} weight="light" className="text-[#CE8827] w-6 h-6 xl:w-7 xl:h-7" />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* ================= NAVBAR ================= */}
      <nav className="relative bg-[#161616] shadow-lg">
        <div className="mx-auto max-w-[1600px] px-2.5 md:px-4 lg:px-6 2xl:px-10">
          <div className="flex h-16 lg:h-20 items-center justify-between">
            {/* ================= MOBILE HEADER (1023px পর্যন্ত) ================= */}
            <div className="flex w-full items-center justify-between lg:hidden">
              <NavLink to="/">
                <img
                  src="https://ahaanmedia.com/ahaanwebsite/layouts/asc.webp"
                  alt="logo"
                  className="h-10 w-28 object-contain"
                />
              </NavLink>

              <div className="flex items-center gap-2">
                <NavLink
                  to="https://calendly.com/leads-ahaansoftware/free-consultation"
                  className="bg-gradient-to-r from-[#C48A18] to-[#E6B33C] px-3 py-2 rounded-full text-[11px] sm:text-[12px] font-semibold text-black whitespace-nowrap"
                >
                  Book a Discovery Call
                </NavLink>

                <a
                  href="tel:+16465759575"
                  className="flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-full bg-gradient-to-r from-[#C48A18] to-[#E6B33C] text-black shadow-lg"
                >
                  <PhoneOutgoingIcon size={18} weight="light" />
                </a>

                <button
                  onClick={() => setMenuOpen(!menuOpen)}
                  className="flex h-10 w-10 items-center justify-center text-white"
                >
                  {menuOpen ? (
                    <X size={32} weight="light" />
                  ) : (
                    <SortAscendingIcon size={32} weight="light" />
                  )}
                </button>
              </div>
            </div>

            {/* ================= DESKTOP HEADER (1024px থেকে শো করবে) ================= */}
            <div className="hidden w-full items-center justify-between lg:flex">
              <ul className="flex items-center gap-3 lg:gap-4 xl:gap-6 2xl:gap-10">
                {menuData.map((menu) => (
                  <li key={menu.path} className="group">
                    <NavLink
                      to={menu.path}
                      className={({ isActive }) =>
                        `relative flex items-center gap-1.5 py-7 text-[12px] lg:text-[13px] xl:text-[14px] 2xl:text-[16px] font-medium Capitalize tracking-wide whitespace-nowrap transition-all duration-300

                        ${isActive ? "text-[#CE8827]" : "text-white hover:text-[#CE8827]"}

                        after:absolute
                        after:bottom-[16px]
                        after:left-1/2
                        after:h-[3px]
                        after:-translate-x-1/2
                        after:rounded-full
                        after:bg-[#CE8827]
                        after:transition-all
                        after:duration-300

                        ${isActive ? "after:w-full" : "after:w-0 hover:after:w-full"}`
                      }
                    >
                      {menu.name}

                      {menu.submenu && (
                        <CaretDownIcon
                          size={14}
                          weight="bold"
                          className="transition duration-300 group-hover:rotate-180 shrink-0"
                        />
                      )}
                    </NavLink>

                    {/* Submenu Component Call */}
                    {menu.submenu && (
                      <MegaMenu menu={menu} solutions={solutions} />
                    )}
                  </li>
                ))}
              </ul>

              {/* CTA Button */}
              <NavLink
                to="https://calendly.com/leads-ahaansoftware/free-consultation"
                target="_blank"
                className="shine-btn shrink-0 relative overflow-hidden bg-gradient-to-r from-[#C48A18] to-[#E6B33C] px-4 py-3 lg:px-5 lg:py-3 lg:text-[13px] xl:px-6 xl:py-3.5 xl:text-base font-semibold uppercase text-black shadow-xl transition-all duration-300 hover:-translate-y-0.5 whitespace-nowrap ml-2"
              >
                Book A Discovery Call
              </NavLink>
            </div>
          </div>
        </div>

        {/* Mobile Sidebar */}
        <MobileSidebar menuOpen={menuOpen} setMenuOpen={setMenuOpen} solutions={solutions} />
      </nav>
    </header>
  );
};