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
  const { uniqueId } = useParams();
  const navigate = useNavigate();

  const member = teamMembers.find((item) => item.uniqueId === uniqueId);

  if (!member) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-[#F7F7F5] px-4 sm:px-6 text-center">
        <h1 className="text-2xl sm:text-3xl font-bold text-[#171717]">
          Team Member Not Found
        </h1>

        <p className="mt-3 text-sm sm:text-base text-gray-500">
          The team member you are looking for does not exist.
        </p>

        <button
          onClick={() => navigate("/team")}
          className="mt-6 inline-flex items-center gap-2 rounded-full bg-[#171717] px-6 sm:px-7 py-2.5 sm:py-3 text-sm sm:text-base font-semibold text-white shadow-md transition-all duration-300 hover:bg-[#C48A18]"
        >
          <ArrowLeft size={18} weight="bold" />
          Back to Team
        </button>
      </div>
    );
  }

  const specializations = Array.isArray(member.specialist)
    ? member.specialist
    : member.specialist
      ? [member.specialist]
      : [];

  return (
    <section className="min-h-screen w-full overflow-x-hidden bg-[#F7F7F5] py-6 sm:py-8 md:py-12 lg:py-14">
      <div className="mx-auto max-w-[1500px] px-4 sm:px-8 lg:px-14 xl:px-16">
        {/* Back Button */}
        <button
          onClick={() => navigate("/team")}
          className="
            group
            mb-6 sm:mb-8
            inline-flex
            items-center
            gap-2
            rounded-full
            border
            border-gray-300
            bg-white
            px-4 sm:px-6
            py-2 sm:py-2.5
            text-xs sm:text-sm
            font-semibold
            text-[#171717]
            shadow-sm
            transition-all
            duration-300
            hover:border-[#DCA32C]
            hover:bg-[#171717]
            hover:text-white
          "
        >
          <ArrowLeft
            size={18}
            weight="bold"
            className="transition-transform duration-300 group-hover:-translate-x-1"
          />
          Back to Team
        </button>

        {/* =========================================
            MAIN PROFILE GRID
        ========================================== */}
        <div
          className="
            grid
            grid-cols-1
            items-center
            gap-8
            lg:grid-cols-[480px_minmax(0,1fr)]
            lg:gap-10
            xl:grid-cols-[580px_minmax(0,1fr)]
            xl:gap-16
          "
        >
          {/* =========================================
              LEFT — FULL BODY IMAGE (Updated Height & Full Size Scale)
          ========================================== */}
          <div
            className="
              relative
              flex
              w-full
              items-end
              justify-center
              overflow-hidden
              rounded-2xl
              py-2

              h-[480px]
              xs:h-[550px]
              sm:h-[620px]
              md:h-[700px]
              lg:h-[760px]
              xl:h-[820px]
            "
          >
            {/* Main Gold Glow */}
            <div
              className="
                absolute
                bottom-4 sm:bottom-8
                left-1/2
                h-[220px] w-[220px]
                sm:h-[350px] sm:w-[350px]
                lg:h-[450px] lg:w-[450px]
                -translate-x-1/2
                rounded-full
                bg-[#DCA32C]/15
                blur-[45px] sm:blur-[80px]
                pointer-events-none
              "
            />

            {/* Small Secondary Glow */}
            <div
              className="
                absolute
                bottom-0
                left-1/2 -translate-x-1/2 sm:left-5 sm:translate-x-0
                h-[120px] w-[120px]
                sm:h-[220px] sm:w-[220px]
                lg:h-[280px] lg:w-[280px]
                rounded-full
                bg-[#C48A18]/10
                blur-[35px] sm:blur-[70px]
                pointer-events-none
              "
            />

            {/* Image Wrapper */}
            <div className="relative z-10 flex h-full w-full items-end justify-center overflow-hidden">
              <img
                src={member.fullImage}
                alt={member.name}
                className="
                  h-full
                  w-auto
                  max-w-none
                  object-contain
                  object-bottom

                  transition-transform
                  duration-500
                  hover:scale-[1.02]
                "
              />
            </div>
          </div>

          {/* =========================================
              RIGHT — CONTENT
          ========================================== */}
          <div className="flex flex-col justify-center py-2 sm:py-6 lg:py-8">
            {/* Department */}
            {member.department && (
              <div className="mb-3 sm:mb-5">
                <span
                  className="
                    inline-flex
                    items-center
                    gap-1.5 sm:gap-2
                    rounded-full
                    bg-[#DCA32C]/15
                    px-3.5 sm:px-4
                    py-1 sm:py-1.5
                    text-[10px] sm:text-xs
                    font-bold
                    uppercase
                    tracking-[0.15em]
                    text-[#C48A18]
                  "
                >
                  <Users size={14} weight="bold" className="sm:w-[15px] sm:h-[15px]" />
                  {member.department}
                </span>
              </div>
            )}

            {/* Name */}
            <h1
              className="
                text-3xl
                xs:text-4xl
                font-black
                leading-[1.1]
                tracking-tight
                text-[#171717]

                sm:text-5xl
                lg:text-6xl
              "
            >
              {member.name}
            </h1>

            {/* Designation */}
            <div
              className="
                mt-3 sm:mt-4
                flex
                items-center
                gap-2 sm:gap-2.5
                text-base sm:text-lg lg:text-xl
                font-bold
                text-[#C48A18]
              "
            >
              <Briefcase size={20} weight="fill" className="text-[#DCA32C] sm:w-[22px] sm:h-[22px]" />
              <span>{member.designation}</span>
            </div>

            {/* Divider */}
            <div
              className="
                my-5 sm:my-7
                h-px
                w-full
                bg-gradient-to-r
                from-gray-300
                via-gray-200
                to-transparent
              "
            />

            {/* Description */}
            <div>
              <p
                className="
                  text-sm sm:text-base lg:text-lg
                  leading-6 sm:leading-7 lg:leading-8
                  text-[#173B68]
                "
              >
                {member.description ||
                  "No description available for this team member."}
              </p>
            </div>

            {/* Specializations */}
            {specializations.length > 0 && (
              <div className="mt-6 sm:mt-8">
                <div
                  className="
                    flex
                    items-center
                    gap-2
                    text-xs sm:text-sm
                    font-bold
                    uppercase
                    tracking-wider
                    text-[#171717]
                  "
                >
                  <Sparkle size={16} weight="fill" className="text-[#DCA32C] sm:w-[18px] sm:h-[18px]" />
                  <span>Specializations</span>
                </div>

                <div className="mt-3 sm:mt-4 flex flex-wrap gap-2 sm:gap-2.5">
                  {specializations.map((skill) => (
                    <span
                      key={skill}
                      className="
                        rounded-full
                        border
                        border-gray-300
                        bg-white
                        px-3.5 sm:px-5
                        py-1.5 sm:py-2
                        text-[11px] sm:text-xs
                        font-semibold
                        text-[#171717]
                        shadow-sm
                        transition-all
                        duration-300
                        hover:border-[#DCA32C]
                        hover:bg-[#171717]
                        hover:text-white
                      "
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* CTA */}
            <div className="mt-7 sm:mt-9">
              <button
                onClick={() => navigate("/contact-us")}
                className="
                  inline-flex
                  w-full sm:w-auto
                  justify-center
                  items-center
                  gap-2.5
                  rounded-full
                  bg-[#171717]
                  px-6 sm:px-8
                  py-3 sm:py-3.5
                  text-xs
                  font-bold
                  uppercase
                  tracking-widest
                  text-white
                  shadow-xl
                  transition-all
                  duration-300
                  hover:-translate-y-0.5
                  hover:bg-gradient-to-r
                  hover:from-[#C48A18]
                  hover:to-[#DCA32C]
                  hover:shadow-2xl
                "
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