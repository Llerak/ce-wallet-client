import routeServices from '@/router/routeServices';
import { roleAndUserGlobal } from '@/store/RolesAndPermission';
import { statusApi } from '@/store/global';
import { IUserLogin } from '@/interfaces';
import { api } from '@/services';

class AuthService {
  async login(user: IUserLogin) {
    statusApi.isLoading = true;
    try {
      const response = await api.post(routeServices.auth.login, {
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
      const response = await api.get(routeServices.auth.validate);
      return response.data;
    } catch (error) {
      console.error('Error during validation:', error);
      throw error;
    }
  }
}
export const authService = new AuthService();
