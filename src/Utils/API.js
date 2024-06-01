// axiosConfig.js
import axios from 'axios';
import store from '../redux/store';
import { refreshToken, logout } from '../redux/auth';

// Create an axios instance
const instance = axios.create({
  baseURL: 'https://api.spatiumoffices.com/api/',
  headers: {
    "Content-Type": "application/json"
  },
  timeout: 60000
});

// Function to get access token from localStorage
const getAccessToken = () => {
  const tokens = JSON.parse(localStorage.getItem('spacium_admin'));
  return tokens ? tokens.access : null;
};

// Interceptor for attaching Bearer Token
instance.interceptors.request.use(
  (config) => {
    if (!config.url.includes('v1/auth/verify-')) {
      const token = getAccessToken();
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Interceptor for handling 401 errors
instance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response && error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const resultAction = await store.dispatch(refreshToken());
        const newToken = resultAction.payload.access;
        originalRequest.headers.Authorization = `Bearer ${newToken}`;
        return axios(originalRequest);
      } catch (refreshError) {
        console.error('Failed to refresh token:', refreshError);
        store.dispatch(logout());
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default instance;
