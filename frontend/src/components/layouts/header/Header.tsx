import { useState } from "react";
import { NavLink } from "react-router-dom";
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
  ArrowRightIcon,
} from "@phosphor-icons/react";

import { menuData } from "./menuData";
import { MobileSidebar } from "./MobileSidebar";

export const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="w-full bg-white shadow-sm">
      {/* ================= TOP HEADER ================= */}
      <div className="hidden xl:block border-b border-gray-200">
        <div className="mx-auto flex h-28 max-w-[1600px] items-center justify-between px-6 2xl:px-10">
          {/* Logo */}
          <img
            src="https://ahaanmedia.com/ahaanwebsite/layouts/asc.webp"
            alt="Logo"
            className="h-14 object-contain"
          />

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
                <h5 className="text-[17px] font-semibold">+1-646-575-9575</h5>
                <p className="text-gray-500">support@ahaansoftware.com</p>
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
              <InstagramLogo
                size={28}
                weight="fill"
                className="cursor-pointer transition hover:text-[#CE8827]"
              />
              <FacebookLogo
                size={28}
                weight="fill"
                className="cursor-pointer transition hover:text-[#CE8827]"
              />
              <LinkedinLogo
                size={28}
                weight="fill"
                className="cursor-pointer transition hover:text-[#CE8827]"
              />
            </div>
          </div>
        </div>
      </div>

      {/* ================= NAVBAR (Added relative here) ================= */}
      <nav className="relative bg-[#161616] shadow-lg">
        <div className="mx-auto max-w-[1600px] px-4 lg:px-6 2xl:px-10">
          <div className="flex h-20 items-center justify-between">
            {/* ================= MOBILE HEADER ================= */}
            <div className="flex w-full items-center justify-between xl:hidden">
              <img
                src="https://ahaanmedia.com/ahaanwebsite/layouts/asc.webp"
                alt="logo"
                className="h-10"
              />

              <div className="flex items-center gap-2">
                <NavLink
                  to="/contact"
                  className="bg-gradient-to-r from-[#C48A18] to-[#E6B33C] px-3 py-3 text-[12px] font-semibold text-black"
                >
                  Free Discover Call
                </NavLink>

                <a
                  href="tel:+16465759575"
                  className="flex h-10 w-10 items-center justify-center bg-gradient-to-r from-[#C48A18] to-[#E6B33C] text-black shadow-lg transition hover:scale-105"
                >
                  <PhoneOutgoingIcon size={28} weight="light" />
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
                  /* REMOVED "relative" from <li> so mega-menu aligns to the <nav> */
                  <li key={menu.path} className="group">
                    <NavLink
                      to={menu.path}
                      className={({ isActive }) =>
                        `relative flex items-center gap-1 py-8 text-[14px] xl:text-[15px] 2xl:text-[16px]
                        font-medium uppercase tracking-wide transition-all duration-300

                        ${isActive ? "text-[#CE8827]" : "text-white hover:text-[#CE8827]"}

                        after:absolute
                        after:left-1/2
                        after:-translate-x-1/2
                        after:bottom-[20px]
                        after:h-[3px]
                        after:bg-[#CE8827]
                        after:rounded-full
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

                    {menu.submenu && (
                      /* FIXED CLASSHES: Replaced left-1/2 and -translate-x-1/2 with left-6/right-6 for clean padding */
                      <div
                        className="
                        invisible
                        absolute
                        left-4
                        right-4
                        lg:left-6
                        lg:right-6
                        2xl:left-10
                        2xl:right-10
                        top-full
                        z-50
                        mt-0
                        opacity-0
                        translate-y-5
                        transition-all
                        duration-300
                        group-hover:visible
                        group-hover:translate-y-0
                        group-hover:opacity-100"
                      >
                        <div className="overflow-hidden  border-b-6 border-gray-900 bg-white p-10 shadow-[0_20px_60px_rgba(0,0,0,.18)]">
                          {/* TOP */}
                          <div>
                            <h6 className="mb-6 text-xs font-bold uppercase tracking-[3px] text-[#CE8827]">
                              Industry Solutions
                            </h6>

                            <div className="grid grid-cols-5 gap-x-6 gap-y-6">
                              {menu.submenu.map((item) => (
                                <NavLink
                                  key={item.path}
                                  to={item.path}
                                  className="group/item flex items-start gap-3 rounded-xl p-3 transition-all duration-300 hover:bg-[#FFF8EC] hover:shadow-md"
                                >
                                  <div className="flex h-10 w-10 shrink-0 items-center justify-center  bg-[#FFF4DF] text-[#161616] transition-all duration-300 group-hover/item:bg-[#000] group-hover/item:text-white">
                                    <ArrowRightIcon
                                      size={18}
                                      weight="bold"
                                      className="transition group-hover/item:translate-x-1"
                                    />
                                  </div>

                                  <div className="flex-1">
                                    <h5 className="text-[16px] font-semibold text-[#161616] transition group-hover/item:text-[#CE8827]">
                                      {item.name}
                                    </h5>
                                    <p className="mt-1 text-[13px] leading-5 text-gray-500">
                                      Enterprise Software Solution
                                    </p>
                                  </div>
                                </NavLink>
                              ))}
                            </div>
                          </div>

                          {/* BOTTOM */}
                          <div className="mt-8 flex items-center justify-between border-t border-gray-100 bg-[#F8F8F8] -mx-10 -mb-10 px-10 py-6">
                            <div>
                              <h5 className="text-lg font-semibold text-[#161616]">
                                Need Custom Software?
                              </h5>
                              <p className="mt-1 text-sm text-gray-500">
                                Build scalable enterprise solutions with Ahaan Software.
                              </p>
                            </div>

                            <NavLink
                              to="/contact"
                              className="shine-btn relative overflow-hidden uppercase bg-gradient-to-r from-[#C48A18] to-[#E6B33C] px-5 xl:px-6 2xl:px-8 py-3 xl:py-3.5 text-sm xl:text-base font-semibold text-black shadow-xl transition-all duration-300 hover:-translate-y-0.5 hover:from-[#B57A0C] hover:to-[#D69D20]"
                            >
                              Contact Us
                            </NavLink>
                          </div>
                        </div>
                      </div>
                    )}
                  </li>
                ))}
              </ul>

              {/* CTA */}
              <NavLink
                to="/contact"
                className="shine-btn relative overflow-hidden uppercase bg-gradient-to-r from-[#C48A18] to-[#E6B33C] px-5 xl:px-6 2xl:px-8 py-3 xl:py-3.5 text-sm xl:text-base font-semibold text-black shadow-xl transition-all duration-300 hover:-translate-y-0.5 hover:from-[#B57A0C] hover:to-[#D69D20]"
              >
                Book A  Discovery Call
              </NavLink>
            </div>
          </div>
        </div>

        {/* Mobile Sidebar */}
        <MobileSidebar menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
      </nav>
    </header>
  );
};