import axios from 'axios';

const api = axios.create({
    baseURL: window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1' 
        ? 'http://localhost:5000' 
        : `http://${window.location.hostname}:5000`
});

api.interceptors.request.use((config) => {
    const token = localStorage.getItem('doctorToken') || localStorage.getItem('adminToken');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
}, (error) => {
    return Promise.reject(error);
});

api.interceptors.response.use(
    (response) => response,
    (error) => {
        console.error("API Error Details:", error.response?.data || error.message);
        return Promise.reject(error);
    }
);

export default api;
