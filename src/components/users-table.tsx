import { Skeleton } from '@/components/ui/skeleton';
import { User } from '@/lib/data/users';
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { MoreVertical } from 'lucide-react';

interface UsersTableProps {
  data: User[];
  isLoading: boolean;
}

const columnHelper = createColumnHelper<User>();

const StatusBadge = ({ status, isLoading }: { status: User['status']; isLoading?: boolean }) => {
  if (isLoading) return <Skeleton />;

  const baseClasses = 'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium';

  const statusClasses = {
    suspended: 'bg-red-100 text-red-800',
    active: 'bg-green-100 text-green-800',
    inactive: 'bg-yellow-100 text-yellow-800',
  };

  return <span className={`${baseClasses} ${statusClasses[status]}`}>{status}</span>;
};

export function UsersTable({ data, isLoading }: UsersTableProps) {
  const columns = [
    columnHelper.accessor('team', {
      header: 'Team',
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
        return <StatusBadge status={info.getValue()} isLoading={isLoading} />;
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
        if (isLoading) {
          return <Skeleton />;
        }
        return (
          <div className='flex items-center justify-between'>
            <span>{info.getValue()}</span>
            <MoreVertical className='h-4 w-4 text-gray-400' />
          </div>
        );
      },
    }),
  ];

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className='overflow-hidden rounded-lg border border-gray-200 h-full'>
      <table className='min-w-full divide-y divide-gray-200'>
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th
                  key={header.id}
                  className='px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                  {header.isPlaceholder
                    ? null
                    : flexRender(header.column.columnDef.header, header.getContext())}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody className='bg-white divide-y divide-gray-200'>
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id} className='hover:bg-gray-50'>
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id} className='p-4 whitespace-nowrap text-sm text-gray-900'>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
