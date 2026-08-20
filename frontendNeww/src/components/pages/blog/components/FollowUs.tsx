import React from "react";
import {
  FacebookLogo,
  InstagramLogo,
  LinkedinLogo
} from "@phosphor-icons/react";

export const FollowUs: React.FC = () => {
  return (
    <div className="bg-black/5 shadow-[0_0_8px_rgba(0,0,0,0.1)] p-6 mt-6 font-sans">
      <h3 className="font-sans font-bold text-lg mb-4 text-black">Follow Us</h3>
      <div className="flex gap-2 justify-start">
        <a
          href="https://www.facebook.com/ahaansoftwareconsulting"
          target="_blank"
          rel="noreferrer"
          className="w-10 h-10 rounded-full bg-black flex items-center justify-center text-[#deaa0f] text-lg border border-white/10 transition-all duration-300 hover:bg-[#d4a701] hover:text-black hover:-translate-y-0.5"
          aria-label="Facebook"
        >
          <FacebookLogo weight="fill" />
        </a>
        <a
          href="https://www.instagram.com/ahaansoftware/"
          target="_blank"
          rel="noreferrer"
          className="w-10 h-10 rounded-full bg-black flex items-center justify-center text-[#deaa0f] text-lg border border-white/10 transition-all duration-300 hover:bg-[#d4a701] hover:text-black hover:-translate-y-0.5"
          aria-label="Instagram"
        >
          <InstagramLogo weight="fill" />
        </a>
        <a
          href="https://www.linkedin.com/company/ahaansoftware"
          target="_blank"
          rel="noreferrer"
          className="w-10 h-10 rounded-full bg-black flex items-center justify-center text-[#deaa0f] text-lg border border-white/10 transition-all duration-300 hover:bg-[#d4a701] hover:text-black hover:-translate-y-0.5"
          aria-label="LinkedIn"
        >
          <LinkedinLogo weight="fill" />
        </a>
        
      </div>
    </div>
  );
};