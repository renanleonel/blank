const TRANSACTION_TYPES = [
  {
    label: 'Deposit',
    value: TransactionType.DEPOSIT,
  },
  {
    label: 'Withdrawal',
    value: TransactionType.WITHDRAWAL,
  },
  {
    label: 'Transfer',
    value: TransactionType.TRANSFER,
  },
];

import { FilterDropdown } from '@/components/filters/dropdown';
import { TransactionType } from '@/containers/transactions/domain/enums/transaction';
import { useRouter, useSearch } from '@tanstack/react-router';
import { Building2 } from 'lucide-react';

export const TransactionTypeFilter = () => {
  const router = useRouter();
  const search = useSearch({ from: '/_app/table/' });

  const transactionTypes = search.transactionTypes ?? [];

  const onFilterChange = (transactionTypes: TransactionType[]) => {
    router.navigate({
      to: '/table',
      replace: true,
      search: prev => ({
        ...prev,
        transactionTypes: transactionTypes.length
          ? transactionTypes
          : undefined,
      }),
    });
  };
  return (
    <FilterDropdown<TransactionType>
      items={TRANSACTION_TYPES}
      icon={<Building2 />}
      placeholder="Type"
      filteredItems={transactionTypes}
      onFilterChange={onFilterChange}
    />
  );
};
