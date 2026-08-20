import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { getCaseStudyBySlug, getMediaById } from "../../../../api/WordpressAPI";

import type {
  CaseStudy,
  ImagesState,
  Solution,
} from "../../../../types/caseStudies";
import { CaseStudyHeroSection } from "./CaseStudyHeroSection";
import { CaseStudyProjectOverviewSection } from "./CaseStudyProjectOverviewSection";
import { CaseStudyChallengesSection } from "./CaseStudyChallengesSection";
import { CaseStudyKeyFeaturesSection } from "./CaseStudyKeyFeaturesSection";
import { CaseStudyTechnologiesSection } from "./CaseStudyTechnologiesSection";
import { CaseStudySolutionsSection } from "./CaseStudySolutionsSection";
import { CaseStudyBusinessImpactSection } from "./CaseStudyBusinessImpactSection";
import { CaseStudyDesignHighlightsSection } from "./CaseStudyDesignHighlightsSection";
import { CaseStudyWhyStandsOutSection } from "./CaseStudyWhyStandsOutSection";

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
  // 2. FETCH ACF IMAGES
  // =====================================================
  useEffect(() => {
    if (!caseStudy?.acf) return;

    const loadImages = async () => {
      const acf = caseStudy.acf;

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

  // =====================================================
  // DATA PARSING & PREPARATION
  // =====================================================
  const acf = caseStudy.acf || ({} as any);

  // Dynamic Theme Color (WP ACF Field: theme_color)
  const themeColor = acf.theme_color || "#0e7655";

  const heroImage =
    caseStudy._embedded?.["wp:featuredmedia"]?.[0]?.source_url || "";

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

  const whyStandsOutText =
    acf.why_project_stands_out || acf.why_this_project_stands_out || "";

  const technologyHtml = acf.technology_icon || acf.technology_image || "";

  const techLogos = [
    images.tech1,
    images.tech2,
    images.tech3,
    images.tech4,
    images.tech5,
  ].filter((logo): logo is string => Boolean(logo));

  const buttonUrl = acf.button_url || acf.site_url || "#";
  const buttonText = acf.button_text || "Visit The Site";

  return (
    <main
      className="overflow-hidden bg-white"
      style={{ "--theme-color": themeColor } as React.CSSProperties}
    >
      <CaseStudyHeroSection
        caseStudy={caseStudy}
        heroImage={heroImage}
        mainDescription={mainDescription}
        industry={industry}
        platform={platform}
        servicesProvided={servicesProvided}
      />

      <CaseStudyProjectOverviewSection
        image={images.projectOverview}
        projectOverviewHtml={acf.project_overview}
        buttonUrl={buttonUrl}
        buttonText={buttonText}
      />
      <CaseStudyChallengesSection
        image={images.challenges}
        challengesHtml={acf.challenges}
      />
      <CaseStudyKeyFeaturesSection
        logo={images.logo}
        leftFeatures={leftFeatures}
        rightFeatures={rightFeatures}
        allFeatures={allFeatures}
      />
      <CaseStudyTechnologiesSection
        technologyHtml={technologyHtml}
        techLogos={techLogos}
      />
      <CaseStudySolutionsSection solutions={solutions} />
      <CaseStudyBusinessImpactSection
        image={images.businessImpact}
        businessImpactHtml={acf.business_impact}
      />
      <CaseStudyDesignHighlightsSection
        image={images.designHighlights}
        designHighlightsHtml={acf.design_highlights}
      />
      <CaseStudyWhyStandsOutSection whyStandsOutText={whyStandsOutText} />
    </main>
  );
};