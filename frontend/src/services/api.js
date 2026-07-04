import axios from "axios";

// Production backend on Render
const API_BASE_URL = import.meta.env.VITE_API_URL || "https://fake-link-detector-3at6.onrender.com/api";

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 15000, // 15 seconds timeout
});

/**
 * Call the backend to analyze a URL.
 * 
 * @param {string} url - The URL input from the user
 * @returns {Promise<Object>} The analysis report from the backend
 */
export const analyzeUrl = async (url) => {
  try {
    const response = await apiClient.post("/analyze", { url });
    return response.data;
  } catch (error) {
    if (error.response && error.response.data && error.response.data.error) {
      throw new Error(error.response.data.error);
    }
    throw new Error(error.message || "Failed to connect to the analysis server. Please make sure the backend server is running.");
  }
};
