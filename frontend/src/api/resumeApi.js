import axios from 'axios';

// Create an Axios instance using base URL from environment variables
const API = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api',
});

// Response/Error Interceptor for cleaner error handling downstream
API.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API Error:', error.response?.data?.message || error.message);
    const customError = new Error(error.response?.data?.message || 'An error occurred while contacting the server.');
    return Promise.reject(customError);
  }
);

/**
 * Upload a resume (form data with file or text)
 * @param {FormData} formData 
 * @returns {Promise<Object>} Analysis result
 */
export const analyzeResume = async (formData) => {
  const response = await API.post('/resume/analyze', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response.data;
};

/**
 * Get history records for a user
 * @param {string} userId
 * @returns {Promise<Array>} List of short history records
 */
export const getHistory = async (userId) => {
  const response = await API.get(`/history/${userId}`);
  return response.data;
};

/**
 * Get detail of a specific history record
 * @param {string} id 
 * @returns {Promise<Object>} Full analysis record
 */
export const getHistoryDetail = async (id) => {
  const response = await API.get(`/history/detail/${id}`);
  return response.data;
};

/**
 * Delete a specific history record
 * @param {string} id 
 * @returns {Promise<Object>} Success message
 */
export const deleteHistory = async (id) => {
  const response = await API.delete(`/history/${id}`);
  return response.data;
};
