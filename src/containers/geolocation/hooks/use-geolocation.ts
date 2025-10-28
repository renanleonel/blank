import { DEFAULT_LOCATION } from '@/containers/geolocation/domain/schemas/location';
import { useEffect, useState } from 'react';

export function useGeolocation() {
  const [userCoords, setUserCoords] = useState<[number, number] | null>(null);
  const [isRequestingLocation, setIsRequestingLocation] = useState(true);

  useEffect(() => {
    if (!('geolocation' in navigator)) {
      return setIsRequestingLocation(false);
    }

    navigator.geolocation.getCurrentPosition(
      position => {
        setUserCoords([position.coords.latitude, position.coords.longitude]);
        setIsRequestingLocation(false);
      },
      () => {
        console.log('Location access denied or unavailable');
        setIsRequestingLocation(false);
      }
    );
  }, []);

  const center = userCoords || DEFAULT_LOCATION;

  return {
    center,
    userCoords,
    isRequestingLocation,
  };
}
