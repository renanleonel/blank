import { FilterDropdown } from '@/components/filters/dropdown';
import { TransactionCurrency } from '@/containers/transactions/domain/enums/transaction';
import { transactionsTableSearchSchema } from '@/lib/schemas/validate-search/transactions-table';
import { useRouter, useSearch } from '@tanstack/react-router';
import { DollarSign } from 'lucide-react';
import { z } from 'zod';

const TRANSACTION_CURRENCIES: { label: string; value: TransactionCurrency }[] =
  [
    {
      label: 'USD',
      value: TransactionCurrency.USD,
    },
    {
      label: 'EUR',
      value: TransactionCurrency.EUR,
    },
    {
      label: 'BRL',
      value: TransactionCurrency.BRL,
    },
    {
      label: 'BTC',
      value: TransactionCurrency.BTC,
    },
    {
      label: 'ETH',
      value: TransactionCurrency.ETH,
    },
  ];

export const TransactionCurrencyFilter = () => {
  const router = useRouter();
  const search = useSearch({ from: '/_app/table/' });

  const transactionCurrencies = search.transactionCurrencies ?? [];

  const onFilterChange = (transactionCurrencies: TransactionCurrency[]) => {
    router.navigate({
      to: '/table',
      replace: true,
      search: (prev: z.infer<typeof transactionsTableSearchSchema>) => ({
        ...prev,
        transactionCurrencies: transactionCurrencies.length
          ? transactionCurrencies
          : undefined,
      }),
    });
  };

  return (
    <FilterDropdown<TransactionCurrency>
      items={TRANSACTION_CURRENCIES}
      icon={<DollarSign />}
      placeholder="Currency"
      filteredItems={transactionCurrencies}
      onFilterChange={onFilterChange}
    />
  );
};
