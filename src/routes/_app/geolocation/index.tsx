import { Geolocation } from '@/containers/geolocation';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/_app/geolocation/')({
  component: Geolocation,
});
