import { cn } from '@/lib/utils';
import { flexRender, Table } from '@tanstack/react-table';

type SkeletonTableProps<T> = {
  table: Table<T>;
};

export function SkeletonTable<T>({ table }: SkeletonTableProps<T>) {
  return (
    <div className='rounded-lg border border-gray-200 h-full flex flex-col w-full'>
      <div className='bg-gray-50 border-b border-gray-200'>
        <table className='w-full grid'>
          <thead className='grid w-full'>
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id} className='flex w-full bg-gray-50'>
                {headerGroup.headers.map((header, index) => (
                  <th
                    key={header.id}
                    className={cn(
                      'py-2 flex text-left text-xs font-medium text-gray-500 uppercase tracking-wider',
                      index === headerGroup.headers.length - 1 ? 'px-0' : 'px-4'
                    )}
                    style={{
                      minWidth: header.column.columnDef.minSize,
                      maxWidth: header.column.columnDef.maxSize,
                      width: `${(header.getSize() / table.getTotalSize()) * 100}%`,
                    }}>
                    <div>{flexRender(header.column.columnDef.header, header.getContext())}</div>
                  </th>
                ))}
              </tr>
            ))}
          </thead>
        </table>
      </div>

      <div className='flex-1 overflow-hidden h-[600px]'>
        <table className='w-full grid'>
          <tbody className='grid w-full'>
            {Array.from({ length: 50 }).map((_, index) => (
              <tr key={index} className='flex w-full hover:bg-gray-50'>
                {table.getAllColumns().map((column, cellIndex) => (
                  <td
                    key={column.id}
                    className={cn(
                      'py-5 flex whitespace-nowrap text-sm text-gray-900',
                      cellIndex === table.getAllColumns().length - 1 ? 'px-0' : 'px-4'
                    )}
                    style={{
                      minWidth: column.columnDef.minSize,
                      maxWidth: column.columnDef.maxSize,
                      width: `${(column.getSize() / table.getTotalSize()) * 100}%`,
                    }}>
                    <div className='w-full'>
                      <div className='h-4 bg-gray-200 rounded animate-pulse' />
                    </div>
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className='flex w-full items-center gap-2 px-4 py-2 text-xs text-gray-500 bg-gray-50 border-t justify-end'>
        <span>Loading...</span>
      </div>
    </div>
  );
}
