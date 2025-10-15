import { fetchUsers, UserApiResponse } from '@/lib/data/api';
import { User } from '@/lib/types/user';
import type { UseInfiniteQueryOptions } from '@tanstack/react-query';
import { useInfiniteQuery } from '@tanstack/react-query';
import type { AxiosError } from 'axios';

export type ListUsersParams = {
  fetchSize?: number;
  sorting?: Array<{ id: string; desc: boolean }>;
};

export type ListUsersQueryResult = {
  list: User[];
  pagination: {
    totalRowCount: number;
    hasNextPage: boolean;
    totalFetched: number;
  };
};

type ListUsersProps = {
  params: ListUsersParams;
  options?: Omit<
    UseInfiniteQueryOptions<UserApiResponse, AxiosError, ListUsersQueryResult>,
    'queryKey' | 'queryFn' | 'getNextPageParam' | 'initialPageParam'
  >;
};

function useListUsers({ params, options }: ListUsersProps) {
  const { fetchSize = 50, sorting = [] } = params;
  const queryKey = ['users', sorting];

  const query = useInfiniteQuery<UserApiResponse, AxiosError, ListUsersQueryResult>({
    queryKey,
    queryFn: async ({ pageParam = 0 }) => {
      const start = (pageParam as number) * fetchSize;

      const response = await fetchUsers(start, fetchSize);

      return response;
    },
    initialPageParam: 0,
    getNextPageParam: (_lastGroup, groups) => groups.length,
    select: (data) => {
      const list = data.pages.flatMap((page) => page.data);
      const lastPage = data.pages[data.pages.length - 1];

      return {
        list,
        pagination: {
          totalFetched: list.length,
          totalRowCount: lastPage?.meta?.totalRowCount ?? 0,
          hasNextPage: lastPage?.meta?.hasNextPage ?? false,
        },
      };
    },
    retry: 2,
    refetchOnWindowFocus: false,
    staleTime: 1000 * 60 * 5, // 5 minutes
    ...options,
  });

  return query;
}

export { useListUsers };
