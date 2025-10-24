import {
  TransactionCurrency,
  TransactionGateway,
  TransactionStatus,
  TransactionType,
} from '@/containers/transactions/domain/enums/transaction';
import { z } from 'zod';

export const transactionSchema = z.object({
  id: z.string(),
  from: z.string(),
  to: z.string(),
  type: z.enum(TransactionType),
  gateway: z.enum(TransactionGateway),
  amount: z.number(),
  currency: z.enum(TransactionCurrency),
  status: z.enum(TransactionStatus),
  timestamp: z.string(),
});

export type Transaction = z.infer<typeof transactionSchema>;

export const listTransactionsParamsSchema = z.object({
  start: z.number().optional(),
  fetchSize: z.number(),
  transactionTypes: z.array(z.enum(TransactionType)).optional(),
  transactionGateways: z.array(z.enum(TransactionGateway)).optional(),
  transactionStatuses: z.array(z.enum(TransactionStatus)).optional(),
  transactionCurrencies: z.array(z.enum(TransactionCurrency)).optional(),
});

export type ListTransactionsParams = z.infer<
  typeof listTransactionsParamsSchema
>;

export const transactionApiResponseSchema = z.object({
  data: z.array(transactionSchema),
  meta: z.object({
    totalRowCount: z.number(),
    hasNextPage: z.boolean(),
  }),
  totalRowCount: z.number(),
});

export type TransactionApiResponse = z.infer<
  typeof transactionApiResponseSchema
>;

export const listTransactionsQueryResultSchema = z.object({
  list: z.array(transactionSchema),
  pagination: z.object({
    totalRowCount: z.number(),
    hasNextPage: z.boolean(),
    totalFetched: z.number(),
  }),
});

export type ListTransactionsQueryResult = z.infer<
  typeof listTransactionsQueryResultSchema
>;

export const deleteTransactionResponseSchema = z.object({
  success: z.boolean(),
  message: z.string(),
});

export type DeleteTransactionResponse = z.infer<
  typeof deleteTransactionResponseSchema
>;
