import { createRootRoute, Outlet } from '@tanstack/react-router';

import { Sidebar } from '@/components/sidebar';
import { ToggleSidebar } from '@/components/toggle-sidebar';
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar';
import { SIDEBAR_ITEMS } from '@/lib/constants/sidebar-items';

const RootLayout = () => (
  <SidebarProvider>
    <div className='min-h-screen w-full h-screen bg-white flex relative'>
      <Sidebar items={SIDEBAR_ITEMS} />
      <SidebarInset className='flex-1 flex items-center justify-center py-8 px-16'>
        <div className='w-full max-w-full h-full rounded-3xl shadow-2xl shadow-gray-400/20 border border-[#DCCFC0] bg-[#FAF9EE] flex flex-col relative'>
          <div className='p-4 border-[#DCCFC0] flex items-center gap-2'>
            <Outlet />
          </div>
        </div>
      </SidebarInset>

      <ToggleSidebar />
    </div>
  </SidebarProvider>
);

export const Route = createRootRoute({ component: RootLayout });
