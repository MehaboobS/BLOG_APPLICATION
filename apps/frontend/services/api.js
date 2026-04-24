import axios from "axios";

const API_BASE_URL =
 
  "https://blog-application-10jw.onrender.com/api";

const API = axios.create({
  baseURL: API_BASE_URL
});

const emitLoadingEvent = (isLoading) => {
  if (typeof window === "undefined") return;

  window.dispatchEvent(
    new CustomEvent("api-loading", {
      detail: { isLoading }
    })
  );
};

API.interceptors.request.use((config) => {
  emitLoadingEvent(true);

  if (typeof window !== "undefined") {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }

  return config;
});

API.interceptors.response.use(
  (response) => {
    emitLoadingEvent(false);
    return response;
  },
  (error) => {
    emitLoadingEvent(false);
    return Promise.reject(error);
  }
);

export default API;