const ACCOUNT_TYPES = [
  {
    label: 'Company',
    value: 'company',
  },
  {
    label: 'Individual',
    value: 'individual',
  },
];

import { FilterDropdown } from '@/components/filters/dropdown';
import { useRouter, useSearch } from '@tanstack/react-router';

export const AccountTypeFilter = () => {
  const router = useRouter();
  const search = useSearch({ from: '/_app/table/' });

  const accountTypes = search.accountTypes ?? [];

  const onFilterChange = (accountTypes: string[]) => {
    router.navigate({
      to: '/table',
      replace: true,
      search: (prev) => ({ ...prev, accountTypes: accountTypes.length ? accountTypes : undefined }),
    });
  };

  return (
    <FilterDropdown
      items={ACCOUNT_TYPES}
      filteredItems={accountTypes}
      onFilterChange={onFilterChange}
    />
  );
};
