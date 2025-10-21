const STATUS = [
	{
		label: 'Active',
		value: UserStatus.ACTIVE,
	},
	{
		label: 'Inactive',
		value: UserStatus.INACTIVE,
	},
	{
		label: 'Suspended',
		value: UserStatus.SUSPENDED,
	},
];

import { FilterDropdown } from '@/components/filters/dropdown';
import { UserStatus } from '@/containers/users/domain/enums/user-status';
import { useRouter, useSearch } from '@tanstack/react-router';

export const StatusFilter = () => {
	const router = useRouter();
	const search = useSearch({ from: '/_app/table/' });

	const status = search.status ?? [];

	const onFilterChange = (status: UserStatus[]) => {
		router.navigate({
			to: '/table',
			replace: true,
			search: prev => ({
				...prev,
				status: status.length ? status : undefined,
			}),
		});
	};

	return (
		<FilterDropdown<UserStatus>
			items={STATUS}
			placeholder="Status"
			filteredItems={status}
			onFilterChange={onFilterChange}
		/>
	);
};
