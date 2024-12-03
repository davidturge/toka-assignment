import axios from 'axios';

const BASE_URL = 'http://localhost:3000/';

/**
 * Create an instance of axios
 */
const axiosClient = axios.create({
  headers: {
    'Content-Type': 'application/json',
  },
});

// Set the base URL
axiosClient.defaults.baseURL = BASE_URL;

/**
 * Add a response interceptor
 */
axiosClient.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosClient;
