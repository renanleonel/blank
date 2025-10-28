import {
  Sidebar as SidebarComponent,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar';
import { SidebarItem } from '@/lib/constants/sidebar-items';
import { cn } from '@/lib/utils';
import { Link, useLocation } from '@tanstack/react-router';

type SidebarProps = {
  items: SidebarItem[];
  footerItems: SidebarItem[];
  className?: string;
};

export const Sidebar = ({ items, footerItems, className }: SidebarProps) => {
  const { pathname } = useLocation();

  return (
    <SidebarComponent className={className}>
      <SidebarHeader className="bg-[#F8F8F8] px-4 py-4">
        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white border border-gray-300">
          <span className="text-sm font-bold text-gray-700">B</span>
        </div>
      </SidebarHeader>
      <SidebarContent className="bg-[#F8F8F8] px-2 py-2 flex flex-col justify-between h-full">
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu className="space-y-1">
              {items.map(item => {
                const isActive = pathname === item.href;

                return (
                  <SidebarMenuItem key={item.label}>
                    <SidebarMenuButton
                      asChild
                      className={cn(
                        'w-full flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors',
                        isActive
                          ? 'bg-[#E8E8E8] text-gray-900 hover:bg-[#E8E8E8]'
                          : 'text-gray-700'
                      )}
                    >
                      <Link
                        to={item.href}
                        className="flex items-center gap-3 w-full"
                      >
                        {item.icon}
                        <span>{item.label}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu className="space-y-1">
              {footerItems.map(item => {
                const isActive = pathname === item.href;

                return (
                  <SidebarMenuItem key={item.label}>
                    <SidebarMenuButton
                      asChild
                      className={cn(
                        'w-full flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors',
                        isActive
                          ? 'bg-[#E8E8E8] text-gray-900 hover:bg-[#E8E8E8]'
                          : 'text-gray-700'
                      )}
                    >
                      <Link
                        to={item.href}
                        className="flex items-center gap-3 w-full"
                      >
                        {item.icon}
                        <span>{item.label}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </SidebarComponent>
  );
};
