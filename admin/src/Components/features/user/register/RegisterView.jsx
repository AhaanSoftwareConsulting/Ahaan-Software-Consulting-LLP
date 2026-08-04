import React from "react";
import { useForm } from "react-hook-form";
import { useAppDispatch } from "../../../app/hook";
import { registerUser } from "../userSlice";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";
import "./RegisterView.css";

const RegisterView = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [file, setFile] = React.useState(null);
  const [fileName, setFileName] = React.useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    const fd = new FormData();
    fd.append("name", data.name);
    fd.append("email", data.email);
    fd.append("password", data.password);
    fd.append("designation", data.designation);

    if (file) {
      fd.append("profilePicture", file);
    }

    const res = await dispatch(registerUser(fd));

    if (res.meta.requestStatus === "fulfilled") {
      toast.success(res.payload.message); 
      navigate("/login");
    } else {
      toast.error(res.payload || "Registration failed");
    }
  };

  return (
    <div className="register-container">
      <div className="row g-0">
        {/* LEFT IMAGE SECTION */}
        <div className="col-lg-6 image-side">
          <div className="image-overlay">
            <img
              src="https://ahaanmedia.com/asc/layouts/asc.png"
              alt="Logo"
              className="company-logo"
            />

            <div className="typing-wrapper">
              <h2 className="typing-text">
                Ahaan Software
                <br />
                Consulting
              </h2>
            </div>
          </div>
        </div>

        {/* RIGHT FORM SECTION */}
        <div className="col-lg-6 form-side d-flex align-items-center justify-content-center">
          <div className="form-box">
            <h2 className="text-white mb-4 register-form-heading">
              Register Now
            </h2>

            <form
              onSubmit={handleSubmit(onSubmit)}
              encType="multipart/form-data"
            >
              {/* NAME */}
              <input
                type="text"
                className="form-control mb-3"
                placeholder="Name"
                {...register("name", { required: "Name is required" })}
              />
              {errors.name && (
                <p className="text-danger mb-2">{errors.name.message}</p>
              )}

              {/* EMAIL */}
              <input
                type="email"
                className="form-control mb-3"
                placeholder="Email"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /\S+@\S+\.\S+/,
                    message: "Enter a valid email",
                  },
                })}
              />
              {errors.email && (
                <p className="text-danger mb-2">{errors.email.message}</p>
              )}

              {/* PASSWORD */}
              <input
                type="password"
                className="form-control mb-3"
                placeholder="Password"
                {...register("password", {
                  required: "Password is required",
                  minLength: { value: 6, message: "Minimum 6 characters" },
                })}
              />
              {errors.password && (
                <p className="text-danger mb-2">{errors.password.message}</p>
              )}

              {/* DESIGNATION */}
              <select
                className="form-select mb-3"
                {...register("designation", {
                  required: "Select a designation",
                })}
              >
                <option value="">Select Designation</option>
                <option value="web_developer">Web Developer</option>
                <option value="designer">Designer</option>
                <option value="project_manager">Project Manager</option>
              </select>
              {errors.designation && (
                <p className="text-danger mb-2">{errors.designation.message}</p>
              )}

              {/* FILE UPLOAD FIXED */}
              <label className="custom-file-upload mb-4">
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    if (e.target.files?.[0]) {
                      setFile(e.target.files[0]);
                      setFileName(e.target.files[0].name);
                    }
                  }}
                />
                Upload Profile Picture
              </label>

              {fileName && (
                <p className="text-info mb-2">Selected: {fileName}</p>
              )}

              {/* SUBMIT */}
              <button type="submit" className="btn submit-btn w-100">
                Register
              </button>

              <p className="text-center text-white mt-3">
                Already have an account?{" "}
                <Link to="/login" className="login-link">
                  Login
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterView;
