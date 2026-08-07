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
import { MegaMenu } from "./MegaMenu"; // MegaMenu Import করা হলো

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
    <header className="w-full bg-white shadow-sm">
      {/* ================= TOP HEADER ================= */}
      <div className="hidden border-b border-gray-200 xl:block">
        <div className="mx-auto flex p-6 max-w-[1600px] items-center justify-between  2xl:px-10">
          {/* Logo */}
          <a href="/">
            <img
              src="https://ahaanmedia.com/ahaanwebsite/layouts/asc.webp"
              alt="Logo"
              className="h-14 object-contain"

            />
          </a>

          {/* Right */}
          <div className="flex items-center">
            {/* Phone */}
            <div className="flex items-center gap-4 px-7">
              <PhoneOutgoingIcon
                size={38}
                weight="light"
                className="text-[#CE8827]"
              />
              <div>
                <a href="tel:+16465759575" className="text-[17px] font-semibold">+1-646-575-9575</a> <br />
                <a href="mailto:support@ahaansoftware.com" className="text-gray-500">support@ahaansoftware.com</a>
              </div>
            </div>

            <div className="h-14 w-px bg-gray-300" />

            {/* Address */}
            <div className="flex items-center gap-4 px-7">
              <MapPinIcon size={38} weight="light" className="text-[#CE8827]" />
              <div>
                <h5 className="text-[17px] font-semibold">
                  Bengal Eco Intelligent Park
                </h5>
                <p className="text-gray-500">Sector-V, Kolkata</p>
              </div>
            </div>

            <div className="h-14 w-px bg-gray-300" />

            {/* Time */}
            <div className="flex items-center gap-4 px-7">
              <AlarmIcon size={38} weight="light" className="text-[#CE8827]" />
              <div>
                <h5 className="text-[17px] font-semibold">10:00AM - 8:00PM</h5>
                <p className="text-gray-500">Monday to Friday</p>
              </div>
            </div>

            {/* Social */}
            <div className="ml-7 flex items-center gap-5">

              <a href="https://www.instagram.com/ahaansoftware"
                target="_blank"
                rel="noopener noreferrer"
                className="cursor-pointer transition"
              >
                <InstagramLogo size={28} weight="light" className="text-[#CE8827]" />
              </a>


              <a href="https://www.facebook.com/ahaansoftware"
                target="_blank"
                rel="noopener noreferrer"
                className="cursor-pointer transition"
              >
                <FacebookLogo size={28} weight="light" className="text-[#CE8827]" />
              </a>


              <a href="https://www.linkedin.com/company/ahaansoftware"
                target="_blank"
                rel="noopener noreferrer"
                className="cursor-pointer transition"
              >
                <LinkedinLogo size={28} weight="light" className="text-[#CE8827]" />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* ================= NAVBAR ================= */}
      <nav className="relative bg-[#161616] shadow-lg">
        <div className="mx-auto max-w-[1600px] px-2.5 md:px-4 lg:px-6 2xl:px-10">
          <div className="flex h-17 md:h-20 items-center justify-between">
            {/* ================= MOBILE HEADER ================= */}
            <div className="flex w-full items-center justify-between xl:hidden">
              <img
                src="https://ahaanmedia.com/ahaanwebsite/layouts/asc.webp"
                alt="logo"
                className="h-10 w-28 object-contain"
              />

              <div className="flex items-center gap-2">
                <NavLink
                  to="https://calendly.com/leads-ahaansoftware/free-consultation"
                  className="bg-gradient-to-r from-[#C48A18] to-[#E6B33C] px-2.5 py-2.5 rounded-full text-[11px] sm:text-[12px] font-semibold text-black"
                >
                  Discover Call
                </NavLink>

                <a
                  href="tel:+16465759575"
                  className="flex h-9 w-9 sm:h-10 sm:w-10  items-center justify-center rounded-full bg-gradient-to-r from-[#C48A18] to-[#E6B33C] text-black shadow-lg transition hover:scale-105"
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

            {/* ================= DESKTOP HEADER START ================= */}
            <div className="hidden w-full items-center justify-between xl:flex">
              <ul className="flex items-center gap-6 2xl:gap-10">
                {menuData.map((menu) => (
                  <li key={menu.path} className="group">
                    <NavLink
                      to={menu.path}
                      className={({ isActive }) =>
                        `relative flex items-center gap-1 py-8 text-[14px] font-medium uppercase tracking-wide transition-all duration-300 xl:text-[15px] 2xl:text-[16px]

                        ${isActive ? "text-[#CE8827]" : "text-white hover:text-[#CE8827]"}

                        after:absolute
                        after:bottom-[20px]
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
                          className="transition duration-300 group-hover:rotate-180"
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

              {/* CTA */}
              <NavLink
                to="https://calendly.com/leads-ahaansoftware/free-consultation"
                target="_blank"
                className="shine-btn relative overflow-hidden bg-gradient-to-r from-[#C48A18] to-[#E6B33C] px-5 py-3 text-sm font-semibold uppercase text-black shadow-xl transition-all duration-300 hover:-translate-y-0.5 hover:from-[#B57A0C] hover:to-[#D69D20] xl:px-6 xl:py-3.5 xl:text-base 2xl:px-8"
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