import { useLayoutEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { teamMembers, type TeamMember } from "./teamData";

const TeamTree = () => {
  const navigate = useNavigate();

  const containerRef = useRef<HTMLDivElement>(null);
  const treeRef = useRef<HTMLDivElement>(null);

  const [scale, setScale] = useState(1);
  const [treeHeight, setTreeHeight] = useState(0);

  const getChildren = (parentId: string | null) => {
    return teamMembers.filter((member) => member.parentId === parentId);
  };

  /* Auto Scale & Fit to Page */
  useLayoutEffect(() => {
    const updateTreeSize = () => {
      if (!containerRef.current || !treeRef.current) return;

      const containerWidth = containerRef.current.clientWidth;
      const treeWidth = treeRef.current.scrollWidth;
      const height = treeRef.current.scrollHeight;

      if (treeWidth > 0) {
        // dynamic scaling to fit perfectly inside screen
        const newScale = Math.min(1, (containerWidth - 32) / treeWidth);

        setScale(newScale);
        setTreeHeight(height * newScale);
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

  /* Member Card */
  const MemberCard = ({ member }: { member: TeamMember }) => {
    return (
      <button
        onClick={() => navigate(`/team/${member.id}`)}
        className="group relative flex w-[185px] shrink-0 flex-col items-center outline-none"
      >
        {/* Profile Image */}
        <div className="relative z-10 h-20 w-20 overflow-hidden rounded-full border-[3px] border-[#DCA32C] bg-white shadow-lg transition duration-300 group-hover:scale-110 group-hover:shadow-xl">
          <img
            src={`${member.image}?auto=format&fit=crop&w=300&q=80`}
            alt={member.name}
            className="h-full w-full object-cover"
          />
        </div>

        {/* Card */}
        <div className="relative -mt-5 w-full rounded-[20px] bg-[#171717] px-4 pb-4 pt-8 shadow-lg transition-all duration-300 group-hover:-translate-y-2 group-hover:bg-gradient-to-r group-hover:from-[#C48A18] group-hover:to-[#DCA32C] group-hover:shadow-2xl">
          <h3 className="truncate text-sm font-bold text-white">
            {member.name}
          </h3>
          <p className="mt-1 truncate text-xs text-white/60">
            {member.designation}
          </p>
          <span className="mt-3 inline-block text-[9px] font-semibold uppercase tracking-wider text-[#DCA32C] transition group-hover:text-white">
            View Profile →
          </span>
        </div>
      </button>
    );
  };

  /* Tree Node */
  const TreeNode = ({ member }: { member: TeamMember }) => {
    const children = getChildren(member.id);

    return (
      <div className="flex shrink-0 flex-col items-center">
        {/* Current Member */}
        <MemberCard member={member} />

        {/* Children Container */}
        {children.length > 0 && (
          <>
            {/* Parent Downward Vertical Line */}
            <div className="h-10 w-px bg-[#DCA32C]/60" />

            <div className="flex flex-nowrap justify-center">
              {children.map((child, index) => {
                const isFirst = index === 0;
                const isLast = index === children.length - 1;
                const isOnly = children.length === 1;

                return (
                  <div
                    key={child.id}
                    className="relative flex flex-col items-center px-4"
                  >
                    {/* Horizontal Connector Lines per Child */}
                    {!isOnly && (
                      <div
                        className={`absolute top-0 h-px bg-[#DCA32C]/60 ${
                          isFirst
                            ? "left-1/2 w-1/2"
                            : isLast
                            ? "right-1/2 w-1/2"
                            : "w-full"
                        }`}
                      />
                    )}

                    {/* Child Upward Vertical Line */}
                    <div className="h-8 w-px bg-[#DCA32C]/60 z-10" />

                    {/* Recursive Sub-tree */}
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

  const rootMembers = getChildren(null);

  return (
    <section className="min-h-screen overflow-hidden bg-[#F7F7F5] py-10 sm:py-16">
      <div className="mx-auto w-full max-w-[1920px] px-2 sm:px-4">
        {/* Heading */}
        <div className="mb-10 text-center sm:mb-14">
          <h1 className="heading-primary">Meet Our Organization</h1>
          <p className="mx-auto mt-3 max-w-2xl text-sm leading-6 text-gray-500 sm:text-base">
            Explore our team structure and discover the people behind our success.
          </p>
        </div>

        {/* Tree Viewport */}
        <div ref={containerRef} className="w-full overflow-hidden">
          <div
            style={{
              height: treeHeight ? `${treeHeight}px` : "auto",
            }}
            className="relative w-full transition-all duration-300"
          >
            <div
              ref={treeRef}
              style={{
                transform: `scale(${scale})`,
                transformOrigin: "top center",
              }}
              className="absolute left-1/2 flex w-max -translate-x-1/2 justify-center pb-10"
            >
              {rootMembers.map((member) => (
                <TreeNode key={member.id} member={member} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TeamTree;