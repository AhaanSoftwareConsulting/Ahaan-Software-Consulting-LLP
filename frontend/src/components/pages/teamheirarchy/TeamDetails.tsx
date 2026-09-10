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

  const member = teamMembers.find(
    (item) => item.uniqueId === uniqueId
  );

  if (!member) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-[#F7F7F5] px-6 text-center">
        <h1 className="text-3xl font-bold text-[#171717]">
          Team Member Not Found
        </h1>

        <p className="mt-3 text-gray-500">
          The team member you are looking for does not exist.
        </p>

        <button
          onClick={() => navigate("/team")}
          className="mt-6 inline-flex items-center gap-2 rounded-full bg-[#171717] px-7 py-3 font-semibold text-white shadow-md transition-all duration-300 hover:bg-[#C48A18]"
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
    <section className="min-h-screen overflow-hidden bg-[#F7F7F5] py-8 md:py-12 lg:py-14">
      <div className="mx-auto max-w-[1500px] px-6 sm:px-10 lg:px-14 xl:px-16">

        {/* Back Button */}
        <button
          onClick={() => navigate("/team")}
          className="
            group
            mb-8
            inline-flex
            items-center
            gap-2
            rounded-full
            border
            border-gray-300
            bg-white
            px-6
            py-2.5
            text-sm
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
            MAIN PROFILE
        ========================================== */}
        <div
          className="
            grid
            items-center
            lg:grid-cols-[600px_minmax(0,1fr)]
            lg:gap-10
            xl:grid-cols-[620px_minmax(0,1fr)]
            xl:gap-16
          "
        >

          {/* =========================================
              LEFT — LARGE FULL BODY IMAGE
          ========================================== */}
          <div
            className="
              relative
              flex
              h-[680px]
              items-end
              justify-center
              lg:h-[760px]
              xl:h-[800px]
              2xl:h-[850px]
            "
          >

            {/* Main Gold Glow */}
            <div
              className="
                absolute
                bottom-8
                left-1/2
                h-[500px]
                w-[500px]
                -translate-x-1/2
                rounded-full
                bg-[#DCA32C]/15
                blur-[90px]
              "
            />

            {/* Small Secondary Glow */}
            <div
              className="
                absolute
                bottom-0
                left-5
                h-[300px]
                w-[300px]
                rounded-full
                bg-[#C48A18]/10
                blur-[80px]
              "
            />

            {/* Image Wrapper */}
            <div
              className="
                relative
                z-10
                flex
                h-full
                w-full
                items-end
                justify-center
              "
            >
              <img
                src={member.fullImage}
                alt={member.name}
                className="
                  h-[680px]
                  w-auto
                  max-w-none
                  object-contain
                  object-bottom

                  transition-transform
                  duration-500
                  hover:scale-[1.015]

                  lg:h-[760px]
                  xl:h-[800px]
                  2xl:h-[850px]
                "
              />
            </div>
          </div>

          {/* =========================================
              RIGHT — CONTENT
              SIZE KEPT SAME
          ========================================== */}
          <div className="flex flex-col justify-center py-6 lg:py-8">

            {/* Department */}
            {member.department && (
              <div className="mb-5">
                <span
                  className="
                    inline-flex
                    items-center
                    gap-2
                    rounded-full
                    bg-[#DCA32C]/15
                    px-4
                    py-1.5
                    text-xs
                    font-bold
                    uppercase
                    tracking-[0.15em]
                    text-[#C48A18]
                  "
                >
                  <Users size={15} weight="bold" />

                  {member.department}
                </span>
              </div>
            )}

            {/* Name */}
            <h1
              className="
                text-4xl
                font-black
                leading-[1.05]
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
                mt-4
                flex
                items-center
                gap-2.5
                text-lg
                font-bold
                text-[#C48A18]

                sm:text-xl
              "
            >
              <Briefcase
                size={22}
                weight="fill"
                className="text-[#DCA32C]"
              />

              <span>{member.designation}</span>
            </div>

            {/* Divider */}
            <div
              className="
                my-7
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
                  text-base
                  leading-7
                  text-[#173B68]

                  sm:text-lg
                  sm:leading-8
                "
              >
                {member.description ||
                  "No description available for this team member."}
              </p>
            </div>

            {/* Specializations */}
            {specializations.length > 0 && (
              <div className="mt-8">

                <div
                  className="
                    flex
                    items-center
                    gap-2
                    text-sm
                    font-bold
                    uppercase
                    tracking-wider
                    text-[#171717]
                  "
                >
                  <Sparkle
                    size={18}
                    weight="fill"
                    className="text-[#DCA32C]"
                  />

                  <span>Specializations</span>
                </div>

                <div className="mt-4 flex flex-wrap gap-2.5">
                  {specializations.map((skill) => (
                    <span
                      key={skill}
                      className="
                        rounded-full
                        border
                        border-gray-300
                        bg-white
                        px-5
                        py-2
                        text-xs
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
            <div className="mt-9">
              <button
                onClick={() => navigate("/contact-us")}
                className="
                  inline-flex
                  items-center
                  gap-2.5
                  rounded-full
                  bg-[#171717]
                  px-8
                  py-3.5
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
                <EnvelopeSimple
                  size={18}
                  weight="bold"
                />

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