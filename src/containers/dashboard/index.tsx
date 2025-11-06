import { AreaChartComponent } from '@/containers/dashboard/components/area-chart';
import { ChartDataPoint } from '@/containers/dashboard/domain/types/chart';
import { TransactionCurrency } from '@/containers/transactions/domain/enums/transaction';
import { useListTransactions } from '@/containers/transactions/queries/transaction-queries';
import { useMemo } from 'react';

const CHART_CONFIG = {
  [TransactionCurrency.USD]: {
    label: TransactionCurrency.USD,
    color: 'var(--chart-1)',
  },
  [TransactionCurrency.EUR]: {
    label: TransactionCurrency.EUR,
    color: 'var(--chart-2)',
  },
  [TransactionCurrency.BRL]: {
    label: TransactionCurrency.BRL,
    color: 'var(--chart-3)',
  },
  [TransactionCurrency.BTC]: {
    label: TransactionCurrency.BTC,
    color: 'var(--chart-4)',
  },
  [TransactionCurrency.ETH]: {
    label: TransactionCurrency.ETH,
    color: 'var(--chart-5)',
  },
};

export const Dashboard = () => {
  const listTransactionsQuery = useListTransactions({
    params: { fetchSize: 200 },
  });

  const transactions = useMemo(
    () => listTransactionsQuery.data?.list ?? [],
    [listTransactionsQuery.data]
  );

  const revenueByDateAndCurrency = useMemo(
    () =>
      transactions.reduce(
        (acc, t) => {
          const date = new Date(t.timestamp);
          const dateKey = date.toISOString().split('T')[0];

          if (!acc[dateKey]) {
            acc[dateKey] = {
              date: dateKey,
              [TransactionCurrency.USD]: 0,
              [TransactionCurrency.EUR]: 0,
              [TransactionCurrency.BRL]: 0,
              [TransactionCurrency.BTC]: 0,
              [TransactionCurrency.ETH]: 0,
            };
          }

          acc[dateKey][t.currency] = (acc[dateKey][t.currency] || 0) + t.amount;
          return acc;
        },
        {} as Record<string, ChartDataPoint>
      ),
    [transactions]
  );

  const revenueData = useMemo(
    () =>
      Object.values(revenueByDateAndCurrency)
        .sort((a, b) => a.date.localeCompare(b.date))
        .map(item => ({
          date: item.date,
          [TransactionCurrency.USD]: item[TransactionCurrency.USD],
          [TransactionCurrency.EUR]: item[TransactionCurrency.EUR],
          [TransactionCurrency.BRL]: item[TransactionCurrency.BRL],
          [TransactionCurrency.BTC]: item[TransactionCurrency.BTC],
          [TransactionCurrency.ETH]: item[TransactionCurrency.ETH],
        })),
    [revenueByDateAndCurrency]
  );

  return (
    <div className="p-6 w-full h-full overflow-auto">
      <AreaChartComponent
        data={revenueData}
        chartConfig={CHART_CONFIG}
        xAxisKey="date"
        title="Revenue Over Time by Currency"
        description="Showing revenue by currency over the selected time period"
        isLoading={listTransactionsQuery.isLoading}
      />
    </div>
  );
};
