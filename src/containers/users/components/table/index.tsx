import { FilterToolbar } from '@/components/filters/toolbar';
import { VirtualizedTable } from '@/components/table';
import { DeleteUserDialog } from '@/containers/users/components/delete-user-dialog/index';
import { User } from '@/containers/users/domain/schemas/user';
import { useTableColumns } from '@/containers/users/hooks/use-table-columns';
import { useDeleteUser } from '@/containers/users/mutations/user-mutations';
import { useListUsers } from '@/containers/users/queries/user-queries';
import { usersTableSearchSchema } from '@/lib/schemas/validate-search/users-table';
import { keepPreviousData } from '@tanstack/react-query';
import { useSearch } from '@tanstack/react-router';
import { useMemo, useState } from 'react';

const FETCH_SIZE = 50;

export function UsersTable() {
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [userToDelete, setUserToDelete] = useState<User | null>(null);

  const filters = useSearch({ from: '/_app/table/' });

  const validFilters = useMemo(
    () => usersTableSearchSchema.parse(filters),
    [filters]
  );

  const listUsersQuery = useListUsers({
    params: { fetchSize: FETCH_SIZE, ...validFilters },
    options: { placeholderData: keepPreviousData },
  });

  const deleteUserMutation = useDeleteUser({
    options: {
      onSuccess: () => {
        setDeleteDialogOpen(false);
        setUserToDelete(null);
      },
    },
  });

  const handleDeleteUser = (user: User) => {
    setUserToDelete(user);
    setDeleteDialogOpen(true);
  };

  const handleConfirmDelete = () => {
    if (!userToDelete) return;

    deleteUserMutation.mutateAsync(userToDelete.id);
  };

  const { columns } = useTableColumns({
    isLoading: listUsersQuery.isLoading,
    onDeleteUser: handleDeleteUser,
  });

  return (
    <div className="flex flex-col gap-8 h-full w-full">
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl font-medium">Users</h1>
        <p className="text-sm text-gray-500">
          Manage your users and their access to the platform.
        </p>
      </div>
      <FilterToolbar />

      <div className="min-h-0 h-full">
        <VirtualizedTable<User> columns={columns} query={listUsersQuery} />
      </div>

      <DeleteUserDialog
        open={deleteDialogOpen}
        onConfirm={handleConfirmDelete}
        onOpenChange={setDeleteDialogOpen}
        isLoading={deleteUserMutation.isPending}
      />
    </div>
  );
}
