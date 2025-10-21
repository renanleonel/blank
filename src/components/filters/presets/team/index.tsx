const TEAMS = [
  {
    label: 'Engineering',
    value: 'Engineering',
  },
  {
    label: 'Marketing',
    value: 'Marketing',
  },
  {
    label: 'Design',
    value: 'Design',
  },
  {
    label: 'Sales',
    value: 'Sales',
  },
  {
    label: 'Support',
    value: 'Support',
  },
];

import { FilterDropdown } from '@/components/filters/dropdown';
import { useRouter, useSearch } from '@tanstack/react-router';

export const TeamFilter = () => {
  const router = useRouter();
  const search = useSearch({ from: '/_app/table/' });

  const teams = search.teams ?? [];

  const onFilterChange = (teams: string[]) => {
    router.navigate({
      to: '/table',
      replace: true,
      search: (prev) => ({ ...prev, teams: teams.length ? teams : undefined }),
    });
  };

  return <FilterDropdown items={TEAMS} filteredItems={teams} onFilterChange={onFilterChange} />;
};
