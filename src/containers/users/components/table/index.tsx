import { VirtualizedTable } from '@/components/virtualized-table';
import { useTableColumns } from '@/containers/users/hooks/use-table-columns';
import { useListUsers } from '@/containers/users/queries/user-queries';
import { User } from '@/lib/types/user';
import { keepPreviousData } from '@tanstack/react-query';

const FETCH_SIZE = 50;

export function UsersTable() {
  const listUsersQuery = useListUsers({
    params: { fetchSize: FETCH_SIZE },
    options: { placeholderData: keepPreviousData },
  });

  const { columns } = useTableColumns({ isLoading: listUsersQuery.isLoading });

  return <VirtualizedTable<User> columns={columns} query={listUsersQuery} />;
}
