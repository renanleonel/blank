import { generateRandomTransaction } from '@/containers/transactions/domain/mocks';
import {
  ListTransactionsParams,
  Transaction,
  TransactionApiResponse,
} from '@/containers/transactions/domain/schemas/transaction';

const deletedTransactionIds = new Set<string>();

export const TOTAL_TRANSACTIONS = 200;

export const listTransactions = async (
  params: ListTransactionsParams
): Promise<TransactionApiResponse> => {
  await new Promise(resolve => setTimeout(resolve, 500));

  const transactions: Transaction[] = [];
  let currentIndex = params.start ?? 0;
  let fetchedCount = 0;

  while (fetchedCount < params.fetchSize && currentIndex < TOTAL_TRANSACTIONS) {
    const transactionId = (currentIndex + 1).toString();

    if (!deletedTransactionIds.has(transactionId)) {
      transactions.push(generateRandomTransaction(currentIndex + 1));
      fetchedCount++;
    }

    currentIndex++;
  }

  const filteredTransactions = transactions.filter(transaction => {
    if (
      params?.transactionTypes &&
      !params?.transactionTypes?.includes(transaction.type)
    ) {
      return false;
    }
    if (
      params?.transactionGateways &&
      !params?.transactionGateways?.includes(transaction.gateway)
    ) {
      return false;
    }
    if (
      params?.transactionStatuses &&
      !params?.transactionStatuses?.includes(transaction.status)
    ) {
      return false;
    }
    if (
      params?.transactionCurrencies &&
      !params?.transactionCurrencies?.includes(transaction.currency)
    ) {
      return false;
    }

    return true;
  });

  const totalRowCount = TOTAL_TRANSACTIONS - deletedTransactionIds.size;
  const hasNextPage = currentIndex < TOTAL_TRANSACTIONS;

  return {
    data: filteredTransactions,
    meta: {
      totalRowCount,
      hasNextPage,
    },
    totalRowCount,
  };
};

export const markTransactionAsDeleted = (transactionId: string) => {
  deletedTransactionIds.add(transactionId);
};
