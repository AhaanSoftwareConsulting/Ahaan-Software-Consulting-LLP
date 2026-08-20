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
        <h4 className="text-amber-600 text-2xl font-semibold animate-pulse">
          Loading careers...
        </h4>
      </div>
    );
  }

  return (
    <div className="bg-white text-zinc-900 min-h-screen py-16 px-4 sm:px-6 lg:px-8">
      {/* Container Max-Width increased from 1200px to 1400px */}
      <div className="max-w-[1300px] mx-auto">
        {/* Header Section */}
        <div className="text-center mb-16 max-w-4xl mx-auto space-y-4">
          <h2 className="heading-primary">
            Join our team of passionate professionals
          </h2>
          {/* Sub-heading size increased */}
          <p className="lg:text-lg text-sm px-0 sm:px-8 mt-3 leading-relaxed">
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
              className={`p-6 sm:p-8 rounded-2xl transition-all duration-300 border hover:shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6 ${
                index % 2 === 1
                  ? "bg-[#FFFDF5] border-amber-300/80 shadow-sm"
                  : "bg-white border-zinc-200/90 shadow-sm"
              }`}
            >
              {/* Left Column: Image + Title & Metadata */}
              <div className="w-full md:w-2/5 lg:w-[38%] flex items-start gap-4 shrink-0">
                {/* Image Section - slightly enlarged */}
                <div className="w-14 h-14 rounded-xl overflow-hidden shrink-0 bg-white flex items-center justify-center p-1 border border-zinc-100 shadow-xs">
                  <img
                    src={job.featured_image || "https://via.placeholder.com/80"}
                    alt={decodeHtml(job.designation)}
                    className="w-full h-full object-contain"
                  />
                </div>

                {/* Details Section */}
                <div className="space-y-2 min-w-0">
                  {/* Job Title size increased */}
                  <h3 className="text-xl sm:text-2xl font-bold text-zinc-900 leading-snug truncate">
                    {decodeHtml(job.designation)}
                  </h3>

                  {/* Tags Grid - Font and Icon size increased */}
                  <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 text-xs sm:text-sm text-zinc-600 font-medium">
                    {job.employment_type && (
                      <div className="flex items-center gap-1.5">
                        <Briefcase size={16} className="text-amber-500 shrink-0" />
                        <span>{job.employment_type}</span>
                      </div>
                    )}

                    {job.location && (
                      <div className="flex items-center gap-1.5">
                        <MapPin size={16} className="text-amber-500 shrink-0" />
                        <span>{job.location}</span>
                      </div>
                    )}

                    {job.shift && (
                      <div className="flex items-center gap-1.5">
                        <Clock size={16} className="text-amber-500 shrink-0" />
                        <span>{job.shift}</span>
                      </div>
                    )}

                    {job.open_positions && (
                      <div className="flex items-center gap-1.5">
                        <Users size={16} className="text-amber-500 shrink-0" />
                        <span>{job.open_positions} Position</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Middle Column: Summary - Font size increased */}
              <div className="w-full md:w-1/2 lg:w-[48%]">
                <p className="text-base text-zinc-600 leading-relaxed line-clamp-3">
                  {job.summary}
                </p>
              </div>

              {/* Right Column: CTA Button - Scaled up */}
              <div className="w-full md:w-auto flex justify-start md:justify-end shrink-0">
                <button
                  onClick={() => navigate(`/careers/${job.id}`)}
                  className="shine-btn flex items-center justify-center gap-2 group rounded-full
                    bg-gradient-to-r from-[#000] to-[#242322]
                    px-6 py-3.5
                    text-xs sm:text-sm font-bold tracking-widest text-white uppercase
                    shadow-md hover:shadow-lg
                    transition-all duration-300
                    hover:-translate-y-0.5
                    hover:from-[#C48A18] hover:to-[#D8A631]"
                >
                  <span>Apply now</span>
                  <ArrowRight
                    size={18}
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