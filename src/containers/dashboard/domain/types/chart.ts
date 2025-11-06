import { TransactionCurrency } from '@/containers/transactions/domain/enums/transaction';

export type RevenueByCurrency = {
  [K in TransactionCurrency]: number;
};

export type ChartDataPoint = {
  date: string;
} & RevenueByCurrency;

export type RevenueByDateAndCurrency = Record<string, ChartDataPoint>;
