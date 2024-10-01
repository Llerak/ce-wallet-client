import axiosInstance from './axiosInterceptor';
import IUserLogin from '@/interfaces/IUserLogin';
import { routeServices } from './routeServices';
import { roleAndUserGlobal } from '@/store/RolesAndPermission';

const API_URL = 'https://apidev.cewallet.org/auth/';

class AuthService {
  async login(user: IUserLogin) {
    try {
      const response = await axiosInstance.post(API_URL + 'login', {
        username: user.name,
        password: user.password,
      });
      if (response.data) {
        const data = response.data.data;
        roleAndUserGlobal.name = data.name;
        roleAndUserGlobal.role = data.role;
        sessionStorage.setItem('Bearer', data.token);
      }
      return response.data;
    } catch (error) {
      console.error('Error during login:', error);
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
