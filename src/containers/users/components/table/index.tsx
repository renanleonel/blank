import { Table } from '@/components/table';
import { useTableColumns } from '@/containers/users/hooks/use-table-columns';
import { users } from '@/lib/data/mocks';
import { User } from '@/lib/types/user';

export function UsersTable() {
  // fetch users from API

  const data = users;
  const { columns } = useTableColumns({ isLoading: false });

  return <Table<User> data={data} columns={columns} />;
}
