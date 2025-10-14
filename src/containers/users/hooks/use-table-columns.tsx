import { Skeleton } from '@/components/ui/skeleton';
import { User } from '@/lib/types/user';
import { createColumnHelper } from '@tanstack/react-table';
import { MoreVertical } from 'lucide-react';

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
};

export function useTableColumns({ isLoading }: HookProps) {
  const columns = [
    columnHelper.accessor(COLUMN_KEYS.TEAM, {
      header: COLUMN_LABELS.TEAM,
      cell: (info) => {
        return isLoading ? <Skeleton /> : info.getValue();
      },
    }),
    columnHelper.accessor('organization', {
      header: 'Organization',
      cell: (info) => {
        return isLoading ? <Skeleton /> : info.getValue();
      },
    }),
    columnHelper.accessor('accountType', {
      header: 'Account type',
      cell: (info) => {
        return isLoading ? <Skeleton /> : info.getValue();
      },
    }),
    columnHelper.accessor('status', {
      header: 'Status',
      cell: (info) => {
        return isLoading ? <Skeleton /> : info.getValue();
      },
    }),
    columnHelper.accessor('phone', {
      header: 'Phone',
      cell: (info) => {
        return isLoading ? <Skeleton /> : info.getValue();
      },
    }),
    columnHelper.accessor('timezone', {
      header: 'Timezone',
      cell: (info) => {
        return isLoading ? <Skeleton /> : info.getValue();
      },
    }),
    columnHelper.accessor('createdAt', {
      header: 'Created at',
      cell: (info) => {
        return isLoading ? <Skeleton /> : info.getValue();
      },
    }),
    columnHelper.accessor('updatedAt', {
      header: 'Updated at',
      cell: (info) => {
        return isLoading ? (
          <Skeleton />
        ) : (
          <div className='flex items-center justify-between'>
            <span>{info.getValue()}</span>
            <MoreVertical className='h-4 w-4 text-gray-400' />
          </div>
        );
      },
    }),
  ];

  return { columns };
}
