import React from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import {
  MapPin,
  LinkedinLogo,
  FacebookLogo,
  InstagramLogo,
  BehanceLogo,
  GithubLogo,
  DribbbleLogo,
  Phone,
  EnvelopeSimple,
} from "@phosphor-icons/react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { createContact } from "../../../../api/Api";

// Form input types interface
interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  website: string;
  message: string;
}

const ContactUs: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ContactFormData>();

  const onSubmit: SubmitHandler<ContactFormData> = async (data) => {
    try {
      await createContact(data);
      toast.success("Message sent successfully!");
      reset();
    } catch (error) {
      toast.error("Something went wrong!");
    }
  };

  return (
    <>
      <section className="bg-[#f2f2f2] px-4 py-[60px] sm:px-5 sm:py-[100px]">
        <div className="mx-auto flex max-w-[1400px] flex-col items-stretch gap-[40px] lg:flex-row xl:gap-[60px]">
          {/* LEFT SIDE */}
          <div className="min-w-0 flex-1">
            <p className="mb-5 text-[14px] tracking-[2px] text-[#d9932f]">
              GET IN TOUCH
            </p>

            <h2 className="mb-[40px] text-[28px] font-bold leading-[38px] text-[#0f1c2e] sm:text-[34px] sm:leading-[46px] lg:text-[42px] lg:leading-[55px]">
              Seamless Communication, Global Impact.
            </h2>

            {/* EMAIL ITEM */}
            <div className="mb-[30px] flex items-start gap-[18px]">
              <div className="flex h-[48px] w-[48px] shrink-0 items-center justify-center rounded-full bg-black text-white">
                <EnvelopeSimple size={20} weight="bold" />
              </div>
              <div>
                <strong className="text-[#0f1c2e]">Email</strong>
                <p className="m-0 text-[#4b5d73]">
                  <a
                    href="mailto:support@ahaansoftware.com"
                    className="text-[#0f1c2e] no-underline hover:underline"
                  >
                    support@ahaansoftware.com
                  </a>
                </p>
              </div>
            </div>

            {/* PHONE ITEM */}
            <div className="mb-[30px] flex items-start gap-[18px]">
              <div className="flex h-[48px] w-[48px] shrink-0 items-center justify-center rounded-full bg-black text-white">
                <Phone size={20} weight="bold" />
              </div>
              <div>
                <strong className="text-[#0f1c2e]">Phone</strong>
                <p className="m-0 text-[#4b5d73]">
                  <a
                    href="tel:+1-646-575-9575"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#0f1c2e] no-underline hover:underline"
                  >
                    +1-646-575-9575
                  </a>
                </p>
                <p className="m-0 text-[#4b5d73]">
                  <a
                    href="https://wa.me/919830371143"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#0f1c2e] no-underline hover:underline"
                  >
                    +91 98303 71143
                  </a>
                </p>
              </div>
            </div>

            {/* ADDRESS ITEM */}
            <div className="mb-[30px] flex items-start gap-[18px]">
              <div className="flex h-[48px] w-[48px] shrink-0 items-center justify-center rounded-full bg-black text-white">
                <MapPin size={20} weight="bold" />
              </div>
              <div>
                <strong className="text-[#0f1c2e]">Address</strong>
                <p className="m-0 text-[#4b5d73]">
                  <a
                    href="https://www.google.com/maps/dir//Ahaan+Software+Consulting,+Bengal+Eco+Intelligent+Park,+EM+Block,+Sector+V,+Bidhannagar,+Kolkata,+West+Bengal+700091/@22.577152,88.4309163,15z/data=!4m8!4m7!1m0!1m5!1m1!1s0x3a0275d239b8d5d3:0x3fca68895852d152!2m2!1d88.4274345!2d22.5752084?entry=ttu"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#0f1c2e] no-underline hover:underline"
                  >
                    Bengal Eco Intelligent Park, Sector V, Bidhannagar, Kolkata
                  </a>
                </p>
              </div>
            </div>

            {/* SOCIAL LINKS */}
            <div className="mt-[40px] flex flex-wrap gap-[15px]">
              {/* LinkedIn */}
              <a
                href="https://www.linkedin.com/company/ahaansoftware"
                target="_blank"
                rel="noopener noreferrer"
                className="group relative flex h-[45px] w-[45px] items-center justify-center overflow-hidden rounded-full bg-black text-white transition-all duration-300"
              >
                <span className="absolute bottom-0 h-0 w-full rounded-full bg-gradient-to-br from-[#0077b5] to-[#00a0dc] transition-all duration-300 ease-in-out group-hover:h-full"></span>
                <LinkedinLogo size={20} weight="bold" className="relative z-10" />
              </a>

              {/* Facebook */}
              <a
                href="https://www.facebook.com/ahaansoftware"
                target="_blank"
                rel="noopener noreferrer"
                className="group relative flex h-[45px] w-[45px] items-center justify-center overflow-hidden rounded-full bg-black text-white transition-all duration-300"
              >
                <span className="absolute bottom-0 h-0 w-full rounded-full bg-gradient-to-br from-[#1877f2] to-[#4a8df8] transition-all duration-300 ease-in-out group-hover:h-full"></span>
                <FacebookLogo size={20} weight="bold" className="relative z-10" />
              </a>

              {/* Instagram */}
              <a
                href="https://www.instagram.com/ahaansoftware"
                target="_blank"
                rel="noopener noreferrer"
                className="group relative flex h-[45px] w-[45px] items-center justify-center overflow-hidden rounded-full bg-black text-white transition-all duration-300"
              >
                <span className="absolute bottom-0 h-0 w-full rounded-full bg-gradient-to-br from-[#f58529] to-[#dd2a7b] transition-all duration-300 ease-in-out group-hover:h-full"></span>
                <InstagramLogo size={20} weight="bold" className="relative z-10" />
              </a>

              {/* GitHub */}
              <a
                href="https://github.com/AhaanSoftwareConsulting"
                target="_blank"
                rel="noopener noreferrer"
                className="group relative flex h-[45px] w-[45px] items-center justify-center overflow-hidden rounded-full bg-black text-white transition-all duration-300"
              >
                <span className="absolute bottom-0 h-0 w-full rounded-full bg-gradient-to-br from-[#333333] to-[#666666] transition-all duration-300 ease-in-out group-hover:h-full"></span>
                <GithubLogo size={20} weight="bold" className="relative z-10" />
              </a>

              {/* Behance */}
              <a
                href="https://www.behance.net/ahaansoftware01"
                target="_blank"
                rel="noopener noreferrer"
                className="group relative flex h-[45px] w-[45px] items-center justify-center overflow-hidden rounded-full bg-black text-white transition-all duration-300"
              >
                <span className="absolute bottom-0 h-0 w-full rounded-full bg-gradient-to-br from-[#0124e8] to-[#758aff] transition-all duration-300 ease-in-out group-hover:h-full"></span>
                <BehanceLogo size={20} weight="bold" className="relative z-10" />
              </a>

              {/* Dribbble */}
              <a
                href="https://dribbble.com/ahaan-software"
                target="_blank"
                rel="noopener noreferrer"
                className="group relative flex h-[45px] w-[45px] items-center justify-center overflow-hidden rounded-full bg-black text-white transition-all duration-300"
              >
                <span className="absolute bottom-0 h-0 w-full rounded-full bg-gradient-to-br from-[#9f0175] to-[#e992d2] transition-all duration-300 ease-in-out group-hover:h-full"></span>
                <DribbbleLogo size={20} weight="bold" className="relative z-10" />
              </a>
            </div>
          </div>

          {/* RIGHT SIDE FORM */}
          <div className="w-full min-w-0 flex-1 rounded-[20px] bg-white p-[30px] shadow-[0_25px_50px_rgba(0,0,0,0.08)] sm:p-[40px] xl:p-[60px]">
            <h3 className="mb-[40px] text-[26px] font-semibold text-[#0f1c2e]">
              Send us a message
            </h3>

            <form onSubmit={handleSubmit(onSubmit)} className="w-full">
              <div className="flex flex-col gap-0 lg:flex-row lg:gap-[20px]">
                {/* NAME */}
                <div className="mb-[25px] w-full">
                  <input
                    type="text"
                    placeholder="Name"
                    className="w-full rounded-[50px] border border-[#ddd] p-[18px_24px] outline-none transition-all duration-300 focus:border-black"
                    {...register("name", {
                      required: "Name is required",
                    })}
                  />
                  {errors.name && (
                    <p className="mt-[5px] text-[14px] text-red-600">
                      {errors.name.message}
                    </p>
                  )}
                </div>

                {/* EMAIL */}
                <div className="mb-[25px] w-full">
                  <input
                    type="email"
                    placeholder="Email ID"
                    className="w-full rounded-[50px] border border-[#ddd] p-[18px_24px] outline-none transition-all duration-300 focus:border-black"
                    {...register("email", {
                      required: "Email is required",
                    })}
                  />
                  {errors.email && (
                    <p className="mt-[5px] text-[14px] text-red-600">
                      {errors.email.message}
                    </p>
                  )}
                </div>
              </div>

              <div className="flex flex-col gap-0 lg:flex-row lg:gap-[20px]">
                {/* PHONE */}
                <div className="mb-[25px] w-full">
                  <input
                    type="tel"
                    placeholder="Phone no."
                    onInput={(e: React.FormEvent<HTMLInputElement>) => {
                      e.currentTarget.value = e.currentTarget.value.replace(
                        /[^0-9+\s()-]/g,
                        ""
                      );
                    }}
                    className="w-full rounded-[50px] border border-[#ddd] p-[18px_24px] outline-none transition-all duration-300 focus:border-black"
                    {...register("phone", {
                      required: "Phone number is required",
                      pattern: {
                        value: /^[+]?[\d\s()-]+$/,
                        message: "Enter a valid phone number",
                      },
                      minLength: {
                        value: 7,
                        message: "Phone number is too short",
                      },
                      maxLength: {
                        value: 15,
                        message: "Phone number is too long",
                      },
                    })}
                  />
                  {errors.phone && (
                    <p className="mt-[5px] text-[14px] text-red-600">
                      {errors.phone.message}
                    </p>
                  )}
                </div>

                {/* WEBSITE */}
                <div className="mb-[25px] w-full">
                  <input
                    type="text"
                    placeholder="Website"
                    className="w-full rounded-[50px] border border-[#ddd] p-[18px_24px] outline-none transition-all duration-300 focus:border-black"
                    {...register("website", {
                      required: "Website is required",
                    })}
                  />
                  {errors.website && (
                    <p className="mt-[5px] text-[14px] text-red-600">
                      {errors.website.message}
                    </p>
                  )}
                </div>
              </div>

              {/* MESSAGE */}
              <div className="mb-[25px] w-full">
                <textarea
                  rows={5}
                  placeholder="Message"
                  className="w-full rounded-[25px] border border-[#ddd] p-[18px_24px] outline-none transition-all duration-300 focus:border-black"
                  {...register("message", {
                    required: "Message is required",
                  })}
                />
                {errors.message && (
                  <p className="mt-[5px] text-[14px] text-red-600">
                    {errors.message.message}
                  </p>
                )}
              </div>

              {/* SUBMIT BUTTON */}
              <button
                type="submit"
                className="shine-btn w-full items-center justify-center rounded-[50px] text-center bg-black p-[20px] font-semibold tracking-[1px] text-white transition-all duration-300 hover:bg-[#222]"
              >
                Drop your query
              </button>
            </form>
          </div>
        </div>
      </section>

      <ToastContainer position="top-right" autoClose={3000}  />
    </>
  );
};

export default ContactUs;