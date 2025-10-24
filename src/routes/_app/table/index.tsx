import { TransactionsTable } from '@/containers/transactions/components/table';
import { transactionsTableSearchSchema } from '@/lib/schemas/validate-search/transactions-table';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/_app/table/')({
  component: () => <TransactionsTable />,
  validateSearch: transactionsTableSearchSchema,
});
