import { api } from '@/services/axiosInterceptor';
import routeServices from '@/router/routeServices';
import { AxiosError, AxiosResponse } from 'axios';
import { IResponse } from '@/interfaces';
import { ICurrencyDto } from '@/interfaces/dto';

class Service {
  async list(includeFunds = false) {
    return await api
      .get(routeServices.currencies.list(includeFunds))
      .then((res: AxiosResponse<IResponse<ICurrencyDto[]>>) => res.data.response)
      .catch((err: AxiosError) => console.log(err));
  }

  async create(name: string) {
    return await api
      .post(routeServices.currencies.create, { name })
      .then((res: AxiosResponse<IResponse<ICurrencyDto>>) => res.data.response)
      .catch((err: AxiosError) => console.log(err));
  }

  async changeName(id: string, name: string) {
    return await api
      .put(routeServices.currencies.currency(id), { name })
      .then((res: AxiosResponse<IResponse<ICurrencyDto>>) => res.data.response)
      .catch((err: AxiosError) => console.log(err));
  }

  async delete(id: string) {
    await api
      .delete(routeServices.currencies.currency(id))
      .then((res: AxiosResponse<IResponse<ICurrencyDto>>) => res.data.response)
      .catch((err: AxiosError) => console.log(err));
  }

  async getInformalForeignExchange() {
    return await api
      .get(routeServices.currencies.informalForeignExchange)
      .then((res: AxiosResponse<IResponse<{}>>) => res.data.response)
      .catch((err: AxiosError) => console.log(err));
  }
}

export const currencyService = new Service();
