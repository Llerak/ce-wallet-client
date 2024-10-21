import axios from 'axios';
import routeServices from '@/router/routeServices';

export const api = axios.create({ baseURL: process.env.VUE_APP_API });

api.interceptors.request.use(
  async (config) => {
    const token = sessionStorage.getItem('tk');
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
      const singInToken = sessionStorage.getItem('tk');
      const refreshToken = sessionStorage.getItem('rsh_tk');
      const response = await api.post(routeServices.auth.refresh, {
        signinToken: singInToken,
        refreshToken: refreshToken,
      });
      if (response.status === 200) {
        sessionStorage.setItem('tk', response.data.response.signinToken);
        sessionStorage.setItem('rsh_tk', response.data.response.refreshToken);
        originalRequest.headers.Authorization = `Bearer ${response.data.response.signinToken}`;
        return axios(originalRequest);
      }
    }
    return Promise.reject(error);
  }
);
