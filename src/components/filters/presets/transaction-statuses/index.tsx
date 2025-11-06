const TRANSACTION_STATUSES = [
  {
    label: 'Active',
    value: TransactionStatus.PENDING,
  },
  {
    label: 'Inactive',
    value: TransactionStatus.COMPLETED,
  },
  {
    label: 'Suspended',
    value: TransactionStatus.FAILED,
  },
  {
    label: 'Cancelled',
    value: TransactionStatus.CANCELLED,
  },
];

import { FilterDropdown } from '@/components/filters/dropdown';
import { TransactionStatus } from '@/containers/transactions/domain/enums/transaction';
import { transactionsTableSearchSchema } from '@/lib/schemas/validate-search/transactions-table';
import { useRouter, useSearch } from '@tanstack/react-router';
import { CircleCheck } from 'lucide-react';
import { z } from 'zod';

export const TransactionStatusFilter = () => {
  const router = useRouter();
  const search = useSearch({ from: '/_app/table/' });

  const transactionStatuses = search.transactionStatuses ?? [];

  const onFilterChange = (transactionStatuses: TransactionStatus[]) => {
    router.navigate({
      to: '/table',
      replace: true,
      search: (prev: z.infer<typeof transactionsTableSearchSchema>) => ({
        ...prev,
        transactionStatuses: transactionStatuses.length
          ? transactionStatuses
          : undefined,
      }),
    });
  };

  return (
    <FilterDropdown<TransactionStatus>
      items={TRANSACTION_STATUSES}
      icon={<CircleCheck />}
      placeholder="Status"
      filteredItems={transactionStatuses}
      onFilterChange={onFilterChange}
    />
  );
};
