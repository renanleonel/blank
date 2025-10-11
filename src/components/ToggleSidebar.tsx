import { SidebarTrigger } from '@/components/ui/sidebar';
import { useSidebar } from '@/hooks/use-sidebar';
import { cn } from '@/lib/utils';

export const ToggleSidebar = () => {
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
};
