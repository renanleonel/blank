import { TableActions } from '@/components/table/table-actions';
import { Skeleton } from '@/components/ui/skeleton';
import { User } from '@/containers/users/domain/schemas/user';
import { createColumnHelper } from '@tanstack/react-table';

const columnHelper = createColumnHelper<User>();

const COLUMN_KEYS: Record<string, keyof User> = {
  TEAM: 'team',
  ORGANIZATION: 'organization',
  ACCOUNT_TYPE: 'accountType',
  STATUS: 'status',
  PHONE: 'phone',
};

const COLUMN_LABELS: Record<string, string> = {
  TEAM: 'Team',
  ORGANIZATION: 'Organization',
  ACCOUNT_TYPE: 'Account type',
  STATUS: 'Status',
  PHONE: 'Phone',
};

type HookProps = {
  isLoading: boolean;
  onDeleteUser: (user: User) => void;
};

export function useTableColumns({ isLoading, onDeleteUser }: HookProps) {
  const columns = [
    columnHelper.accessor(COLUMN_KEYS.TEAM, {
      header: COLUMN_LABELS.TEAM,
      size: 1,
      minSize: 100,
      cell: info => {
        return isLoading ? <Skeleton /> : info.getValue();
      },
    }),
    columnHelper.accessor('organization', {
      header: 'Organization',
      size: 2,
      minSize: 150,
      cell: info => {
        return isLoading ? <Skeleton /> : info.getValue();
      },
    }),
    columnHelper.accessor('accountType', {
      header: 'Account type',
      size: 1,
      minSize: 100,
      cell: info => {
        return isLoading ? <Skeleton /> : info.getValue();
      },
    }),
    columnHelper.accessor('status', {
      header: 'Status',
      size: 0.8,
      minSize: 80,
      cell: info => {
        return isLoading ? <Skeleton /> : info.getValue();
      },
    }),
    columnHelper.accessor('phone', {
      header: 'Phone',
      size: 1.2,
      minSize: 120,
      cell: info => {
        return isLoading ? <Skeleton /> : info.getValue();
      },
    }),
    columnHelper.accessor('timezone', {
      header: 'Timezone',
      size: 1.2,
      minSize: 120,
      cell: info => {
        return isLoading ? <Skeleton /> : info.getValue();
      },
    }),
    columnHelper.accessor('createdAt', {
      header: 'Created at',
      size: 1,
      minSize: 100,
      cell: info => {
        return isLoading ? <Skeleton /> : info.getValue();
      },
    }),
    columnHelper.accessor('updatedAt', {
      header: 'Updated at',
      size: 1,
      minSize: 100,
      cell: info => {
        return isLoading ? <Skeleton /> : info.getValue();
      },
    }),
    columnHelper.display({
      id: 'actions',
      header: '',
      size: 0.3,
      minSize: 20,
      maxSize: 20,
      cell: ({ row }) => {
        return isLoading ? (
          <Skeleton className="h-4 w-4" />
        ) : (
          <div className="flex justify-end">
            <TableActions
              actions={[
                {
                  label: 'Delete',
                  onClick: () => onDeleteUser(row.original),
                },
              ]}
            />
          </div>
        );
      },
    }),
  ];

  return { columns };
}
