type FormatDateOptions = {
  value: string | number;
};

export const formatDate = ({ value }: FormatDateOptions): string => {
  const date = new Date(value);

  if (isNaN(date.getTime())) return String(value);

  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
};
