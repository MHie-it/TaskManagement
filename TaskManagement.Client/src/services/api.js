import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:7126/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      const errorMessage = error.response.data?.message || error.message || 'Có lỗi xảy ra!';
      const enhancedError = new Error(errorMessage);
      enhancedError.response = error.response;
      enhancedError.status = error.response.status;
      return Promise.reject(enhancedError);
    } else if (error.request) {
      return Promise.reject(new Error('Không thể kết nối đến server!'));
    } else {
      return Promise.reject(new Error(error.message || 'Có lỗi xảy ra!'));
    }
  }
);

export default api;