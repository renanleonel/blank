import { LocationCard } from '@/containers/geolocation/components/saved-locations-list/location-card';
import { SavedLocation } from '@/containers/geolocation/domain/schemas/location';
import { useVirtualizer } from '@tanstack/react-virtual';
import { Inbox } from 'lucide-react';
import { useRef } from 'react';

type SavedLocationsListProps = {
  locations: SavedLocation[];
  onDelete?: (id: string) => void;
  onLocationClick?: (location: SavedLocation) => void;
};

export const SavedLocationsList = ({
  locations,
  onDelete,
  onLocationClick,
}: SavedLocationsListProps) => {
  const parentRef = useRef<HTMLDivElement>(null);

  const virtualizer = useVirtualizer({
    count: locations.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 116,
    measureElement:
      typeof window !== 'undefined' &&
      navigator.userAgent.indexOf('Firefox') === -1
        ? element => element?.getBoundingClientRect().height
        : undefined,
    overscan: 5,
  });

  if (locations.length === 0) {
    return <EmptyLocationsList />;
  }

  return (
    <div className="flex flex-col h-full">
      <h2 className="text-lg font-semibold mb-3">Saved Locations</h2>

      <div ref={parentRef} className="overflow-auto flex-1 min-h-0">
        <div
          className="w-full relative"
          style={{ height: `${virtualizer.getTotalSize()}px` }}
        >
          {virtualizer.getVirtualItems().map(virtualRow => (
            <div
              key={virtualRow.key}
              data-index={virtualRow.index}
              ref={node => virtualizer.measureElement(node)}
              className="absolute top-0 left-0 w-full px-1"
              style={{
                transform: `translateY(${virtualRow.start}px)`,
              }}
            >
              <div className="mb-3">
                <LocationCard
                  location={locations[virtualRow.index]}
                  onDelete={onDelete}
                  onClick={onLocationClick}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const EmptyLocationsList = () => {
  return (
    <div className="h-full flex items-center justify-center">
      <div className="flex flex-col items-center text-center px-6 py-12">
        <div className="rounded-full bg-gray-100 dark:bg-gray-800 p-4 mb-4">
          <Inbox className="h-8 w-8 text-gray-400 dark:text-gray-500" />
        </div>
        <h3 className="text-base font-semibold text-gray-900 dark:text-gray-100 mb-2">
          No saved locations yet
        </h3>
        <p className="text-sm text-gray-500 dark:text-gray-400 max-w-sm">
          Click on the map to select a location and save it for quick access.
        </p>
      </div>
    </div>
  );
};
