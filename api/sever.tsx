import axios from 'axios';

/**
 * Tạo một instance Axios đã được cấu hình với các interceptor cho các yêu cầu API nhất quán
 * @param {string} token - Token xác thực (tùy chọn)
 * @param {string} contentType - Tiêu đề loại nội dung (mặc định là 'application/json')
 * @param {number} timeout - Thời gian chờ yêu cầu tính bằng mili giây (mặc định là 10000)
 * @returns {AxiosInstance} Instance Axios đã được cấu hình
 */
const taoAxiosInstance = (token = '', contentType = 'application/json', timeout = 10000) => {
    // Tạo instance cơ bản với cấu hình chung
    const axiosInstance = axios.create({
        baseURL: process.env.REACT_APP_API_BASE_URL || 'https://my-express-app-13ot.onrender.com/',
        timeout: timeout,
        headers: {
            'Accept': 'application/json',
            'Content-Type': contentType
        }
    });

    // Interceptor yêu cầu cho xác thực và các tiêu đề khác
    axiosInstance.interceptors.request.use(
        async (config) => {
            // Chỉ thêm tiêu đề Authorization nếu token được cung cấp
            if (token) {
                config.headers.Authorization = `Bearer ${token}`;
            }
            
            // Thêm dấu thời gian để tránh vấn đề lưu trữ cache
            config.params = {
                ...config.params,
                _t: Date.now()
            };
            
            return config;
        },
        error => Promise.reject(error)
    );

    // Interceptor phản hồi để xử lý lỗi và trích xuất dữ liệu
    axiosInstance.interceptors.response.use(
        response => response.data,
        error => {
            // Xử lý lỗi nâng cao
            const duLieuLoi = {
                status: error.response?.status,
                message: error.response?.data?.message || error.message,
                data: error.response?.data,
                originalError: error
            };
            
            // Ghi nhật ký lỗi để gỡ lỗi (có thể được kiểm soát bằng biến môi trường)
            if (process.env.NODE_ENV === 'development') {
                console.error('Yêu cầu API thất bại:', duLieuLoi);
            }
            
            return Promise.reject(duLieuLoi);
        }
    );

    return axiosInstance;
};

export default taoAxiosInstance;