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
import { useRouter, useSearch } from '@tanstack/react-router';
import { CircleCheck } from 'lucide-react';

export const TransactionStatusFilter = () => {
  const router = useRouter();
  const search = useSearch({ from: '/_app/table/' });

  const transactionStatuses = search.transactionStatuses ?? [];

  const onFilterChange = (transactionStatuses: TransactionStatus[]) => {
    router.navigate({
      to: '/table',
      replace: true,
      search: prev => ({
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
