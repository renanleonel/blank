import { BarChart3, FileText, Home, MapPin, Settings } from 'lucide-react';
import { ReactNode } from 'react';

export type SidebarItem = {
  href: string;
  icon: ReactNode;
  label: string;
  isActive?: boolean;
};

export const SIDEBAR_ITEMS: SidebarItem[] = [
  {
    href: '/',
    label: 'Home',
    icon: <Home className="h-4 w-4" />,
  },
  {
    href: '/dashboard',
    label: 'Dashboard',
    icon: <BarChart3 className="h-4 w-4" />,
  },
  {
    href: '/table',
    label: 'Table',
    icon: <FileText className="h-4 w-4" />,
  },
  {
    href: '/geolocation',
    label: 'Geolocation',
    icon: <MapPin className="h-4 w-4" />,
  },
];

export const SIDEBAR_FOOTER: SidebarItem[] = [
  {
    href: '/settings',
    label: 'Settings',
    icon: <Settings className="h-4 w-4" />,
  },
];
