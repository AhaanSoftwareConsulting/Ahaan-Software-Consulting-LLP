import React, { useState, useEffect } from "react";
import "./EventCalendar.css";

export default function EventCalendar() {
  const today = new Date();
  const [currentMonth, setCurrentMonth] = useState(
    new Date(today.getFullYear(), today.getMonth(), 1)
  );
  const [selectedDate, setSelectedDate] = useState(today);

  const days = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

  // Build calendar grid
  const getMonthDays = () => {
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();

    const firstDay = new Date(year, month, 1).getDay();
    const totalDays = new Date(year, month + 1, 0).getDate();

    let arr = [];

    // Blank days before month starts
    for (let i = 0; i < firstDay; i++) arr.push("");

    // Actual days
    for (let d = 1; d <= totalDays; d++) arr.push(d);

    return arr;
  };

  function prevMonth() {
    setCurrentMonth(
      (d) => new Date(d.getFullYear(), d.getMonth() - 1, 1)
    );
  }

  function nextMonth() {
    setCurrentMonth(
      (d) => new Date(d.getFullYear(), d.getMonth() + 1, 1)
    );
  }

  function selectDate(day) {
    if (day === "") return;
    setSelectedDate(
      new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day)
    );
  }

  return (
    <div className="calendar-box">

      {/* Header */}
      <div className="calendar-header">
        <button onClick={prevMonth}>‹</button>
        <h3>
          {currentMonth.toLocaleString("default", {
            month: "long",
            year: "numeric",
          })}
        </h3>
        <button onClick={nextMonth}>›</button>
      </div>

      {/* ⭐ Selected Day Name Added Here */}
      <h4 className="selected-day-name">
        {selectedDate.toLocaleDateString("default", { weekday: "long" })}
      </h4>

      {/* Weekday names */}
      <div className="calendar-weekdays">
        {days.map((d) => (
          <div key={d}>{d}</div>
        ))}
      </div>

      {/* Days grid */}
      <div className="calendar-grid">
        {getMonthDays().map((day, index) => {
          const isToday =
            day === today.getDate() &&
            currentMonth.getMonth() === today.getMonth() &&
            currentMonth.getFullYear() === today.getFullYear();

          const isSelected =
            day === selectedDate.getDate() &&
            currentMonth.getMonth() === selectedDate.getMonth() &&
            currentMonth.getFullYear() === selectedDate.getFullYear();

          return (
            <div
              key={index}
              className={`calendar-day 
                ${day === "" ? "empty" : ""}
                ${isToday ? "today" : ""}
                ${isSelected ? "selected" : ""}
              `}
              onClick={() => selectDate(day)}
            >
              {day}
            </div>
          );
        })}
      </div>
    </div>
  );
}
