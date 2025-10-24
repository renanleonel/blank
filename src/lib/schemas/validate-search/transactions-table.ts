import {
  TransactionGateway,
  TransactionStatus,
  TransactionType,
} from '@/containers/transactions/domain/enums/transaction';
import z from 'zod';

export const transactionsTableSearchSchema = z.object({
  transactionTypes: z.array(z.enum(TransactionType)).optional(),
  transactionGateways: z.array(z.enum(TransactionGateway)).optional(),
  transactionStatuses: z.array(z.enum(TransactionStatus)).optional(),
});
