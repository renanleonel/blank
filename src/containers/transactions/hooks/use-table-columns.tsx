import { Badge, badgeVariants } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { ClipboardButton } from '@/containers/transactions/components/clipboard-button';
import {
  TRANSACTION_GATEWAY_ICONS,
  TRANSACTION_STATUS_ICONS,
  TRANSACTION_TYPE_ICONS,
} from '@/containers/transactions/components/icons';
import {
  TransactionGateway,
  TransactionStatus,
  TransactionType,
} from '@/containers/transactions/domain/enums/transaction';
import { Transaction } from '@/containers/transactions/domain/schemas/transaction';
import { createColumnHelper } from '@tanstack/react-table';
import { VariantProps } from 'class-variance-authority';

const columnHelper = createColumnHelper<Transaction>();

const COLUMN_KEYS: Record<string, keyof Transaction> = {
  FROM: 'from',
  TO: 'to',
  TYPE: 'type',
  GATEWAY: 'gateway',
  AMOUNT: 'amount',
  CURRENCY: 'currency',
  STATUS: 'status',
  TIMESTAMP: 'timestamp',
};

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
    columnHelper.accessor(COLUMN_KEYS.TIMESTAMP, {
      header: COLUMN_LABELS.TIMESTAMP,
      size: 1,
      minSize: 150,
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
          <div className="flex items-center justify-between">
            <span>{formattedValue}</span>
            <ClipboardButton value={value.toString()} />
          </div>
        );
      },
    }),
    columnHelper.accessor(COLUMN_KEYS.TYPE, {
      header: COLUMN_LABELS.TYPE,
      size: 1,
      minSize: 120,
      cell: info => {
        if (isLoading) return <Skeleton />;

        const value = info.getValue() as TransactionType;

        return (
          <div className="flex items-center gap-1">
            <span>{TRANSACTION_TYPE_ICONS[value]}</span>
            <span>{value}</span>
          </div>
        );
      },
    }),
    columnHelper.accessor(COLUMN_KEYS.GATEWAY, {
      header: COLUMN_LABELS.GATEWAY,
      size: 1.2,
      minSize: 130,
      cell: info => {
        if (isLoading) return <Skeleton />;

        const value = info.getValue() as TransactionGateway;

        return (
          <div className="flex items-center gap-1">
            <span>{TRANSACTION_GATEWAY_ICONS[value]}</span>
            <span>{value}</span>
          </div>
        );
      },
    }),
    columnHelper.accessor(COLUMN_KEYS.CURRENCY, {
      header: COLUMN_LABELS.CURRENCY,
      size: 1.2,
      minSize: 130,
      cell: info => {
        return isLoading ? <Skeleton /> : info.getValue();
      },
    }),
    columnHelper.accessor(COLUMN_KEYS.AMOUNT, {
      header: COLUMN_LABELS.AMOUNT,
      size: 1.2,
      minSize: 130,
      cell: info => {
        if (isLoading) return <Skeleton />;

        const value = info.getValue();

        return (
          <div className="flex items-center justify-between">
            <span>{value}</span>
            <ClipboardButton value={value.toString()} />
          </div>
        );
      },
    }),
    columnHelper.accessor(COLUMN_KEYS.FROM, {
      header: COLUMN_LABELS.FROM,
      size: 1,
      minSize: 100,
      cell: info => {
        return isLoading ? <Skeleton /> : info.getValue();
      },
    }),
    columnHelper.accessor(COLUMN_KEYS.TO, {
      header: COLUMN_LABELS.TO,
      size: 2,
      minSize: 150,
      cell: info => {
        return isLoading ? <Skeleton /> : info.getValue();
      },
    }),
    columnHelper.accessor(COLUMN_KEYS.STATUS, {
      header: COLUMN_LABELS.STATUS,
      size: 0.8,
      minSize: 100,
      cell: info => {
        if (isLoading) return <Skeleton />;

        const value = info.getValue() as TransactionStatus;

        return (
          <Badge variant={STATUS_BADGE_VARIANTS[value]}>
            {TRANSACTION_STATUS_ICONS[value]}
            <span>{STATUS_BADGE_LABELS[value]}</span>
          </Badge>
        );
      },
    }),
  ];

  return { columns };
}
