import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { ClipboardButton } from '@/containers/transactions/components/clipboard-button';
import { TransactionStatus } from '@/containers/transactions/domain/enums/transaction';
import { Transaction } from '@/containers/transactions/domain/schemas/transaction';
import { createColumnHelper } from '@tanstack/react-table';
import { CircleAlert, CircleCheck, CircleX } from 'lucide-react';

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
        return isLoading ? <Skeleton /> : info.getValue();
      },
    }),
    columnHelper.accessor(COLUMN_KEYS.GATEWAY, {
      header: COLUMN_LABELS.GATEWAY,
      size: 1.2,
      minSize: 130,
      cell: info => {
        return isLoading ? <Skeleton /> : info.getValue();
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
        if (info.getValue() === TransactionStatus.PENDING)
          return (
            <Badge variant="yellow">
              <CircleCheck className="size-3" />
              <span>Pending</span>
            </Badge>
          );
        if (info.getValue() === TransactionStatus.COMPLETED)
          return (
            <Badge variant="green">
              <CircleCheck className="size-3" />
              <span>Completed</span>
            </Badge>
          );
        if (info.getValue() === TransactionStatus.FAILED)
          return (
            <Badge variant="red">
              <CircleAlert className="size-3" />
              <span>Failed</span>
            </Badge>
          );
        if (info.getValue() === TransactionStatus.CANCELLED)
          return (
            <Badge variant="orange">
              <CircleX className="size-3" />
              <span>Cancelled</span>
            </Badge>
          );

        return info.getValue();
      },
    }),
  ];

  return { columns };
}
