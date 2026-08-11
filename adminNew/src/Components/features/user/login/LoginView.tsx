
import { useForm,type SubmitHandler } from "react-hook-form";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";
import { EnvelopeSimple, LockKey, SpinnerGap } from "@phosphor-icons/react";
import { useAppDispatch, useAppSelector } from "../../../app/hook";
import { loginUser } from "../userSlice";

export interface ILoginFormInput {
  email: string;
  password: string;
}

export const LoginView = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { loading, error } = useAppSelector((state) => state.user);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ILoginFormInput>();

  const onSubmit: SubmitHandler<ILoginFormInput> = async (data) => {
    const res = await dispatch(loginUser(data));

    if (res.meta.requestStatus === "fulfilled") {
      toast.success((res.payload as { message?: string })?.message || "Login successful!");
      navigate("/");
    } else {
      toast.error(res.payload as string);
    }
  };

  return (
    <>
      {/* Inline styles for complex text typing keyframes */}
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
          {/* LEFT FORM SECTION */}
          <div className="flex min-h-screen items-center justify-center bg-black p-6 sm:p-12">
            <div className="w-full max-w-[500px]">
              <h2 className="mb-6 text-center text-2xl font-bold uppercase tracking-widest text-white sm:text-3xl">
                Login
              </h2>

              {error && (
                <p className="mb-4 text-center text-sm font-medium text-red-500">
                  {error}
                </p>
              )}

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
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
                      className="w-full rounded-full border border-[#f8e7c9]/30 bg-[#ad8642]/[0.06] py-3.5 pl-12 pr-4 text-gray-100 placeholder-gray-400 transition-all focus:border-[#ca8f2b] focus:outline-none focus:ring-1 focus:ring-[#ca8f2b]"
                      {...register("email", { required: "Email is required" })}
                    />
                  </div>
                  {errors.email && (
                    <p className="mt-1.5 text-center text-xs text-red-400">
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
                      className="w-full rounded-full border border-[#f8e7c9]/30 bg-[#ad8642]/[0.06] py-3.5 pl-12 pr-4 text-gray-100 placeholder-gray-400 transition-all focus:border-[#ca8f2b] focus:outline-none focus:ring-1 focus:ring-[#ca8f2b]"
                      {...register("password", {
                        required: "Password is required",
                      })}
                    />
                  </div>
                  {errors.password && (
                    <p className="mt-1.5 text-center text-xs text-red-400">
                      {errors.password.message}
                    </p>
                  )}
                </div>

                {/* SUBMIT BUTTON */}
                <button
                  type="submit"
                  disabled={loading}
                  className="animate-gradient flex w-full items-center justify-center rounded-full bg-gradient-to-r from-[#ca8f2b] via-white to-[#ca8f2b] py-3.5 font-semibold text-black shadow-[0_0_12px_rgba(202,143,43,0.4)] transition-all duration-350 hover:-translate-y-0.5 hover:scale-[1.03] hover:shadow-[0_0_18px_rgba(202,143,43,0.6)] disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {loading ? (
                    <div className="flex items-center gap-2">
                      <SpinnerGap className="h-5 w-5 animate-spin" />
                      <span>Loading...</span>
                    </div>
                  ) : (
                    "Login"
                  )}
                </button>

                {/* REGISTER LINK */}
                <p className="mt-4 text-center text-sm text-white">
                  Don't have an account?{" "}
                  <Link
                    to="/register"
                    className="font-medium text-[#ca8f2b] hover:underline"
                  >
                    Register
                  </Link>
                </p>
              </form>
            </div>
          </div>

          {/* RIGHT IMAGE SECTION */}
          <div className="relative hidden min-h-screen items-center justify-center bg-[url('https://media0.giphy.com/media/l5JbspfwZ0yjHjlJ0K/giphy.gif')] bg-cover bg-center lg:flex">
            {/* DARK OVERLAY */}
            <div className="absolute inset-0 z-10 bg-black/75" />

            {/* CENTERED LOGO + TYPING */}
            <div className="relative z-20 flex flex-col items-center text-center">
              {/* LOGO */}
              <img
                src="https://ahaanmedia.com/asc/layouts/asc.png"
                alt="Logo"
                className="mb-6 w-50 drop-shadow-[0_0_10px_#ca8f2b]"
              />

              {/* TYPING ANIMATION */}
              <div className="h-[150px] w-[420px] overflow-hidden">
                <h2 className="animate-typing inline-block overflow-hidden whitespace-nowrap text-5xl font-bold leading-tight text-white">
                  Ahaan Software
                  <br />
                  Consulting
                </h2>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

