import { Button } from '@/components/ui/button';
import { SavedLocation } from '@/containers/geolocation/domain/schemas/location';
import { MapPin, X } from 'lucide-react';

type LocationCardProps = {
  location: SavedLocation;
  onDelete?: (id: string) => void;
  onClick?: (location: SavedLocation) => void;
};

export const LocationCard = (props: LocationCardProps) => {
  const { location, onDelete, onClick } = props;

  const formatTimestamp = (date: Date) => {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const days = Math.floor(hours / 24);

    if (days > 0) return `${days} day${days > 1 ? 's' : ''} ago`;
    if (hours > 0) return `${hours} hour${hours > 1 ? 's' : ''} ago`;
    return 'Just now';
  };

  return (
    <div
      role="button"
      tabIndex={0}
      className="group relative border border-gray-200/60 dark:border-gray-800 rounded-xl p-4 cursor-pointer bg-white dark:bg-gray-900/50 hover:bg-gradient-to-br hover:from-white hover:to-gray-50 dark:hover:from-gray-900/50 dark:hover:to-gray-900/80 hover:border-gray-300 dark:hover:border-gray-700 transition-all duration-200 w-full shadow-sm hover:shadow-md hover:scale-[1.01]"
      onClick={() => onClick?.(location)}
      onKeyDown={e => {
        if (e.key === 'Enter' || e.key === ' ') {
          onClick?.(location);
        }
      }}
    >
      <div className="flex items-start gap-3">
        <div className="flex-shrink-0 mt-0.5">
          <div className="rounded-lg bg-blue-50 dark:bg-blue-950/30 p-2 group-hover:bg-blue-100 dark:group-hover:bg-blue-950/50 transition-colors">
            <MapPin className="h-4 w-4 text-blue-600 dark:text-blue-400" />
          </div>
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2">
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-gray-900 dark:text-gray-100 text-base mb-1 truncate group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                {location.name}
              </h3>
              <div className="flex flex-col gap-1">
                <p className="text-xs font-mono text-gray-600 dark:text-gray-400">
                  {location.position[0].toFixed(4)},{' '}
                  {location.position[1].toFixed(4)}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-500">
                  {formatTimestamp(location.timestamp)}
                </p>
              </div>
            </div>

            <Button
              size="icon"
              variant="ghost"
              className="h-8 w-8 cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-50 dark:hover:bg-red-950/30 hover:text-red-600 dark:hover:text-red-400 shrink-0"
              onClick={e => {
                e.stopPropagation();
                onDelete?.(location.id);
              }}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
