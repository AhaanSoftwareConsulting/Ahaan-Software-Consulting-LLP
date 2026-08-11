export interface WordPressRenderedText {
  rendered: string;
}

export interface WordPressFeaturedMedia {
  source_url: string;
  alt_text?: string;
}

export interface AcfFields {
  // Hero
  case_study_description?: string;
  industry?: string;
  platform?: string;
  services_provided?: string;

  // Overview
  project_overview?: string;
  project_overview_image?: string | number;

  // Challenges
  challenges?: string;
  challenges_image?: string | number;

  // Logo & Key Features Image
  case_study_logo?: string | number;
  "key_features_&_benefits_image"?: string | number;

  // Features (Left & Right Column Mappings)
  left_key_feature_1?: string;
  left_key_feature_2?: string;
  left_key_feature_3?: string;
  left_key_feature_4?: string;
  left_key_feature_5?: string;

  right_key_feature_1?: string;
  right_key_feature_2?: string;
  right_key_feature_3?: string;
  right_key_feature_4?: string;
  right_key_feature_5?: string;

  // Legacy/Fallback Features
  feature_1?: string;
  feature_2?: string;
  feature_3?: string;
  feature_4?: string;
  feature_5?: string;
  feature_6?: string;
  feature_7?: string;
  feature_8?: string;

  // Technologies
  technology_icon?: string;
  technology_image?: string;
  technology_1_logo?: string | number;
  technology_2_logo?: string | number;
  technology_3_logo?: string | number;
  technology_4_logo?: string | number;
  technology_5_logo?: string | number;

  // Solutions
  solution_1_title?: string;
  solution_1_description?: string;
  solution_1_image?: string | number;

  solution_2_title?: string;
  solution_2_description?: string;
  solution_2_image?: string | number;

  solution_3_title?: string;
  solution_3_description?: string;
  solution_3_image?: string | number;

  solution_4_title?: string;
  solution_4_description?: string;
  solution_4_image?: string | number;

  solution_5_title?: string;
  solution_5_description?: string;
  solution_5_image?: string | number;

  // Bottom
  business_impact?: string;
  business_impact_image?: string | number;

  design_highlights?: string;
  design_highlights_image?: string | number;

  // Why Project Stands Out
  why_project_stands_out?: string;
  why_this_project_stands_out?: string;

  // Fallback signature for any future dynamic WordPress ACF keys
  [key: string]: any;
}

export interface CaseStudy {
  id: number;
  slug: string;
  title: WordPressRenderedText;
  content?: WordPressRenderedText;
  acf: AcfFields;
  _embedded?: {
    "wp:featuredmedia"?: WordPressFeaturedMedia[];
  };
}

export interface ImagesState {
  projectOverview?: string;
  challenges?: string;
  logo?: string;
  solution1?: string;
  solution2?: string;
  solution3?: string;
  solution4?: string;
  solution5?: string;
  businessImpact?: string;
  designHighlights?: string;
  tech1?: string;
  tech2?: string;
  tech3?: string;
  tech4?: string;
  tech5?: string;
}

export interface Solution {
  title?: string;
  description?: string;
  image?: string;
} 