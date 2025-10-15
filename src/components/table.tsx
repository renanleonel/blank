import { ColumnDef, flexRender, getCoreRowModel, useReactTable } from '@tanstack/react-table';

type TableProps<T> = {
  data: T[];
  columns: ColumnDef<T, any>[]; // eslint-disable-line @typescript-eslint/no-explicit-any
};

export function Table<T>({ data, columns }: TableProps<T>) {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className='rounded-lg border border-gray-200 h-full flex flex-col'>
      <div className='bg-gray-50 border-b border-gray-200'>
        <table className='min-w-full'>
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
        </table>
      </div>

      <div className='flex-1 overflow-auto'>
        <table className='min-w-full divide-y divide-gray-200'>
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
    </div>
  );
}
