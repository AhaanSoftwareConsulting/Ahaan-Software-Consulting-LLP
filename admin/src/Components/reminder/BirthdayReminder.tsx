import { useEffect, useState } from "react";
import { getAllTeams } from "../Api/api";
import {
  isWithin7Days,
  getDaysLeft,
  formatDate,
} from "./reminderUtils";

interface TeamMember {
  _id: string;
  name: string;
  position: string;
  image: string;
  dateOfBirth: string;
}

export default function BirthdayReminder() {
  const [birthdays, setBirthdays] = useState<
    TeamMember[]
  >([]);

  useEffect(() => {
    loadBirthdays();
  }, []);

  const loadBirthdays = async () => {
    try {
      const res = await getAllTeams();

      const data: TeamMember[] =
        res.data || [];

      const upcoming = data
        .filter((item) => item.dateOfBirth)
        .filter((item) =>
          isWithin7Days(item.dateOfBirth)
        )
        .sort(
          (a, b) =>
            (getDaysLeft(a.dateOfBirth) ?? 0) -
            (getDaysLeft(b.dateOfBirth) ?? 0)
        );

      setBirthdays(upcoming);
    } catch (err) {
      console.error(err);
    }
  };
    return (
  <div className="max-h-[520px] overflow-y-auto rounded-xl bg-white p-5 shadow-lg">
    <h4 className="sticky top-0 z-10 border-b border-gray-200 bg-white pb-3 text-base font-bold text-gray-800">
      🎂 Upcoming Birthdays
    </h4>

   {birthdays.length === 0 ? (
  <p className="mt-20 text-center text-gray-500">
    No birthdays in the next 7 days
  </p>
) : (
  birthdays.map((item) => (
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
        "
      />

      <div className="flex-1">
        <h5 className="text-sm font-bold text-gray-800">
          {item.name}
        </h5>

        <p className="mt-1 text-xs text-amber-600">
          {item.position}
        </p>

        <p className="mt-2 text-sm text-gray-600">
          <span className="font-semibold">
            DOB:
          </span>{" "}
          {formatDate(item.dateOfBirth)}
        </p>

        <span
          className="
            mt-3
            inline-block
            rounded-full
            bg-emerald-100
            px-4
            py-2
            text-sm
            font-semibold
            text-emerald-700
          "
        >
          {getDaysLeft(item.dateOfBirth) === 0
            ? "🎉 Today"
            : getDaysLeft(item.dateOfBirth) === 1
            ? "Tomorrow"
            : `${getDaysLeft(
                item.dateOfBirth
              )} Days Left`}
        </span>
      </div>
    </div>
  ))
)}
  </div>
);
}