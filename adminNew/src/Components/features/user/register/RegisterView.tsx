import { useForm, type SubmitHandler } from "react-hook-form";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";
import {
  User as UserIcon,
  EnvelopeSimple,
  LockKey,
  UserGear,
} from "@phosphor-icons/react";
import { useAppDispatch } from "../../../app/hook";
import { registerUser } from "../userSlice";


export interface IRegisterFormInput {
  fullName: string;
  email: string;
  password: string;
  role: string;
}

export const RegisterView = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IRegisterFormInput>({
    defaultValues: {
      role: "employee", // Default role matching selfRegisterableRoles
    },
  });

  const onSubmit: SubmitHandler<IRegisterFormInput> = async (data) => {
    // Send plain JSON payload matching backend: const { email, password, fullName, role } = req.body
    const payload = {
      fullName: data.fullName,
      email: data.email,
      password: data.password,
      role: data.role,
    };

    const res = await dispatch(registerUser(payload));

    if (res.meta.requestStatus === "fulfilled") {
      toast.success(
        (res.payload as { message?: string })?.message ||
          "Registered. Please verify your email, then wait for manager/CEO approval before logging in."
      );
      navigate("/login");
    } else {
      toast.error((res.payload as string) || "Registration failed");
    }
  };

  return (
    <>
      {/* Inline styles for custom keyframe animations */}
      <style>{`
        @keyframes gradientMove {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        @keyframes typing {
          0% { width: 0; }
          40% { width: 100%; }
          60% { width: 100%; }
          100% { width: 0; }
        }
        @keyframes blink {
          50% { border-color: transparent; }
        }
        .animate-gradient {
          background-size: 200% 200%;
          animation: gradientMove 4s ease infinite;
        }
        .animate-typing {
          animation: typing 4s steps(30) infinite, blink 0.7s infinite;
        }
      `}</style>

      <div className="min-h-screen bg-[#000707]">
        <div className="grid min-h-screen grid-cols-1 lg:grid-cols-2">
          {/* LEFT IMAGE SECTION */}
          <div className="relative hidden min-h-screen items-center justify-center bg-[url('https://media0.giphy.com/media/v1.Y2lkPTc5MGI3NjExYW92b2d3ZzVic2lsYjZicHo5cnJiYTI2aWVjNGJzcnUxdGl6ZmJtMCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/l5JbspfwZ0yjHjlJ0K/giphy.gif')] bg-cover bg-center lg:flex">
            {/* OVERLAY */}
            <div className="absolute inset-0 z-10 bg-black/75" />

            {/* CENTERED CONTENT */}
            <div className="relative z-20 flex flex-col items-center text-center">
              {/* LOGO */}
              <img
                src="https://ahaanmedia.com/asc/layouts/asc.png"
                alt="Logo"
                className="mb-6 w-50 drop-shadow-[0_0_10px_#ca8f2b]"
              />

              {/* TYPING HEADING */}
              <div className="h-[150px] w-[420px] overflow-hidden">
                <h2 className="animate-typing inline-block overflow-hidden whitespace-nowrap text-5xl font-bold leading-tight text-white">
                  Ahaan Software
                  <br />
                  Consulting
                </h2>
              </div>
            </div>
          </div>

          {/* RIGHT FORM SECTION */}
          <div className="flex min-h-screen items-center justify-center bg-black p-6 sm:p-12">
            <div className="w-full max-w-[500px]">
              <h2 className="mb-6 text-center text-2xl font-bold uppercase tracking-widest text-white sm:text-3xl">
                Register Now
              </h2>

              <form
                onSubmit={handleSubmit(onSubmit)}
                className="space-y-4"
              >
                {/* FULL NAME */}
                <div>
                  <div className="relative flex items-center">
                    <UserIcon
                      size={20}
                      className="absolute left-4 text-[#ca8f2b]"
                    />
                    <input
                      type="text"
                      placeholder="Full Name"
                      className="w-full rounded-full border border-[#ffe2b0]/20 bg-[#ad8642]/[0.047] py-3.5 pl-12 pr-4 text-white placeholder-gray-300 transition-all focus:border-[#ffe2b0]/50 focus:bg-[#ad8642]/[0.047] focus:outline-none focus:ring-2 focus:ring-[#ca8f2b]/50"
                      {...register("fullName", { required: "Full name is required" })}
                    />
                  </div>
                  {errors.fullName && (
                    <p className="mt-1.5 text-xs text-[#ff6b6b]">
                      {errors.fullName.message}
                    </p>
                  )}
                </div>

                {/* EMAIL */}
                <div>
                  <div className="relative flex items-center">
                    <EnvelopeSimple
                      size={20}
                      className="absolute left-4 text-[#ca8f2b]"
                    />
                    <input
                      type="email"
                      placeholder="Email"
                      className="w-full rounded-full border border-[#ffe2b0]/20 bg-[#ad8642]/[0.047] py-3.5 pl-12 pr-4 text-white placeholder-gray-300 transition-all focus:border-[#ffe2b0]/50 focus:bg-[#ad8642]/[0.047] focus:outline-none focus:ring-2 focus:ring-[#ca8f2b]/50"
                      {...register("email", {
                        required: "Email is required",
                        pattern: {
                          value: /\S+@\S+\.\S+/,
                          message: "Enter a valid email",
                        },
                      })}
                    />
                  </div>
                  {errors.email && (
                    <p className="mt-1.5 text-xs text-[#ff6b6b]">
                      {errors.email.message}
                    </p>
                  )}
                </div>

                {/* PASSWORD */}
                <div>
                  <div className="relative flex items-center">
                    <LockKey
                      size={20}
                      className="absolute left-4 text-[#ca8f2b]"
                    />
                    <input
                      type="password"
                      placeholder="Password"
                      className="w-full rounded-full border border-[#ffe2b0]/20 bg-[#ad8642]/[0.047] py-3.5 pl-12 pr-4 text-white placeholder-gray-300 transition-all focus:border-[#ffe2b0]/50 focus:bg-[#ad8642]/[0.047] focus:outline-none focus:ring-2 focus:ring-[#ca8f2b]/50"
                      {...register("password", {
                        required: "Password is required",
                        minLength: {
                          value: 6,
                          message: "Minimum 6 characters",
                        },
                      })}
                    />
                  </div>
                  {errors.password && (
                    <p className="mt-1.5 text-xs text-[#ff6b6b]">
                      {errors.password.message}
                    </p>
                  )}
                </div>

                {/* ROLE */}
                <div>
                  <div className="relative flex items-center">
                    <UserGear
                      size={20}
                      className="absolute left-4 text-[#ca8f2b]"
                    />
                    <select
                      className="w-full appearance-none rounded-full border border-[#ffe2b0]/20 bg-[#ad8642]/[0.047] py-3.5 pl-12 pr-4 text-white transition-all focus:border-[#ffe2b0]/50 focus:bg-[#ad8642]/[0.047] focus:outline-none focus:ring-2 focus:ring-[#ca8f2b]/50"
                      {...register("role", {
                        required: "Select a role",
                      })}
                    >
                      <option value="employee" className="bg-black text-white">
                        Employee
                      </option>
                      <option value="hr" className="bg-black text-white">
                        HR
                      </option>
                    </select>
                  </div>
                  {errors.role && (
                    <p className="mt-1.5 text-xs text-[#ff6b6b]">
                      {errors.role.message}
                    </p>
                  )}
                </div>

                {/* SUBMIT BUTTON */}
                <button
                  type="submit"
                  className="animate-gradient w-full rounded-full bg-gradient-to-r from-[#ca8f2b] via-white to-[#ca8f2b] py-3.5 text-lg font-semibold text-black shadow-[0_0_12px_rgba(202,143,43,0.4)] transition-all duration-350 hover:-translate-y-0.5 hover:scale-[1.03] hover:shadow-[0_0_18px_rgba(202,143,43,0.6)]"
                >
                  Register
                </button>

                {/* LOGIN LINK */}
                <p className="mt-4 text-center text-sm text-white">
                  Already have an account?{" "}
                  <Link
                    to="/login"
                    className="font-medium text-[#ca8f2b] hover:underline"
                  >
                    Login
                  </Link>
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};