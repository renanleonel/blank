import type { LatLng } from 'leaflet';
import { useState } from 'react';

export function useMapSelection() {
  const [locationName, setLocationName] = useState('');
  const [selectedLocation, setSelectedLocation] = useState<LatLng | null>(null);

  const handleMapClick = (latlng: LatLng) => {
    setSelectedLocation(latlng);
    setLocationName('');
  };

  const handleClearSelection = () => {
    setSelectedLocation(null);
    setLocationName('');
  };

  return {
    selectedLocation,
    locationName,
    setLocationName,
    handleMapClick,
    handleClearSelection,
  };
}
