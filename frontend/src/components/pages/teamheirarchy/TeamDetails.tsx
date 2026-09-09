import { useNavigate, useParams } from "react-router-dom";
import {
  ArrowLeft,
  Briefcase,
  Sparkle,
  Users,
  EnvelopeSimple,
} from "@phosphor-icons/react";

import { teamMembers } from "./teamData";

const TeamDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const member = teamMembers.find((item) => item.id === id);

  if (!member) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-[#F7F7F5] px-6 text-center">
        <h1 className="text-3xl font-bold text-[#171717]">
          Team Member Not Found
        </h1>
        <p className="mt-2 text-gray-500">
          The team member you are looking for does not exist.
        </p>

        <button
          onClick={() => navigate("/team")}
          className="mt-6 inline-flex items-center gap-2 rounded-full bg-[#171717] px-7 py-3 font-semibold text-white shadow-md transition duration-300 hover:bg-[#C48A18]"
        >
          <ArrowLeft size={18} weight="bold" />
          Back to Team
        </button>
      </div>
    );
  }

  // Handle specializations safely whether it's an array or string
  const specializations = Array.isArray(member.specialist)
    ? member.specialist
    : member.specialist
    ? [member.specialist]
    : [];

  return (
    <section className="min-h-screen bg-[#F7F7F5] py-12 md:py-20">
      <div className="mx-auto max-w-6xl px-6 sm:px-10 lg:px-16">
        
        {/* Back Button */}
        <button
          onClick={() => navigate("/team")}
          className="group mb-12 inline-flex items-center gap-2 rounded-full border border-gray-300 bg-white/80 px-6 py-2.5 text-sm font-semibold text-[#171717] shadow-sm backdrop-blur-sm transition duration-300 hover:border-[#DCA32C] hover:bg-[#171717] hover:text-white"
        >
          <ArrowLeft
            size={18}
            weight="bold"
            className="transition-transform group-hover:-translate-x-1"
          />
          Back to Team
        </button>

        {/* Clean & Open Layout Structure */}
        <div className="grid items-center gap-12 lg:grid-cols-[450px_1fr] lg:gap-16">

          {/* Left Side: Transparent / Cutout Image Viewport */}
          <div className="relative flex items-center justify-center">
            
            {/* Subtle Minimal Background Graphic Shape */}
            <div className="absolute -bottom-4 -left-4 -z-0 h-64 w-64 rounded-full bg-[#DCA32C]/15 blur-2xl" />
            <div className="absolute -top-4 right-0 -z-0 h-48 w-48 rounded-full bg-[#C48A18]/10 blur-xl" />

            {/* Profile Picture */}
            <div className="relative z-10 w-full max-w-[380px]">
              <img
                src={`${member.image}?auto=format&fit=crop&w=800&q=90`}
                alt={member.name}
                className="h-auto w-full rounded-3xl object-cover shadow-2xl transition-transform duration-500 hover:scale-[1.01]"
              />
            </div>
          </div>

          {/* Right Side: Editorial Typography & Content */}
          <div className="flex flex-col justify-center">
            
            {/* Department Tag */}
            {member.department && (
              <div className="mb-4 inline-flex items-center gap-2">
                <span className="inline-flex items-center gap-2 rounded-full bg-[#DCA32C]/15 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-[#C48A18]">
                  <Users size={15} weight="bold" />
                  {member.department}
                </span>
              </div>
            )}

            {/* Name */}
            <h1 className="text-4xl font-black tracking-tight text-[#171717] sm:text-5xl lg:text-6xl">
              {member.name}
            </h1>

            {/* Designation */}
            <div className="mt-3 flex items-center gap-2.5 text-lg font-bold text-[#C48A18] sm:text-xl">
              <Briefcase size={22} weight="fill" className="text-[#DCA32C]" />
              <span>{member.designation}</span>
            </div>

            {/* Subtle Horizontal Divider */}
            <div className="my-8 h-px w-full bg-gradient-to-r from-gray-300 via-gray-200 to-transparent" />

            {/* Description / About */}
            <div>
              <p className="text-base leading-relaxed text-gray-700 sm:text-lg sm:leading-8">
                {member.description || "No description available for this team member."}
              </p>
            </div>

            {/* Specializations / Skills */}
            {specializations.length > 0 && (
              <div className="mt-8">
                <div className="flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-[#171717]">
                  <Sparkle size={18} weight="fill" className="text-[#DCA32C]" />
                  <span>Specializations</span>
                </div>

                <div className="mt-4 flex flex-wrap gap-2.5">
                  {specializations.map((skill) => (
                    <span
                      key={skill}
                      className="rounded-full border border-gray-300/80 bg-white px-5 py-2 text-xs font-semibold text-gray-800 shadow-sm transition duration-300 hover:border-[#DCA32C] hover:bg-[#171717] hover:text-white"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* CTA Button */}
            <div className="mt-10">
              <button
                onClick={() => navigate("/contact")}
                className="inline-flex items-center gap-2.5 rounded-full bg-[#171717] px-8 py-3.5 text-xs font-bold uppercase tracking-widest text-white shadow-xl transition duration-300 hover:bg-gradient-to-r hover:from-[#C48A18] hover:to-[#DCA32C] hover:shadow-2xl"
              >
                <EnvelopeSimple size={18} weight="bold" />
                Get In Touch
              </button>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};

export default TeamDetails;