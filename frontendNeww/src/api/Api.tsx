import axios from "axios";

// const BASE_URL = "https://ahaan-software-1.onrender.com/api";
const BASE_URL = "http://localhost:5000/api";

const API = axios.create({ 
  baseURL: BASE_URL,
  timeout: 30000 // 30-second timeout to give Render cold starts time to respond
});

// Interface for contact payload
export interface ContactPayload {
  name: string;
  email: string;
  phone: string;
  website: string;
  message: string;
}

export interface ConnectPayload {
  name: string;
  email: string;
  service: string;
  budget: string;
  projectDetails: string;
}

export interface NewsletterPayload {
  email: string;
}

export const getTeams = async () => {
  try {
    const response = await API.get("/team/all");
    return Array.isArray(response.data) ? response.data : response.data.team || response.data.data || [];
  } catch (error:any) {
    if (axios.isAxiosError(error) && !error.response) {
      console.error("❌ Network error — backend might be sleeping or unreachable:", error.message);
    } else {
      console.error("❌ API error status:", error.response?.status, error.response?.data);
    }
    return [];
  }
};
// ➤ Get all web development projects
export const getAllDevelopmentsAPI = async () => {
  try {
    const response = await API.get("/developments/all");
    return response;
  } catch (error) {
    console.error("❌ Error fetching developments:", error);
    throw error;
  }
};
// ➤ Get all UI/UX designs
export const getAllUiUxDesignsAPI = async () => {
  try {
    const response = await API.get("/designs");
    return response.data;
  } catch (error) {
    console.error("❌ Error fetching UI/UX designs:", error);
    return [];
  }
};

// ➤ Get all SocialMedia Post
export const getAllSocialMediaMarketingAPI = async () => {
  try {
    const response = await API.get("/social");
    return response.data;
  } catch (error) {
    console.error("❌ Error fetching social media posts:", error);
    return [];
  }
};


// ➤ Get all AppDevelopment
export const getAllAppDevelopmentsAPI = async () => {
  try {
    const response = await API.get("/appDev");
    return response.data;
  } catch (error) {
    console.error("❌ Error fetching app development projects:", error);
    return [];
  }
};

// ➤ Post contact form details
export const createContact = async (data: ContactPayload) => {
  try {
    const response = await API.post("/contact/add", data);
    return response.data;
  } catch (error) {
    console.error("❌ Error submitting contact form:", error);
    throw error;
  }
};

export const subscribeNewsletter = async (data: NewsletterPayload) => {
  try {
    const response = await API.post("/newsletter", data);
    return response.data;
  } catch (error) {
    console.error("❌ Error subscribing newsletter:", error);
    throw error;
  }
};

export const createForm = async (data: ConnectPayload) => {
  try {
    const response = await API.post("/form", data);
    return response.data;
  } catch (error) {
    console.error("❌ Error submitting form:", error);
    throw error;
  }
};

// ➤ Get all blogs
export const getAllBlogsAPI = async () => {
  try {
    const response = await API.get("/blogs");
    return response.data;
  } catch (error) {
    console.error("❌ Error fetching blogs:", error);
    return { success: false, data: [] };
  }
};

// ➤ Get single blog by ID
export const getBlogByIdAPI = async (id: string | number) => {
  try {
    const response = await API.get(`/blogs/${id}`);
    return response.data;
  } catch (error) {
    console.error("❌ Error fetching single blog:", error);
    throw error;
  }
};

// ➤ Update reaction (thumbs_up or love)
export const updateBlogReactionAPI = async (
  blogId: string | number,
  updatedData: { thumbs_up?: number; love?: number }
) => {
  try {
    const response = await API.put(`/blogs/${blogId}`, updatedData);
    return response.data;
  } catch (error) {
    console.error("❌ Error updating reaction:", error);
    throw error;
  }
};

