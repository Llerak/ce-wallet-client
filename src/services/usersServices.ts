import axiosInstance from './axiosInterceptor';
import IUserLogin from '@/interfaces/IUserLogin';
import { routeServices } from '../router/routeServices';
import { roleAndUserGlobal } from '@/store/RolesAndPermission';
import { statusApi } from '@/store/global';

const API_URL = 'https://apidev.cewallet.org/auth/';

class AuthService {
  async login(user: IUserLogin) {
    statusApi.isLoading = true;
    try {
      const response = await axiosInstance.post(API_URL + 'login', {
        username: user.name,
        password: user.password,
      });
      if (response.data) {
        const data = response.data.response;
        roleAndUserGlobal.name = user.name;
        roleAndUserGlobal.role = data.role;
        sessionStorage.setItem('Bearer', data.signinToken);
        sessionStorage.setItem('RefreshBearer', data.refreshToken);
        sessionStorage.setItem('Name', user.name);
      }
      statusApi.isLoading = false;
      return response.data;
    } catch (error) {
      console.error('Error during login:', error);
      statusApi.isLoading = false;
      throw error;
    }
  }

  logout() {
    sessionStorage.clear();
  }

  async validationToken() {
    try {
      const response = await axiosInstance.get(routeServices.auth.auth);
      return response.data;
    } catch (error) {
      console.error('Error during validation:', error);
      throw error;
    }
  }
}

export default new AuthService();
