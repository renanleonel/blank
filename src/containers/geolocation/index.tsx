import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from '@/components/ui/resizable';
import { LocationProperties } from '@/containers/geolocation/components/location-properties';
import { MapView } from '@/containers/geolocation/components/map-view';
import { SavedLocationsList } from '@/containers/geolocation/components/saved-locations-list';
import type { SavedLocation } from '@/containers/geolocation/domain/schemas/location';
import { useGeolocation } from '@/containers/geolocation/hooks/use-geolocation';
import { useMapSelection } from '@/containers/geolocation/hooks/use-map-selection';
import { useSavedLocations } from '@/containers/geolocation/hooks/use-saved-locations';
import { useState } from 'react';

export const Geolocation = () => {
  const { center, isRequestingLocation } = useGeolocation();

  const {
    locationName,
    handleMapClick,
    setLocationName,
    selectedLocation,
    handleClearSelection,
  } = useMapSelection();

  const { savedLocations, saveLocation, deleteLocation } = useSavedLocations();
  const [locationToFly, setLocationToFly] = useState<[number, number] | null>(
    null
  );

  const handleSaveLocation = () => {
    if (!selectedLocation) return;
    saveLocation(selectedLocation, locationName);
    handleClearSelection();
  };

  const handleLocationClick = (location: SavedLocation) => {
    setLocationToFly(location.position);
  };

  return (
    <div className="w-full h-full bg-white">
      <ResizablePanelGroup direction="horizontal" className="h-full">
        <ResizablePanel defaultSize={33} minSize={25} maxSize={50}>
          <div className="h-full border-r border-gray-200 flex flex-col">
            {selectedLocation ? (
              <div className="p-6">
                <LocationProperties
                  locationName={locationName}
                  onSave={handleSaveLocation}
                  onCancel={handleClearSelection}
                  selectedLocation={selectedLocation}
                  onLocationNameChange={setLocationName}
                />
              </div>
            ) : null}

            <div className="px-6 flex-1 min-h-0">
              <SavedLocationsList
                locations={savedLocations}
                onDelete={deleteLocation}
                onLocationClick={handleLocationClick}
              />
            </div>
          </div>
        </ResizablePanel>

        <ResizableHandle />

        <ResizablePanel defaultSize={67}>
          <div className="h-full flex flex-col">
            <MapView
              center={center}
              onMapClick={handleMapClick}
              savedLocations={savedLocations}
              selectedLocation={selectedLocation}
              isRequestingLocation={isRequestingLocation}
              locationToFly={locationToFly}
              onLocationFlyComplete={() => setLocationToFly(null)}
            />
          </div>
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
};
