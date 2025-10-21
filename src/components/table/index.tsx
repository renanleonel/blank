import { SkeletonTable } from "@/components/table/skeleton-table";
import { cn } from "@/lib/utils";
import { UseInfiniteQueryResult } from "@tanstack/react-query";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  Row,
  useReactTable,
} from "@tanstack/react-table";
import { useVirtualizer } from "@tanstack/react-virtual";
import { useCallback, useEffect, useRef } from "react";

type TablePagination = {
  totalRowCount: number;
  hasNextPage: boolean;
  totalFetched: number;
};

export type TableData<T> = {
  list: T[];
  pagination: TablePagination;
};

type VirtualizedTableProps<T> = {
  columns: ColumnDef<T, any>[]; // eslint-disable-line @typescript-eslint/no-explicit-any
  query: UseInfiniteQueryResult<TableData<T>>;
};

export function VirtualizedTable<T>({
  query,
  columns,
}: VirtualizedTableProps<T>) {
  const tableContainerRef = useRef<HTMLDivElement>(null);

  const { data, fetchNextPage, isFetching, isLoading } = query;

  const flatData = data?.list ?? [];
  const totalFetched = data?.pagination.totalFetched ?? 0;
  const totalRowCount = data?.pagination.totalRowCount ?? 0;

  const fetchMoreOnBottomReached = useCallback(
    (containerRefElement?: HTMLDivElement | null) => {
      if (containerRefElement) {
        const { scrollHeight, scrollTop, clientHeight } = containerRefElement;

        if (
          scrollHeight - scrollTop - clientHeight < 500 &&
          !isFetching &&
          totalFetched < totalRowCount
        ) {
          fetchNextPage();
        }
      }
    },
    [fetchNextPage, isFetching, totalFetched, totalRowCount],
  );

  const table = useReactTable<T>({
    data: flatData as T[],
    columns,
    getCoreRowModel: getCoreRowModel(),
    debugTable: true,
    columnResizeMode: "onChange",
    enableColumnResizing: true,
    defaultColumn: {
      size: 100,
      minSize: 50,
      maxSize: 500,
    },
  });

  const { rows } = table.getRowModel();

  const rowVirtualizer = useVirtualizer({
    count: rows.length,
    estimateSize: () => 50,
    getScrollElement: () => tableContainerRef.current,
    measureElement:
      typeof window !== "undefined" &&
      navigator.userAgent.indexOf("Firefox") === -1
        ? (element) => element?.getBoundingClientRect().height
        : undefined,
    overscan: 50,
  });

  useEffect(
    () => fetchMoreOnBottomReached(tableContainerRef.current),
    [fetchMoreOnBottomReached],
  );

  if (isLoading) return <SkeletonTable<T> table={table} />;

  return (
    <div className="rounded-lg border border-gray-200 h-full flex flex-col w-full">
      <div className="bg-gray-50 border-b border-gray-200">
        <table className="w-full grid">
          <thead className="grid w-full">
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id} className="flex w-full bg-gray-50">
                {headerGroup.headers.map((header, index) => (
                  <th
                    key={header.id}
                    className={cn(
                      "py-2 flex text-left text-xs font-medium text-gray-500 uppercase tracking-wider",
                      index === headerGroup.headers.length - 1
                        ? "px-0"
                        : "px-4",
                    )}
                    style={{
                      minWidth: header.column.columnDef.minSize,
                      maxWidth: header.column.columnDef.maxSize,
                      width: `${(header.getSize() / table.getTotalSize()) * 100}%`,
                    }}
                  >
                    <div>
                      {flexRender(
                        header.column.columnDef.header,
                        header.getContext(),
                      )}
                    </div>
                  </th>
                ))}
              </tr>
            ))}
          </thead>
        </table>
      </div>

      <div
        className="flex-1 overflow-auto h-[600px]"
        onScroll={(e) => fetchMoreOnBottomReached(e.currentTarget)}
        ref={tableContainerRef}
      >
        <table className="w-full grid">
          <tbody
            className="grid relative w-full"
            style={{ height: `${rowVirtualizer.getTotalSize()}px` }}
          >
            {rowVirtualizer.getVirtualItems().map((virtualRow) => {
              const row = rows[virtualRow.index] as Row<T>;

              return (
                <tr
                  data-index={virtualRow.index}
                  ref={(node) => rowVirtualizer.measureElement(node)}
                  key={row.id}
                  className="hover:bg-gray-50 flex absolute w-full"
                  style={{ transform: `translateY(${virtualRow.start}px)` }}
                >
                  {row.getVisibleCells().map((cell, cellIndex) => (
                    <td
                      key={cell.id}
                      className={cn(
                        "py-4 flex whitespace-nowrap text-sm text-gray-900",
                        cellIndex === row.getVisibleCells().length - 1
                          ? "px-0"
                          : "px-4",
                      )}
                      style={{
                        minWidth: cell.column.columnDef.minSize,
                        maxWidth: cell.column.columnDef.maxSize,
                        width: `${(cell.column.getSize() / table.getTotalSize()) * 100}%`,
                      }}
                    >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
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
          "flex w-full items-center gap-2 px-4 py-2 text-xs text-gray-500 bg-gray-50 border-t",
          !isFetching ? "justify-end" : "justify-between",
        )}
      >
        {isFetching && <span>Fetching more data...</span>}

        <span>
          {flatData.length} of {totalRowCount} rows
        </span>
      </div>
    </div>
  );
}
