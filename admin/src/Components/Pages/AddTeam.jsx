import React from "react";
import { useForm } from "react-hook-form";
import { createTeam } from "../Api/api";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import "./AddTeam.css";

const AddTeam = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const res = await createTeam(data);

      toast.success(res.data.message || "Team Member Added Successfully");

      reset();

      setTimeout(() => {
        navigate("/view-team");
      }, 1000);
    } catch (err) {
      console.log(err);

      toast.error(err.response?.data?.message || "Failed To Add Team Member");
    }
  };

  return (
    <div className="container mt-4">
      <div className="blog-form-wrapper">
        <h2 className="form-title">Add Team Member</h2>

        <form onSubmit={handleSubmit(onSubmit)} className="blog-form">
          <div className="form-group">
            <label className="form-label">Name</label>
            <input
              className="form-control styled-input"
              {...register("name", { required: true })}
              placeholder="Enter full name"
            />
            {errors.name && <span className="error">Name is required</span>}
          </div>

          <div className="form-group">
            <label className="form-label">Position</label>
            <input
              className="form-control styled-input"
              {...register("position", { required: true })}
              placeholder="Job role"
            />
            {errors.position && (
              <span className="error">Position is required</span>
            )}
          </div>

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

          <div className="form-group">
            <label className="form-label">Description</label>
            <textarea
              className="form-control styled-input"
              rows={4}
              {...register("description")}
              placeholder="Short description"
            ></textarea>
          </div>

          <div className="form-group">
            <label className="form-label">Image URL</label>
            <input
              className="form-control styled-input"
              {...register("image")}
              placeholder="https://example.com/photo.jpg"
            />
          </div>

          <button type="submit" className="submit-button mt-3">
            Add Team Member
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddTeam;
