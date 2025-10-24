import {
  ListTransactionsParams,
  ListTransactionsQueryResult,
  TransactionApiResponse,
  listTransactionsQueryResultSchema,
} from '@/containers/transactions/domain/schemas/transaction';
import { TransactionRepository } from '@/containers/transactions/repositories/transaction';
import type { UseInfiniteQueryOptions } from '@tanstack/react-query';
import { useInfiniteQuery } from '@tanstack/react-query';
import type { AxiosError } from 'axios';

type ListTransactionsProps = {
  params: ListTransactionsParams;
  options?: Omit<
    UseInfiniteQueryOptions<
      TransactionApiResponse,
      AxiosError,
      ListTransactionsQueryResult
    >,
    'queryKey' | 'queryFn' | 'getNextPageParam' | 'initialPageParam'
  >;
};

export const LIST_TRANSACTIONS_QUERY_KEY = 'list-infinite-transactions';

function useListTransactions({ params, options }: ListTransactionsProps) {
  const queryKey = [LIST_TRANSACTIONS_QUERY_KEY, params];

  const query = useInfiniteQuery<
    TransactionApiResponse,
    AxiosError,
    ListTransactionsQueryResult
  >({
    queryKey,
    queryFn: async ({ pageParam = 0 }) => {
      const { fetchSize = 50, ...rest } = params;

      const start = (pageParam as number) * fetchSize;

      const response = await TransactionRepository.listTransactions({
        start,
        fetchSize,
        ...rest,
      });

      return response;
    },
    initialPageParam: 0,
    getNextPageParam: (_lastGroup, groups) => groups.length,
    select: data => {
      const list = data.pages.flatMap(page => page.data);
      const lastPage = data.pages[data.pages.length - 1];

      const formattedResponse = {
        list,
        pagination: {
          totalFetched: list.length,
          totalRowCount: lastPage?.meta?.totalRowCount ?? 0,
          hasNextPage: lastPage?.meta?.hasNextPage ?? false,
        },
      };

      const parsedResponse =
        listTransactionsQueryResultSchema.parse(formattedResponse);

      return parsedResponse;
    },
    retry: 2,
    refetchOnWindowFocus: false,
    staleTime: 1000 * 60 * 5, // 5 minutes
    ...options,
  });

  return query;
}

export { useListTransactions };
