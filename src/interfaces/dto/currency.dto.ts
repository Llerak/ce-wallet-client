import { IFundDto } from '@/interfaces/dto/fund.dto';

/* Responses */

export interface ICurrencyDto {
  id: string;
  currency: string;
  totalBalance: number;
  funds: IFundDto[] | null;
}

/* Requests */
