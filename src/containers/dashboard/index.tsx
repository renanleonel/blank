'use client';

import { AreaChartComponent } from '@/containers/dashboard/components/area-chart';
import { TimeRange } from '@/containers/dashboard/domain/enums/dashboard';
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

const TIME_RANGE_OPTIONS = [
  { value: TimeRange.ALL, label: 'All time' },
  { value: TimeRange.LAST_3_MONTHS, label: 'Last 3 months' },
  { value: TimeRange.LAST_30_DAYS, label: 'Last 30 days' },
  { value: TimeRange.LAST_7_DAYS, label: 'Last 7 days' },
];

export const Dashboard = () => {
  const { data: transactionsData, isLoading } = useListTransactions({
    params: { fetchSize: 200 },
  });

  const chartData = useMemo(() => {
    const transactions = transactionsData?.list ?? [];

    if (!transactions.length) return [];

    const revenueByDateAndCurrency = transactions.reduce(
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
    );

    const revenueData = Object.values(revenueByDateAndCurrency)
      .sort((a, b) => a.date.localeCompare(b.date))
      .map(item => ({
        date: item.date,
        [TransactionCurrency.USD]: item[TransactionCurrency.USD],
        [TransactionCurrency.EUR]: item[TransactionCurrency.EUR],
        [TransactionCurrency.BRL]: item[TransactionCurrency.BRL],
        [TransactionCurrency.BTC]: item[TransactionCurrency.BTC],
        [TransactionCurrency.ETH]: item[TransactionCurrency.ETH],
      }));

    return revenueData;
  }, [transactionsData]);

  return (
    <div className="p-6 w-full h-full overflow-auto">
      <AreaChartComponent
        data={chartData}
        chartConfig={CHART_CONFIG}
        xAxisKey="date"
        yAxisKeys={Object.values(TransactionCurrency)}
        title="Revenue Over Time by Currency"
        description="Showing revenue by currency over the selected time period"
        isLoading={isLoading}
        enableTimeRangeFilter
        timeRangeOptions={TIME_RANGE_OPTIONS}
        defaultTimeRange={TimeRange.ALL}
      />
    </div>
  );
};
