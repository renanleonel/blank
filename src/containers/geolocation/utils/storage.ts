import { SavedLocation } from '@/containers/geolocation/domain/schemas/location';

const STORAGE_KEY = 'geolocation_saved';

export const loadSavedLocations = (): SavedLocation[] => {
  const saved = localStorage.getItem(STORAGE_KEY);

  if (!saved) return [];

  try {
    const parsed = JSON.parse(saved).map(
      (loc: SavedLocation & { timestamp: string }) => ({
        ...loc,
        timestamp: new Date(loc.timestamp),
      })
    );
    return parsed;
  } catch (e) {
    console.error('Error loading saved locations:', e);
    return [];
  }
};

export const saveLocations = (locations: SavedLocation[]): void => {
  if (!locations.length) return;

  localStorage.setItem(STORAGE_KEY, JSON.stringify(locations));
};
