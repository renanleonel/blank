import { UsersTable } from '@/containers/users/components/table';
import { createFileRoute } from '@tanstack/react-router';
import z from 'zod';

const schema = z.object({
  teams: z.array(z.string()).optional(),
});

export const Route = createFileRoute('/_app/table/')({
  component: () => <UsersTable />,
  validateSearch: schema,
});
