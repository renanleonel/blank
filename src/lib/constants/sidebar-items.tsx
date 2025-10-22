import {
  Brain,
  FileText,
  Home,
  MapPin,
  MessageSquare,
  Settings,
} from 'lucide-react';
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
    href: '/table',
    label: 'Table',
    icon: <FileText className="h-4 w-4" />,
  },
  {
    href: '/geolocation',
    label: 'Geolocation',
    icon: <MapPin className="h-4 w-4" />,
  },
  {
    href: '/chat',
    label: 'Chat',
    icon: <MessageSquare className="h-4 w-4" />,
  },
  {
    href: '/ai',
    label: 'AI Prompt',
    icon: <Brain className="h-4 w-4" />,
  },
];

export const SIDEBAR_FOOTER: SidebarItem[] = [
  {
    href: '/settings',
    label: 'Settings',
    icon: <Settings className="h-4 w-4" />,
  },
];
