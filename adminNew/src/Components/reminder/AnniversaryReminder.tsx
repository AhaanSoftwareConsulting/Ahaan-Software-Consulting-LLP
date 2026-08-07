import { useEffect, useState } from "react";
import { getAllTeams } from "../Api/api";
import {
  isWithin7Days,
  getDaysLeft,
  formatDate,
  getCompletedYears,
} from "./reminderUtils";

interface TeamMember {
  _id: string;
  name: string;
  position: string;
  image: string;
  dateOfJoining: string;
}

export default function AnniversaryReminder() {
  const [anniversaries, setAnniversaries] = useState<TeamMember[]>([]);

  useEffect(() => {
    loadAnniversaries();
  }, []);

  const loadAnniversaries = async () => {
    try {
      const res = await getAllTeams();

      const data: TeamMember[] = res.data || [];

      const upcoming = data
        .filter((item) => item.dateOfJoining)
        .filter((item) => isWithin7Days(item.dateOfJoining))
        .sort(
          (a, b) =>
            (getDaysLeft(a.dateOfJoining) ?? 0) -
            (getDaysLeft(b.dateOfJoining) ?? 0)
        );

      setAnniversaries(upcoming);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div
      className="
        rounded-xl
        bg-white
        p-5
        shadow-md
        max-h-[520px]
        overflow-y-auto
      "
    >
      {/* Title */}
      <h4
        className="
          sticky
          top-0
          z-10
          border-b
          border-gray-200
          bg-white
          pb-3
          text-lg
          font-bold
          text-gray-800
        "
      >
        🎉 Upcoming Work Anniversaries
      </h4>

      {anniversaries.length === 0 ? (
        <p className="mt-20 text-center text-gray-500">
          No work anniversaries in the next 7 days
        </p>
      ) : (
        anniversaries.map((item) => (
          <div
            key={item._id}
            className="
              mt-4
              flex
              flex-col
              items-center
              gap-4
              rounded-xl
              border
              border-gray-200
              bg-white
              p-4
              text-center
              transition-all
              duration-300
              hover:-translate-y-1
              hover:shadow-lg

              md:flex-row
              md:text-left
            "
          >
            {/* Image */}
            <img
              src={item.image}
              alt={item.name}
              className="
                h-20
                w-20
                rounded-xl
                border-4
                border-gray-100
                object-cover
                flex-shrink-0
              "
            />

            {/* Content */}
            <div className="flex-1">
              <h5 className="text-sm font-bold text-gray-800">
                {item.name}
              </h5>

              <p className="mt-1 text-xs text-amber-600">
                {item.position}
              </p>

              <p className="mt-2 text-sm text-gray-600">
                <span className="font-semibold">
                  Joining:
                </span>{" "}
                {formatDate(item.dateOfJoining)}
              </p>

              <p className="mt-2 font-semibold text-blue-600">
                🎖{" "}
                {getCompletedYears(item.dateOfJoining)}{" "}
                Years Completed
              </p>

              <span
                className="
                  mt-3
                  inline-block
                  rounded-full
                  bg-amber-100
                  px-4
                  py-2
                  text-sm
                  font-semibold
                  text-amber-700
                "
              >
                {getDaysLeft(item.dateOfJoining) === 0
                  ? "🎉 Today"
                  : getDaysLeft(item.dateOfJoining) === 1
                  ? "Tomorrow"
                  : `${getDaysLeft(
                      item.dateOfJoining
                    )} Days Left`}
              </span>
            </div>
          </div>
        ))
      )}
    </div>
  );
}