import { api } from '@/services';
import routeServices from '@/router/routeServices';
import { AxiosError, AxiosResponse } from 'axios';
import { IResponse } from '@/interfaces';
import {
  IFundDto,
  IFundFilter,
  ITransferDto,
  IFundInfo,
  ITransferInfoDto,
  ITransactionInfoDto,
} from '@/interfaces/dto';

class Service {
  async list(filter: IFundFilter) {
    return await api
      .post(routeServices.funds.list, filter)
      .then((res: AxiosResponse<IResponse<IFundDto[]>>) => res.data.response)
      .catch((err: AxiosError) => console.log(err.message));
  }

  async getFund(id: string) {
    return await api
      .get(routeServices.funds.fund(id))
      .then((res: AxiosResponse<IResponse<IFundDto>>) => res.data.response)
      .catch((err: AxiosError) => console.log(err.message));
  }

  async update(id: string, info: IFundInfo) {
    return await api
      .patch(routeServices.funds.fund(id), info)
      .then((res: AxiosResponse<IResponse<IFundDto>>) => res.data.response)
      .catch((err: AxiosError) => console.log(err.message));
  }

  async delete(id: string) {
    return await api
      .delete(routeServices.funds.fund(id))
      .then((res: AxiosResponse<IResponse<IFundDto>>) => res.data.response)
      .catch((err: AxiosError) => console.log(err.message));
  }

  async getFundByUser(id: string) {
    return await api
      .get(routeServices.funds.user(id))
      .then((res: AxiosResponse<IResponse<IFundDto>>) => res.data.response)
      .catch((err: AxiosError) => console.log(err.message));
  }

  async create(info: IFundInfo) {
    return await api
      .post(routeServices.funds.create, info)
      .then((res: AxiosResponse<IResponse<IFundDto>>) => res.data.response)
      .catch((err: AxiosError) => console.log(err.message));
  }

  async transfer(info: ITransferInfoDto) {
    return await api
      .post(routeServices.funds.transfer, info)
      .then((res: AxiosResponse<IResponse<ITransferDto>>) => res.data.response)
      .catch((err: AxiosError) => console.log(err.message));
  }

  async withdrawal(info: ITransactionInfoDto) {
    return await api
      .post(routeServices.funds.withdrawal, info)
      .then((res: AxiosResponse<IResponse<ITransferDto>>) => res.data.response)
      .catch((err: AxiosError) => console.log(err.message));
  }

  async deposit(info: ITransactionInfoDto) {
    return await api
      .post(routeServices.funds.deposit, info)
      .then((res: AxiosResponse<IResponse<ITransferDto>>) => res.data.response)
      .catch((err: AxiosError) => console.log(err.message));
  }

  async attachUser(fundId: string, userId: string) {
    return await api
      .patch(routeServices.funds.attachUser(fundId, userId))
      .then((res: AxiosResponse<IResponse<IFundDto>>) => res.data.response)
      .catch((err: AxiosError) => console.log(err.message));
  }
}

export const fundService = new Service();
