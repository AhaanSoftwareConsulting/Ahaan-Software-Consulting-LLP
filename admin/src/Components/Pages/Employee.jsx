import React, { useEffect, useState } from "react";
import { getAllTeams } from "../Api/api";
import "./Employee.css";

const Employee = () => {
  const [teams, setTeams] = useState([]);

  useEffect(() => {
    loadTeams();
  }, []);

const loadTeams = async () => {
  try {
    const res = await getAllTeams();

    console.log(res);

    setTeams(res.data || []);
  } catch (err) {
    console.log(err);
    setTeams([]);
  }
};

  const formatDate = (date) => {
    if (!date) return "-";

    return new Date(date).toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  return (
    <div className="team-list-wrapper">

      <div className="team-header">
        <h2>Employees</h2>
      </div>

      <div className="employee-table-responsive">

        <table className="team-table">

          <thead>
            <tr>
              <th>Photo</th>
              <th>Name & Position</th>
              <th>Date of Birth</th>
              <th>Date of Joining</th>
              <th>Added On</th>
            </tr>
          </thead>

          <tbody>

            {Array.isArray(teams) &&
              teams.map((item) => (
                <tr key={item._id}>

                  <td>
                    <img
                      src={item.image}
                      alt={item.name}
                      className="team-avatar"
                    />
                  </td>

                  <td>
                    <div className="team-name">
                      {item.name}
                    </div>

                    <div className="team-position">
                      {item.position}
                    </div>
                  </td>

                  <td>{formatDate(item.dateOfBirth)}</td>

                  <td>{formatDate(item.dateOfJoining)}</td>

                  <td>{formatDate(item.createdAt)}</td>

                </tr>
              ))}

          </tbody>

        </table>

      </div>

    </div>
  );
};

export default Employee;