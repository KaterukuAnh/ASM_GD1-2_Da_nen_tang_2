import axios from 'axios';

const API_BASE_URL = 'https://my-express-app-13ot.onrender.com/';

const AxiosInstance = (token = null, contentType = 'application/json') => {
  const axiosInstance = axios.create({
    baseURL: API_BASE_URL,
  });

  axiosInstance.interceptors.request.use(
    config => {
      try {
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        config.headers.Accept = 'application/json';
        config.headers['Content-Type'] = contentType;
      } catch (error) {
        console.error('Lỗi thiết lập header:', error);
      }
      return config;
    },
    err => Promise.reject(err),
  );

  axiosInstance.interceptors.response.use(
    response => response.data,
    error => Promise.reject(error),
  );

  return axiosInstance;
};

export default AxiosInstance;
