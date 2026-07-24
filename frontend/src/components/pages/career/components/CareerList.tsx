import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Briefcase,
  MapPin,
  Clock,
  Users,
  ArrowRight,
} from "@phosphor-icons/react";
import { getAllCareers } from "../../../../api/WordpressAPI";

// TypeScript Interface for Job Data
interface Job {
  id: string;
  postId: number;
  designation: string;
  summary: string;
  open_positions: string;
  qualifications: string;
  preferred_skills: string;
  location: string;
  employment_type: string;
  shift: string;
  responsibilities: string;
  featured_image: string;
}

export const CareerList: React.FC = () => {
  const navigate = useNavigate();
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    fetchCareers();
  }, []);

  const fetchCareers = async () => {
    try {
      const data = await getAllCareers();

      const formattedData: Job[] = data.map((item: any) => ({
        id: item.slug,
        postId: item.id,
        designation: item.title?.rendered || "",
        summary: item.acf?.job_summary || "",
        open_positions: item.acf?.open_position || "",
        qualifications: item.acf?.required_qualifications || "",
        preferred_skills: item.acf?.preferred_skills || "",
        location: item.acf?.location || "",
        employment_type: item.acf?.employment_type || "",
        shift: item.acf?.shift_time || "",
        responsibilities: item.content?.rendered || "",
        featured_image:
          item?._embedded?.["wp:featuredmedia"]?.[0]?.source_url || "",
      }));

      setJobs(formattedData);
    } catch (error) {
      console.error("Error fetching careers:", error);
    } finally {
      setLoading(false);
    }
  };

  // Helper function to decode HTML Entities safely
  const decodeHtml = (html: string) => {
    const doc = new DOMParser().parseFromString(html, "text/html");
    return doc.documentElement.textContent || "";
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex justify-center items-center">
        <h4 className="text-amber-600 text-xl font-semibold animate-pulse">
          Loading careers...
        </h4>
      </div>
    );
  }

  return (
    <div className="bg-white text-zinc-900 min-h-screen py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-[1200px] mx-auto">
        {/* Header Section */}
        <div className="text-center mb-16 max-w-3xl mx-auto space-y-3">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#1c1d20] leading-tight">
            Join our team of passionate professionals
          </h2>
          {/* Sub-heading */}
          <p className="lg:text-base text-sm px-4 sm:px-8 mt-2 text-zinc-600">
            Explore exciting career opportunities, enhance your skills,
            collaborate with talented professionals, and make a meaningful
            impact while growing your career with us.
          </p>
        </div>

        {/* Job List Container */}
        <div className="flex flex-col gap-8">
          {jobs.map((job, index) => (
            <div
              key={job.postId}
              className={`p-6 sm:p-7 rounded-2xl transition-all duration-300 border hover:shadow-lg flex flex-col md:flex-row items-start md:items-center justify-between gap-6 ${
                index % 2 === 1
                  ? "bg-[#FFFDF5] border-amber-300/80 shadow-sm"
                  : "bg-white border-zinc-200/90 shadow-sm"
              }`}
            >
              {/* Left Column: Image + Title & Metadata (Shortened width) */}
              <div className="w-full md:w-1/3 lg:w-[32%] flex items-start gap-3.5 shrink-0">
                {/* Image Section */}
                <div className="w-11 h-11 rounded-lg overflow-hidden shrink-0 bg-white flex items-center justify-center p-0.5 mt-0.5">
                  <img
                    src={job.featured_image || "https://via.placeholder.com/80"}
                    alt={decodeHtml(job.designation)}
                    className="w-full h-full object-contain"
                  />
                </div>

                {/* Details Section */}
                <div className="space-y-1.5 min-w-0">
                  <h3 className="text-base sm:text-lg font-bold text-zinc-900 group-hover:text-amber-600 transition-colors truncate">
                    {decodeHtml(job.designation)}
                  </h3>

                  {/* Tags Grid using Phosphor Icons */}
                  <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[11px] text-zinc-600 font-medium">
                    {job.employment_type && (
                      <div className="flex items-center gap-1">
                        <Briefcase size={14} className="text-amber-500 shrink-0" />
                        <span>{job.employment_type}</span>
                      </div>
                    )}

                    {job.location && (
                      <div className="flex items-center gap-1">
                        <MapPin size={14} className="text-amber-500 shrink-0" />
                        <span>{job.location}</span>
                      </div>
                    )}

                    {job.shift && (
                      <div className="flex items-center gap-1">
                        <Clock size={14} className="text-amber-500 shrink-0" />
                        <span>{job.shift}</span>
                      </div>
                    )}

                    {job.open_positions && (
                      <div className="flex items-center gap-1">
                        <Users size={14} className="text-amber-500 shrink-0" />
                        <span>{job.open_positions} Position</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Middle Column: Summary (Expanded width) */}
              <div className="w-full md:w-1/2 lg:w-[50%]">
                <p className="text-sm sm:text-sm text-zinc-600 leading-relaxed line-clamp-3">
                  {job.summary}
                </p>
              </div>

              {/* Right Column: CTA Button (Compact size) */}
              <div className="w-full md:w-auto flex justify-start md:justify-end shrink-0">
                <button
                  onClick={() => navigate(`/careers/${job.id}`)}
                  className="shine-btn flex items-center justify-center gap-1.5 group rounded-full
                    bg-gradient-to-r from-[#000] to-[#242322]
                    px-4 sm:px-5 py-2 sm:py-2.5
                    text-xs sm:text-sm font-semibold tracking-wider text-white uppercase
                    shadow-md hover:shadow-lg
                    transition-all duration-300
                    hover:-translate-y-0.5
                    hover:from-[#C48A18] hover:to-[#D8A631]"
                >
                  <span>Apply now</span>
                  <ArrowRight
                    size={15}
                    className="transition-transform group-hover:translate-x-1"
                  />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};