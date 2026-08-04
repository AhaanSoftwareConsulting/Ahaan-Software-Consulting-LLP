import React, { useEffect, useState } from "react";
import { getAllTeams } from "../Api/api";
import {
  isWithin7Days,
  getDaysLeft,
  formatDate,
  getCompletedYears,
} from "./reminderUtils";
import "./ReminderCard.css";

const AnniversaryReminder = () => {
  const [anniversaries, setAnniversaries] = useState([]);

  useEffect(() => {
    loadAnniversaries();
  }, []);

  const loadAnniversaries = async () => {
    try {
      const res = await getAllTeams();

      const data = res.data || [];

      const upcoming = data
        .filter((item) => item.dateOfJoining)
        .filter((item) => isWithin7Days(item.dateOfJoining))
        .sort(
          (a, b) =>
            getDaysLeft(a.dateOfJoining) -
            getDaysLeft(b.dateOfJoining)
        );

      setAnniversaries(upcoming);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="reminder-box">

      <h4 className="reminder-title">
        🎉 Upcoming Work Anniversaries
      </h4>

      {anniversaries.length === 0 ? (
        <p className="empty-text">
          No work anniversaries in the next 7 days
        </p>
      ) : (
        anniversaries.map((item) => (
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
                <strong>Joining:</strong>{" "}
                {formatDate(item.dateOfJoining)}
              </p>

              <p className="completed-years">
                🎖 {getCompletedYears(item.dateOfJoining)} Years Completed
              </p>

              <span className="badge anniversary">

                {getDaysLeft(item.dateOfJoining) === 0
                  ? "🎉 Today"
                  : getDaysLeft(item.dateOfJoining) === 1
                  ? "Tomorrow"
                  : `${getDaysLeft(item.dateOfJoining)} Days Left`}

              </span>

            </div>

          </div>
        ))
      )}
    </div>
  );
};

export default AnniversaryReminder;