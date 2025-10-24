import { TransactionCurrencyFilter } from '@/components/filters/presets/transaction-currency';
import { TransactionGatewayFilter } from '@/components/filters/presets/transaction-gateway';
import { TransactionStatusFilter } from '@/components/filters/presets/transaction-statuses';
import { TransactionTypeFilter } from '@/components/filters/presets/transaction-type';
import { Button } from '@/components/ui/button';
import { transactionsTableSearchSchema } from '@/lib/schemas/validate-search/transactions-table';
import { useRouter, useSearch } from '@tanstack/react-router';
import { useMemo } from 'react';

export const FilterToolbar = () => {
  const router = useRouter();
  const filters = useSearch({ from: '/_app/table/' });

  const validFilters = useMemo(
    () => transactionsTableSearchSchema.parse(filters),
    [filters]
  );
  const hasFilters = useMemo(
    () => Object.keys(validFilters).length > 0,
    [validFilters]
  );

  const clearAllFilters = () => {
    if (!hasFilters) return;

    router.navigate({
      to: '/table',
      replace: true,
      search: {},
    });
  };

  return (
    <div className="flex items-center gap-2 justify-between">
      <div className="flex items-center gap-2">
        <TransactionTypeFilter />
        <TransactionGatewayFilter />
        <TransactionCurrencyFilter />
        <TransactionStatusFilter />
      </div>

      {hasFilters && (
        <Button
          variant="outline"
          onClick={clearAllFilters}
          className="cursor-pointer"
        >
          Clear All
        </Button>
      )}
    </div>
  );
};
