import { FilterDropdown } from '@/components/filters/dropdown';
import { TransactionGateway } from '@/containers/transactions/domain/enums/transaction';
import { useRouter, useSearch } from '@tanstack/react-router';
import { CreditCard } from 'lucide-react';

const TRANSACTION_GATEWAYS = [
  {
    label: 'Paypal',
    value: TransactionGateway.PAYPAL,
  },
  {
    label: 'Stripe',
    value: TransactionGateway.STRIPE,
  },
  {
    label: 'Payment Gateway',
    value: TransactionGateway.PAYMENT_GATEWAY,
  },
];

export const TransactionGatewayFilter = () => {
  const router = useRouter();
  const search = useSearch({ from: '/_app/table/' });

  const transactionGateways = search.transactionGateways ?? [];

  const onFilterChange = (transactionGateways: TransactionGateway[]) => {
    router.navigate({
      to: '/table',
      replace: true,
      search: prev => ({
        ...prev,
        transactionGateways: transactionGateways.length
          ? transactionGateways
          : undefined,
      }),
    });
  };

  return (
    <FilterDropdown<TransactionGateway>
      items={TRANSACTION_GATEWAYS}
      icon={<CreditCard />}
      placeholder="Gateway"
      filteredItems={transactionGateways}
      onFilterChange={onFilterChange}
    />
  );
};
