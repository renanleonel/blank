import { GeolocationPage } from '@/routes/_app/geolocation/geolocation-page';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/_app/geolocation/')({
  component: GeolocationPage,
});
