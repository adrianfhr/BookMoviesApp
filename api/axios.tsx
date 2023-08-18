import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:5000', // Ganti dengan baseURL yang sesuai
});

export default axiosInstance;
