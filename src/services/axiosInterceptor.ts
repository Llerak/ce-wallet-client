import axios from 'axios';
import { routeServices } from '../router/routeServices';

const instance = axios.create({
  baseURL: 'https://apidev.cewallet.org',
});

instance.interceptors.request.use(
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

export default instance;
