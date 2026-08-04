import React from "react";
import { useAppSelector } from "../app/hook";
import {
  FaEnvelope,
  FaUserTie,
  FaUserShield,
  FaCheckCircle,
  FaCalendarAlt,
} from "react-icons/fa";
import "./Profile.css";

const Profile = () => {
  const { user } = useAppSelector((state) => state.user);

  if (!user) {
    return (
      <div className="container mt-5">
        <h3>User not found.</h3>
      </div>
    );
  }

  return (
    <div className="container-fluid py-4">

      <div className="profile-card">

        {/* Header */}
        <div className="profile-header">

          <div className="profile-image">
            <img
              src={user.profilePicture}
              alt={user.name}
            />
          </div>

          <div className="profile-info">
            <h2>{user.name}</h2>

            <p>
              {user.designation
                ?.replace("_", " ")
                .replace(/\b\w/g, (c) => c.toUpperCase())}
            </p>

            <span
              className={`status-badge ${
                user.status === "approved"
                  ? "approved"
                  : "pending"
              }`}
            >
              {user.status}
            </span>
          </div>

        </div>

        {/* Body */}

        <div className="row mt-5">

          <div className="col-lg-6">

            <div className="info-box">

              <label>
                <FaEnvelope /> Email
              </label>

              <h5>{user.email}</h5>

            </div>

          </div>

          <div className="col-lg-6">

            <div className="info-box">

              <label>
                <FaUserTie /> Designation
              </label>

              <h6>
                {user.designation
                  ?.replace("_", " ")
                  .replace(/\b\w/g, (c) => c.toUpperCase())}
              </h6>

            </div>

          </div>

          <div className="col-lg-6 mt-4">

            <div className="info-box">

              <label>
                <FaUserShield /> Role
              </label>

              <h6>
                {user.role
                  ?.replace("_", " ")
                  .replace(/\b\w/g, (c) => c.toUpperCase())}
              </h6>

            </div>

          </div>

          <div className="col-lg-6 mt-4">

            <div className="info-box">

              <label>
                <FaCheckCircle /> Status
              </label>

              <h6>{user.status}</h6>

            </div>

          </div>

          <div className="col-lg-6 mt-4">

            <div className="info-box">

              <label>
                <FaCalendarAlt /> Account Created
              </label>

              <h6>
                {user.createdAt
                  ? new Date(user.createdAt).toLocaleDateString()
                  : "-"}
              </h6>

            </div>

          </div>

          <div className="col-lg-6 mt-4">

            <div className="info-box">

              <label>
                <FaCalendarAlt /> Last Updated
              </label>

              <h6>
                {user.updatedAt
                  ? new Date(user.updatedAt).toLocaleDateString()
                  : "-"}
              </h6>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
};

export default Profile;