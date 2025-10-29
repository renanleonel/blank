import { Link } from 'lucide-react';

type PropertyItemProps = {
  label: string;
  value: string;
  icon?: React.ReactNode;
  hasLink?: boolean;
};

export const PropertyItem = ({
  label,
  value,
  icon,
  hasLink,
}: PropertyItemProps) => {
  return (
    <div className="flex items-start justify-between text-sm">
      <div className="flex items-center gap-2 text-gray-600">
        <span className="font-mono text-xs">{label}</span>
        {icon}
      </div>

      <div className="flex items-center gap-1">
        <span className="font-mono text-xs">{value}</span>
        {hasLink && <Link className="h-3 w-3 text-gray-400" />}
      </div>
    </div>
  );
};
