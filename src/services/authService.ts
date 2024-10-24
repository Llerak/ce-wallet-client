import routeServices from '@/router/routeServices';
import { roleAndUserGlobal } from '@/store/RolesAndPermission';
import { status } from '@/store/global';
import { IResponse, IUserLogin } from '@/interfaces';
import { api } from '@/services';
import { AxiosError, AxiosResponse } from 'axios';
import { IRegisterUserDto, IUserDto } from '@/interfaces/dto';

class AuthService {
  async login(user: IUserLogin) {
    status.isApiLoading = true;
    let response: AxiosResponse;
    try {
      response = await api.post(routeServices.auth.login, {
        username: user.name,
        password: user.password,
      });
    } catch (error) {
      console.error('Error during login:', error);
      status.isApiLoading = false;
      throw error;
    }
    status.isApiLoading = false;

    if (response.data) {
      const data = response.data.response;
      roleAndUserGlobal.name = user.name;
      roleAndUserGlobal.role = data.role;
      sessionStorage.setItem('tk', data.signinToken);
      sessionStorage.setItem('rsh_tk', data.refreshToken);
      sessionStorage.setItem('Name', user.name);
    }
    return response.data;
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

  async register(info: IRegisterUserDto) {
    return await api
      .post(routeServices.auth.register, info)
      .then((res: AxiosResponse<IResponse<IUserDto>>) => res.data.response)
      .catch((err: AxiosError) => {
        console.log(err.message, err);
        throw err.message;
      });
  }
}
export const authService = new AuthService();
