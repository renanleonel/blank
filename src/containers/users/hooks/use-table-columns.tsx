import { TableActions } from '@/components/table/table-actions';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { UserStatus } from '@/containers/users/domain/enums/user-status';
import { User } from '@/containers/users/domain/schemas/user';
import { createColumnHelper } from '@tanstack/react-table';
import { CircleAlert, CircleCheck, CircleX } from 'lucide-react';

const columnHelper = createColumnHelper<User>();

const COLUMN_KEYS: Record<string, keyof User> = {
  TEAM: 'team',
  ORGANIZATION: 'organization',
  ACCOUNT_TYPE: 'accountType',
  STATUS: 'status',
  PHONE: 'phone',
  TIMEZONE: 'timezone',
  CREATED_AT: 'createdAt',
  UPDATED_AT: 'updatedAt',
};

const COLUMN_LABELS: Record<string, string> = {
  TEAM: 'Team',
  ORGANIZATION: 'Organization',
  ACCOUNT_TYPE: 'Account type',
  STATUS: 'Status',
  PHONE: 'Phone',
  TIMEZONE: 'Timezone',
  CREATED_AT: 'Created at',
  UPDATED_AT: 'Updated at',
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
    columnHelper.accessor(COLUMN_KEYS.ORGANIZATION, {
      header: COLUMN_LABELS.ORGANIZATION,
      size: 2,
      minSize: 150,
      cell: info => {
        return isLoading ? <Skeleton /> : info.getValue();
      },
    }),
    columnHelper.accessor(COLUMN_KEYS.ACCOUNT_TYPE, {
      header: COLUMN_LABELS.ACCOUNT_TYPE,
      size: 1,
      minSize: 120,
      cell: info => {
        return isLoading ? <Skeleton /> : info.getValue();
      },
    }),
    columnHelper.accessor(COLUMN_KEYS.STATUS, {
      header: COLUMN_LABELS.STATUS,
      size: 0.8,
      minSize: 100,
      cell: info => {
        if (isLoading) return <Skeleton />;
        if (info.getValue() === UserStatus.ACTIVE)
          return (
            <Badge variant="green">
              <CircleCheck className="size-3" />
              <span>Active</span>
            </Badge>
          );
        if (info.getValue() === UserStatus.INACTIVE)
          return (
            <Badge variant="red">
              <CircleX className="size-3" />
              <span>Inactive</span>
            </Badge>
          );
        if (info.getValue() === UserStatus.SUSPENDED)
          return (
            <Badge variant="yellow">
              <CircleAlert className="size-3" />
              <span>Suspended</span>
            </Badge>
          );

        return info.getValue();
      },
    }),
    columnHelper.accessor(COLUMN_KEYS.PHONE, {
      header: COLUMN_LABELS.PHONE,
      size: 1.2,
      minSize: 130,
      cell: info => {
        return isLoading ? <Skeleton /> : info.getValue();
      },
    }),
    columnHelper.accessor(COLUMN_KEYS.TIMEZONE, {
      header: COLUMN_LABELS.TIMEZONE,
      size: 1.2,
      minSize: 130,
      cell: info => {
        return isLoading ? <Skeleton /> : info.getValue();
      },
    }),
    columnHelper.accessor(COLUMN_KEYS.CREATED_AT, {
      header: COLUMN_LABELS.CREATED_AT,
      size: 1,
      minSize: 100,
      cell: info => {
        return isLoading ? <Skeleton /> : info.getValue();
      },
    }),
    columnHelper.accessor(COLUMN_KEYS.UPDATED_AT, {
      header: COLUMN_LABELS.UPDATED_AT,
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
