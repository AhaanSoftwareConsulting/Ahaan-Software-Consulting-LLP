import { useState, type ChangeEvent } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";
import {
  User,
  EnvelopeSimple,
  LockKey,
  Briefcase,
  UploadSimple,
  CheckCircle,
} from "@phosphor-icons/react";
import { useAppDispatch } from "../../../app/hook";
import { registerUser } from "../userSlice";

export interface IRegisterFormInput {
  name: string;
  email: string;
  password: string;
  designation: string;
}

export const RegisterView = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [file, setFile] = useState<File | null>(null);
  const [fileName, setFileName] = useState<string>("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IRegisterFormInput>();

  const onSubmit: SubmitHandler<IRegisterFormInput> = async (data) => {
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
      toast.success(
        (res.payload as { message?: string })?.message || "Registration successful!"
      );
      navigate("/login");
    } else {
      toast.error((res.payload as string) || "Registration failed");
    }
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      const selectedFile = e.target.files[0];
      setFile(selectedFile);
      setFileName(selectedFile.name);
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
                encType="multipart/form-data"
                className="space-y-4"
              >
                {/* NAME */}
                <div>
                  <div className="relative flex items-center">
                    <User
                      size={20}
                      className="absolute left-4 text-[#ca8f2b]"
                    />
                    <input
                      type="text"
                      placeholder="Name"
                      className="w-full rounded-full border border-[#ffe2b0]/20 bg-[#ad8642]/[0.047] py-3.5 pl-12 pr-4 text-white placeholder-gray-300 transition-all focus:border-[#ffe2b0]/50 focus:bg-[#ad8642]/[0.047] focus:outline-none focus:ring-2 focus:ring-[#ca8f2b]/50"
                      {...register("name", { required: "Name is required" })}
                    />
                  </div>
                  {errors.name && (
                    <p className="mt-1.5 text-xs text-[#ff6b6b]">
                      {errors.name.message}
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

                {/* DESIGNATION */}
                <div>
                  <div className="relative flex items-center">
                    <Briefcase
                      size={20}
                      className="absolute left-4 text-[#ca8f2b]"
                    />
                    <select
                      className="w-full appearance-none rounded-full border border-[#ffe2b0]/20 bg-[#ad8642]/[0.047] py-3.5 pl-12 pr-4 text-white transition-all focus:border-[#ffe2b0]/50 focus:bg-[#ad8642]/[0.047] focus:outline-none focus:ring-2 focus:ring-[#ca8f2b]/50"
                      {...register("designation", {
                        required: "Select a designation",
                      })}
                    >
                      <option value="" className="bg-black text-white">
                        Select Designation
                      </option>
                      <option value="web_developer" className="bg-black text-white">
                        Web Developer
                      </option>
                      <option value="designer" className="bg-black text-white">
                        Designer
                      </option>
                      <option value="project_manager" className="bg-black text-white">
                        Project Manager
                      </option>
                    </select>
                  </div>
                  {errors.designation && (
                    <p className="mt-1.5 text-xs text-[#ff6b6b]">
                      {errors.designation.message}
                    </p>
                  )}
                </div>

                {/* CUSTOM FILE UPLOAD */}
                <label className="flex cursor-pointer flex-col items-center justify-center rounded-[50px] border border-dashed border-[#ca8f2b]/50 bg-[#ad8642]/10 py-6 text-[#ca8f2b] transition-all hover:bg-[#ca8f2b]/10 hover:shadow-[0_0_10px_rgba(202,143,43,0.3)]">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="hidden"
                  />
                  <UploadSimple size={24} className="mb-1" />
                  <span className="font-medium">Upload Profile Picture</span>
                </label>

                {fileName && (
                  <p className="flex items-center justify-center gap-1.5 text-xs text-sky-400">
                    <CheckCircle size={16} /> Selected: {fileName}
                  </p>
                )}

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