export interface IFundLogDto {
  id: string;
  user: string;
  fund: string;
  currency?: string;
  activity: string;
  transactionType?: string;
  amount?: number;
  details?: string;
  createdAt: string;
}

export interface IFundLogsFilter {
  since?: Date;
  until?: Date;
  fundTransactions?: string[];
  activities?: string[];
  amountOrCreateDate?: boolean;
  desc?: boolean;
  amountMin?: number;
  amountMax?: number;
  funds?: string[];
  users?: string[];
  currencies?: string[];
}
