import { useState } from "react";
import { NavLink } from "react-router-dom";
import {
  PhoneOutgoingIcon,
  EnvelopeSimple,
  FacebookLogo,
  InstagramLogo,
  LinkedinLogo,
  X,
  BehanceLogoIcon,
  DribbbleLogoIcon,
  GithubLogoIcon,
  CaretDownIcon,
} from "@phosphor-icons/react";

import { menuData } from "./menuData";
import type { WPSolution } from "../../../api/WordpressAPI";

interface MobileMenuProps {
  menuOpen: boolean;
  setMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
  solutions: WPSolution[]; // MegaMenu-er moto API data pass kora hocche
}

export const MobileSidebar = ({
  menuOpen,
  setMenuOpen,
  solutions,
}: MobileMenuProps) => {
  const [openMenu, setOpenMenu] = useState<string | null>(null);

  return (
    <>
      {/* Overlay */}
      <div
        onClick={() => setMenuOpen(false)}
        className={`fixed inset-0 z-40 bg-black/60 transition-all duration-300 ${
          menuOpen ? "visible opacity-100" : "invisible opacity-0"
        }`}
      />

      {/* Drawer */}
      <div
        className={`fixed top-0 right-0 z-50 h-screen w-[330px] max-w-[90%] bg-[#161616] shadow-2xl transition-transform duration-500 ${
          menuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-white/5 px-5 py-5">
          <img
            src="https://ahaanmedia.com/ahaanwebsite/layouts/asc.webp"
            alt="logo"
            className="h-12"
          />

          <button
            onClick={() => setMenuOpen(false)}
            className="text-white transition hover:text-[#CE8827]"
          >
            <X size={30} weight="bold" />
          </button>
        </div>

        {/* Content */}
        <div className="h-[calc(100vh-82px)] overflow-y-auto">
          {/* Menu */}
          <ul>
            {menuData.map((menu) => {
              const isSolutionMenu = menu.name === "Solution";

              // Dynamic solution submenu check
              const hasSubmenu =
                (isSolutionMenu && solutions && solutions.length > 0) ||
                (!isSolutionMenu && menu.submenu && menu.submenu.length > 0);

              return (
                <li key={menu.name || menu.path}>
                  {hasSubmenu ? (
                    <>
                      {/* Row: label navigates, caret toggles submenu */}
                      <div className="flex w-full items-center justify-between border-b border-white/5 text-[15px] uppercase text-white transition hover:bg-[#222]">
                        <NavLink
                          to={menu.path || "#"}
                          onClick={() => setMenuOpen(false)}
                          className={({ isActive }) =>
                            `flex-1 px-6 py-3 ${
                              isActive ? "text-[#CE8827]" : "text-white"
                            }`
                          }
                        >
                          {menu.name}
                        </NavLink>

                        <button
                          onClick={() =>
                            setOpenMenu(openMenu === menu.name ? null : menu.name)
                          }
                          aria-label={`Toggle ${menu.name} submenu`}
                          className="px-6 py-3"
                        >
                          <CaretDownIcon
                            size={18}
                            className={`transition duration-300 ${
                              openMenu === menu.name ? "rotate-180" : ""
                            }`}
                          />
                        </button>
                      </div>

                      <div
                        className={`overflow-hidden transition-all duration-300 ${
                          openMenu === menu.name ? "max-h-[1000px]" : "max-h-0"
                        }`}
                      >
                        {/* Solution Menu Dynamic Items */}
                        {isSolutionMenu
                          ? solutions.map((item) => (
                              <NavLink
                                key={item.id || item.slug}
                                to={`/solution/${item.slug}`}
                                onClick={() => setMenuOpen(false)}
                                className={({ isActive }) =>
                                  `block border-b border-white/5 bg-[#1e1e1e] px-10 py-3 text-sm transition ${
                                    isActive
                                      ? "bg-[#CE8827] text-black font-semibold"
                                      : "text-gray-300 hover:bg-[#CE8827] hover:text-white"
                                  }`
                                }
                              >
                                {item.title?.rendered || "Solution Item"}
                              </NavLink>
                            ))
                          : /* Standard Static Submenu Items (e.g. IT Services) */
                            menu.submenu?.map((item) => (
                              <NavLink
                                key={item.path + item.name}
                                to={item.path}
                                onClick={() => setMenuOpen(false)}
                                className={({ isActive }) =>
                                  `block border-b border-white/5 bg-[#1e1e1e] px-10 py-3 text-sm transition ${
                                    isActive
                                      ? "bg-[#CE8827] text-black font-semibold"
                                      : "text-gray-300 hover:bg-[#CE8827] hover:text-white"
                                  }`
                                }
                              >
                                {item.name}
                              </NavLink>
                            ))}
                      </div>
                    </>
                  ) : (
                    <NavLink
                      to={menu.path || "#"}
                      onClick={() => setMenuOpen(false)}
                      className={({ isActive }) =>
                        `block border-b border-white/5 px-6 py-3 text-[15px] uppercase transition ${
                          isActive
                            ? "bg-[#CE8827] text-black font-semibold"
                            : "text-white hover:bg-[#222]"
                        }`
                      }
                    >
                      {menu.name}
                    </NavLink>
                  )}
                </li>
              );
            })}
          </ul>

          {/* Contact */}
          <div className="space-y-5 px-6 py-6">
            
             <a href="tel:+16465759575"
              className="flex items-center gap-3 text-sm text-white hover:text-[#CE8827]"
            >
              <PhoneOutgoingIcon size={20} />
              <span>+1-646-575-9575</span>
            </a>

            
            <a href="mailto:support@ahaansoftware.com"
              className="flex items-center gap-3 text-sm text-white hover:text-[#CE8827]"
            >
              <EnvelopeSimple size={20} />
              <span>support@ahaansoftware.com</span>
            </a>

            <div className="flex gap-6 pt-3">
              <a href="https://www.facebook.com/ahaansoftwareconsulting" className="text-[#f6b338]">
                <FacebookLogo size={24} weight="fill" />
              </a>

              <a href="https://www.instagram.com/ahaansoftware" className="text-[#f6b338]">
                <InstagramLogo size={24} weight="fill" />
              </a>

              <a href="https://www.linkedin.com/company/ahaansoftware" className="text-[#f6b338]">
                <LinkedinLogo size={24} weight="fill" />
              </a>

              <a href="https://www.behance.net/ahaansoftware01" className="text-[#f6b338]">
                <BehanceLogoIcon size={24} weight="fill" />
              </a>

              <a href="https://dribbble.com/ahaan-software" className="text-[#f6b338]">
                <DribbbleLogoIcon size={24} weight="fill" />
              </a>

              <a href="https://github.com/AhaanSoftwareConsulting" className="text-[#f6b338]">
                <GithubLogoIcon size={24} weight="fill" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};