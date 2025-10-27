import { Badge, badgeVariants } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { ClipboardButton } from '@/containers/transactions/components/clipboard-button';
import {
  TRANSACTION_GATEWAY_ICONS,
  TRANSACTION_STATUS_ICONS,
  TRANSACTION_TYPE_ICONS,
} from '@/containers/transactions/components/icons';
import { TransactionStatus } from '@/containers/transactions/domain/enums/transaction';
import { Transaction } from '@/containers/transactions/domain/schemas/transaction';
import { createColumnHelper } from '@tanstack/react-table';
import { VariantProps } from 'class-variance-authority';

const columnHelper = createColumnHelper<Transaction>();

const COLUMN_LABELS: Record<string, string> = {
  FROM: 'From',
  TO: 'To',
  TYPE: 'Type',
  GATEWAY: 'Gateway',
  AMOUNT: 'Amount',
  CURRENCY: 'Currency',
  STATUS: 'Status',
  TIMESTAMP: 'Timestamp',
};

type HookProps = {
  isLoading: boolean;
};

const STATUS_BADGE_VARIANTS: Record<
  TransactionStatus,
  VariantProps<typeof badgeVariants>['variant']
> = {
  [TransactionStatus.PENDING]: 'yellow',
  [TransactionStatus.COMPLETED]: 'green',
  [TransactionStatus.FAILED]: 'red',
  [TransactionStatus.CANCELLED]: 'orange',
};

const STATUS_BADGE_LABELS: Record<TransactionStatus, string> = {
  [TransactionStatus.PENDING]: 'Pending',
  [TransactionStatus.COMPLETED]: 'Completed',
  [TransactionStatus.FAILED]: 'Failed',
  [TransactionStatus.CANCELLED]: 'Cancelled',
};

export function useTableColumns({ isLoading }: HookProps) {
  const columns = [
    columnHelper.accessor('timestamp', {
      header: COLUMN_LABELS.TIMESTAMP,
      size: 1,
      minSize: 50,
      cell: info => {
        if (isLoading) return <Skeleton />;

        const value = info.getValue();

        const formattedValue = new Date(value).toLocaleString('en-US', {
          day: '2-digit',
          month: '2-digit',
          year: 'numeric',
          hour: '2-digit',
          minute: '2-digit',
        });

        return (
          <div className="flex items-center justify-between gap-2 min-w-0 w-full">
            <span className="truncate flex-1">{formattedValue}</span>
            <ClipboardButton value={value.toString()} />
          </div>
        );
      },
    }),
    columnHelper.accessor('type', {
      header: COLUMN_LABELS.TYPE,
      size: 1,
      minSize: 50,
      cell: info => {
        if (isLoading) return <Skeleton />;

        const value = info.getValue();

        return (
          <div className="flex items-center gap-1 min-w-0">
            <span>{TRANSACTION_TYPE_ICONS[value]}</span>
            <span className="truncate">{value}</span>
          </div>
        );
      },
    }),
    columnHelper.accessor('gateway', {
      header: COLUMN_LABELS.GATEWAY,
      size: 1.2,
      minSize: 50,
      cell: info => {
        if (isLoading) return <Skeleton />;

        const value = info.getValue();

        return (
          <div className="flex items-center gap-1 min-w-0">
            <span>{TRANSACTION_GATEWAY_ICONS[value]}</span>
            <span className="truncate">{value}</span>
          </div>
        );
      },
    }),
    columnHelper.accessor('currency', {
      header: COLUMN_LABELS.CURRENCY,
      size: 1.2,
      minSize: 50,
      cell: info => {
        if (isLoading) return <Skeleton />;
        return <span className="truncate block">{info.getValue()}</span>;
      },
    }),
    columnHelper.accessor('amount', {
      header: COLUMN_LABELS.AMOUNT,
      size: 1.2,
      minSize: 50,
      cell: info => {
        if (isLoading) return <Skeleton />;

        const amountInCents = info.getValue();
        const currency = info.row.original.currency;

        const amountInDollars = amountInCents / 100;

        const formattedAmount = new Intl.NumberFormat('en-US', {
          style: 'currency',
          currency: currency,
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        }).format(amountInDollars);

        return (
          <div className="flex items-center justify-between gap-2 min-w-0 w-full">
            <span className="truncate flex-1">{formattedAmount}</span>
            <ClipboardButton value={formattedAmount} />
          </div>
        );
      },
    }),
    columnHelper.accessor('from', {
      header: COLUMN_LABELS.FROM,
      size: 1,
      minSize: 50,
      cell: info => {
        if (isLoading) return <Skeleton />;
        return <span className="truncate block">{info.getValue()}</span>;
      },
    }),
    columnHelper.accessor('to', {
      header: COLUMN_LABELS.TO,
      size: 2,
      minSize: 50,
      cell: info => {
        if (isLoading) return <Skeleton />;
        return <span className="truncate block">{info.getValue()}</span>;
      },
    }),
    columnHelper.accessor('status', {
      header: COLUMN_LABELS.STATUS,
      size: 0.8,
      minSize: 50,
      cell: info => {
        if (isLoading) return <Skeleton />;

        const value = info.getValue();

        return (
          <Badge variant={STATUS_BADGE_VARIANTS[value]} className="truncate">
            {TRANSACTION_STATUS_ICONS[value]}
            <span className="truncate">{STATUS_BADGE_LABELS[value]}</span>
          </Badge>
        );
      },
    }),
  ];

  return { columns };
}
