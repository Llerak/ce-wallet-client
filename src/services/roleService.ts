import { api } from '@/services/axiosInterceptor';
import routeServices from '@/router/routeServices';
import { AxiosError, AxiosResponse } from 'axios';
import { IResponse } from '@/interfaces';
import { IRoleDto } from '@/interfaces/dto';

class Service {
  async list() {
    return await api
      .get(routeServices.roles.list)
      .then((res: AxiosResponse<IResponse<IRoleDto[]>>) => res.data.response)
      .catch((err: AxiosError) => {
        console.log(err.message);
        return undefined;
      });
  }

  async find(id: string) {
    return await api
      .get(routeServices.roles.find(id))
      .then((res: AxiosResponse<IResponse<IRoleDto>>) => res.data.response)
      .catch((err: AxiosError) => {
        console.log(err.message);
        return undefined;
      });
  }
}

export const roleService = new Service();
