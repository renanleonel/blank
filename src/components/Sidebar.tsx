import {
	Sidebar as SidebarComponent,
	SidebarContent,
	SidebarGroup,
	SidebarGroupContent,
	SidebarHeader,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
} from '@/components/ui/sidebar';
import { Link } from '@tanstack/react-router';

type SidebarProps = {
	items: {
		label: string;
		icon: string;
		href: string;
	}[];
	className?: string;
};

export function Sidebar({ items, className }: SidebarProps) {
	return (
		<SidebarComponent className={className}>
			<SidebarHeader className="bg-[#F3F3F3]">
				<div className="flex items-center gap-2 px-4 py-2">
					<Link
						to="/"
						className="flex h-8 w-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground"
					>
						<span className="text-sm font-bold">b</span>
					</Link>
					<div className="grid flex-1 text-left text-sm leading-tight">
						<span className="truncate font-semibold">blank</span>
					</div>
				</div>
			</SidebarHeader>
			<SidebarContent className="bg-[#F3F3F3]">
				<SidebarGroup>
					<SidebarGroupContent>
						<SidebarMenu>
							{items.map(item => (
								<SidebarMenuItem key={item.label}>
									<SidebarMenuButton asChild>
										<Link to={item.href}>{item.label}</Link>
									</SidebarMenuButton>
								</SidebarMenuItem>
							))}
						</SidebarMenu>
					</SidebarGroupContent>
				</SidebarGroup>
			</SidebarContent>
		</SidebarComponent>
	);
}
