import { UsersTable } from '@/containers/users/components/table';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/_app/')({
  component: Index,
});

function Index() {
  return (
    <div className='p-6 w-full h-full'>
      <UsersTable />
    </div>
  );
}
