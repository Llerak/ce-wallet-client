/*
 * Responses
 * */

export interface IFundDto {
  id: string;
  name: string;
  createAt: string;
  locationUrl: string | null;
  address: string | null;
  details: string | null;
  currencies:
    | {
        currency: string;
        amount: number;
      }[]
    | null;
  user: {
    id: string;
    username: string;
    role: string;
    createAt: string;
  } | null;
}

export interface ITransferDto {
  source: IFundDto;
  destination: IFundDto;
}

/*
 * Requests
 * */

export interface IFundFilter {
  fundNames?: string[];
  usernames?: string[];
  currencies?: string[];
  descending?: boolean;
  orderBy?: 'funds' | 'usernames' | 'create_at';
}

export interface IFundInfo {
  name: string;
  locationUrl?: string;
  address?: string;
  details?: string;
}

export interface ITransactionInfoDto {
  source: string;
  currency: string;
  amount: number;
  details?: string | null;
}

export interface ITransferInfoDto extends ITransactionInfoDto {
  destination: string;
}
