import { UsersTable } from '@/containers/users/components/table';
import { usersTableSearchSchema } from '@/lib/schemas/validate-search/users-table';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/_app/table/')({
	component: () => <UsersTable />,
	validateSearch: usersTableSearchSchema,
});
