import { useState } from "react";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

const EventCalendar = () => {
  const today = new Date();

  const [currentMonth, setCurrentMonth] = useState<Date>(
    new Date(today.getFullYear(), today.getMonth(), 1)
  );

  const [selectedDate, setSelectedDate] = useState<Date>(today);

  const days: string[] = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

  const getMonthDays = (): (number | "")[] => {
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();

    const firstDay = new Date(year, month, 1).getDay();
    const totalDays = new Date(year, month + 1, 0).getDate();

    const arr: (number | "")[] = [];

    // Empty cells
    for (let i = 0; i < firstDay; i++) {
      arr.push("");
    }

    // Month days
    for (let day = 1; day <= totalDays; day++) {
      arr.push(day);
    }

    return arr;
  };

  const prevMonth = (): void => {
    setCurrentMonth(
      (prev) => new Date(prev.getFullYear(), prev.getMonth() - 1, 1)
    );
  };

  const nextMonth = (): void => {
    setCurrentMonth(
      (prev) => new Date(prev.getFullYear(), prev.getMonth() + 1, 1)
    );
  };

  const selectDate = (day: number | ""): void => {
    if (day === "") return;

    setSelectedDate(
      new Date(
        currentMonth.getFullYear(),
        currentMonth.getMonth(),
        day
      )
    );
  };

  return (
    <div className="w-full rounded-xl bg-[#fffdfa] p-4 shadow-md sm:p-6">

      {/* Header */}
      <div className="flex items-center justify-between">

        <button
          onClick={prevMonth}
          className="rounded-lg bg-gray-100 p-2 transition hover:bg-gray-200"
        >
          <FiChevronLeft size={18} />
        </button>

        <h3 className="text-base font-semibold text-gray-900 sm:text-lg">
          {currentMonth.toLocaleString("default", {
            month: "long",
            year: "numeric",
          })}
        </h3>

        <button
          onClick={nextMonth}
          className="rounded-lg bg-gray-100 p-2 transition hover:bg-gray-200"
        >
          <FiChevronRight size={18} />
        </button>

      </div>

      {/* Selected Day */}
      <h4 className="mt-3 text-center text-sm font-semibold text-gray-600 sm:text-base">
        {selectedDate.toLocaleDateString("default", {
          weekday: "long",
        })}
      </h4>

      {/* Weekdays */}
      <div className="mt-5 grid grid-cols-7 text-center text-xs font-bold text-gray-800 sm:text-sm">
        {days.map((day) => (
          <div key={day}>{day}</div>
        ))}
      </div>

      {/* Calendar */}
      <div className="mt-3 grid grid-cols-7 gap-1 sm:gap-2">

        {getMonthDays().map((day, index) => {
          const isToday =
            day === today.getDate() &&
            currentMonth.getMonth() === today.getMonth() &&
            currentMonth.getFullYear() === today.getFullYear();

          const isSelected =
            day === selectedDate.getDate() &&
            currentMonth.getMonth() === selectedDate.getMonth() &&
            currentMonth.getFullYear() ===
              selectedDate.getFullYear();

          return (
            <button
              key={index}
              onClick={() => selectDate(day)}
              disabled={day === ""}
              className={`
                flex aspect-square items-center justify-center rounded-lg text-sm transition-all
                ${
                  day === ""
                    ? "cursor-default bg-transparent"
                    : "hover:bg-gray-100"
                }
                ${
                  isToday
                    ? "font-bold text-black"
                    : "text-gray-700"
                }
                ${
                  isSelected
                    ? "bg-[#FFB700] font-bold text-black hover:bg-[#FFB700]"
                    : ""
                }
              `}
            >
              {day}
            </button>
          );
        })}

      </div>
    </div>
  );
};

export default EventCalendar;