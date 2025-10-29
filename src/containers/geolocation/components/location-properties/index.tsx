import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import type { LatLng } from 'leaflet';
import { Link as LinkIcon, Plus } from 'lucide-react';

type PropertyItemProps = {
  label: string;
  value: string;
  icon?: React.ReactNode;
  hasLink?: boolean;
};

const PropertyItem = ({ label, value, icon, hasLink }: PropertyItemProps) => {
  return (
    <div className="flex items-start justify-between text-sm">
      <div className="flex items-center gap-2 text-gray-600">
        <span className="font-mono text-xs">{label}</span>
        {icon}
      </div>

      <div className="flex items-center gap-1">
        <span className="font-mono text-xs">{value}</span>
        {hasLink && <LinkIcon className="h-3 w-3 text-gray-400" />}
      </div>
    </div>
  );
};

type LocationPropertiesProps = {
  selectedLocation: LatLng;
  locationName: string;
  onLocationNameChange: (name: string) => void;
  onSave: () => void;
  onCancel: () => void;
};

export const LocationProperties = (props: LocationPropertiesProps) => {
  const {
    onSave,
    onCancel,
    locationName,
    selectedLocation,
    onLocationNameChange,
  } = props;

  return (
    <>
      <h1 className="text-3xl font-bold text-gray-900 mb-6">New Location</h1>

      <div className="mb-4">
        <label className="text-sm font-medium text-gray-700 mb-2 block">
          Location Name
        </label>
        <Input
          type="text"
          value={locationName}
          onChange={e => onLocationNameChange(e.target.value)}
          placeholder="Enter location name"
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div className="space-y-3 mb-6">
        <PropertyItem
          label="latitude"
          value={selectedLocation.lat.toFixed(7)}
        />
        <PropertyItem
          label="longitude"
          value={selectedLocation.lng.toFixed(7)}
        />
      </div>

      <div className="space-y-2 mb-6">
        <Button
          onClick={onSave}
          className="w-full bg-blue-600 hover:bg-blue-700 cursor-pointer gap-1"
        >
          <Plus className="h-4 w-4" />
          Save Location
        </Button>
        <Button
          variant="outline"
          onClick={onCancel}
          className="w-full cursor-pointer"
        >
          Cancel
        </Button>
      </div>
    </>
  );
};
