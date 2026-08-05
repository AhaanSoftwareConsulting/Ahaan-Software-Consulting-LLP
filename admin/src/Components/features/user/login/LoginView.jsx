import React from "react";
import { useForm } from "react-hook-form";
import { useAppDispatch, useAppSelector } from "../../../app/hook";
import { loginUser } from "../userSlice";
import { useNavigate, Link } from "react-router-dom";
import "./LoginView.css";
import { toast } from "react-toastify";

const LoginView = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { loading, error } = useAppSelector((state) => state.user);

  // React Hook Form
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    const res = await dispatch(loginUser(data));

    if (res.meta.requestStatus === "fulfilled") {
      toast.success(res.payload.message);
      navigate("/");
    } else {
      toast.error(res.payload);
    }
  };

  return (
    <div className="login-container">
      <div className="row g-0">
        {/* LEFT FORM SECTION */}
        <div className="col-lg-6 form-side d-flex align-items-center justify-content-center">
          <div className="form-box">
            <h2 className="text-white mb-4 register-form-heading">Login</h2>

            {error && <p className="error-text">{error}</p>}

            <form onSubmit={handleSubmit(onSubmit)}>
              {/* EMAIL */}
              <input
                type="email"
                placeholder="Email"
                className="form-control mb-3"
                {...register("email", { required: "Email is required" })}
              />
              {errors.email && (
                <p className="error-text mb-2">{errors.email.message}</p>
              )}

              {/* PASSWORD */}
              <input
                type="password"
                placeholder="Password"
                className="form-control mb-3"
                {...register("password", { required: "Password is required" })}
              />
              {errors.password && (
                <p className="error-text mb-2">{errors.password.message}</p>
              )}

              <button
                type="submit"
                className="btn submit-btn w-100"
                disabled={loading}
              >
                {loading ? "Loading..." : "Login"}
              </button>

              <p className="text-center text-white mt-3">
                Don't have an account?{" "}
                <Link to="/register" className="login-link">
                  Register
                </Link>
              </p>
            </form>
          </div>
        </div>

        {/* RIGHT IMAGE SECTION */}
        <div className="col-lg-6 image-side">
          <div className="image-overlay">
            {/* LOGO */}
            <img
              src="https://ahaanmedia.com/asc/layouts/asc.png"
              alt="Logo"
              className="company-logo"
            />

            {/* TYPING ANIMATION */}
            <div className="typing-wrapper">
              <h2 className="typing-text">
                Ahaan Software
                <br />
                Consulting
              </h2>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginView;
