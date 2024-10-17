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

export interface IFundLogTableInput {
  id: string;
  user: string;
  fund: string;
  action: string;
  transaction: string;
  currency: string;
  amount: number;
  date: string;
}

export enum TransactionType {
  Deposit = 'Depósito',
  Withdrawal = 'Egreso',
  Transfer = 'Transferencia',
  CreateFund = 'Creación de un Fondo',
  DeleteFund = 'Eliminación de un Fondo',
  DeleteCurrency = 'Eliminación de una Moneda',
}

export enum ActionType {
  Deposit = 'Depósito',
  Withdrawal = 'Egreso',
}
