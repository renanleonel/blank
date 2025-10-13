import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/_app/table/')({
  component: Table,
});

function Table() {
  return <div>Table</div>;
}
