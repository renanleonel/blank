import { QueryClientProvider } from '@tanstack/react-query';
import { createRootRoute, Outlet } from '@tanstack/react-router';

import { Sidebar } from '@/components/sidebar';
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar';
import { QUERY_CLIENT } from '@/lib/constants/query-client';
import { SIDEBAR_FOOTER, SIDEBAR_ITEMS } from '@/lib/constants/sidebar-items';

const RootLayout = () => (
  <QueryClientProvider client={QUERY_CLIENT}>
    <SidebarProvider>
      <div className="min-h-screen w-full h-screen flex relative">
        <Sidebar
          items={SIDEBAR_ITEMS}
          footerItems={SIDEBAR_FOOTER}
          className="border-none"
        />
        <SidebarInset className="flex-1 flex items-center justify-center p-4 bg-[#F8F8F8]">
          <div className="w-full max-w-full h-full rounded-2xl shadow-2xl shadow-gray-400/20 bg-white flex flex-col relative">
            <div className="p-4 flex items-center gap-2 h-full">
              <Outlet />
            </div>
          </div>
        </SidebarInset>

        {/* <ToggleSidebar /> */}
      </div>
    </SidebarProvider>
  </QueryClientProvider>
);

export const Route = createRootRoute({ component: RootLayout });
