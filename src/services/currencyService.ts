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
      .catch((err: AxiosError) => {
        console.log(err.message, err);
        throw err.message;
      });
  }

  async create(name: string) {
    return await api
      .post(routeServices.currencies.create, { name })
      .then((res: AxiosResponse<IResponse<ICurrencyDto>>) => res.data.response)
      .catch((err: AxiosError) => {
        console.log(err.message, err);
        throw err.message;
      });
  }

  async changeName(id: string, name: string) {
    return await api
      .put(routeServices.currencies.currency(id), { name })
      .then((res: AxiosResponse<IResponse<ICurrencyDto>>) => res.data.response)
      .catch((err: AxiosError) => {
        console.log(err.message, err);
        throw err.message;
      });
  }

  async delete(id: string) {
    await api
      .delete(routeServices.currencies.currency(id))
      .then((res: AxiosResponse<IResponse<ICurrencyDto>>) => res.data.response)
      .catch((err: AxiosError) => {
        console.log(err.message, err);
        throw err.message;
      });
  }

  async getInformalForeignExchange() {
    return await api
      .get(routeServices.currencies.informalForeignExchange)
      .then((res: AxiosResponse<IResponse<{ [key: string]: number }>>) => res.data.response)
      .catch((err: AxiosError) => {
        console.log(err.message, err);
        throw err.message;
      });
  }
}

export const currencyService = new Service();
