type FormatCurrencyOptions = {
  value: number;
  currencyKey?: string;
  compact?: boolean;
  minimumFractionDigits?: number;
  maximumFractionDigits?: number;
};

export const formatCurrency = ({
  value,
  currencyKey,
  compact = false,
  minimumFractionDigits = 2,
  maximumFractionDigits = 2,
}: FormatCurrencyOptions): string => {
  if (!currencyKey) {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      notation: compact ? 'compact' : 'standard',
      minimumFractionDigits,
      maximumFractionDigits,
    }).format(value);
  }

  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currencyKey,
    notation: compact ? 'compact' : 'standard',
    minimumFractionDigits,
    maximumFractionDigits,
  }).format(value);
};
