import { Button } from '@/components/ui/button';
import { SavedLocation } from '@/containers/geolocation/domain/schemas/location';
import { X } from 'lucide-react';

type LocationCardProps = {
  location: SavedLocation;
  onDelete?: (id: string) => void;
};

const LocationCard = ({ location, onDelete }: LocationCardProps) => {
  return (
    <div className="border border-gray-200 rounded-lg p-3">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="font-medium text-gray-900">{location.name}</p>
          <p className="text-xs text-gray-500 mt-1">
            {location.position[0].toFixed(4)}, {location.position[1].toFixed(4)}
          </p>
        </div>
        <Button
          size="icon"
          variant="ghost"
          className="h-6 w-6 cursor-pointer"
          onClick={() => onDelete?.(location.id)}
        >
          <X className="h-3 w-3 text-gray-400" />
        </Button>
      </div>
    </div>
  );
};

type SavedLocationsListProps = {
  locations: SavedLocation[];
  onDelete?: (id: string) => void;
};

export const SavedLocationsList = ({
  locations,
  onDelete,
}: SavedLocationsListProps) => {
  if (locations.length === 0) return null;

  return (
    <div className="mb-6">
      <h2 className="text-lg font-semibold mb-3">Saved Locations</h2>

      <div className="space-y-2">
        {locations.map(location => (
          <LocationCard
            key={location.id}
            location={location}
            onDelete={onDelete}
          />
        ))}
      </div>
    </div>
  );
};
