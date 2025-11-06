import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';
import { formatCurrency } from '@/containers/dashboard/domain/utils/format-currency';
import { formatDate } from '@/containers/dashboard/domain/utils/format-date';
import { cn } from '@/lib/utils';
import { ReactNode } from 'react';
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from 'recharts';

export type AreaChartData = Record<string, string | number>[];

export type AreaChartProps = {
  data: AreaChartData;
  chartConfig: ChartConfig;
  xAxisKey: string;
  title: string;
  description?: string;
  className?: string;
  height?: string;
  isLoading?: boolean;
  emptyMessage?: string;
};

export const AreaChartComponent = ({
  data,
  chartConfig,
  xAxisKey,
  title,
  description,
  className,
  height = 'h-[250px]',
  isLoading,
  emptyMessage = 'No data available',
}: AreaChartProps) => {
  if (isLoading) {
    return (
      <ChartContent
        title={title}
        description={description}
        className={className}
      >
        <div className={cn('flex items-center justify-center w-full', height)}>
          <div className="text-gray-500">Loading chart data...</div>
        </div>
      </ChartContent>
    );
  }

  if (data?.length === 0) {
    return (
      <ChartContent
        title={title}
        description={description}
        className={className}
      >
        <CardHeader className="flex items-center gap-2 space-y-0 border-b py-5 sm:flex-row">
          <div className="grid flex-1 gap-1">
            <CardTitle>{title}</CardTitle>
            {description && <CardDescription>{description}</CardDescription>}
          </div>
        </CardHeader>
        <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
          <div className={`flex items-center justify-center w-full ${height}`}>
            <div className="text-gray-500">{emptyMessage}</div>
          </div>
        </CardContent>
      </ChartContent>
    );
  }

  return (
    <ChartContent title={title} description={description} className={className}>
      <ChartContainer
        config={chartConfig}
        className={cn('aspect-auto w-full', height)}
      >
        <AreaChart data={data}>
          <defs>
            {Object.keys(chartConfig).map(key => {
              const configKey =
                Object.keys(chartConfig).find(k => k === key) || key;
              const areaColor = `var(--color-${configKey})`;
              const gradientIdWithKey = `fillArea-${key}`;

              return (
                <linearGradient
                  key={gradientIdWithKey}
                  id={gradientIdWithKey}
                  x1="0"
                  y1="0"
                  x2="0"
                  y2="1"
                >
                  <stop offset="5%" stopColor={areaColor} stopOpacity={0.8} />
                  <stop offset="95%" stopColor={areaColor} stopOpacity={0.1} />
                </linearGradient>
              );
            })}
          </defs>
          <CartesianGrid vertical={false} />
          <XAxis
            dataKey={xAxisKey}
            tickLine={false}
            axisLine={false}
            tickMargin={8}
            minTickGap={32}
            tickFormatter={(value: string | number) => formatDate({ value })}
          />

          <YAxis
            domain={[0, 'auto']}
            tickLine={false}
            axisLine={false}
            tickMargin={8}
            tickFormatter={(value: number) =>
              formatCurrency({
                value,
                compact: true,
                minimumFractionDigits: 0,
                maximumFractionDigits: 0,
              })
            }
          />

          <ChartTooltip
            cursor={{ stroke: 'hsl(var(--border))', strokeWidth: 1 }}
            content={
              <ChartTooltipContent
                indicator="dot"
                labelFormatter={(value: string | number) =>
                  formatDate({ value })
                }
                formatter={(value, name) => {
                  const currencyKey = String(name || '');
                  const numValue = typeof value === 'number' ? value : 0;
                  return formatCurrency({ value: numValue, currencyKey });
                }}
              />
            }
          />
          {Object.keys(chartConfig).map(key => {
            const configKey =
              Object.keys(chartConfig).find(k => k === key) || key;
            const areaColor = `var(--color-${configKey})`;
            const gradientIdWithKey = `fillArea-${key}`;

            return (
              <Area
                key={key}
                dataKey={key}
                type="natural"
                fill={`url(#${gradientIdWithKey})`}
                stroke={areaColor}
                baseValue={0}
              />
            );
          })}
        </AreaChart>
      </ChartContainer>
    </ChartContent>
  );
};

type ChartContentProps = {
  title: string;
  description?: string;
  className?: string;
  children: ReactNode;
};

const ChartContent = ({
  title,
  description,
  className,
  children,
}: ChartContentProps) => {
  return (
    <Card className={cn('pt-0', className)}>
      <CardHeader className="flex items-center gap-2 space-y-0 border-b py-5 sm:flex-row">
        <div className="grid flex-1 gap-1">
          <CardTitle>{title}</CardTitle>
          {description && <CardDescription>{description}</CardDescription>}
        </div>
      </CardHeader>
      <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
        {children}
      </CardContent>
    </Card>
  );
};
