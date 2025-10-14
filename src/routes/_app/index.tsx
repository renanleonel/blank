import { UsersTable } from '@/components/users-table';
import { users } from '@/lib/data/users';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/_app/')({
  component: Index,
});

function Index() {
  return (
    <div className='p-6 w-full h-full'>
      <UsersTable data={users} isLoading={false} />
    </div>
  );
}
