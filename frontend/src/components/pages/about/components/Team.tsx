import React, { useState, useEffect, useRef } from "react";
import { getTeams } from "../../../../api/Api";

interface TeamMember {
  name: string;
  position: string;
  image: string;
  description?: string;
}

export const Team: React.FC = () => {
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null);

  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [isPaused, setIsPaused] = useState<boolean>(false);

  useEffect(() => {
    const fetchTeam = async () => {
      try {
        const data = await getTeams();
        setTeamMembers(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error("Failed to fetch team members:", error);
        setTeamMembers([]);
      }
    };
    fetchTeam();
  }, []);

  // Smooth Auto-Scroll Effect (Replaces Swiper Autoplay)
  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container || teamMembers.length === 0) return;

    let animationFrameId: number;
    const speed = 0.8; // Adjust speed as needed

    const scroll = () => {
      if (!isPaused && !showModal) {
        if (container.scrollLeft >= container.scrollWidth / 2) {
          // Seamless loop reset when halfway through duplicated array
          container.scrollLeft = 0;
        } else {
          container.scrollLeft += speed;
        }
      }
      animationFrameId = requestAnimationFrame(scroll);
    };

    animationFrameId = requestAnimationFrame(scroll);

    return () => cancelAnimationFrame(animationFrameId);
  }, [isPaused, showModal, teamMembers]);

  const handleShow = (member: TeamMember) => {
    setSelectedMember(member);
    setShowModal(true);
  };

  const handleClose = () => {
    setShowModal(false);
    setSelectedMember(null);
  };

  // Duplicate items for infinite seamless scroll loop
  const displayMembers = [...teamMembers, ...teamMembers];

  return (
    <div className="mx-auto w-full max-w-[1600px] px-4 py-12 sm:py-16 md:py-20 font-['Outfit',sans-serif]">
      {/* SECTION HEADER */}
      <div className="mb-8 text-center">
        <h2 className="heading-primary">
          Meet Our Team
        </h2>
        <p className="text-gray-600 text-sm sm:text-base max-w-4xl mx-auto leading-relaxed mb-10">
          Driven to be future-ready, and push beyond the building blocks of
          technology, digital, and marketing, Ahaan Software Consulting proudly
          participated in The Asia Business Show 2024 in Singapore—the powerhouse
          of innovation and enterprise!
        </p>
      </div>

      {/* CUSTOM CAROUSEL TRACK */}
      {teamMembers.length === 0 ? (
        <p className="text-center text-gray-500 py-10">Loading team members...</p>
      ) : (
        <div
          ref={scrollContainerRef}
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          className="flex gap-4 sm:gap-6 overflow-x-auto no-scrollbar py-4 scroll-smooth"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {displayMembers.map((member, idx) => (
            <div
              key={idx}
              onClick={() => handleShow(member)}
              className="group flex-shrink-0 w-[calc(50%-8px)] sm:w-[calc(33.333%-14px)] md:w-[calc(25%-18px)] lg:w-[calc(20%-20px)] flex flex-col items-center justify-center rounded-2xl bg-white p-4 sm:p-6 text-center cursor-pointer transition-all duration-300 hover:-translate-y-3"
            >
              <img
                src={member.image}
                alt={member.name}
                className="h-[100px] w-[100px] sm:h-[130px] sm:w-[130px] rounded-full object-cover shadow-[0_10px_25px_rgba(0,0,0,0.3)] transition-transform duration-300 group-hover:scale-105 mb-4"
              />
              <h5 className="text-base sm:text-lg font-semibold text-black mb-1 truncate w-full">
                {member.name}
              </h5>
              <p className="text-[#ebb800] text-sm sm:text-base font-normal leading-normal truncate w-full">
                {member.position}
              </p>
            </div>
          ))}
        </div>
      )}

      {/* MEMBER DETAILS MODAL */}
      {showModal && selectedMember && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm"
          onClick={handleClose}
        >
          <div
            className="relative w-full max-w-[95%] sm:max-w-[85%] md:max-w-[500px] rounded-2xl bg-white p-6 sm:p-8 text-center shadow-2xl transition-all"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              type="button"
              className="absolute top-4 right-4 flex h-8 w-8 items-center justify-center rounded-full bg-red-600 text-white font-medium text-lg hover:bg-red-700 transition-colors"
              onClick={handleClose}
            >
              ×
            </button>

            {/* Modal Body */}
            <div className="flex flex-col items-center">
              <img
                src={selectedMember.image}
                alt={selectedMember.name}
                className="h-[90px] w-[90px] sm:h-[120px] sm:w-[120px] rounded-full object-cover shadow-md mb-4"
              />
              <h4 className="text-xl sm:text-2xl font-semibold text-black">
                {selectedMember.name}
              </h4>
              <h5 className="text-[#C7892B] text-base sm:text-lg font-medium mt-1">
                {selectedMember.position}
              </h5>
              <p className="text-gray-800 text-xs sm:text-sm md:text-base leading-relaxed mt-4 px-2">
                {selectedMember.description || "No description available."}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Hide Scrollbar Utility */}
      <style>{`
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  );
};