// src/pages/admin/teams/EditTeam.jsx

import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { getSingleTeam, updateTeam } from "../Api/api";
import "./AddTeam.css"; // same design as AddTeam

const EditTeam = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  // ==============================
  // Load Single Team
  // ==============================
  const loadTeam = async () => {
    try {
      const res = await getSingleTeam(id);
      const team = res.data.data;

      if (team) {
        setValue("name", team.name);
        setValue("position", team.position);
        setValue("description", team.description);
        setValue("image", team.image);
        setValue(
          "dateOfBirth",
          team.dateOfBirth ? team.dateOfBirth.split("T")[0] : "",
        );

        setValue(
          "dateOfJoining",
          team.dateOfJoining ? team.dateOfJoining.split("T")[0] : "",
        );
      }
    } catch (err) {
      console.error("❌ Failed to load team:", err);

      toast.error(err.response?.data?.message || "Failed To Load Team");
    }
  };

  // ==============================
  // Submit Updated Data
  // ==============================
const onSubmit = async (data) => {
  try {
    const res = await updateTeam(id, data);

    toast.success(
      res.data.message || "Team Updated Successfully"
    );

    setTimeout(() => {
      navigate("/view-team");
    }, 1000);

  } catch (err) {
    console.error("❌ Update error:", err);

    toast.error(
      err.response?.data?.message ||
      "Failed To Update Team"
    );
  }
};

  useEffect(() => {
    loadTeam();
  }, []);

  return (
    <div className="container mt-4">
      <div className="blog-form-wrapper">
        <h2 className="form-title">Edit Team Member</h2>

        <form onSubmit={handleSubmit(onSubmit)} className="blog-form">
          {/* Name */}
          <div className="form-group">
            <label className="form-label">Name</label>
            <input
              className="form-control styled-input"
              {...register("name", { required: true })}
              placeholder="Enter full name"
            />
            {errors.name && <span className="error">Name is required</span>}
          </div>

          {/* Position */}
          <div className="form-group">
            <label className="form-label">Position</label>
            <input
              className="form-control styled-input"
              {...register("position", { required: true })}
              placeholder="Enter position"
            />
            {errors.position && (
              <span className="error">Position is required</span>
            )}
          </div>

          {/* Date of Birth */}
          <div className="form-group">
            <label className="form-label">Date of Birth</label>
            <input
              type="date"
              className="form-control styled-input"
              {...register("dateOfBirth", {
                required: "Date of Birth is required",
              })}
            />
            {errors.dateOfBirth && (
              <span className="error">{errors.dateOfBirth.message}</span>
            )}
          </div>

          {/* Date of Joining */}
          <div className="form-group">
            <label className="form-label">Date of Joining</label>
            <input
              type="date"
              className="form-control styled-input"
              {...register("dateOfJoining", {
                required: "Date of Joining is required",
              })}
            />
            {errors.dateOfJoining && (
              <span className="error">{errors.dateOfJoining.message}</span>
            )}
          </div>

          {/* Description */}
          <div className="form-group">
            <label className="form-label">Description</label>
            <textarea
              className="form-control styled-input"
              rows={4}
              {...register("description")}
              placeholder="Write something..."
            ></textarea>
          </div>

          {/* Image URL */}
          <div className="form-group">
            <label className="form-label">Image URL</label>
            <input
              className="form-control styled-input"
              {...register("image")}
              placeholder="https://example.com/team.jpg"
            />
          </div>

          <button type="submit" className="submit-button mt-3">
            Update Team Member
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditTeam;
