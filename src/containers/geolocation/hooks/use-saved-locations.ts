import { SavedLocation } from '@/containers/geolocation/domain/schemas/location';
import {
  loadSavedLocations,
  saveLocations,
} from '@/containers/geolocation/utils/storage';
import type { LatLng } from 'leaflet';
import { useEffect, useState } from 'react';

export function useSavedLocations() {
  const [savedLocations, setSavedLocations] = useState<SavedLocation[]>([]);

  useEffect(() => {
    const loaded = loadSavedLocations();
    setSavedLocations(loaded);
  }, []);

  useEffect(() => {
    if (!savedLocations.length) return;
    saveLocations(savedLocations);
  }, [savedLocations]);

  const saveLocation = (latlng: LatLng, name: string) => {
    const newLocation: SavedLocation = {
      id: Date.now().toString(),
      position: [latlng.lat, latlng.lng],
      name: name || `Location ${savedLocations.length + 1}`,
      timestamp: new Date(),
    };

    setSavedLocations(prev => [...prev, newLocation]);
  };

  const deleteLocation = (id: string) => {
    setSavedLocations(prev => prev.filter(l => l.id !== id));
  };

  return {
    saveLocation,
    savedLocations,
    deleteLocation,
  };
}
