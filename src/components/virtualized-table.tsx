import { useListUsers } from '@/containers/users/queries/user-queries';
import { cn } from '@/lib/utils';
import { keepPreviousData } from '@tanstack/react-query';
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  OnChangeFn,
  Row,
  SortingState,
  useReactTable,
} from '@tanstack/react-table';
import { useVirtualizer } from '@tanstack/react-virtual';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

type VirtualizedTableProps<T> = {
  columns: ColumnDef<T, any>[]; // eslint-disable-line @typescript-eslint/no-explicit-any
  fetchSize?: number;
};

export function VirtualizedTable<T>({ columns, fetchSize = 50 }: VirtualizedTableProps<T>) {
  // Reference to the scrolling element
  const tableContainerRef = useRef<HTMLDivElement>(null);

  const [sorting, setSorting] = useState<SortingState>([]);

  // React Query infinite query for paginated data
  const listUsersQuery = useListUsers({
    params: { fetchSize, sorting },
    options: { placeholderData: keepPreviousData },
  });

  const { data, fetchNextPage, isFetching, isLoading } = listUsersQuery;

  // Extract data from the query result
  const flatData = useMemo(() => data?.list ?? [], [data]);
  const totalDBRowCount = data?.pagination?.totalRowCount ?? 0;
  const totalFetched = data?.pagination?.totalFetched ?? 0;

  // Called on scroll to fetch more data when user reaches bottom
  const fetchMoreOnBottomReached = useCallback(
    (containerRefElement?: HTMLDivElement | null) => {
      if (containerRefElement) {
        const { scrollHeight, scrollTop, clientHeight } = containerRefElement;
        // Once the user has scrolled within 500px of the bottom, fetch more data
        if (
          scrollHeight - scrollTop - clientHeight < 500 &&
          !isFetching &&
          totalFetched < totalDBRowCount
        ) {
          fetchNextPage();
        }
      }
    },
    [fetchNextPage, isFetching, totalFetched, totalDBRowCount]
  );

  // Check on mount and after fetch to see if table needs more data immediately
  useEffect(() => {
    fetchMoreOnBottomReached(tableContainerRef.current);
  }, [fetchMoreOnBottomReached]);

  const table = useReactTable<T>({
    data: flatData as T[],
    columns,
    state: {
      sorting,
    },
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    manualSorting: true,
    debugTable: true,
    columnResizeMode: 'onChange',
    enableColumnResizing: true,
    defaultColumn: {
      minSize: 50,
      size: 100,
      maxSize: 500,
    },
  });

  // Scroll to top of table when sorting changes
  const handleSortingChange: OnChangeFn<SortingState> = (updater) => {
    setSorting(updater);
    if (table.getRowModel().rows.length > 0) {
      rowVirtualizer.scrollToIndex?.(0);
    }
  };

  // Update table options
  table.setOptions((prev) => ({
    ...prev,
    onSortingChange: handleSortingChange,
  }));

  const { rows } = table.getRowModel();

  const rowVirtualizer = useVirtualizer({
    count: rows.length,
    estimateSize: () => 50, // Estimate row height for accurate scrollbar
    getScrollElement: () => tableContainerRef.current,
    // Measure dynamic row height, except in Firefox
    measureElement:
      typeof window !== 'undefined' && navigator.userAgent.indexOf('Firefox') === -1
        ? (element) => element?.getBoundingClientRect().height
        : undefined,
    overscan: 5,
  });

  if (isLoading) {
    return (
      <div className='flex items-center justify-center h-96'>
        <div className='text-gray-500'>Loading...</div>
      </div>
    );
  }

  return (
    <div className='rounded-lg border border-gray-200 h-full flex flex-col'>
      {/* Fixed Header */}
      <div className='bg-gray-50 border-b border-gray-200'>
        <table className='w-full' style={{ display: 'grid', width: '100%' }}>
          <thead style={{ display: 'grid', width: '100%' }}>
            {table.getHeaderGroups().map((headerGroup) => (
              <tr
                key={headerGroup.id}
                style={{ display: 'flex', width: '100%' }}
                className='bg-gray-50'>
                {headerGroup.headers.map((header, index) => (
                  <th
                    key={header.id}
                    className={`py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider ${
                      index === headerGroup.headers.length - 1 ? 'px-0' : 'px-4'
                    }`}
                    style={{
                      display: 'flex',
                      width: `${(header.getSize() / table.getTotalSize()) * 100}%`,
                      minWidth: header.column.columnDef.minSize,
                      maxWidth: header.column.columnDef.maxSize,
                    }}>
                    <div
                      className={
                        header.column.getCanSort()
                          ? 'cursor-pointer select-none hover:text-gray-700'
                          : ''
                      }
                      onClick={header.column.getToggleSortingHandler()}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(header.column.columnDef.header, header.getContext())}
                      {{
                        asc: ' 🔼',
                        desc: ' 🔽',
                      }[header.column.getIsSorted() as string] ?? null}
                    </div>
                  </th>
                ))}
              </tr>
            ))}
          </thead>
        </table>
      </div>

      {/* Scrollable Body Container */}
      <div
        className='flex-1 overflow-auto'
        onScroll={(e) => fetchMoreOnBottomReached(e.currentTarget)}
        ref={tableContainerRef}
        style={{
          height: '600px', // Fixed height for virtualization
        }}>
        <table className='w-full' style={{ display: 'grid', width: '100%' }}>
          {/* Virtualized Body */}
          <tbody
            style={{
              display: 'grid',
              height: `${rowVirtualizer.getTotalSize()}px`,
              position: 'relative',
              width: '100%',
            }}>
            {rowVirtualizer.getVirtualItems().map((virtualRow) => {
              const row = rows[virtualRow.index] as Row<T>;
              return (
                <tr
                  data-index={virtualRow.index}
                  ref={(node) => rowVirtualizer.measureElement(node)}
                  key={row.id}
                  className='hover:bg-gray-50'
                  style={{
                    display: 'flex',
                    position: 'absolute',
                    transform: `translateY(${virtualRow.start}px)`,
                    width: '100%',
                  }}>
                  {row.getVisibleCells().map((cell, cellIndex) => (
                    <td
                      key={cell.id}
                      className={`py-4 whitespace-nowrap text-sm text-gray-900 ${
                        cellIndex === row.getVisibleCells().length - 1 ? 'px-0' : 'px-4'
                      }`}
                      style={{
                        display: 'flex',
                        width: `${(cell.column.getSize() / table.getTotalSize()) * 100}%`,
                        minWidth: cell.column.columnDef.minSize,
                        maxWidth: cell.column.columnDef.maxSize,
                      }}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div
        className={cn(
          'flex w-full items-center gap-2 px-4 py-2 text-xs text-gray-500 bg-gray-50 border-t',
          !isFetching ? 'justify-end' : 'justify-between'
        )}>
        {isFetching && <span>Fetching more data...</span>}

        <span>
          {flatData.length} of {totalDBRowCount} rows
        </span>
      </div>
    </div>
  );
}
