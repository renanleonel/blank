import { FilterToolbar } from '@/components/filters/toolbar';
import { VirtualizedTable } from '@/components/table';
import { Transaction } from '@/containers/transactions/domain/schemas/transaction';
import { useTableColumns } from '@/containers/transactions/hooks/use-table-columns';
import { useListTransactions } from '@/containers/transactions/queries/transaction-queries';
import { transactionsTableSearchSchema } from '@/lib/schemas/validate-search/transactions-table';
import { keepPreviousData } from '@tanstack/react-query';
import { useSearch } from '@tanstack/react-router';
import { useMemo } from 'react';

const FETCH_SIZE = 50;

export function TransactionsTable() {
  const filters = useSearch({ from: '/_app/table/' });

  const validFilters = useMemo(
    () => transactionsTableSearchSchema.parse(filters),
    [filters]
  );

  const listTransactionsQuery = useListTransactions({
    params: { fetchSize: FETCH_SIZE, ...validFilters },
    options: { placeholderData: keepPreviousData },
  });

  const { columns } = useTableColumns({
    isLoading: listTransactionsQuery.isLoading,
  });

  return (
    <div className="flex flex-col gap-8 h-full w-full">
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl font-medium">Transactions</h1>
        <p className="text-sm text-gray-500">
          Manage your transactions and their status.
        </p>
      </div>
      <FilterToolbar />

      <div className="min-h-0 h-full">
        <VirtualizedTable<Transaction>
          columns={columns}
          query={listTransactionsQuery}
        />
      </div>
    </div>
  );
}
