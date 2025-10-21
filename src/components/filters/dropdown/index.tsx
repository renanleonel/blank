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

type Item<T> = {
	label: string;
	value: T;
};

type FilterDropdownProps<T> = {
	items: Item<T>[];
	placeholder: string;
	filteredItems: T[];
	onFilterChange: (nextSelected: T[]) => void;
};

export const FilterDropdown = <T,>({
	items,
	placeholder,
	filteredItems,
	onFilterChange,
}: FilterDropdownProps<T>) => {
	const [isOpen, setIsOpen] = useState(false);

	const updateSearch = (nextSelected: T[]) => {
		onFilterChange(nextSelected);
	};

	const handleToggleItem = (item: Item<T>) => (checked: Checked) => {
		const isSelected = filteredItems.includes(item.value);

		if (checked && !isSelected) {
			updateSearch([...filteredItems, item.value]);
			return;
		}

		if (!checked && isSelected) {
			updateSearch(filteredItems.filter(value => value !== item.value));
			return;
		}
	};

	const firstItem = filteredItems[0] as string;

	return (
		<DropdownMenu onOpenChange={setIsOpen}>
			<DropdownMenuTrigger asChild>
				<Button
					variant="outline"
					className="flex items-center gap-2 cursor-pointer"
				>
					<span>{firstItem ?? placeholder}</span>

					{filteredItems.length > 1 && (
						<span className="inline-flex tabular-nums items-center justify-center rounded-full bg-muted px-2 py-0.5 text-xs text-foreground/80">
							+{filteredItems.length - 1}
						</span>
					)}

					{filteredItems.length > 0 && (
						<span
							role="button"
							aria-label="Clear selected items"
							onClick={() => updateSearch([])}
							onPointerDown={e => {
								e.preventDefault();
								e.stopPropagation();
							}}
							className="inline-flex size-4 items-center justify-center rounded-full bg-foreground/10 text-foreground/70 hover:bg-foreground/20 hover:text-foreground"
						>
							<X className="size-2 shrink-0" />
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
			<DropdownMenuContent className="w-fit" align="start">
				{items.map(item => {
					const isChecked = filteredItems.includes(item.value);

					return (
						<DropdownMenuCheckboxItem
							key={String(item.value)}
							checked={isChecked}
							className="cursor-pointer"
							onCheckedChange={handleToggleItem(item)}
							onSelect={e => e.preventDefault()}
						>
							{item.label}
						</DropdownMenuCheckboxItem>
					);
				})}
			</DropdownMenuContent>
		</DropdownMenu>
	);
};
