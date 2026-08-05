import React, { useEffect, useState } from "react";
import axios from "axios";
import { useForm, type SubmitHandler } from "react-hook-form";
import { ArrowClockwise, Paperclip } from "@phosphor-icons/react";
import { getAllCareers } from "../../../../api/WordpressAPI";

// TypeScript Interfaces
interface ApplyFormProps {
  currentJob?: string;
}

interface FormInputs {
  name: string;
  phone: string;
  email: string;
  role: string;
  experience: number | string;
  coverLetter: string;
  resume: FileList;
}

interface JobOption {
  title: string;
}

export const CareerApplyForm: React.FC<ApplyFormProps> = ({ currentJob }) => {
  const [jobs, setJobs] = useState<JobOption[]>([]);
  const [captcha, setCaptcha] = useState<string>("");
  const [userCaptcha, setUserCaptcha] = useState<string>("");
  const [captchaError, setCaptchaError] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<FormInputs>();

  const generateCaptcha = (): void => {
    const chars = "ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz23456789";
    let code = "";
    for (let i = 0; i < 6; i++) {
      code += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setCaptcha(code);
    setUserCaptcha("");
    setCaptchaError("");
  };

  useEffect(() => {
    fetchJobs();
    generateCaptcha();
  }, []);

  const fetchJobs = async (): Promise<void> => {
    try {
      const data = await getAllCareers();
      const formatted: JobOption[] = data.map((item: any) => ({
        title: item.title?.rendered || "",
      }));
      setJobs(formatted);
    } catch (error) {
      console.error("Error fetching job titles:", error);
    }
  };

  useEffect(() => {
    if (currentJob) {
      setValue("role", currentJob);
    }
  }, [currentJob, setValue]);

  const decodeHtml = (html: string): string => {
    const doc = new DOMParser().parseFromString(html, "text/html");
    return doc.documentElement.textContent || "";
  };

  const onSubmit: SubmitHandler<FormInputs> = async (data) => {

    if (userCaptcha.trim() !== captcha.trim()) {
      setCaptchaError("Invalid captcha code. Please try again.");
      generateCaptcha();
      return;
    }

    setIsSubmitting(true);
    setCaptchaError("");

    try {
      const formData = new FormData();
      formData.append("name", data.name);
      formData.append("phone", data.phone);
      formData.append("email", data.email);
      formData.append("role", data.role);
      formData.append("experience", String(data.experience));
      formData.append("coverLetter", data.coverLetter);
      formData.append("resume", data.resume[0]);

      const response = await axios.post(
        "https://ahaan-admin.ahaanmedia.com/wp-json/career/v1/apply",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        },
      );

      console.log(response.data);
      alert("Application submitted successfully!");
      reset();
      generateCaptcha();
    } catch (error) {
      console.error("Submission error:", error);
      alert("Submission failed. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white p-6 sm:p-8 lg:p-10 rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.08)] border border-slate-100 max-w-full">
      <h3 className="text-xl sm:text-2xl font-bold text-center text-zinc-900 mb-6 sm:mb-8 capitalize">
        Apply for this position
      </h3>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-4 sm:space-y-5"
      >
        {/* Full Name */}
        <div>
          <input
            type="text"
            placeholder="Full Name"
            className="w-full h-14 px-5 bg-[#f7f7f7] border border-[#d9d9d9] rounded-2xl text-zinc-900 text-sm sm:text-base outline-none transition-all duration-300 focus:bg-white focus:border-zinc-900 placeholder:text-zinc-500"
            {...register("name", { required: "Name is required" })}
          />
          {errors.name && (
            <small className="block mt-1.5 text-xs text-red-600 font-medium pl-1">
              {errors.name.message}
            </small>
          )}
        </div>

        {/* Phone Number */}
        <div>
          <input
            type="tel"
            placeholder="Phone Number"
            className="w-full h-14 px-5 bg-[#f7f7f7] border border-[#d9d9d9] rounded-2xl text-zinc-900 text-sm sm:text-base outline-none transition-all duration-300 focus:bg-white focus:border-zinc-900 placeholder:text-zinc-500"
            {...register("phone", {
              required: "Phone is required",
              pattern: {
                value: /^[0-9]+$/,
                message: "Please enter valid digits",
              },
              onChange: (e) => {
                e.target.value = e.target.value.replace(/[^0-9]/g, "");
              },
            })}
          />
          {errors.phone && (
            <small className="block mt-1.5 text-xs text-red-600 font-medium pl-1">
              {errors.phone.message}
            </small>
          )}
        </div>

        {/* Email Address */}
        <div>
          <input
            type="email"
            placeholder="Email Address"
            className="w-full h-14 px-5 bg-[#f7f7f7] border border-[#d9d9d9] rounded-2xl text-zinc-900 text-sm sm:text-base outline-none transition-all duration-300 focus:bg-white focus:border-zinc-900 placeholder:text-zinc-500"
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "Invalid email address",
              },
            })}
          />
          {errors.email && (
            <small className="block mt-1.5 text-xs text-red-600 font-medium pl-1">
              {errors.email.message}
            </small>
          )}
        </div>

        {/* Select Role */}
        <div>
          <select
            className="w-full h-14 px-5 bg-[#f7f7f7] border border-[#d9d9d9] rounded-2xl text-zinc-900 text-sm sm:text-base outline-none transition-all duration-300 focus:bg-white focus:border-zinc-900 cursor-pointer appearance-none"
            {...register("role", { required: "Please select a role" })}
          >
            <option value="">Select your role</option>
            {jobs.map((job, index) => {
              const decodedTitle = decodeHtml(job.title);
              return (
                <option key={index} value={decodedTitle}>
                  {decodedTitle}
                </option>
              );
            })}
          </select>
          {errors.role && (
            <small className="block mt-1.5 text-xs text-red-600 font-medium pl-1">
              {errors.role.message}
            </small>
          )}
        </div>

        {/* Years of Experience */}
        <div>
          <input
            type="number"
            placeholder="Years of Experience"
            className="w-full h-14 px-5 bg-[#f7f7f7] border border-[#d9d9d9] rounded-2xl text-zinc-900 text-sm sm:text-base outline-none transition-all duration-300 focus:bg-white focus:border-zinc-900 placeholder:text-zinc-500"
            {...register("experience", {
              required: "Experience is required",
              min: { value: 0, message: "Cannot be negative" },
            })}
          />
          {errors.experience && (
            <small className="block mt-1.5 text-xs text-red-600 font-medium pl-1">
              {errors.experience.message}
            </small>
          )}
        </div>

        {/* Cover Letter */}
        <div>
          <textarea
            rows={4}
            placeholder="Cover Letter"
            className="w-full h-36 p-5 bg-[#f7f7f7] border border-[#d9d9d9] rounded-2xl text-zinc-900 text-sm sm:text-base outline-none transition-all duration-300 focus:bg-white focus:border-zinc-900 placeholder:text-zinc-500 resize-none leading-relaxed"
            {...register("coverLetter", {
              required: "Cover letter is required",
            })}
          />
          {errors.coverLetter && (
            <small className="block mt-1.5 text-xs text-red-600 font-medium pl-1">
              {errors.coverLetter.message}
            </small>
          )}
        </div>

        {/* Resume Upload */}
        <div className="p-5 border border-dashed border-[#cfcfcf] rounded-2xl bg-[#fafafa] text-center hover:border-zinc-900 transition-colors duration-300">
          <label className="block text-xs sm:text-sm font-semibold text-slate-500 mb-3 cursor-pointer">
            <Paperclip size={18} className="inline mr-1 text-amber-500" />
            Upload Resume/CV (.pdf, .doc, .docx)
          </label>
          <input
            type="file"
            accept=".pdf,.doc,.docx"
            className="block w-full max-w-[260px] mx-auto text-xs sm:text-sm text-zinc-700 bg-white border border-[#d9d9d9] rounded-xl p-2.5 cursor-pointer file:mr-3 file:py-1.5 file:px-3 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-amber-500 file:text-black hover:file:bg-amber-600 transition-all"
            {...register("resume", { required: "Resume file is required" })}
          />
          {errors.resume && (
            <small className="block mt-1.5 text-xs text-red-600 font-medium">
              {errors.resume.message}
            </small>
          )}
        </div>

        {/* Captcha Section */}
        <div className="space-y-3">
          <div className="flex flex-col sm:flex-row gap-3 items-center">
            <div className="w-full sm:flex-1 h-14 bg-black rounded-2xl flex items-center justify-center text-white tracking-[4px] text-xl font-bold select-none shadow-inner">
              {captcha}
            </div>
            <button
              type="button"
              onClick={generateCaptcha}
              className=" w-full sm:w-auto h-14 px-5 bg-[#E6B33C] hover:bg-[#D99B1D] text-black font-semibold text-sm rounded-2xl transition-colors duration-300 flex items-center justify-center gap-2 shrink-0"
            >
              <ArrowClockwise size={18} weight="bold" />
              <span>Refresh</span>
            </button>
          </div>

          <div>
            <input
              type="text"
              placeholder="Enter Captcha"
              value={userCaptcha}
              onChange={(e) => setUserCaptcha(e.target.value)}
              className="w-full h-14 px-5 bg-[#f7f7f7] border border-[#d9d9d9] rounded-2xl text-zinc-900 text-sm sm:text-base outline-none transition-all duration-300 focus:bg-white focus:border-zinc-900 placeholder:text-zinc-500"
            />
            {captchaError && (
              <small className="block mt-1.5 text-xs text-red-600 font-medium pl-1">
                {captchaError}
              </small>
            )}
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="shine-btn w-full h-14 bg-black hover:bg-zinc-800 text-white font-semibold text-base rounded-2xl transition-all duration-300 hover:-translate-y-0.5 shadow-md active:translate-y-0 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 mt-2"
        >
          {isSubmitting ? (
            <span>Submitting...</span>
          ) : (
            <>
              <span>Submit Application</span>
            </>
          )}
        </button>
      </form>
    </div>
  );
};
