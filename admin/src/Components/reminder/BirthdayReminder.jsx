import React, { useEffect, useState } from "react";
import { getAllTeams } from "../Api/api";
import {
  isWithin7Days,
  getDaysLeft,
  formatDate,
} from "./reminderUtils";
import "./ReminderCard.css";

const BirthdayReminder = () => {
  const [birthdays, setBirthdays] = useState([]);

  useEffect(() => {
    loadBirthdays();
  }, []);

  const loadBirthdays = async () => {
    try {
      const res = await getAllTeams();

      const data = res.data || [];

      const upcoming = data
        .filter((item) => item.dateOfBirth)
        .filter((item) => isWithin7Days(item.dateOfBirth))
        .sort(
          (a, b) =>
            getDaysLeft(a.dateOfBirth) -
            getDaysLeft(b.dateOfBirth)
        );

      setBirthdays(upcoming);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="reminder-box">

      <h4 className="reminder-title">
        🎂 Upcoming Birthdays
      </h4>

      {birthdays.length === 0 ? (
        <p className="empty-text">
          No birthdays in the next 7 days
        </p>
      ) : (
        birthdays.map((item) => (
          <div
            className="reminder-card"
            key={item._id}
          >

            <img
              src={item.image}
              alt={item.name}
              className="reminder-img"
            />

            <div className="reminder-content">

              <h5>{item.name}</h5>

              <p className="designation">
                {item.position}
              </p>

              <p>
                <strong>DOB:</strong>{" "}
                {formatDate(item.dateOfBirth)}
              </p>

              <span className="badge birthday">

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
};

export default BirthdayReminder;