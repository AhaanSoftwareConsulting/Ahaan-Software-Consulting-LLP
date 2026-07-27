import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  MapPin,
  Clock,
  Briefcase,
  Users,
} from "@phosphor-icons/react";
import { getCareerBySlug } from "../../../../api/WordpressAPI";
import { CareerBanner } from "./CareerBanner";
import { CareerApplyForm } from "./CareerApplyForm";

// TypeScript Interface for Job Details
interface Job {
  id: string;
  designation: string;
  summary: string;
  location: string;
  employment_type: string;
  shift: string;
  open_positions: string;
  responsibilities: string;
  featured_image: string;
}

export const CareerDetails: React.FC = () => {
  const { jobId } = useParams<{ jobId: string }>();
  const navigate = useNavigate();

  const [job, setJob] = useState<Job | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    if (jobId) {
      fetchCareer();
    }
  }, [jobId]);

  const fetchCareer = async () => {
    try {
      if (!jobId) return;
      const item = await getCareerBySlug(jobId);

      if (!item) return;

      const itemAny = item as any;

      const formattedJob: Job = {
        id: item.slug,
        designation: item.title?.rendered || "",
        summary: itemAny.acf?.job_summary || "",
        location: itemAny.acf?.location || "",
        employment_type: itemAny.acf?.employment_type || "",
        shift: itemAny.acf?.shift_time || "",
        open_positions: itemAny.acf?.open_position || "",
        responsibilities: item.content?.rendered || "",
        featured_image:
          item?._embedded?.["wp:featuredmedia"]?.[0]?.source_url || "",
      };

      setJob(formattedJob);
    } catch (error) {
      console.error("Error fetching job details:", error);
    } finally {
      setLoading(false);
    }
  };

  // Helper function to decode HTML Entities safely
  const decodeHtml = (html: string): string => {
    const doc = new DOMParser().parseFromString(html, "text/html");
    return doc.documentElement.textContent || "";
  };

  if (loading) {
    return (
      <div className="min-h-[60vh] flex justify-center items-center bg-white">
        <h4 className="text-amber-600 text-xl font-semibold animate-pulse">
          Loading job details...
        </h4>
      </div>
    );
  }

  if (!job) {
    return (
      <div className="min-h-[60vh] flex flex-col justify-center items-center bg-white gap-4">
        <h4 className="text-zinc-800 text-xl font-bold">Job Not Found</h4>
        <button
          onClick={() => navigate("/careers")}
          className="px-5 py-2 text-sm font-medium text-amber-600 border border-amber-500 rounded-lg hover:bg-amber-500 hover:text-white transition-all duration-200"
        >
          Back to Careers
        </button>
      </div>
    );
  }

  return (
    <div className="bg-zinc-50 min-h-screen pb-16">
      <CareerBanner />

      {/* 🚀 Updated Container to max 1600px width */}
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-12 py-8">
        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="inline-flex items-center gap-2 text-sm sm:text-base font-semibold text-zinc-700 hover:text-amber-600 transition-colors mb-8 group"
        >
          <ArrowLeft
            size={18}
            className="transition-transform group-hover:-translate-x-1"
          />
          <span>Back to Careers</span>
        </button>

        {/* Layout Grid: 12 Columns Grid with 2XL/1600px breakpoint ratio */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 2xl:gap-12 items-start">
          {/* Main Content Area (Spans 7 cols on lg, 8 cols on 2xl) */}
          <section className="lg:col-span-8 2xl:col-span-8  p-6 sm:p-10 space-y-8">
            {/* Featured Image */}
            {job.featured_image && (
              <div className=" overflow-hidden flex p-2">
                <img
                  src={job.featured_image}
                  alt={decodeHtml(job.designation)}
                  className="w-20 h-20 object-contain"
                />
              </div>
            )}

            {/* Job Header Info */}
            <div className="space-y-4 pb-6 border-b border-zinc-100">
              <h1 className="text-2xl sm:text-3xl 2xl:text-4xl font-extrabold text-zinc-900 leading-snug">
                {decodeHtml(job.designation)}
              </h1>

              {/* Metadata Badges */}
              <div className="flex flex-wrap items-center gap-3 text-xs sm:text-sm font-medium text-zinc-600">
                {job.location && (
                  <div className="flex items-center gap-1.5 bg-amber-50 text-zinc-900 px-3.5 py-2 rounded-full border border-amber-200/60">
                    <MapPin size={18} className="text-amber-600 shrink-0" />
                    <span>{job.location}</span>
                  </div>
                )}

                {job.shift && (
                  <div className="flex items-center gap-1.5 bg-amber-50 text-zinc-900 px-3.5 py-2 rounded-full border border-amber-200/60">
                    <Clock size={18} className="text-amber-600 shrink-0" />
                    <span>{job.shift}</span>
                  </div>
                )}

                {job.employment_type && (
                  <div className="flex items-center gap-1.5 bg-amber-50 text-zinc-900 px-3.5 py-2 rounded-full border border-amber-200/60">
                    <Briefcase size={18} className="text-amber-600 shrink-0" />
                    <span>{job.employment_type}</span>
                  </div>
                )}

                {job.open_positions && (
                  <div className="flex items-center gap-1.5 bg-amber-50 text-zinc-900 px-3.5 py-2 rounded-full border border-amber-200/60">
                    <Users size={18} className="text-amber-600 shrink-0" />
                    <span>{job.open_positions} Position</span>
                  </div>
                )}
              </div>
            </div>

            {/* Description Block */}
            <div className="space-y-6 text-zinc-700">
              {job.summary && (
                <div className="space-y-2">
                  <h3 className="text-lg sm:text-xl font-bold text-zinc-900">
                    Job Summary
                  </h3>
                  <p className="text-sm sm:text-base 2xl:text-lg leading-relaxed text-zinc-800">
                    {job.summary}
                  </p>
                </div>
              )}

              {job.responsibilities && (
                <div className="space-y-2">
                  <h3 className="text-lg sm:text-xl font-bold text-zinc-900">
                    Key Responsibilities
                  </h3>
                  <div
                    className="prose prose-zinc max-w-none text-sm sm:text-base 2xl:text-lg leading-relaxed text-zinc-800
                      prose-ul:list-disc prose-ul:pl-5 prose-li:my-1 prose-p:my-2"
                    dangerouslySetInnerHTML={{
                      __html: job.responsibilities,
                    }}
                  />
                </div>
              )}
            </div>
          </section>

          {/* Sticky Form Sidebar (Spans 5 cols on lg, 4 cols on 2xl) */}
          <section className="lg:col-span-4 2xl:col-span-4 sticky top-6">
            <CareerApplyForm currentJob={decodeHtml(job.designation)} />
          </section>
        </div>
      </div>
    </div>
  );
};
