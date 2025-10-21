import { TeamFilter } from '@/components/filters/presets/team';
import { Button } from '@/components/ui/button';
import { useRouter, useSearch } from '@tanstack/react-router';
import { useMemo } from 'react';

export const FilterToolbar = () => {
  const router = useRouter();
  const filters = useSearch({ from: '/_app/table/' });

  const hasFilters = useMemo(() => Object.keys(filters).length > 0, [filters]);

  const clearAllFilters = () => {
    if (!hasFilters) return;

    router.navigate({
      to: '/table',
      replace: true,
      search: {},
    });
  };

  return (
    <div className='flex items-center gap-2 justify-between'>
      <div className='flex items-center gap-2'>
        <TeamFilter />
      </div>

      {hasFilters && (
        <Button variant='outline' onClick={clearAllFilters} className='cursor-pointer'>
          Clear All
        </Button>
      )}
    </div>
  );
};
