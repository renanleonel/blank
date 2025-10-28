import { Button } from '@/components/ui/button';
import { SavedLocation } from '@/containers/geolocation/domain/schemas/location';
import type { LatLng } from 'leaflet';
import { Icon } from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { ZoomIn, ZoomOut } from 'lucide-react';
import {
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  useMap,
  useMapEvents,
} from 'react-leaflet';

type MapClickHandlerProps = {
  onMapClick: (latlng: LatLng) => void;
};

const MapClickHandler = ({ onMapClick }: MapClickHandlerProps) => {
  useMapEvents({ click: e => onMapClick(e.latlng) });

  return null;
};

type FlyToLocationProps = {
  location: [number, number] | null;
  onComplete: () => void;
};

const FlyToLocation = (props: FlyToLocationProps) => {
  const { location, onComplete } = props;

  const map = useMap();

  if (!location) return;

  map.flyTo(location, 15, { duration: 1.5 });

  setTimeout(() => onComplete(), 1000);

  return null;
};

type MapViewProps = {
  center: [number, number];
  isRequestingLocation: boolean;
  selectedLocation: LatLng | null;
  savedLocations: SavedLocation[];
  onMapClick: (latlng: LatLng) => void;
  locationToFly?: [number, number] | null;
  onLocationFlyComplete?: () => void;
};

export function MapView(props: MapViewProps) {
  const {
    center,
    isRequestingLocation,
    selectedLocation,
    savedLocations,
    onMapClick,
    locationToFly,
    onLocationFlyComplete,
  } = props;

  if (isRequestingLocation) {
    return (
      <div className="flex items-center justify-center h-full">
        <p className="text-gray-500">Requesting your location...</p>
      </div>
    );
  }

  return (
    <div className="flex-1 relative">
      <MapContainer center={center} zoom={12} className="h-full w-full">
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />

        <MapClickHandler onMapClick={onMapClick} />

        <FlyToLocation
          location={locationToFly || null}
          onComplete={() => onLocationFlyComplete?.()}
        />

        {selectedLocation && (
          <Marker
            position={[selectedLocation.lat, selectedLocation.lng]}
            icon={
              new Icon({
                iconUrl:
                  'data:image/svg+xml;base64,' +
                  btoa(`
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="28" viewBox="0 0 20 28">
                      <path d="M10 0C4.48 0 0 4.48 0 10c0 8 10 18 10 18s10-10 10-18c0-5.52-4.48-10-10-10zm0 13c-1.66 0-3-1.34-3-3s1.34-3 3-3 3 1.34 3 3-1.34 3-3 3z" fill="#3B82F6"/>
                    </svg>
                  `),
                iconSize: [20, 28],
                iconAnchor: [10, 28],
              })
            }
          >
            <Popup>Click save to add this location</Popup>
          </Marker>
        )}

        {savedLocations.map(location => (
          <Marker
            key={location.id}
            position={location.position}
            icon={
              new Icon({
                iconUrl:
                  'data:image/svg+xml;base64,' +
                  btoa(`
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="28" viewBox="0 0 20 28">
                      <path d="M10 0C4.48 0 0 4.48 0 10c0 8 10 18 10 18s10-10 10-18c0-5.52-4.48-10-10-10zm0 13c-1.66 0-3-1.34-3-3s1.34-3 3-3 3 1.34 3 3-1.34 3-3 3z" fill="#10B981"/>
                    </svg>
                  `),
                iconSize: [20, 28],
                iconAnchor: [10, 28],
              })
            }
          >
            <Popup>{location.name}</Popup>
          </Marker>
        ))}
      </MapContainer>

      <div className="absolute top-4 right-4 bg-white rounded shadow-md border border-gray-200">
        <Button size="icon" variant="ghost" className="h-8 w-8 rounded-none">
          <ZoomIn className="h-4 w-4" />
        </Button>
        <Button size="icon" variant="ghost" className="h-8 w-8 rounded-none">
          <ZoomOut className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
