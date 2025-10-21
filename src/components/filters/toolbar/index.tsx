import { AccountTypeFilter } from '@/components/filters/presets/account-type';
import { TeamFilter } from '@/components/filters/presets/team';
import { Button } from '@/components/ui/button';
import { usersTableSearchSchema } from '@/lib/schemas/validate-search/users-table';
import { useRouter, useSearch } from '@tanstack/react-router';
import { useMemo } from 'react';

export const FilterToolbar = () => {
  const router = useRouter();
  const filters = useSearch({ from: '/_app/table/' });

  const validFilters = useMemo(() => usersTableSearchSchema.parse(filters), [filters]);
  const hasFilters = useMemo(() => Object.keys(validFilters).length > 0, [validFilters]);

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
        <AccountTypeFilter />
      </div>

      {hasFilters && (
        <Button variant='outline' onClick={clearAllFilters} className='cursor-pointer'>
          Clear All
        </Button>
      )}
    </div>
  );
};
