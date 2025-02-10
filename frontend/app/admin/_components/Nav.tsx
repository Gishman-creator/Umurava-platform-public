"use client";
import { Bell, FileText, Gift, Headset, House, LogOut, Search, Settings, User } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { cn } from "@/lib/utils";

function Nav() {
    const pathName = usePathname();

    return (
        <div className='bg-white flex justify-between items-center sticky top-0 py-3 px-8 z-20'>
            <div className="bg-gray-50 shadow-sm h-fit w-1/2 flex items-center p-1 pl-3 space-x-2 rounded-md">
                <Search className='h-4 w-4 text-gray-400' />
                <input className="bg-gray-50 h-6 w-full outline-none ring-0 focus:ring-0 focus:outline-none text-xs" type="text" placeholder="Search here" />
            </div>
            <DropdownMenu>
                <DropdownMenuTrigger>
                    <div className='flex items-center gap-2'>
                        <div className='bg-gray-100 hover:bg-gray-200 flex justify-center items-center cursor-pointer rounded-full w-fit p-2'>
                            <Bell className='text-gray-600 h-5 w-5' />
                        </div>
                        <Image className="bg-gray-800 hover:bg-gray-700 cursor-pointer w-9 h-9 rounded-full object-cover" src={localStorage.getItem("imageUrl") || "/default-profile.png"} alt="profile" height={100} width={100} />
                    </div>
                </DropdownMenuTrigger>
                <DropdownMenuContent className='p-4 w-fit'>
                    <NavItem href="/talent/dashboard"><House className="h-5 w-5" /> Dashboard</NavItem>
                    <NavItem href="/talent/challenges"><FileText className="h-5 w-5" /> Challenges and Hackathons</NavItem>
                    <NavItem href="/talent/community"><User className="h-5 w-5" /> Community</NavItem>
                    <DropdownMenuSeparator />
                    <NavItem href="#"><Settings className="h-5 w-5" /> Settings</NavItem>
                    <NavItem href="#"><Headset className="h-5 w-5" /> Help Center</NavItem>
                    <NavItem href="#"><Gift className="h-5 w-5" /> Refer family & friends</NavItem>
                    <DropdownMenuSeparator />
                    <NavItem href="/logout"><LogOut className="h-5 w-5" /> Log out</NavItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    );
}

const NavItem = ({ href, children }: { href: string; children: React.ReactNode }) => {
    const pathName = usePathname();
    const isActive = pathName.startsWith(href);

    return (
        <Link
            href={href}
            className={cn(
                "flex items-center gap-2 text-sm text-gray-700 hover:bg-gray-100 p-2 rounded-md",
                isActive && "text-primary"
            )}
        >
            {children}
        </Link>
    );
};

export default Nav;
