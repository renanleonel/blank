import { LocationProperties } from '@/containers/geolocation/components/location-properties';
import { MapView } from '@/containers/geolocation/components/map-view';
import { SavedLocationsList } from '@/containers/geolocation/components/saved-locations-list';
import { useGeolocation } from '@/containers/geolocation/hooks/use-geolocation';
import { useMapSelection } from '@/containers/geolocation/hooks/use-map-selection';
import { useSavedLocations } from '@/containers/geolocation/hooks/use-saved-locations';

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

  const handleSaveLocation = () => {
    if (!selectedLocation) return;
    saveLocation(selectedLocation, locationName);
    handleClearSelection();
  };

  return (
    <div className="w-full h-full flex flex-col bg-white">
      <div className="flex-1 flex overflow-hidden">
        <div className="w-1/3 border-r border-gray-200 flex flex-col">
          <div className="p-6 overflow-y-auto flex-1">
            {selectedLocation ? (
              <LocationProperties
                locationName={locationName}
                onSave={handleSaveLocation}
                onCancel={handleClearSelection}
                selectedLocation={selectedLocation}
                onLocationNameChange={setLocationName}
              />
            ) : null}

            <SavedLocationsList
              locations={savedLocations}
              onDelete={deleteLocation}
            />
          </div>
        </div>

        <div className="flex-1 flex flex-col">
          <MapView
            center={center}
            onMapClick={handleMapClick}
            savedLocations={savedLocations}
            selectedLocation={selectedLocation}
            isRequestingLocation={isRequestingLocation}
          />
        </div>
      </div>
    </div>
  );
};
