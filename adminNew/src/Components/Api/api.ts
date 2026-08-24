import axios from "axios";
import type { AxiosInstance, InternalAxiosRequestConfig } from "axios";

const BASE_URL = "http://localhost:5000/api";
// const BASE_URL = "https://ahaan-software-1.onrender.com/api";

const API: AxiosInstance = axios.create({
  baseURL: BASE_URL,
  withCredentials: false,
});

// =======================
// Request Interceptor
// =======================
API.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const user = localStorage.getItem("user");

    if (user) {
      const parsed = JSON.parse(user);

      if (parsed?.token) {
        config.headers.Authorization = `Bearer ${parsed.token}`;
      }
    }

    return config;
  },
  (error) => Promise.reject(error),
);

// =======================
// Authentication
// =======================
export const registerAPI = (formData: FormData) =>
  API.post("/auth/register", formData);

export const loginAPI = (data: { email: string; password: string }) =>
  API.post("/auth/login", data);

export const profileAPI = () => API.get("/auth/profile");

export const logoutAPI = () => API.post("/auth/logout");

// =======================
// Blogs (Admin CRUD Operations)
// =======================
export const createBlogAPI = (formData: FormData) =>
  API.post("/blogs", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

export const getBlogsAPI = () => API.get("/blogs");

export const getBlogByIdAPI = (id: string) => API.get(`/blogs/${id}`);

export const updateBlogAPI = (id: string, formData: FormData) =>
  API.put(`/blogs/${id}`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

export const deleteBlogAPI = (id: string) => API.delete(`/blogs/${id}`);

// =======================
// Contact Form
// =======================
export const getForms = async () => {
  const response = await API.get("/form");
  return response.data;
};

export const getContact = () => API.get("/contact/all");

export const getContactCount = () => API.get("/contact/count");


// =======================
// Team
// =======================
export const createTeam = (data: FormData) => API.post("/team/create", data);

export const getAllTeams = async () => {
  const response = await API.get("/team/all");
  return response.data;
};

export const updateTeam = (id: string, data: FormData) =>
  API.put(`/team/update/${id}`, data);

export const deleteTeam = (id: string) => API.delete(`/team/delete/${id}`);

export const getSingleTeam = (id: string) => API.get(`/team/${id}`);

// =======================
// Design
// =======================
export const addDesignAPI = (formData: FormData) =>
  API.post("/designs/add", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

export const getAllDesignsAPI = () => API.get("/designs");

export const getDesignByIdAPI = (id: string) => API.get(`/designs/${id}`);

export const updateDesignAPI = (id: string, formData: FormData) =>
  API.put(`/designs/edit/${id}`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

export const deleteDesignAPI = (id: string) =>
  API.delete(`/designs/delete/${id}`);

// =======================
// Development
// =======================
export const addDevelopmentAPI = (formData: FormData) =>
  API.post("/developments/add", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

export const getAllDevelopmentsAPI = () => API.get("/developments/all");

export const getDevelopmentByIdAPI = (id: string) =>
  API.get(`/developments/${id}`);

export const updateDevelopmentAPI = (id: string, formData: FormData) =>
  API.put(`/developments/edit/${id}`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

export const deleteDevelopmentAPI = (id: string) =>
  API.delete(`/developments/delete/${id}`);


// =======================
// SocialMediaPost
// =======================

export const AddSocialMediaMarketingAPI = (formData: FormData) =>
  API.post("/social/add", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

export const getAllSocialMediaMarketingAPI = () =>
  API.get("/social");

export const getSocialMediaMarketingByIdAPI = (id: string) =>
  API.get(`/social/${id}`);

export const updateSocialMediaMarketingAPI = (
  id: string,
  formData: FormData
) =>
  API.put(`/social/${id}`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

export const deleteSocialMediaMarketingAPI = (id: string) =>
  API.delete(`/social/${id}`);


// =======================
// AppDevelopment
// =======================

export const AddAppDevelopmentAPI = (formData: FormData) =>
  API.post("/appDev/add", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

export const getAllAppDevelopmentAPI = () =>
  API.get("/appDev");

export const getAppDevelopmentByIdAPI = (id: string) =>
  API.get(`/appDev/${id}`);

export const updateAppDevelopmentAPI = (
  id: string,
  formData: FormData
) =>
  API.put(`/appDev/${id}`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

export const deleteAppDevelopmentAPI = (id: string) =>
  API.delete(`/appDev/${id}`);



// =======================
// Users
// =======================
export const getUsersByStatusAPI = (status: string) =>
  API.get(`/auth/users/status/${status}`);

export const approveUserAPI = (id: string) => API.put(`/auth/approve/${id}`);

export const rejectUserAPI = (id: string) => API.put(`/auth/reject/${id}`);

// =======================
// Newsletter
// =======================
export const getNewsletterSubscribers = async () => {
  const response = await API.get("/newsletter");
  return response.data;
};

export default API;
