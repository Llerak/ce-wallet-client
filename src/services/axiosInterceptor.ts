import axios from 'axios';
import routeServices from '@/router/routeServices';

export const api = axios.create({
  baseURL: 'http://localhost:5000',
});

api.interceptors.request.use(
  async (config) => {
    const token = sessionStorage.getItem('Bearer');
    if (token && config.url !== routeServices.auth.login) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      const singinBearer = sessionStorage.getItem('Bearer');
      const refreshBearer = sessionStorage.getItem('RefreshBearer');
      const response = await axios.post('https://apidev.cewallet.org/auth/refresh', {
        signinToken: singinBearer,
        refreshToken: refreshBearer,
      });
      if (response.status === 200) {
        sessionStorage.setItem('Bearer', response.data.response.signinToken);
        sessionStorage.setItem('RefreshBearer', response.data.response.refreshToken);
        originalRequest.headers.Authorization = `Bearer ${response.data.response.signinToken}`;
        return axios(originalRequest);
      }
    }
    return Promise.reject(error);
  }
);
