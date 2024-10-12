import { api } from '@/services/axiosInterceptor';
import routeServices from '@/router/routeServices';
import { AxiosError, AxiosResponse } from 'axios';
import { IPagination, IResponse } from '@/interfaces';
import { IFundLogDto, IFundLogsFilter } from '@/interfaces/dto';

class Service {
  async list(filter?: IFundLogsFilter, page = 0, size = 10) {
    return await api
      .post(routeServices.logs(page, size), filter)
      .then((res: AxiosResponse<IResponse<IPagination<IFundLogDto>>>) => res.data.response)
      .catch((err: AxiosError) => {
        console.log(err.message);
        return undefined;
      });
  }
}

export const fundLogsService = new Service();
