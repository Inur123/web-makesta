import { Link } from '@inertiajs/react';
import { BookOpen, FolderGit2, LayoutGrid } from 'lucide-react';
import AppLogo from '@/components/app-logo';
import { NavFooter } from '@/components/nav-footer';
import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar';
import { dashboard } from '@/routes';
import type { NavItem } from '@/types';

const mainNavItems: NavItem[] = [
    { title: 'Dashboard', href: '/dashboard', icon: LayoutGrid }
];
const ipnuNavItems: NavItem[] = [
    { title: 'Kegiatan', href: '/ipnu/kegiatan', icon: FolderGit2 }
];
const ippnuNavItems: NavItem[] = [
    { title: 'Kegiatan', href: '/ippnu/kegiatan', icon: FolderGit2 }
];

export function AppSidebar() {
    return (
        <Sidebar collapsible="icon" variant="inset">
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild className="h-auto py-2 hover:bg-transparent active:bg-transparent focus:bg-transparent data-[active=true]:bg-transparent">
                            <Link href="/dashboard" prefetch><AppLogo /></Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            <SidebarContent>
                <NavMain items={mainNavItems} label="Umum" />
                <NavMain items={ipnuNavItems} label="IPNU" />
                <NavMain items={ippnuNavItems} label="IPPNU" />
            </SidebarContent>

            <SidebarFooter>
                <NavUser />
            </SidebarFooter>
        </Sidebar>
    );
}
