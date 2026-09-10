import { useLayoutEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { teamMembers, type TeamMember } from "./teamData";

const TeamTree = () => {
  const navigate = useNavigate();

  const containerRef = useRef<HTMLDivElement>(null);
  const treeRef = useRef<HTMLDivElement>(null);

  const [scale, setScale] = useState(1);
  const [treeHeight, setTreeHeight] = useState(0);

  /* =========================================================
     GET CHILDREN
  ========================================================= */

  const getChildren = (parentId: string | null) => {
    return teamMembers.filter((member) => member.parentId === parentId);
  };

  /* =========================================================
     AUTO SCALE & FIT
  ========================================================= */

  useLayoutEffect(() => {
    const updateTreeSize = () => {
      if (!containerRef.current || !treeRef.current) return;

      const containerWidth = containerRef.current.clientWidth;
      const treeWidth = treeRef.current.scrollWidth;
      const treeHeightValue = treeRef.current.scrollHeight;

      if (treeWidth > 0) {
        const newScale = Math.min(1, (containerWidth - 32) / treeWidth);

        setScale(newScale);
        setTreeHeight(treeHeightValue * newScale);
      }
    };

    updateTreeSize();

    const resizeObserver = new ResizeObserver(() => {
      updateTreeSize();
    });

    if (containerRef.current) {
      resizeObserver.observe(containerRef.current);
    }

    if (treeRef.current) {
      resizeObserver.observe(treeRef.current);
    }

    window.addEventListener("resize", updateTreeSize);

    return () => {
      resizeObserver.disconnect();
      window.removeEventListener("resize", updateTreeSize);
    };
  }, []);

  /* =========================================================
     MEMBER CARD
  ========================================================= */

  const MemberCard = ({ member }: { member: TeamMember }) => {
    return (
      <button
        type="button"
        onClick={() => navigate(`/team/${member.uniqueId}`)}
        className="group relative flex w-[185px] shrink-0 flex-col items-center outline-none"
      >
        {/* Profile Image */}
        <div
          className="
            relative z-10
            h-20 w-20
            overflow-hidden
            rounded-full
            border-[3px] border-[#DCA32C]
            bg-white
            shadow-lg
            transition-all duration-300
            group-hover:scale-110
            group-hover:shadow-xl
          "
        >
          <img
            src={member.image}
            alt={member.name}
            className="h-full w-full object-cover"
          />
        </div>

        {/* Member Card */}
        <div
          className="
            relative -mt-5
            w-full
            rounded-[20px]
            bg-[#171717]
            px-4 pb-4 pt-8
            shadow-lg
            transition-all duration-300
            group-hover:-translate-y-2
            group-hover:bg-gradient-to-r
            group-hover:from-[#C48A18]
            group-hover:to-[#DCA32C]
            group-hover:shadow-2xl
          "
        >
          <h3 className="truncate text-sm font-bold text-white">
            {member.name}
          </h3>

          <p className="mt-1 truncate text-xs text-white/60">
            {member.designation}
          </p>

          <span
            className="
              mt-3 inline-block
              text-[9px]
              font-semibold
              uppercase
              tracking-wider
              text-[#DCA32C]
              transition
              group-hover:text-white
            "
          >
            View Profile →
          </span>
        </div>
      </button>
    );
  };

  /* =========================================================
     RECURSIVE CHILD TREE
  ========================================================= */

  const TreeNode = ({ member }: { member: TeamMember }) => {
    const children = getChildren(member.id);

    return (
      <div className="flex shrink-0 flex-col items-center">
        {/* Current Member */}
        <MemberCard member={member} />

        {/* Children */}
        {children.length > 0 && (
          <>
            {/* Parent Downward Line */}
            <div className="h-10 w-px bg-[#DCA32C]/60" />

            {/* Children Row */}
            <div className="flex flex-nowrap justify-center">
              {children.map((child, index) => {
                const isFirst = index === 0;
                const isLast = index === children.length - 1;
                const isOnly = children.length === 1;

                return (
                  <div
                    key={child.uniqueId}
                    className="
                      relative
                      flex
                      shrink-0
                      flex-col
                      items-center
                      px-4
                    "
                  >
                    {/* Horizontal Connector */}
                    {!isOnly && (
                      <div
                        className={`
                          absolute
                          top-0
                          h-px
                          bg-[#DCA32C]/60

                          ${
                            isFirst
                              ? "left-1/2 w-1/2"
                              : isLast
                                ? "right-1/2 w-1/2"
                                : "left-0 w-full"
                          }
                        `}
                      />
                    )}

                    {/* Child Upward Line */}
                    <div className="relative z-10 h-8 w-px bg-[#DCA32C]/60" />

                    {/* Child Tree */}
                    <TreeNode member={child} />
                  </div>
                );
              })}
            </div>
          </>
        )}
      </div>
    );
  };

  /* =========================================================
     ROOT MEMBERS
  ========================================================= */

  const rootMembers = getChildren(null);

  /*
    We want:

    Vishal + Neha
          |
          |
      Common Line
          |
       Main Team
  */

  const founder = rootMembers.find((member) => member.id === "founder");

  const director = rootMembers.find((member) => member.id === "director");

  /* All children under Founder */
  const mainTeam = founder ? getChildren(founder.id) : [];

  /* =========================================================
     RENDER
  ========================================================= */

  return (
    <section
      className="
        min-h-screen
        overflow-hidden
        bg-[#F7F7F5]
        py-10
        sm:py-16
      "
    >
      <div
        className="
          mx-auto
          w-full
          max-w-[1920px]
          px-2
          sm:px-4
        "
      >
        {/* =====================================================
            HEADING
        ===================================================== */}

        <div className="mb-10 text-center sm:mb-14">
          <h1 className="heading-primary">Meet Our Organization</h1>

          <p
            className="
              mx-auto
              mt-3
              max-w-2xl
              text-sm
              leading-6
              text-gray-500
              sm:text-base
            "
          >
            Explore our team structure and discover the people behind our
            success.
          </p>
        </div>

        {/* =====================================================
            TREE VIEWPORT
        ===================================================== */}

        <div ref={containerRef} className="w-full overflow-hidden">
          <div
            style={{
              height: treeHeight ? `${treeHeight}px` : "auto",
            }}
            className="
              relative
              w-full
              transition-all
              duration-300
            "
          >
            <div
              ref={treeRef}
              style={{
                transform: `scale(${scale})`,
                transformOrigin: "top center",
              }}
              className="
                absolute
                left-1/2
                flex
                w-max
                -translate-x-1/2
                flex-col
                items-center
                pb-10
              "
            >
              {/* =================================================
                  TOP LEADERS
              ================================================= */}

              <div
                className="
                  flex
                  items-start
                  justify-center
                  gap-8
                "
              >
                {/* Vishal */}
                {founder && (
                  <div className="flex shrink-0 flex-col items-center">
                    <MemberCard member={founder} />
                  </div>
                )}

                {/* Neha */}
                {director && (
                  <div className="flex shrink-0 flex-col items-center">
                    <MemberCard member={director} />
                  </div>
                )}
              </div>

              {/* =================================================
                  COMMON CONNECTOR

                  Vishal       Neha
                     |           |
                     └─────┬─────┘
                           |
  ================================================= */}

              {mainTeam.length > 0 && (
                <div
                  className="
                    relative
                    h-16
                    w-[402px]
                  "
                >
                  {/* Vishal Vertical Line */}
                  <div
                    className="
                      absolute
                      left-[92px]
                      top-0
                      h-8
                      w-px
                      bg-[#DCA32C]/60
                    "
                  />

                  {/* Neha Vertical Line */}
                  <div
                    className="
                      absolute
                      right-[92px]
                      top-0
                      h-8
                      w-px
                      bg-[#DCA32C]/60
                    "
                  />

                  {/* Horizontal Common Line */}
                  <div
                    className="
                      absolute
                      left-[92px]
                      right-[92px]
                      top-8
                      h-px
                      bg-[#DCA32C]/60
                    "
                  />

                  {/* Common Downward Line */}
                  <div
                    className="
                      absolute
                      left-1/2
                      top-8
                      h-8
                      w-px
                      -translate-x-1/2
                      bg-[#DCA32C]/60
                    "
                  />
                </div>
              )}

              {/* =================================================
                  MAIN TEAM
              ================================================= */}

              {mainTeam.length > 0 && (
                <div className="flex flex-nowrap justify-center">
                  {mainTeam.map((member, index) => {
                    const isFirst = index === 0;
                    const isLast = index === mainTeam.length - 1;
                    const isOnly = mainTeam.length === 1;

                    return (
                      <div
                        key={member.uniqueId}
                        className="
                          relative
                          flex
                          shrink-0
                          flex-col
                          items-center
                          px-4
                        "
                      >
                        {/* Main Team Horizontal Connector */}
                        {!isOnly && (
                          <div
                            className={`
                              absolute
                              top-0
                              h-px
                              bg-[#DCA32C]/60

                              ${
                                isFirst
                                  ? "left-1/2 w-1/2"
                                  : isLast
                                    ? "right-1/2 w-1/2"
                                    : "left-0 w-full"
                              }
                            `}
                          />
                        )}

                        {/* Main Team Vertical Connector */}
                        <div
                          className="
                            relative
                            z-10
                            h-8
                            w-px
                            bg-[#DCA32C]/60
                          "
                        />

                        {/* Main Team Member */}
                        <TreeNode member={member} />
                      </div>
                    );
                  })}
                </div>
              )}

              {/* =================================================
                  FALLBACK
              ================================================= */}

              {rootMembers.length === 0 && (
                <div className="py-20 text-center">
                  <p className="text-gray-500">No team members found.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TeamTree;
