const TEAMS = [
  {
    label: 'Engineering',
    value: Team.ENGINEERING,
  },
  {
    label: 'Marketing',
    value: Team.MARKETING,
  },
  {
    label: 'Design',
    value: Team.DESIGN,
  },
  {
    label: 'Sales',
    value: Team.SALES,
  },
  {
    label: 'Support',
    value: Team.SUPPORT,
  },
];

import { FilterDropdown } from '@/components/filters/dropdown';
import { Team } from '@/containers/users/domain/enums/team';
import { useRouter, useSearch } from '@tanstack/react-router';
import { Users } from 'lucide-react';

export const TeamFilter = () => {
  const router = useRouter();
  const search = useSearch({ from: '/_app/table/' });

  const teams = search.teams ?? [];

  const onFilterChange = (teams: Team[]) => {
    router.navigate({
      to: '/table',
      replace: true,
      search: prev => ({
        ...prev,
        teams: teams.length ? teams : undefined,
      }),
    });
  };

  return (
    <FilterDropdown<Team>
      items={TEAMS}
      icon={<Users />}
      placeholder="Teams"
      filteredItems={teams}
      onFilterChange={onFilterChange}
    />
  );
};
