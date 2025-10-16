import {
  ListUsersParams,
  ListUsersQueryResult,
  listUsersQueryResultSchema,
  UserApiResponse,
} from '@/containers/users/domain/schemas/user';
import { UserRepository } from '@/containers/users/repositories/user';
import type { UseInfiniteQueryOptions } from '@tanstack/react-query';
import { useInfiniteQuery } from '@tanstack/react-query';
import type { AxiosError } from 'axios';

type ListUsersProps = {
  params: ListUsersParams;
  options?: Omit<
    UseInfiniteQueryOptions<UserApiResponse, AxiosError, ListUsersQueryResult>,
    'queryKey' | 'queryFn' | 'getNextPageParam' | 'initialPageParam'
  >;
};

export const LIST_USERS_QUERY_KEY = 'list-infinite-users';

function useListUsers({ params, options }: ListUsersProps) {
  const queryKey = [LIST_USERS_QUERY_KEY, params];

  const query = useInfiniteQuery<UserApiResponse, AxiosError, ListUsersQueryResult>({
    queryKey,
    queryFn: async ({ pageParam = 0 }) => {
      const { fetchSize = 50 } = params;

      const start = (pageParam as number) * fetchSize;

      const response = await UserRepository.listUsers({ start, fetchSize });

      return response;
    },
    initialPageParam: 0,
    getNextPageParam: (_lastGroup, groups) => groups.length,
    select: (data) => {
      const list = data.pages.flatMap((page) => page.data);
      const lastPage = data.pages[data.pages.length - 1];

      const formattedResponse = {
        list,
        pagination: {
          totalFetched: list.length,
          totalRowCount: lastPage?.meta?.totalRowCount ?? 0,
          hasNextPage: lastPage?.meta?.hasNextPage ?? false,
        },
      };

      const parsedResponse = listUsersQueryResultSchema.parse(formattedResponse);

      return parsedResponse;
    },
    retry: 2,
    refetchOnWindowFocus: false,
    staleTime: 1000 * 60 * 5, // 5 minutes
    ...options,
  });

  return query;
}

export { useListUsers };
