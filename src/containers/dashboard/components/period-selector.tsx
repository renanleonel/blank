import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

type PeriodSelectorProps = {
  value: string;
  onChange: (value: string) => void;
  options: { value: string; label: string }[];
};

export const PeriodSelector = ({
  value,
  options,
  onChange,
}: PeriodSelectorProps) => {
  return (
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger
        className="hidden w-[160px] rounded-lg sm:ml-auto sm:flex"
        aria-label="Select time range"
      >
        <SelectValue placeholder="Select range" />
      </SelectTrigger>
      <SelectContent className="rounded-xl">
        {options.map(option => (
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
  );
};
