'use client';

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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { cn } from '@/lib/utils';
import * as React from 'react';
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from 'recharts';

export type AreaChartData = Record<string, string | number>[];

export type AreaChartProps = {
  data: AreaChartData;
  chartConfig: ChartConfig;
  xAxisKey: string;
  yAxisKey?: string;
  yAxisKeys?: string[];
  title: string;
  description?: string;
  className?: string;
  height?: string;
  enableTimeRangeFilter?: boolean;
  timeRangeOptions?: Array<{ value: string; label: string }>;
  defaultTimeRange?: string;
  onTimeRangeChange?: (range: string) => void;
  xAxisFormatter?: (value: string | number) => string;
  yAxisFormatter?: (value: number) => string;
  tooltipLabelFormatter?: (value: string | number) => string;
  gradientId?: string;
  isLoading?: boolean;
  emptyMessage?: string;
};

export const AreaChartComponent = ({
  data,
  chartConfig,
  xAxisKey,
  yAxisKey,
  yAxisKeys,
  title,
  description,
  className,
  height = 'h-[250px]',
  enableTimeRangeFilter = false,
  timeRangeOptions,
  defaultTimeRange,
  onTimeRangeChange,
  xAxisFormatter,
  yAxisFormatter,
  tooltipLabelFormatter,
  gradientId = 'fillArea',
  isLoading = false,
  emptyMessage = 'No data available',
}: AreaChartProps) => {
  const [timeRange, setTimeRange] = React.useState(
    defaultTimeRange || (enableTimeRangeFilter ? 'all' : '')
  );

  const filteredData = React.useMemo(() => {
    if (!enableTimeRangeFilter || !timeRange || timeRange === 'all') {
      return data;
    }

    const referenceDate = new Date();
    referenceDate.setHours(23, 59, 59, 999);

    let daysToSubtract = 90;
    if (timeRange === '30d') {
      daysToSubtract = 30;
    } else if (timeRange === '7d') {
      daysToSubtract = 7;
    }

    const startDate = new Date(referenceDate);
    startDate.setDate(startDate.getDate() - daysToSubtract);
    startDate.setHours(0, 0, 0, 0);

    return data.filter(item => {
      const dateValue = item[xAxisKey];
      if (!dateValue) return false;

      const date = new Date(dateValue as string);
      return date >= startDate;
    });
  }, [data, timeRange, enableTimeRangeFilter, xAxisKey]);

  const handleTimeRangeChange = (value: string) => {
    setTimeRange(value);
    onTimeRangeChange?.(value);
  };

  const defaultXAxisFormatter = (value: string | number): string => {
    const date = new Date(value);
    if (isNaN(date.getTime())) {
      return String(value);
    }
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
    });
  };

  const defaultTooltipLabelFormatter = (value: string | number): string => {
    const date = new Date(value);
    if (isNaN(date.getTime())) {
      return String(value);
    }
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  const defaultYAxisFormatter = (value: number): string => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      notation: 'compact',
      maximumFractionDigits: 0,
    }).format(value);
  };

  const formatCurrencyValue = (value: number, currencyKey: string): string => {
    try {
      return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: currencyKey,
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      }).format(value);
    } catch {
      return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      }).format(value);
    }
  };

  const dataKeys = React.useMemo(
    () => yAxisKeys || (yAxisKey ? [yAxisKey] : []),
    [yAxisKeys, yAxisKey]
  );

  const yAxisDomain = React.useMemo((): [number, number] => {
    if (filteredData.length === 0 || dataKeys.length === 0) {
      return [0, 100];
    }

    let max = 0;

    filteredData.forEach(item => {
      dataKeys.forEach(key => {
        const value = item[key];
        if (typeof value === 'number' && value > max) {
          max = value;
        }
      });
    });

    if (max <= 0) {
      return [0, 100];
    }

    const padding = max * 0.1;

    return [0, max + padding];
  }, [filteredData, dataKeys]);

  if (isLoading) {
    return (
      <Card className={className}>
        <CardContent className="flex items-center justify-center p-6">
          <div className="text-gray-500">Loading chart data...</div>
        </CardContent>
      </Card>
    );
  }

  if (!data || data.length === 0) {
    return (
      <Card className={className}>
        <CardContent className="flex items-center justify-center p-6">
          <div className="text-gray-500">{emptyMessage}</div>
        </CardContent>
      </Card>
    );
  }

  if (!filteredData || filteredData.length === 0) {
    return (
      <Card className={className}>
        <CardContent className="flex items-center justify-center p-6">
          <div className="text-gray-500">
            No data available for the selected time range
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className={cn('pt-0', className)}>
      <CardHeader className="flex items-center gap-2 space-y-0 border-b py-5 sm:flex-row">
        <div className="grid flex-1 gap-1">
          <CardTitle>{title}</CardTitle>
          {description && <CardDescription>{description}</CardDescription>}
        </div>
        {enableTimeRangeFilter && timeRangeOptions && (
          <Select value={timeRange} onValueChange={handleTimeRangeChange}>
            <SelectTrigger
              className="hidden w-[160px] rounded-lg sm:ml-auto sm:flex"
              aria-label="Select time range"
            >
              <SelectValue placeholder="Select range" />
            </SelectTrigger>
            <SelectContent className="rounded-xl">
              {timeRangeOptions.map(option => (
                <SelectItem
                  key={option.value}
                  value={option.value}
                  className="rounded-lg"
                >
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        )}
      </CardHeader>
      <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
        <ChartContainer
          config={chartConfig}
          className={`aspect-auto w-full ${height}`}
        >
          <AreaChart
            data={filteredData}
            margin={{ left: 50, right: 10, top: 10, bottom: 10 }}
          >
            <defs>
              {dataKeys.map(key => {
                const configKey =
                  Object.keys(chartConfig).find(k => k === key) || key;
                const areaColor = `var(--color-${configKey})`;
                const gradientIdWithKey = `${gradientId}-${key}`;

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
                    <stop
                      offset="95%"
                      stopColor={areaColor}
                      stopOpacity={0.1}
                    />
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
              tickFormatter={xAxisFormatter || defaultXAxisFormatter}
            />
            <YAxis
              domain={yAxisDomain}
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={yAxisFormatter || defaultYAxisFormatter}
            />
            <ChartTooltip
              cursor={{ stroke: 'hsl(var(--border))', strokeWidth: 1 }}
              content={
                <ChartTooltipContent
                  labelFormatter={
                    tooltipLabelFormatter || defaultTooltipLabelFormatter
                  }
                  formatter={(value, name) => {
                    // Format each currency value in the tooltip
                    const currencyKey = String(name || '');
                    const numValue = typeof value === 'number' ? value : 0;
                    return formatCurrencyValue(numValue, currencyKey);
                  }}
                  indicator="dot"
                />
              }
            />
            {dataKeys.map(key => {
              const configKey =
                Object.keys(chartConfig).find(k => k === key) || key;
              const areaColor = `var(--color-${configKey})`;
              const gradientIdWithKey = `${gradientId}-${key}`;

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
      </CardContent>
    </Card>
  );
};
