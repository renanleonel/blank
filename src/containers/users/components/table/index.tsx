import { VirtualizedTable } from '@/components/table';
import { DeleteUserDialog } from '@/containers/users/components/delete-user-dialog/index';
import { User } from '@/containers/users/domain/schemas/user';
import { useTableColumns } from '@/containers/users/hooks/use-table-columns';
import { useDeleteUser } from '@/containers/users/mutations/user-mutations';
import { useListUsers } from '@/containers/users/queries/user-queries';
import { keepPreviousData } from '@tanstack/react-query';
import { useState } from 'react';

const FETCH_SIZE = 50;

export function UsersTable() {
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [userToDelete, setUserToDelete] = useState<User | null>(null);

  const listUsersQuery = useListUsers({
    params: { fetchSize: FETCH_SIZE },
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
    <>
      <VirtualizedTable<User> columns={columns} query={listUsersQuery} />

      <DeleteUserDialog
        open={deleteDialogOpen}
        onOpenChange={setDeleteDialogOpen}
        onConfirm={handleConfirmDelete}
        isLoading={deleteUserMutation.isPending}
      />
    </>
  );
}
