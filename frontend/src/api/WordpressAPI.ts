import axios, { AxiosError } from "axios";
import type { AxiosInstance } from "axios";
import type { AcfFields } from "../types/caseStudies";
// ==========================================
// 1. Core WordPress TypeScript Interfaces
// ==========================================

export interface WPRenderedText {
  rendered: string;
}

export interface WPMediaDetails {
  source_url: string;
  [key: string]: any; // Catch-all for extra WP media meta properties if needed
}

export interface WPEmbedded {
  "wp:featuredmedia"?: Array<{
    id: number;
    source_url: string;
    media_details?: any;
    [key: string]: any;
  }>;
}

// Generic structure shared by most Custom Post Types (Careers, Case Studies)
export interface WPCustomPost {
  id: number;
  date: string;
  slug: string;
  status: string;
  type: string;
  link: string;
  title: WPRenderedText;
  content: WPRenderedText;
  excerpt: WPRenderedText;
  _embedded?: WPEmbedded;
  acf?: AcfFields;
}

// Specific mapping for Media endpoints
export interface WPMediaResponse {
  id: number;
  date: string;
  slug: string;
  type: string;
  link: string;
  title: WPRenderedText;
  source_url: string;
  media_details: WPMediaDetails;
  mime_type: string;
}

export interface WPServiceItem extends WPCustomPost {
  acf: {
    brand_color: string;
    tech_stack: string; // HTML format from WYSIWYG
    button_text: string;
    button_link: string;
    service_icon: string; // HTML <img> elements from WYSIWYG
  };
}

// ==========================================
// 2. Axios Client Initialization
// ==========================================

const wpAPI: AxiosInstance = axios.create({
  baseURL: "https://ahaan-admin.ahaanmedia.com/wp-json/wp/v2",
  timeout: 30000,
  headers: {
    Accept: "application/json",
  },
});

const WordpressAPI = wpAPI;

// Helper to reliably extract error messages safely in TypeScript
const getErrorMessage = (error: unknown): string => {
  if (error instanceof AxiosError) return error.message;
  if (error instanceof Error) return error.message;
  return String(error);
};

// ==========================================
// 3. Careers API
// ==========================================

export const getAllCareers = async (): Promise<WPCustomPost[]> => {
  try {
    const response = await wpAPI.get<WPCustomPost[]>("/career?_embed");
    return response.data || [];
  } catch (error) {
    console.error("❌ Error fetching careers:", getErrorMessage(error));
    return [];
  }
};

export const getCareerBySlug = async (
  slug: string,
): Promise<WPCustomPost | null> => {
  try {
    const response = await wpAPI.get<WPCustomPost[]>(
      `/career?slug=${slug}&_embed`,
    );
    return response.data?.[0] || null;
  } catch (error) {
    console.error("❌ Error fetching career details:", getErrorMessage(error));
    return null;
  }
};

// ==========================================
// 4. Case Studies API
// ==========================================

export const getAllCaseStudies = async (): Promise<WPCustomPost[]> => {
  try {
    const response = await wpAPI.get<WPCustomPost[]>("/case-studies?_embed");
    return response.data || [];
  } catch (error) {
    console.error("❌ Error fetching case studies:", getErrorMessage(error));
    return [];
  }
};

export const getCaseStudyBySlug = async (
  slug: string,
): Promise<WPCustomPost | null> => {
  try {
    const response = await wpAPI.get<WPCustomPost[]>(
      `/case-studies?slug=${slug}&_embed`,
    );
    return response.data?.[0] || null;
  } catch (error) {
    console.error("❌ Error fetching case study:", getErrorMessage(error));
    return null;
  }
};

// ==========================================
// 5. Media API
// ==========================================

export const getMediaById = async (
  id: number | string,
): Promise<WPMediaResponse | null> => {
  try {
    const response = await wpAPI.get<WPMediaResponse>(`/media/${id}`);
    return response.data || null;
  } catch (error) {
    console.error("❌ Error fetching media:", getErrorMessage(error));
    return null;
  }
};

// ==========================================
// 6. Policies API
// ==========================================

export const getPolicies = async (): Promise<WPCustomPost[]> => {
  try {
    const response = await wpAPI.get<WPCustomPost[]>("/policies?_embed");
    return response.data || [];
  } catch (error) {
    console.error("❌ Error fetching policies:", getErrorMessage(error));
    return [];
  }
};

export const getPolicyBySlug = async (
  slug: string,
): Promise<WPCustomPost | null> => {
  try {
    const response = await wpAPI.get<WPCustomPost[]>(
      `/policies?slug=${slug}&_embed`,
    );
    return response.data?.[0] || null;
  } catch (error) {
    console.error("❌ Error fetching policy:", getErrorMessage(error));
    return null;
  }
};

export interface WPSolution extends WPCustomPost {
  acf: {
    hero_section_title: string;
    hero_section_description: string;
    hero_section_image: number;

    highlight_title: string;
    highlight_description: string;

    key_features_heading: string;

    feature_1_title: string;
    feature_1_description: string;
    feature_1_image: number;

    feature_2_title: string;
    feature_2_description: string;
    feature_2_image: number;

    feature_3_title: string;
    feature_3_description: string;
    feature_3_image: number;

    feature_4_title: string;
    feature_4_description: string;
    feature_4_image: number;

    feature_5_title: string;
    feature_5_description: string;
    feature_5_image: number;
  };
}

export const getAllSolutions = async (): Promise<WPSolution[]> => {
  try {
    const response = await wpAPI.get<WPSolution[]>("/solutions?_embed");

    return response.data || [];
  } catch (error) {
    console.error("Error fetching solutions", error);
    return [];
  }
};

export const getSolutionBySlug = async (
  slug: string,
): Promise<WPSolution | null> => {
  try {
    const response = await wpAPI.get<WPSolution[]>(
      `/solutions?slug=${slug}&_embed`,
    );

    return response.data[0] || null;
  } catch (error) {
    console.error(error);

    return null;
  }
};

export const getAllServices = async (): Promise<WPServiceItem[]> => {
  try {
    const response = await wpAPI.get<WPServiceItem[]>("/services?_embed");
    return response.data || [];
  } catch (error) {
    console.error("❌ Error fetching services:", getErrorMessage(error));
    return [];
  }
};


// ==========================================
// 7. Testimonials API & Types
// ==========================================

export interface WPTestimonialACF {
  client_name: string;
  client_review: string;
  rating: string | number;
  color: string;
  client_image: number | string;
}

export interface WPTestimonialItem extends WPCustomPost {
  acf: WPTestimonialACF;
}

export const getAllTestimonials = async (): Promise<WPTestimonialItem[]> => {
  try {
    const response = await wpAPI.get<WPTestimonialItem[]>("/testimonial?_embed");
    return response.data || [];
  } catch (error) {
    console.error("❌ Error fetching testimonials:", getErrorMessage(error));
    return [];
  }
};


// ==========================================
// 8. FAQs API & Types
// ==========================================

export interface WPFAQACF {
  question_1?: string;
  answer_1?: string;

  question_2?: string;
  answer_2?: string;

  question_3?: string;
  answer_3?: string;

  question_4?: string;
  answer_4?: string;

  question_5?: string;
  answer_5?: string;

  question_6?: string;
  answer_6?: string;

  question_7?: string;
  answer_7?: string;

  question_8?: string;
  answer_8?: string;

  question_9?: string;
  answer_9?: string;

  question_10?: string;
  answer_10?: string;
}

export interface WPFAQItem extends WPCustomPost {
  acf: WPFAQACF;
}

// Get FAQ by page slug
export const getFAQBySlug = async (
  slug: string,
): Promise<WPFAQItem | null> => {
  try {
    const response = await wpAPI.get<WPFAQItem[]>(
      `/faq?slug=${slug}`,
    );

    return response.data?.[0] || null;
  } catch (error) {
    console.error("❌ Error fetching FAQ:", getErrorMessage(error));
    return null;
  }
};

export default WordpressAPI;
