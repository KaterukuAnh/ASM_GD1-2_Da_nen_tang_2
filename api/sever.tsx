import axios from "axios";

/**
 * Tạo một instance Axios đã được cấu hình với interceptor
 */
const taoAxiosInstance = (token = "", contentType = "application/json", timeout = 10000) => {
    const baseURL = process.env.REACT_APP_API_BASE_URL || "https://my-express-app-13ot.onrender.com";

    console.log("Base URL của API:", baseURL); // Kiểm tra URL có đúng không

    const axiosInstance = axios.create({
        baseURL: baseURL,
        timeout: timeout,
        headers: {
            Accept: "application/json",
            "Content-Type": contentType,
        },
    });

    axiosInstance.interceptors.request.use(
        async (config) => {
            if (token) {
                config.headers.Authorization = `Bearer ${token}`;
            }

            config.params = {
                ...config.params,
                _t: Date.now(), // Tránh cache
            };

            return config;
        },
        (error) => Promise.reject(error)
    );

    axiosInstance.interceptors.response.use(
        (response) => {
            console.log("API phản hồi:", response.data); // Kiểm tra phản hồi API
            return response.data; // Trả về dữ liệu API
        },
        (error) => {
            const duLieuLoi = {
                status: error.response?.status,
                message: error.response?.data?.message || error.message,
                data: error.response?.data,
                originalError: error,
            };

            console.error("Lỗi API:", duLieuLoi);
            return Promise.reject(duLieuLoi);
        }
    );

    return axiosInstance;
};

export default taoAxiosInstance;
