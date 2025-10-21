import { TeamFilter } from '@/components/filters/presets/team';
import { Button } from '@/components/ui/button';

export const FilterToolbar = () => {
  return (
    <div className='flex items-center gap-2 justify-between'>
      <div className='flex items-center gap-2'>
        <TeamFilter />
      </div>

      <Button variant='outline'>Clear All</Button>
    </div>
  );
};
