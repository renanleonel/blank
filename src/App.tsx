import { Sidebar } from '@/components/Sidebar';
import { ToggleSidebar } from '@/components/ToggleSidebar';
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar';

const SIDEBAR_ITEMS = [
  {
    href: '/',
    icon: 'table',
    label: 'Table',
  },
];

function App() {
  return (
    <SidebarProvider>
      <div className='min-h-screen w-full h-screen bg-white flex relative'>
        <Sidebar items={SIDEBAR_ITEMS} />
        <SidebarInset className='flex-1 flex items-center justify-center py-8 px-16'>
          <div className='w-full max-w-full h-full rounded-3xl shadow-2xl shadow-gray-400/20 border border-[#DCCFC0] bg-[#FAF9EE] flex flex-col relative'>
            <div className='p-4 border-[#DCCFC0] flex items-center gap-2'></div>
          </div>
        </SidebarInset>

        <ToggleSidebar />
      </div>
    </SidebarProvider>
  );
}

export default App;
