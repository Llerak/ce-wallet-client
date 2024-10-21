import routeServices from '@/router/routeServices';
import { api } from '@/services/axiosInterceptor';
import { AxiosError, AxiosResponse } from 'axios';
import { IPagination, IResponse } from '@/interfaces';
import { IEditUserDto, IResetPasswordDto, IUserDto } from '@/interfaces/dto';

class Service {
  async list(keywords: string[] | undefined, page = 0, size = 10, role = false) {
    return await api
      .post(routeServices.users.list(page, size, role), keywords)
      .then((res: AxiosResponse<IResponse<IPagination<IUserDto>>>) => res.data.response)
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
  async update(info: IEditUserDto) {
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
