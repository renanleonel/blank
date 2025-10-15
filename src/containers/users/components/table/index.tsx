import { VirtualizedTable } from '@/components/virtualized-table';
import { useTableColumns } from '@/containers/users/hooks/use-table-columns';
import { User } from '@/lib/types/user';

export function UsersTable() {
  const { columns } = useTableColumns({ isLoading: false });

  return <VirtualizedTable<User> columns={columns} />;
}
