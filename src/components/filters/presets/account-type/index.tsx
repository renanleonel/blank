const ACCOUNT_TYPES = [
  {
    label: "Company",
    value: UserAccountType.COMPANY,
  },
  {
    label: "Individual",
    value: UserAccountType.INDIVIDUAL,
  },
];

import { FilterDropdown } from "@/components/filters/dropdown";
import { UserAccountType } from "@/containers/users/domain/enums/user-account-type";
import { useRouter, useSearch } from "@tanstack/react-router";

export const AccountTypeFilter = () => {
  const router = useRouter();
  const search = useSearch({ from: "/_app/table/" });

  const accountTypes = search.accountTypes ?? [];

  const onFilterChange = (accountTypes: UserAccountType[]) => {
    router.navigate({
      to: "/table",
      replace: true,
      search: (prev) => ({
        ...prev,
        accountTypes: accountTypes.length ? accountTypes : undefined,
      }),
    });
  };

  return (
    <FilterDropdown<UserAccountType>
      items={ACCOUNT_TYPES}
      placeholder="Account Types"
      filteredItems={accountTypes}
      onFilterChange={onFilterChange}
    />
  );
};
