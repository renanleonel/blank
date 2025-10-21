const STATUS = [
  {
    label: 'Active',
    value: 'active',
  },
  {
    label: 'Inactive',
    value: 'inactive',
  },
  {
    label: 'Suspended',
    value: 'suspended',
  },
];

import { FilterDropdown } from '@/components/filters/dropdown';
import { useRouter, useSearch } from '@tanstack/react-router';

export const StatusFilter = () => {
  const router = useRouter();
  const search = useSearch({ from: '/_app/table/' });

  const status = search.status ?? [];

  const onFilterChange = (status: string[]) => {
    router.navigate({
      to: '/table',
      replace: true,
      search: (prev) => ({ ...prev, status: status.length ? status : undefined }),
    });
  };

  return <FilterDropdown items={STATUS} filteredItems={status} onFilterChange={onFilterChange} />;
};
