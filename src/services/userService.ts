import routeServices from '@/router/routeServices';
import { api } from '@/services/axiosInterceptor';
import { AxiosError, AxiosResponse } from 'axios';
import { IResponse } from '@/interfaces';
import { IRegisterUserDto, IResetPasswordDto, IUserDto } from '@/interfaces/dto';

class Service {
  async list() {
    return await api
      .get(routeServices.users.root)
      .then((res: AxiosResponse<IResponse<IUserDto>>) => res.data.response)
      .catch((err: AxiosError) => {
        console.log(err.message, err);
        throw err.message;
      });
  }
  async find(id?: string, name?: string, email?: string) {
    return await api
      .get(routeServices.users.find(id, name, email))
      .then((res: AxiosResponse<IResponse<IUserDto>>) => res.data.response)
      .catch((err: AxiosError) => {
        console.log(err.message, err);
        throw err.message;
      });
  }
  async update(info: IRegisterUserDto) {
    return await api
      .put(routeServices.users.root, info)
      .then((res: AxiosResponse<IResponse<IUserDto>>) => res.data.response)
      .catch((err: AxiosError) => {
        console.log(err.message, err);
        throw err.message;
      });
  }

  async resetPassword(info: IResetPasswordDto) {
    return await api
      .patch(routeServices.users.resetPassword, info)
      .then((res: AxiosResponse<IResponse<IUserDto>>) => res.data.response)
      .catch((err: AxiosError) => {
        console.log(err.message, err);
        throw err.message;
      });
  }

  async delete(id: string) {
    return await api
      .delete(routeServices.users.delete(id))
      .then((res: AxiosResponse<IResponse<IUserDto>>) => res.data.response)
      .catch((err: AxiosError) => {
        console.log(err.message, err);
        throw err.message;
      });
  }
}

export const userService = new Service();
