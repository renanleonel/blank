import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { createFileRoute, useNavigate } from '@tanstack/react-router';
import { Table } from 'lucide-react';

type RouteCard = {
  title: string;
  description: string;
  icon: React.ElementType;
  href: string;
  color: string;
};

const ROUTE_CARDS: RouteCard[] = [
  {
    title: 'Table',
    description:
      'A virtualized TanStack table using TanStack Virtual, Router and Table',
    icon: Table,
    href: '/table',
    color: 'bg-blue-500',
  },
];

export const Route = createFileRoute('/_app/')({
  component: Index,
});

function Index() {
  const navigate = useNavigate();

  const handleCardClick = (href: string) => navigate({ to: href });

  return (
    <div className="p-6 w-full h-full">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Dashboard</h1>
        <p className="text-gray-600">Choose a section to get started</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {ROUTE_CARDS.map(card => {
          const IconComponent = card.icon;
          return (
            <Card
              key={card.title}
              className="transition-all duration-200 border-gray-200 hover:border-gray-300"
            >
              <CardHeader className="pb-4">
                <div
                  className={cn(
                    'w-12 h-12 rounded-lg flex items-center justify-center mb-4',
                    card.color
                  )}
                >
                  <IconComponent className="w-6 h-6 text-white" />
                </div>
                <CardTitle className="text-xl">{card.title}</CardTitle>
                <CardDescription className="text-sm text-gray-600">
                  {card.description}
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-0">
                <Button
                  variant="outline"
                  className="w-full cursor-pointer"
                  onClick={e => {
                    e.stopPropagation();
                    handleCardClick(card.href);
                  }}
                >
                  Open
                </Button>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
