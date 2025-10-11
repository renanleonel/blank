import { AppSidebar } from '@/components/AppSidebar';
import { SidebarInset, SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import { useSidebar } from '@/hooks/use-sidebar';
import { cn } from '@/lib/utils';

function FloatingTrigger() {
  const { state } = useSidebar();

  return (
    <div
      className={cn(
        'fixed top-4 z-50 transition-all duration-100 ease-linear',
        state === 'expanded' ? 'left-[calc(var(--sidebar-width)+1rem)]' : 'left-4'
      )}>
      <SidebarTrigger className='bg-white border border-gray-200 hover:bg-gray-50' />
    </div>
  );
}

function App() {
  return (
    <SidebarProvider>
      <div className='min-h-screen w-full h-screen bg-white flex relative'>
        <AppSidebar />
        <SidebarInset className='flex-1 flex items-center justify-center p-8'>
          <div className='w-full max-w-7xl h-full rounded-3xl shadow-2xl shadow-gray-400/20 border border-[#DCCFC0] bg-[#FAF9EE] flex flex-col relative'>
            <div className='p-4 border-[#DCCFC0] flex items-center gap-2'></div>
          </div>
        </SidebarInset>
        <FloatingTrigger />
      </div>
    </SidebarProvider>
  );
}

export default App;
