import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { ArrowRightIcon } from "@phosphor-icons/react";
import type { WPSolution } from "../../../api/WordpressAPI";

// Static preview metadata mapped by service title
const servicePreviewMap: Record<
  string,
  { image: string; description: string }
> = {
  "UI/UX Design": {
    image: "https://ahaanmedia.com/ahaanwebsite/Service/card1.webp",
    description:
      "Craft dynamic websites and mobile apps that deliver seamless, engaging brand interactions.",
  },
  "Web Development": {
    image: "https://ahaanmedia.com/ahaanwebsite/Service/card2.webp",
    description:
      "Build a dynamic digital empire for your brand with visually captivating, SEO-friendly websites.",
  },
  "Application Development": {
    image: "https://ahaanmedia.com/ahaanwebsite/Service/card3.webp",
    description:
      "Leveraging cutting-edge technology, we build iOS, Android, and hybrid mobile solutions.",
  },
  "E-commerce Development": {
    image: "https://ahaanmedia.com/ahaanwebsite/Service/card4.webp",
    description:
      "We craft secure, high-performing stores with robust strategies to expand your customer base.",
  },
  "Social Media Management": {
    image: "https://ahaanmedia.com/ahaanwebsite/Service/card5.webp",
    description:
      "Insight-driven, sustainable content strategies that spark meaningful conversations and impact.",
  },
  "Google Marketing": {
    image: "https://ahaanmedia.com/ahaanwebsite/Service/card6.webp",
    description:
      "High-performing campaigns with data-driven precision to dominate search results.",
  },
};

export interface SubmenuItem {
  name?: string;
  path?: string;
  title?: { rendered: string };
  slug?: string;
  id?: number | string;
  excerpt?: { rendered: string };
  content?: { rendered: string };
  _embedded?: {
    "wp:featuredmedia"?: Array<{
      source_url: string;
    }>;
  };
}

interface MenuItem {
  name: string;
  path: string;
  submenu?: SubmenuItem[];
}

interface MegaMenuProps {
  menu: MenuItem;
  solutions: WPSolution[];
}

export const MegaMenu: React.FC<MegaMenuProps> = ({ menu, solutions }) => {
  const isSolutionMenu = menu.name === "Solutions";
  const isServicesMenu =
    menu.name === "IT Services" || menu.name === "Services";

  // Active States
  const [activeSolution, setActiveSolution] = useState<WPSolution | null>(
    solutions[0] || null
  );

  const defaultService = menu.submenu?.[0];
  const [activeService, setActiveService] = useState<SubmenuItem | null>(
    defaultService || null
  );

  const stripHtml = (html: string) => {
    if (!html) return "";
    const div = document.createElement("div");
    div.innerHTML = html;
    return div.textContent || div.innerText || "";
  };

  const getFeaturedImage = (solution: WPSolution | null) => {
    return (
      solution?._embedded?.["wp:featuredmedia"]?.[0]?.source_url ||
      "https://placehold.co/600x400?text=No+Image"
    );
  };

  const currentActiveSolution = activeSolution || solutions[0];
  const currentActiveService = activeService || menu.submenu?.[0];

  // Helper function to render menu card
  const renderMenuCard = (
    title: string,
    path: string,
    isActive: boolean,
    subtitle: string = "Enterprise Software Solution",
    onHover?: () => void
  ) => {
    return (
      <NavLink
        key={path + title}
        to={path}
        onMouseEnter={onHover}
        className={`group/item flex min-h-[68px] w-full items-center gap-3 rounded-lg px-3.5 py-2.5 transition-all duration-200 border ${
          isActive
            ? "bg-[#1f1f1f] border-[#CE8827]/80 shadow-md"
            : "bg-[#181818] border-transparent hover:bg-[#1f1f1f] hover:border-[#DDA834]"
        }`}
      >
        <div
          className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-md transition-all duration-200 ${
            isActive
              ? "bg-[#CE8827] text-black"
              : "bg-[#282828] text-gray-300 group-hover/item:bg-[#CE8827] group-hover/item:text-black"
          }`}
        >
          <ArrowRightIcon
            size={14}
            weight="bold"
            className="transition group-hover/item:translate-x-0.5"
          />
        </div>

        <div className="flex-1 overflow-hidden">
          <h5
            className={`text-[13px] font-semibold transition truncate ${
              isActive
                ? "text-[#CE8827]"
                : "text-gray-200 group-hover/item:text-[#CE8827]"
            }`}
          >
            {title}
          </h5>
          <p className="text-[10px] text-gray-400 truncate mt-0.5">
            {subtitle}
          </p>
        </div>
      </NavLink>
    );
  };

  // Preview Metadata for Active Service
  const serviceMeta = servicePreviewMap[currentActiveService?.name || ""] || {
    image: "https://placehold.co/600x400?text=IT+Services",
    description: "Explore our enterprise level IT services and solutions.",
  };

  return (
    <div
      className="
        invisible
        absolute
        left-4
        right-4
        top-full
        z-50
        mt-0
        opacity-0
        translate-y-5
        transition-all
        duration-300
        group-hover:visible
        group-hover:translate-y-0
        group-hover:opacity-100
        lg:left-6
        lg:right-6
        2xl:left-10
        2xl:right-10
      "
    >
      <div className="overflow-hidden border-b-4 border-[#DDA834] bg-[#121212] p-6 shadow-[0_20px_60px_rgba(0,0,0,.6)] text-white">
        {/* 1. SOLUTION MENU */}
        {/* 1. SOLUTION MENU */}
{isSolutionMenu ? (
  <div className="grid grid-cols-5 gap-5 items-stretch">
    <div className="col-span-4 grid grid-cols-4 gap-x-4 gap-y-3 items-start content-start">
      {solutions.map((item) => {
        // 1. URL Path/Slug ঠিক রাখা
        const navigationPath = `/solution/${item.slug}`;

        // 2. menu.submenu থেকে মিলিয়ে সঠিক name খুঁজে নেওয়া
        const matchedSubmenu = menu.submenu?.find(
          (sub) => sub.path === navigationPath || sub.path?.endsWith(item.slug)
        );

        // 3. menu.submenu-তে পাওয়া name দেখাবে, না পেলে WordPress-এর title দেখাবে
        const displayName = matchedSubmenu?.name || item.title?.rendered || "";

        return renderMenuCard(
          displayName,                            // UI-তে ডাইনামিক নাম শো করবে
          navigationPath,                         // URL আগের মতোই /solution/${item.slug} থাকবে
          currentActiveSolution?.id === item.id,
          "Enterprise Software Solution",
          () => setActiveSolution(item)
        );
      })}
    </div>

    {/* Right Preview Card */}
    <div className="col-span-1 flex flex-col justify-between rounded-xl bg-[#1c1c1c] p-4 shadow-2xl">
      {currentActiveSolution ? (
        <div>
          <h4 className="text-base font-bold text-white mb-3 line-clamp-1">
            {/* প্রিভিউ কার্ডেও ডাইনামিক নাম শো করবে */}
            {menu.submenu?.find((sub) => sub.path?.endsWith(currentActiveSolution.slug))?.name || 
             currentActiveSolution.title?.rendered}
          </h4>

          <div className="relative h-36 w-full overflow-hidden rounded-lg bg-gray-900 mb-3 shadow-lg">
            <img
              src={getFeaturedImage(currentActiveSolution)}
              alt={currentActiveSolution.title?.rendered || "Preview"}
              className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
            />
          </div>

          {(() => {
            const text = stripHtml(
              currentActiveSolution.content?.rendered ||
                currentActiveSolution.excerpt?.rendered ||
                "Enterprise software solutions engineered to solve operational challenges."
            );

            const words = text.split(" ");
            const truncatedText =
              words.length > 8
                ? words.slice(0, 8).join(" ") + "..."
                : text;

            return (
              <p className="text-[11px] text-gray-300 leading-relaxed">
                {truncatedText}
              </p>
            );
          })()}
        </div>
      ) : (
        <div className="flex h-full items-center justify-center text-xs text-gray-500">
          Hover over a menu item to preview
        </div>
      )}
    </div>
  </div>
) : isServicesMenu ? (
          /* 2. IT SERVICES MENU */
          <div className="grid grid-cols-5 gap-5 items-stretch">
            {/* content-start থাকার কারণে ২টি রো (Row) সবসময় ওপরের দিকে থাকবে, অতিরিক্ত গ্যাপ হবে না */}
            <div className="col-span-4 grid grid-cols-4 gap-x-4 gap-y-3 items-start content-start">
              {menu.submenu?.map((service) =>
                renderMenuCard(
                  service.name || "",
                  service.path || "#",
                  currentActiveService?.name === service.name,
                  "IT & Digital Services",
                  () => setActiveService(service)
                )
              )}
            </div>

            {/* Right Preview Card */}
            <div className="col-span-1 flex flex-col justify-between rounded-xl bg-[#1c1c1c] p-4 shadow-2xl">
              {currentActiveService ? (
                <div>
                  <h4 className="text-base font-bold text-white mb-3 line-clamp-1">
                    {currentActiveService.name}
                  </h4>

                  <div className="relative h-36 w-full overflow-hidden rounded-lg bg-gray-900 mb-3 shadow-lg">
                    <img
                      src={serviceMeta.image}
                      alt={currentActiveService.name || "Service Preview"}
                      className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
                    />
                  </div>

                  <p className="text-[11px] text-gray-300 leading-relaxed">
                    {serviceMeta.description.length > 70
                      ? serviceMeta.description.substring(0, 70) + "..."
                      : serviceMeta.description}
                  </p>
                </div>
              ) : (
                <div className="flex h-full items-center justify-center text-xs text-gray-500">
                  Hover over a menu item to preview
                </div>
              )}
            </div>
          </div>
        ) : (
          /* 3. GENERIC/STANDARD SUBMENU */
          <div className="grid grid-cols-5 gap-4 items-start">
            {menu.submenu?.map((item) =>
              renderMenuCard(
                item.name || item.title?.rendered || "",
                item.path || "#",
                false,
                "General Submenu"
              )
            )}
          </div>
        )}

        {/* BOTTOM CTA BAR */}
        <div className="-mx-6 -mb-6 mt-6 flex items-center justify-between border-t border-gray-800/80 bg-[#0a0a0a] px-6 py-4">
          <div>
            <h5 className="text-sm font-bold text-white">
              Need Custom Software?
            </h5>
            <p className="text-xs text-gray-400 mt-0.5">
              Build scalable enterprise solutions with Ahaan Software.
            </p>
          </div>

          <NavLink
            to="/contact-us"
            className="shine-btn relative overflow-hidden bg-gradient-to-r from-[#C48A18] to-[#E6B33C] px-6 py-3 text-xs font-bold uppercase text-black shadow-md transition-all duration-300 hover:scale-105 rounded-md"
          >
            Contact Us
          </NavLink>
        </div>
      </div>
    </div>
  );
};