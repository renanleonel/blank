import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { cn } from '@/lib/utils';

import { DropdownMenuCheckboxItemProps } from '@radix-ui/react-dropdown-menu';
import { ChevronDown, X } from 'lucide-react';
import { useState } from 'react';

type Checked = DropdownMenuCheckboxItemProps['checked'];

type Item = {
  label: string;
  value: string;
};

type FilterDropdownProps = {
  items: Item[];
  filteredItems: string[];
  onFilterChange: (nextSelected: string[]) => void;
};

export const FilterDropdown = ({ items, filteredItems, onFilterChange }: FilterDropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const updateSearch = (nextSelected: string[]) => {
    onFilterChange(nextSelected);
  };

  const handleToggleItem = (item: Item) => (checked: Checked) => {
    const isSelected = filteredItems.includes(item.value);

    if (checked && !isSelected) {
      updateSearch([...filteredItems, item.value]);
      return;
    }

    if (!checked && isSelected) {
      updateSearch(filteredItems.filter((value) => value !== item.value));
      return;
    }
  };

  return (
    <DropdownMenu onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild>
        <Button variant='outline' className='flex items-center gap-2 cursor-pointer'>
          <span>{filteredItems[0] ?? 'All'}</span>

          {filteredItems.length > 1 && (
            <span className='inline-flex tabular-nums items-center justify-center rounded-full bg-muted px-2 py-0.5 text-xs text-foreground/80'>
              +{filteredItems.length - 1}
            </span>
          )}

          {filteredItems.length > 0 && (
            <span
              role='button'
              aria-label='Clear selected items'
              onClick={() => updateSearch([])}
              onPointerDown={(e) => {
                e.preventDefault();
                e.stopPropagation();
              }}
              className='inline-flex size-4 items-center justify-center rounded-full bg-foreground/10 text-foreground/70 hover:bg-foreground/20 hover:text-foreground'>
              <X className='size-2 shrink-0' />
            </span>
          )}

          <ChevronDown
            className={cn(
              'size-3.5 transition-transform duration-200',
              isOpen ? 'rotate-180' : 'rotate-0'
            )}
          />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className='w-56'>
        {items.map((item) => {
          const isChecked = filteredItems.includes(item.value);
          return (
            <DropdownMenuCheckboxItem
              key={item.value}
              checked={isChecked}
              className='cursor-pointer'
              onCheckedChange={handleToggleItem(item)}>
              {item.label}
            </DropdownMenuCheckboxItem>
          );
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
