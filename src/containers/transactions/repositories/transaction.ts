import {
  ListTransactionsParams,
  TransactionApiResponse,
  transactionApiResponseSchema,
} from '@/containers/transactions/domain/schemas/transaction';
import { listTransactions } from '@/containers/transactions/requests/list-transactions';

export class TransactionRepository {
  public static async listTransactions(
    params: ListTransactionsParams
  ): Promise<TransactionApiResponse> {
    const response = await listTransactions(params);

    const parsedResponse = transactionApiResponseSchema.parse(response);

    return parsedResponse;
  }
}
