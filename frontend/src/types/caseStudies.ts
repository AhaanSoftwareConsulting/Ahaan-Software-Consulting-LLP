export interface AcfFields {
    project_overview_image?: number;
    challenges_image?: number;
    technology_1_logo?: number;
    technology_2_logo?: number;
    technology_3_logo?: number;
    technology_4_logo?: number;
    technology_5_logo?: number;
    solution_1_image?: number;
    solution_2_image?: number;
    solution_3_image?: number;
    solution_4_image?: number;
    solution_5_image?: number;
    business_impact_image?: number;
    design_highlights_image?: number;
    project_details_image?: number;
    "key_features_&_benefits_image"?: number;
    project_overview?: string;
    challenges?: string;
    "key_features_&_benefits"?: string;
    solution_1_title?: string;
    solution_1_description?: string;
    solution_2_title?: string;
    solution_2_description?: string;
    solution_3_title?: string;
    solution_3_description?: string;
    solution_4_title?: string;
    solution_4_description?: string;
    solution_5_title?: string;
    solution_5_description?: string;
    business_impact?: string;
    design_highlights?: string;
    why_this_project_stands_out?: string;
    project_details?: string;
}

export interface ImagesState {
    projectOverview?: string;
    challenges?: string;
    tech1?: string;
    tech2?: string;
    tech3?: string;
    tech4?: string;
    tech5?: string;
    solution1?: string;
    solution2?: string;
    solution3?: string;
    solution4?: string;
    solution5?: string;
    featureImage?: string;
    businessImpact?: string;
    designHighlights?: string;
    projectDetails?: string;
}

export interface Solution {
    title?: string;
    description?: string;
    image?: string;
}

export interface WordPressRenderedText {
  rendered: string;
}

export interface WordPressFeaturedMedia {
  source_url: string;
}

export interface CaseStudyItem {
  id: number;
  slug: string;
  title: WordPressRenderedText;
  content: WordPressRenderedText;
  _embedded?: {
    "wp:featuredmedia"?: WordPressFeaturedMedia[];
  };
}