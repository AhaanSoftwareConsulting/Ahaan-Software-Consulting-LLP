import React from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { createForm } from "../../../../api/Api";

// Form Data Interface
interface FormInputs {
  name: string;
  email: string;
  service: string;
  budget: string;
  projectDetails: string;
}

export const Connection: React.FC = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormInputs>();

  const onSubmit: SubmitHandler<FormInputs> = async (data) => {
    try {
      await createForm(data);
      toast.success("Form submitted successfully!", {
        position: "top-right",
        autoClose: 4000,
      });
      reset();
    } catch (error) {
      toast.error("Form submission failed! Please try again.", {
        position: "top-right",
        autoClose: 4000,
      });
      console.error("❌ Error submitting form:", error);
    }
  };

  return (
    /* Outer Section Wrapper with responsive margins */
    <div className="relative my-10 lg:my-32">
      <ToastContainer />

      {/* Dark Background Strip */}
      <section className="bg-[#0f0f0f] text-white py-12 sm:py-16 lg:py-1">
        <div className="max-w-[1350px] mx-auto px-4 lg:px-6 2xl:px-10">
          
          {/* Main Grid: Responsive column layout with vertical centering */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
            
            {/* LEFT SIDE: Text Content */}
            <div className="lg:col-span-7 flex flex-col justify-center py-2 lg:py-4 pr-0 lg:pr-8">
              <div className="space-y-4 sm:space-y-6">
                <span className="text-[#D4AF37] font-bold tracking-widest text-xs uppercase block">
                  Planning your next big project?
                </span>
                
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-tight uppercase">
                  Connect With Our <br className="hidden sm:block" />
                  <span className="text-[#D4AF37]">Technology Experts</span>
                </h2>

                <p className="text-zinc-400 text-sm sm:text-base max-w-lg leading-relaxed">
                  Explore exciting possibilities, discuss project goals, and start building software solutions designed to scale your business effortlessly.
                </p>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4 pt-2">
                  <a
                    href="/service"
                    className="shine-btn text-center px-6 py-3.5 bg-[#D4AF37] text-black font-bold text-xs tracking-wider uppercase rounded-md hover:bg-amber-600 transition-colors shadow-md"
                  >
                    Explore Services
                  </a>
                  <a
                    href="/contact-us"
                    className="shine-btn text-center px-6 py-3.5 border border-[#D4AF37] text-[#D4AF37] font-bold text-xs tracking-wider uppercase rounded-md hover:bg-amber-500/10 transition-colors"
                  >
                    Schedule Call
                  </a>
                </div>
              </div>
            </div>

            {/* RIGHT SIDE: Floating Form Card */}
            <div className="lg:col-span-5 my-0 lg:-my-28 bg-white text-zinc-900 p-6 sm:p-10 lg:p-12 rounded-3xl sm:rounded-[2.5rem] shadow-[0_0_25px_rgba(196,138,24,0.35),0_0_60px_rgba(230,179,60,0.25)] relative z-20">
              
              {/* Form Title */}
              <div className="mb-6 sm:mb-8 text-center">
                <h3 className="text-2xl sm:text-3xl font-extrabold text-zinc-900 tracking-tight">
                  It's Quick & Easy
                </h3>
                <p className="text-xs text-zinc-500 font-medium mt-1">
                  Fill out the details below to request a callback
                </p>
              </div>

              {/* Form Inputs */}
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 sm:space-y-5">
                
                {/* Name */}
                <div>
                  <input
                    type="text"
                    placeholder="Full Name"
                    className={`w-full bg-[#f8f9fa] text-zinc-800 placeholder-zinc-400 font-medium text-sm px-5 py-3.5 sm:py-4 rounded-full border ${
                      errors.name ? "border-red-500" : "border-zinc-200"
                    } focus:outline-none focus:border-amber-500 focus:bg-white transition-all`}
                    {...register("name", { required: "Name is required" })}
                  />
                  {errors.name && (
                    <span className="text-red-500 text-xs font-medium mt-1 block px-2">
                      {errors.name.message}
                    </span>
                  )}
                </div>

                {/* Email */}
                <div>
                  <input
                    type="email"
                    placeholder="Email Address"
                    className={`w-full bg-[#f8f9fa] text-zinc-800 placeholder-zinc-400 font-medium text-sm px-5 py-3.5 sm:py-4 rounded-full border ${
                      errors.email ? "border-red-500" : "border-zinc-200"
                    } focus:outline-none focus:border-amber-500 focus:bg-white transition-all`}
                    {...register("email", {
                      required: "Email is required",
                      pattern: {
                        value: /^\S+@\S+$/i,
                        message: "Invalid email format",
                      },
                    })}
                  />
                  {errors.email && (
                    <span className="text-red-500 text-xs font-medium mt-1 block px-2">
                      {errors.email.message}
                    </span>
                  )}
                </div>

                {/* Service Dropdown */}
                <div>
                  <select
                    className={`w-full bg-[#f8f9fa] text-zinc-800 font-medium text-sm px-5 py-3.5 sm:py-4 rounded-full border ${
                      errors.service ? "border-red-500" : "border-zinc-200"
                    } focus:outline-none focus:border-amber-500 focus:bg-white transition-all cursor-pointer`}
                    {...register("service", { required: "Select a service" })}
                  >
                    <option value="" className="text-zinc-400">
                      Select Service
                    </option>
                    <option value="Web Development">Web Development</option>
                    <option value="App Development">App Development</option>
                    <option value="UI/UX Design">UI/UX Design</option>
                    <option value="E-Commerce Development">E-Commerce</option>
                    <option value="Digital Marketing">Digital Marketing</option>
                  </select>
                  {errors.service && (
                    <span className="text-red-500 text-xs font-medium mt-1 block px-2">
                      {errors.service.message}
                    </span>
                  )}
                </div>

                {/* Budget Dropdown */}
                <div>
                  <select
                    className={`w-full bg-[#f8f9fa] text-zinc-800 font-medium text-sm px-5 py-3.5 sm:py-4 rounded-full border ${
                      errors.budget ? "border-red-500" : "border-zinc-200"
                    } focus:outline-none focus:border-amber-500 focus:bg-white transition-all cursor-pointer`}
                    {...register("budget", { required: "Select a budget" })}
                  >
                    <option value="" className="text-zinc-400">
                      Select Budget
                    </option>
                    <option value="Below $1000">Below $1000</option>
                    <option value="$1000 - $5000">$1000 - $5000</option>
                    <option value="Above $5000">Above $5000</option>
                  </select>
                  {errors.budget && (
                    <span className="text-red-500 text-xs font-medium mt-1 block px-2">
                      {errors.budget.message}
                    </span>
                  )}
                </div>

                {/* Textarea */}
                <div>
                  <textarea
                    rows={4}
                    placeholder="Tell us about your project..."
                    className={`w-full bg-[#f8f9fa] text-zinc-800 placeholder-zinc-400 font-medium text-sm px-5 py-3.5 sm:py-4 rounded-2xl border ${
                      errors.projectDetails ? "border-red-500" : "border-zinc-200"
                    } focus:outline-none focus:border-amber-500 focus:bg-white transition-all resize-none`}
                    {...register("projectDetails", {
                      required: "Details are required",
                    })}
                  ></textarea>
                  {errors.projectDetails && (
                    <span className="text-red-500 text-xs font-medium mt-1 block px-2">
                      {errors.projectDetails.message}
                    </span>
                  )}
                </div>

                {/* Submit Button */}
                <div className="pt-2 sm:pt-3">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="shine-btn bg-[#161616] hover:bg-black text-white font-semibold text-sm px-5 py-4 rounded-full w-full flex items-center justify-center gap-2 transition-all duration-300 disabled:opacity-50 active:scale-[0.98]"
                  >
                    {isSubmitting ? "SUBMITTING..." : "REQUEST NOW"}
                  </button>
                </div>

              </form>
            </div>

          </div>
        </div>
      </section>
    </div>
  );
};

export default Connection;