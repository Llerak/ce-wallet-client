import { api } from '@/services';
import routeServices from '@/router/routeServices';
import { AxiosError, AxiosResponse } from 'axios';
import { IPagination, IResponse } from '@/interfaces';
import { IFundDto, IFundFilter, IFundInfo, ITransactionInfoDto, ITransferDto, ITransferInfoDto } from '@/interfaces/dto';

class Service {
  async list(filter?: IFundFilter, page = 0, size = 10) {
    return await api
      .post(routeServices.funds.list(page, size), filter)
      .then((res: AxiosResponse<IResponse<IPagination<IFundDto>>>) => res.data.response)
      .catch((err: AxiosError) => {
        console.log(err.message, err);
        throw err.message;
      });
  }

  async getFund(id: string) {
    return await api
      .get(routeServices.funds.fund(id))
      .then((res: AxiosResponse<IResponse<IFundDto>>) => res.data.response)
      .catch((err: AxiosError) => {
        console.log(err.message, err);
        throw err.message;
      });
  }

  async update(id: string, info: IFundInfo) {
    return await api
      .patch(routeServices.funds.fund(id), info)
      .then((res: AxiosResponse<IResponse<IFundDto>>) => res.data.response)
      .catch((err: AxiosError) => {
        console.log(err.message, err);
        throw err.message;
      });
  }

  async delete(id: string) {
    return await api
      .delete(routeServices.funds.fund(id))
      .then((res: AxiosResponse<IResponse<IFundDto>>) => res.data.response)
      .catch((err: AxiosError) => {
        console.log(err.message, err);
        throw err.message;
      });
  }

  async getFundByUser(id: string) {
    return await api
      .get(routeServices.funds.user(id))
      .then((res: AxiosResponse<IResponse<IFundDto>>) => res.data.response)
      .catch((err: AxiosError) => {
        console.log(err.message, err);
        throw err.message;
      });
  }

  async create(info: IFundInfo) {
    return await api
      .post(routeServices.funds.create, info)
      .then((res: AxiosResponse<IResponse<IFundDto>>) => res.data.response)
      .catch((err: AxiosError) => {
        console.log(err.message, err);
        throw err.message;
      });
  }

  async transfer(info: ITransferInfoDto) {
    return await api
      .post(routeServices.funds.transfer, info)
      .then((res: AxiosResponse<IResponse<ITransferDto>>) => res.data.response)
      .catch((err: AxiosError) => {
        console.log(err.message, err);
        throw err.message;
      });
  }

  async withdrawal(info: ITransactionInfoDto) {
    return await api
      .post(routeServices.funds.withdrawal, info)
      .then((res: AxiosResponse<IResponse<ITransferDto>>) => res.data.response)
      .catch((err: AxiosError) => {
        console.log(err.message, err);
        throw err.message;
      });
  }

  async deposit(info: ITransactionInfoDto) {
    return await api
      .post(routeServices.funds.deposit, info)
      .then((res: AxiosResponse<IResponse<ITransferDto>>) => res.data.response)
      .catch((err: AxiosError) => {
        console.log(err.message, err);
        throw err.message;
      });
  }

  async attachUser(fundId: string, userId: string) {
    return await api
      .patch(routeServices.funds.attachUser(fundId, userId))
      .then((res: AxiosResponse<IResponse<IFundDto>>) => res.data.response)
      .catch((err: AxiosError) => {
        console.log(err.message, err);
        throw err.message;
      });
  }
}

export const fundService = new Service();
