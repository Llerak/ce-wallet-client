import { api } from '@/services';
import routeServices from '@/router/routeServices';
import { AxiosError, AxiosResponse } from 'axios';
import { IResponse } from '@/interfaces';
import { IFundDto, IFundFilter, IFundInfo, ITransactionInfoDto, ITransferDto, ITransferInfoDto } from '@/interfaces/dto';
import { IPagination } from '@/interfaces/IPagination';

class Service {
  async list(filter?: IFundFilter) {
    return await api
      .post(routeServices.funds.list, filter)
      .then((res: AxiosResponse<IResponse<IPagination<IFundDto>>>) => res.data.response)
      .catch((err: AxiosError) => {
        console.log(err.message);
        return undefined;
      });
  }

  async getFund(id: string) {
    return await api
      .get(routeServices.funds.fund(id))
      .then((res: AxiosResponse<IResponse<IFundDto>>) => res.data.response)
      .catch((err: AxiosError) => {
        console.log(err.message);
        return undefined;
      });
  }

  async update(id: string, info: IFundInfo) {
    return await api
      .patch(routeServices.funds.fund(id), info)
      .then((res: AxiosResponse<IResponse<IFundDto>>) => res.data.response)
      .catch((err: AxiosError) => {
        console.log(err.message);
        return undefined;
      });
  }

  async delete(id: string) {
    return await api
      .delete(routeServices.funds.fund(id))
      .then((res: AxiosResponse<IResponse<IFundDto>>) => res.data.response)
      .catch((err: AxiosError) => {
        console.log(err.message);
        return undefined;
      });
  }

  async getFundByUser(id: string) {
    return await api
      .get(routeServices.funds.user(id))
      .then((res: AxiosResponse<IResponse<IFundDto>>) => res.data.response)
      .catch((err: AxiosError) => {
        console.log(err.message);
        return undefined;
      });
  }

  async create(info: IFundInfo) {
    return await api
      .post(routeServices.funds.create, info)
      .then((res: AxiosResponse<IResponse<IFundDto>>) => res.data.response)
      .catch((err: AxiosError) => {
        console.log(err.message);
        return undefined;
      });
  }

  async transfer(info: ITransferInfoDto) {
    return await api
      .post(routeServices.funds.transfer, info)
      .then((res: AxiosResponse<IResponse<ITransferDto>>) => res.data.response)
      .catch((err: AxiosError) => {
        console.log(err.message);
        return undefined;
      });
  }

  async withdrawal(info: ITransactionInfoDto) {
    return await api
      .post(routeServices.funds.withdrawal, info)
      .then((res: AxiosResponse<IResponse<ITransferDto>>) => res.data.response)
      .catch((err: AxiosError) => {
        console.log(err.message);
        return undefined;
      });
  }

  async deposit(info: ITransactionInfoDto) {
    return await api
      .post(routeServices.funds.deposit, info)
      .then((res: AxiosResponse<IResponse<ITransferDto>>) => res.data.response)
      .catch((err: AxiosError) => {
        console.log(err.message);
        return undefined;
      });
  }

  async attachUser(fundId: string, userId: string) {
    return await api
      .patch(routeServices.funds.attachUser(fundId, userId))
      .then((res: AxiosResponse<IResponse<IFundDto>>) => res.data.response)
      .catch((err: AxiosError) => {
        console.log(err.message);
        return undefined;
      });
  }
}

export const fundService = new Service();
