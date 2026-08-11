import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { getCaseStudyBySlug, getMediaById } from "../../../../api/WordpressAPI";

import type {
  CaseStudy,
  ImagesState,
  Solution,
} from "../../../../types/caseStudies";

export const CaseStudyDetails = () => {
  const { slug } = useParams<{ slug: string }>();

  const [caseStudy, setCaseStudy] = useState<CaseStudy | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [images, setImages] = useState<ImagesState>({});

  // =====================================================
  // 1. FETCH CASE STUDY DATA
  // =====================================================
  useEffect(() => {
    const fetchCaseStudy = async () => {
      try {
        if (!slug) return;

        const response = await getCaseStudyBySlug(slug);

        setCaseStudy(Array.isArray(response) ? response[0] : response);
      } catch (error) {
        console.error("Case Study Error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCaseStudy();
  }, [slug]);

  // =====================================================
  // 2. FETCH ACF IMAGES (FIXED ASYNC RESOLVER)
  // =====================================================
  useEffect(() => {
    if (!caseStudy?.acf) return;

    const loadImages = async () => {
      const acf = caseStudy.acf;

      // Helper function to resolve Image URL regardless of ACF format (URL, ID, or object)
      const resolveImageUrl = async (field?: any): Promise<string> => {
        if (!field) return "";
        if (typeof field === "string") return field;
        if (typeof field === "object" && field?.url) return field.url;
        if (typeof field === "number") {
          try {
            const media = await getMediaById(field);
            return media?.source_url || "";
          } catch (error) {
            console.error(`Media fetch error for ID ${field}:`, error);
            return "";
          }
        }
        return "";
      };

      const resolvedImages: ImagesState = {
        projectOverview: await resolveImageUrl(acf.project_overview_image),
        challenges: await resolveImageUrl(acf.challenges_image),
        logo: await resolveImageUrl(
          acf["key_features_&_benefits_image"] || acf.case_study_logo,
        ),
        solution1: await resolveImageUrl(acf.solution_1_image),
        solution2: await resolveImageUrl(acf.solution_2_image),
        solution3: await resolveImageUrl(acf.solution_3_image),
        solution4: await resolveImageUrl(acf.solution_4_image),
        solution5: await resolveImageUrl(acf.solution_5_image),
        businessImpact: await resolveImageUrl(acf.business_impact_image),
        designHighlights: await resolveImageUrl(acf.design_highlights_image),
        tech1: await resolveImageUrl(acf.technology_1_logo),
        tech2: await resolveImageUrl(acf.technology_2_logo),
        tech3: await resolveImageUrl(acf.technology_3_logo),
        tech4: await resolveImageUrl(acf.technology_4_logo),
        tech5: await resolveImageUrl(acf.technology_5_logo),
      };

      setImages(resolvedImages);
    };

    loadImages();
  }, [caseStudy]);

  // =====================================================
  // LOADING STATE
  // =====================================================
  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-white">
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-[#DCA32C] border-t-transparent" />
      </div>
    );
  }

  // =====================================================
  // NOT FOUND STATE
  // =====================================================
  if (!caseStudy) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <p className="text-lg text-gray-500">Case Study not found.</p>
      </div>
    );
  }

  const acf = caseStudy.acf || ({} as any);

  const heroImage =
    caseStudy._embedded?.["wp:featuredmedia"]?.[0]?.source_url || "";

  // =====================================================
  // HERO DATA PARSER & FALLBACKS
  // =====================================================
  const mainDescription =
    acf.case_study_description || caseStudy.content?.rendered || "";

  const projectDetailsRaw = acf.project_details || "";

  const extractDetail = (key: string): string => {
    if (!projectDetailsRaw) return "";
    const regExp = new RegExp(`${key}:?\\s*([^<\\n]+)`, "i");
    const match = projectDetailsRaw.match(regExp);
    return match ? match[1].replace(/<\/?[^>]+(>|$)/g, "").trim() : "";
  };

  const industry = acf.industry || extractDetail("Industry");
  const platform = acf.platform || extractDetail("Platform");
  const servicesProvided =
    acf.services_provided || extractDetail("Services Provided");

  // Dynamic Features Extraction
  const leftFeatures = [
    acf.left_key_feature_1,
    acf.left_key_feature_2,
    acf.left_key_feature_3,
    acf.left_key_feature_4,
    acf.left_key_feature_5,
  ].filter(Boolean) as string[];

  const rightFeatures = [
    acf.right_key_feature_1,
    acf.right_key_feature_2,
    acf.right_key_feature_3,
    acf.right_key_feature_4,
    acf.right_key_feature_5,
  ].filter(Boolean) as string[];

  const allFeatures = [...leftFeatures, ...rightFeatures];

  // Solutions Array Mapping
  const solutions: Solution[] = [
    {
      title: acf.solution_1_title,
      description: acf.solution_1_description,
      image: images.solution1,
    },
    {
      title: acf.solution_2_title,
      description: acf.solution_2_description,
      image: images.solution2,
    },
    {
      title: acf.solution_3_title,
      description: acf.solution_3_description,
      image: images.solution3,
    },
    {
      title: acf.solution_4_title,
      description: acf.solution_4_description,
      image: images.solution4,
    },
    {
      title: acf.solution_5_title,
      description: acf.solution_5_description,
      image: images.solution5,
    },
  ].filter((s) => s.title || s.description || s.image);

  // Fallback check for Why Stands Out
  const whyStandsOutText =
    acf.why_project_stands_out || acf.why_this_project_stands_out || "";

  // Technologies HTML markup check
  const technologyHtml = acf.technology_icon || acf.technology_image || "";

  // Fallback Technology Logos Array
  const techLogos = [
    images.tech1,
    images.tech2,
    images.tech3,
    images.tech4,
    images.tech5,
  ].filter(Boolean);

  const buttonUrl = acf.button_url || acf.site_url || "#";
  const buttonText = acf.button_text || "Visit The Site";

  return (
    <main className="overflow-hidden bg-white">
      {/* =================================================
      1. HERO
  ================================================= */}
      <section className="relative min-h-[500px] overflow-hidden bg-black">
        {heroImage && (
          <img
            src={heroImage}
            alt={caseStudy.title.rendered}
            className="absolute inset-0 h-full w-full object-cover opacity-60"
          />
        )}

        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/85 to-black/30" />

        <div className="relative z-10 mx-auto flex min-h-[500px] max-w-[1400px] items-center px-5 py-20 md:px-10 2xl:px-16">
          <div className="max-w-3xl xl:max-w-4xl">
            <h1 className="mb-5 text-4xl font-bold uppercase tracking-tight text-[#DCA32C] md:text-6xl xl:text-7xl">
              {caseStudy.title.rendered}
            </h1>

            {mainDescription && (
              <div
                className="max-w-2xl text-sm leading-6 text-white/80 xl:max-w-3xl xl:text-base [&_p]:mb-2"
                dangerouslySetInnerHTML={{
                  __html: mainDescription,
                }}
              />
            )}

            <div className="mt-8 max-w-xl overflow-hidden rounded-lg border border-white/40 bg-black/40 backdrop-blur-sm xl:max-w-2xl">
              <div className="grid grid-cols-2">
                <div className="border-b border-r border-white/30 p-5 xl:p-6">
                  <p className="mb-2 text-xs font-semibold text-[#DCA32C] xl:text-sm">
                    Industry
                  </p>
                  <p className="text-sm text-white xl:text-base">
                    {industry || "—"}
                  </p>
                </div>

                <div className="border-b border-white/30 p-5 xl:p-6">
                  <p className="mb-2 text-xs font-semibold text-[#DCA32C] xl:text-sm">
                    Platform
                  </p>
                  <p className="text-sm text-white xl:text-base">
                    {platform || "—"}
                  </p>
                </div>

                <div className="col-span-2 p-5 xl:p-6">
                  <p className="mb-2 text-xs font-semibold text-[#DCA32C] xl:text-sm">
                    Services Provided
                  </p>
                  <p className="text-sm leading-6 text-white xl:text-base">
                    {servicesProvided || "—"}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =================================================
      2. PROJECT OVERVIEW
  ================================================= */}
      <section className="bg-white py-16 md:py-24">
        <div className="mx-auto grid max-w-[1400px] items-center gap-12 px-5 md:grid-cols-2 md:px-10 2xl:px-16">
          <div className="flex justify-center">
            {images.projectOverview && (
              <img
                src={images.projectOverview}
                alt="Project Overview"
                className="max-h-[320px] w-auto object-contain xl:max-h-[440px]"
              />
            )}
          </div>

          <div>
            <h2 className="mb-4 text-[45px] font-bold text-[#222] md:text-[32px] xl:text-[45px]">
              Project Overview
            </h2>
            <div
              className="text-[16px] leading-[26px] font-normal tracking-normal text-[#333333]"
              dangerouslySetInnerHTML={{
                __html: acf.project_overview || "",
              }}
            />

            {buttonUrl && buttonUrl !== "#" && (
              <a
                href={buttonUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="shine-btn mt-6 inline-flex items-center gap-2 rounded-full bg-[#DCA32C] px-6 py-3 text-sm font-semibold text-black transition hover:bg-[#c38e21] xl:px-8 xl:py-4 xl:text-base"
              >
                {buttonText}
              </a>
            )}
          </div>
        </div>
      </section>

      {/* =================================================
      3. CHALLENGES
  ================================================= */}
      <section className="bg-white pb-16 md:pb-24">
        <div className="mx-auto grid max-w-[1400px] items-center gap-12 px-5 md:grid-cols-2 md:px-10 2xl:px-16">
          <div className="order-2 md:order-1">
            <h2 className="mb-4 text-[45px] font-bold text-[#222] md:text-[32px] xl:text-[45px]">
              Challenges
            </h2>

            <div
              className="text-[16px] leading-[26px] font-normal tracking-normal text-[#333333]"
              dangerouslySetInnerHTML={{
                __html: acf.challenges || "",
              }}
            />
          </div>

          <div className="order-1 flex justify-center md:order-2">
            {images.challenges && (
              <img
                src={images.challenges}
                alt="Challenges"
                className="max-h-[430px] w-auto object-contain  xl:max-h-[550px]"
              />
            )}
          </div>
        </div>
      </section>

      {/* =================================================
      4. KEY FEATURES & BENEFITS
  ================================================= */}
      <section className="bg-[#FFFCF5] py-16 md:py-24">
        <div className="mx-auto max-w-[1400px] px-5 md:px-10 2xl:px-16">
          <h2 className="mb-14 text-center text-[32px] font-bold text-[#222] xl:text-[45px]">
            Key Features & Benefits
          </h2>

          {/* Desktop View with Animated SVG Curved Lines */}
          <div className="relative hidden min-h-[520px] lg:block">
            {/* SVG Connecting Lines with Dash Animation */}
            <svg
              className="pointer-events-none absolute inset-0 h-full w-full"
              viewBox="0 0 1000 520"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <style>{`
          @keyframes dash {
            to {
              stroke-dashoffset: -20;
            }
          }
          .animated-line {
            stroke-dasharray: 6 6;
            animation: dash 1.5s linear infinite;
          }
        `}</style>

              {/* ================= LEFT SIDE LINES ================= */}
              {/* Top 1 Line (Logo Top -> Straight Up -> Right Turn to Box) */}
              <path
                d="M 500 170 L 500 42 Q 500 25 483 25 L 310 25"
                stroke="#E5B34F"
                strokeWidth="1.5"
                className="animated-line"
              />

              {/* Top 2 Line (Logo Upper-Left -> Left -> Turn Up to Box) */}
              <path
                d="M 410 205 L 350 205 Q 330 205 330 185 L 330 142 Q 330 125 310 125 L 260 125"
                stroke="#E5B34F"
                strokeWidth="1.5"
                className="animated-line"
              />

              {/* Middle 3 Line (Direct Straight Horizontal) */}
              <path
                d="M 390 260 L 280 260"
                stroke="#E5B34F"
                strokeWidth="1.5"
                className="animated-line"
              />

              {/* Bottom 4 Line (Logo Lower-Left -> Left -> Turn Down to Box) */}
              <path
                d="M 410 315 L 350 315 Q 330 315 330 335 L 330 378 Q 330 395 310 395 L 265 395"
                stroke="#E5B34F"
                strokeWidth="1.5"
                className="animated-line"
              />

              {/* Bottom 5 Line (Logo Bottom -> Straight Down -> Right Turn to Box) */}
              <path
                d="M 500 350 L 500 478 Q 500 495 483 495 L 330 495"
                stroke="#E5B34F"
                strokeWidth="1.5"
                className="animated-line"
              />

              {/* ================= RIGHT SIDE LINES ================= */}
              {/* Top 1 Line (Logo Top -> Straight Up -> Left Turn to Box) */}
              <path
                d="M 500 170 L 500 42 Q 500 25 517 25 L 690 25"
                stroke="#E5B34F"
                strokeWidth="1.5"
                className="animated-line"
              />

              {/* Top 2 Line (Logo Upper-Right -> Right -> Turn Up to Box) */}
              <path
                d="M 590 205 L 650 205 Q 670 205 670 185 L 670 142 Q 670 125 690 125 L 740 125"
                stroke="#E5B34F"
                strokeWidth="1.5"
                className="animated-line"
              />

              {/* Middle 3 Line (Direct Straight Horizontal) */}
              <path
                d="M 610 260 L 720 260"
                stroke="#E5B34F"
                strokeWidth="1.5"
                className="animated-line"
              />

              {/* Bottom 4 Line (Logo Lower-Right -> Right -> Turn Down to Box) */}
              <path
                d="M 590 315 L 650 315 Q 670 315 670 335 L 670 378 Q 670 395 690 395 L 735 395"
                stroke="#E5B34F"
                strokeWidth="1.5"
                className="animated-line"
              />

              {/* Bottom 5 Line (Logo Bottom -> Straight Down -> Left Turn to Box) */}
              <path
                d="M 500 350 L 500 478 Q 500 495 517 495 L 670 495"
                stroke="#E5B34F"
                strokeWidth="1.5"
                className="animated-line"
              />
            </svg>

            {/* Center Logo Circle */}
            <div className="absolute left-1/2 top-1/2 z-10 flex h-44 w-44 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-2 border-[#E5B34F] bg-white p-6 shadow-md">
              {images.logo ? (
                <img
                  src={images.logo}
                  alt="Case Study Logo"
                  className="max-h-full max-w-full object-contain"
                />
              ) : (
                <span className="text-xs font-medium text-gray-400">Logo</span>
              )}
            </div>

            {/* Left Column Features */}
            <div className="absolute left-0 top-0 flex h-full w-[31%] flex-col justify-between py-0">
              {leftFeatures.map((feat, idx) => (
                <div key={idx} className="flex justify-end">
                  <div className="rounded-md border border-[#E5B34F] bg-white px-5 py-2.5 text-center text-xs font-semibold text-gray-800 shadow-sm transition-transform duration-300 hover:scale-105 xl:text-sm">
                    {feat}
                  </div>
                </div>
              ))}
            </div>

            {/* Right Column Features */}
            <div className="absolute right-0 top-0 flex h-full w-[31%] flex-col justify-between py-0">
              {rightFeatures.map((feat, idx) => (
                <div key={idx} className="flex justify-start">
                  <div className="rounded-md border border-[#E5B34F] bg-white px-5 py-2.5 text-center text-xs font-semibold text-gray-800 shadow-sm transition-transform duration-300 hover:scale-105 xl:text-sm">
                    {feat}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Mobile View */}
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:hidden">
            {allFeatures.map((feature, index) => (
              <div
                key={index}
                className="rounded-md border border-[#E5B34F] bg-white px-4 py-3 text-center text-xs font-semibold text-gray-800 shadow-sm"
              >
                {feature}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#FFFCF5] pb-16 md:pb-24">
        <div className="mx-auto max-w-[1400px] px-5 md:px-10 2xl:px-16">
          <div className="relative pt-8">
            {/* Top Header Badge (Inset Notch style) */}
            <div className="absolute left-1/2 top-0 z-10 -translate-x-1/2 whitespace-nowrap rounded-b-[16px] border border-t-0 border-[#E5B34F]/30 bg-[#FFFCF5] px-10 py-4 shadow-sm md:px-14 md:py-5 xl:px-16 xl:py-6">
              <h2 className="text-center text-[22px] font-bold text-[#E5B34F] md:text-[32px] xl:text-[45px]">
                Technologies & Methodologies Used
              </h2>
            </div>

            {/* Main Black Box */}
            <div className="rounded-2xl bg-[#171717] px-6 pb-12 pt-16 md:px-12 md:pb-16 md:pt-24 xl:rounded-3xl xl:px-16 xl:pb-20 xl:pt-32">
              {technologyHtml ? (
                <div
                  className="technology-editor flex min-h-[154px] flex-wrap items-center justify-center gap-6 md:gap-8 xl:gap-10 [&_img]:h-[130px] [&_img]:w-[130px] [&_img]:rounded-full [&_img]:bg-white [&_img]:p-6 [&_img]:object-contain [&_img]:shadow-md [&_img]:transition-transform [&_img]:duration-300 hover:[&_img]:scale-105 md:[&_img]:h-[154px] md:[&_img]:w-[154px] md:[&_img]:p-[28px]"
                  dangerouslySetInnerHTML={{
                    __html: technologyHtml,
                  }}
                />
              ) : (
                <div className="flex min-h-[154px] flex-wrap items-center justify-center gap-6 md:gap-8 xl:gap-10">
                  {techLogos.map((logo, idx) => (
                    <div
                      key={idx}
                      className="flex h-[130px] w-[130px] items-center justify-center rounded-full bg-white p-6 shadow-md transition-transform duration-300 hover:scale-105 md:h-[154px] md:w-[154px] md:p-[28px]"
                    >
                      <img
                        src={logo}
                        alt={`Technology ${idx + 1}`}
                        className="h-full w-full object-contain"
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* =================================================
    6. SOLUTIONS
================================================= */}
      <section className="relative overflow-hidden bg-white py-16 md:py-24">
        {/* CSS Animation for SVG dashed stroke */}
        <style>{`
    @keyframes dash {
      to {
        stroke-dashoffset: -40;
      }
    }
    .animate-dashed-line {
      stroke-dasharray: 8, 8;
      animation: dash 1.5s linear infinite;
    }
  `}</style>

        <div className="mx-auto max-w-[1200px] px-5 md:px-10 2xl:px-16">
          <h2 className="mb-16 text-center text-3xl font-bold text-[#222] xl:text-5xl">
            The Solutions Provided
          </h2>

          <div className="relative">
            {/* Animated S-Curve SVG Line (Visible on Desktop) */}
            <div className="pointer-events-none absolute inset-0 hidden lg:block">
              <svg
                className="h-full w-full"
                viewBox="0 0 1000 1600"
                fill="none"
                preserveAspectRatio="none"
              >
                <path
                  d="M 250,150 
               C 850,200 900,450 500,500 
               C 100,550 150,800 500,850 
               C 850,900 900,1150 500,1200 
               C 150,1250 200,1500 250,1550"
                  stroke="#E2A52F"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  className="animate-dashed-line"
                />
              </svg>
            </div>

            {/* Solutions List */}
            <div className="relative z-10 flex flex-col gap-12 md:gap-20 xl:gap-28">
              {solutions.map((solution, index) => {
                const isOdd = index % 2 === 1;

                return (
                  <div
                    key={index}
                    className={`flex flex-col gap-6 md:flex-row md:items-center md:gap-12 xl:gap-20 ${
                      isOdd ? "md:flex-row-reverse" : ""
                    }`}
                  >
                    {/* Image & Title Column */}
                    <div className="w-full md:w-1/2">
                      {solution.title && (
                        <h3 className="mb-4 text-xl font-bold text-[#DCA32C] md:text-2xl xl:text-3xl">
                          {solution.title}
                        </h3>
                      )}

                      {solution.image && (
                        <div className="inline-block rounded-2xl bg-white p-2 shadow-[0_15px_30px_rgba(0,0,0,0.08)] transition-transform duration-300 hover:scale-[1.02]">
                          <img
                            src={solution.image}
                            alt={solution.title || "Solution"}
                            className="max-h-[250px] w-full max-w-full rounded-xl object-contain md:max-h-[300px] xl:max-h-[380px]"
                          />
                        </div>
                      )}
                    </div>

                    {/* Description Column */}
                    <div className="w-full md:w-1/2">
                      {solution.description && (
                        <div
                          className="text-base leading-relaxed text-[#555] md:text-lg md:leading-8 xl:text-xl xl:leading-9"
                          dangerouslySetInnerHTML={{
                            __html: solution.description,
                          }}
                        />
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* =================================================
      7. BUSINESS IMPACT
  ================================================= */}
      <section className="bg-[#F7F5F2] py-16 md:py-20">
        <div className="mx-auto grid max-w-[1400px] items-center gap-12 px-5 md:grid-cols-2 md:px-10 2xl:px-16">
          <div>
            {images.businessImpact && (
              <img
                src={images.businessImpact}
                alt="Business Impact"
                className="w-full rounded-xl object-contain"
              />
            )}
          </div>

          <div>
            <h2 className="mb-5 text-3xl font-bold text-[#222] xl:text-4xl">
              Business Impact
            </h2>

            <div
              className="text-sm leading-7 text-gray-600 xl:text-base xl:leading-8"
              dangerouslySetInnerHTML={{
                __html: acf.business_impact || "",
              }}
            />
          </div>
        </div>
      </section>

      {/* =================================================
      8. DESIGN HIGHLIGHTS
  ================================================= */}
      <section className="bg-[#F7F5F2] pb-16 md:pb-24">
        <div className="mx-auto grid max-w-[1400px] items-center gap-12 px-5 md:grid-cols-2 md:px-10 2xl:px-16">
          <div>
            <h2 className="mb-5 text-3xl font-bold text-[#222] xl:text-4xl">
              Design Highlights
            </h2>

            <div
              className="text-sm leading-7 text-gray-600 xl:text-base xl:leading-8"
              dangerouslySetInnerHTML={{
                __html: acf.design_highlights || "",
              }}
            />
          </div>

          <div>
            {images.designHighlights && (
              <img
                src={images.designHighlights}
                alt="Design Highlights"
                className="w-full object-contain"
              />
            )}
          </div>
        </div>
      </section>

      {/* =================================================
      9. WHY THIS PROJECT STANDS OUT
  ================================================= */}
      {whyStandsOutText && (
        <section className="bg-[#F7F5F2] pb-20">
          <div className="mx-auto max-w-[1400px] px-5 md:px-10 2xl:px-16">
            <div className="rounded-xl border-2 border-[#DCA32C] bg-white px-6 py-8 text-center md:px-12 xl:py-12">
              <h2 className="mb-5 text-2xl font-bold text-[#DCA32C] md:text-3xl xl:text-4xl">
                Why This Project Stands Out
              </h2>

              <div
                className="mx-auto max-w-5xl text-sm leading-7 text-gray-600 xl:text-base xl:leading-8"
                dangerouslySetInnerHTML={{
                  __html: whyStandsOutText,
                }}
              />
            </div>
          </div>
        </section>
      )}
    </main>
  );
};
