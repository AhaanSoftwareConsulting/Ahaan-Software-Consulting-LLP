import axios from "axios";

// const BASE_URL = "http://localhost:5000/api";
const BASE_URL = "https://ahaan-software-1.onrender.com/api";

const API = axios.create({
  baseURL: BASE_URL,
  withCredentials: false,
});

API.interceptors.request.use((config) => {
  const user = JSON.parse(localStorage.getItem("user"));
  if (user?.token) {
    config.headers.Authorization = `Bearer ${user.token}`;
  }
  return config;
});

export const registerAPI = (formData) => API.post("/auth/register", formData);

export const loginAPI = (data) => API.post("/auth/login", data);

export const profileAPI = () => API.get("/auth/profile");

export const logoutAPI = () => API.post("/auth/logout");

export const getForms = async () => {
  try {
    const response = await API.get("/form");
    return response.data;
  } catch (error) {
    console.error("❌ Error fetching forms:", error);
    throw error;
  }
};

export const getContact = () => API.get("/contact/all");

export const getContactCount = () => API.get("/contact/count");

export const getAllConversations = () => API.get("/chat/conversations");

export const getMessages = (conversationId) =>
  API.get(`/chat/messages/${conversationId}`);

export const sendMessage = (data) => API.post("/chat/messages", data);

export const createTeam = (data) => API.post("/team/create", data);

export const getAllTeams = async () => {
  try {
    const res = await API.get("/team/all");
    return res.data;
  } catch (error) {
    console.error("❌ Error fetching teams:", error);
    throw error;
  }
};

export const updateTeam = (id, data) => API.put(`/team/update/${id}`, data);

export const deleteTeam = (id) => API.delete(`/team/delete/${id}`);

export const getSingleTeam = (id) => API.get(`/team/${id}`);

export const addDesignAPI = (formData) =>
  API.post("/designs/add", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });

export const getAllDesignsAPI = () => API.get("/designs");

export const getDesignByIdAPI = (id) => API.get(`/designs/${id}`);

export const updateDesignAPI = (id, formData) =>
  API.put(`/designs/edit/${id}`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });

export const deleteDesignAPI = (id) => API.delete(`/designs/delete/${id}`);

export const addDevelopmentAPI = (formData) =>
  API.post("/developments/add", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });

export const getAllDevelopmentsAPI = () => API.get("/developments/all");

export const getDevelopmentByIdAPI = (id) => API.get(`/developments/${id}`);

export const updateDevelopmentAPI = (id, formData) =>
  API.put(`/developments/edit/${id}`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });

export const deleteDevelopmentAPI = (id) =>
  API.delete(`/developments/delete/${id}`);


export const getUsersByStatusAPI = (status) =>
  API.get(`/auth/users/status/${status}`);


export const approveUserAPI = (id) =>
  API.put(`/auth/approve/${id}`);


export const rejectUserAPI = (id) =>
  API.put(`/auth/reject/${id}`);

export const getNewsletterSubscribers = async () => {
  try {
    const response = await API.get("/newsletter");
    return response.data;
  } catch (error) {
    console.error("❌ Error fetching newsletter:", error);
    throw error;
  }
};

export default API;
