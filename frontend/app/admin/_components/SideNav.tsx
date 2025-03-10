"use client";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { FileText, Gift, Headset, House, LogOut, Settings, User } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { ComponentProps } from "react";

const SideNav = () => {
    return (
        <div className="bg-primary sticky hidden md:flex md:flex-col justify-between left-0 top-0 bottom-0 min-h-screen max-h-screen min-w-fit py-4 px-2">
            <div className="space-y-2">
                <Link href="/admin/dashboard">
                    <Image
                        src="/favicon-3.png"
                        alt="Umurava logo"
                        className="pl-3 mb-4"
                        width={50}
                        height={50}
                        priority
                    />
                </Link>
                <NavItem href="/admin/dashboard">
                    <House className="mr-2 h-5 w-5" /> Dashboard
                </NavItem>
                <NavItem href="/admin/challenges">
                    <FileText className="mr-2 h-5 w-5" /> Challenges and Hackathons
                </NavItem>
                <NavItem href="/admin/community">
                    <User className="mr-2 h-5 w-5" /> Community
                </NavItem>
            </div>
            <div>
                <NavItem href="#">
                    <Settings className="mr-2 h-5 w-5" /> Settings
                </NavItem>
                <NavItem href="#">
                    <Headset className="mr-2 h-5 w-5" /> Help Center
                </NavItem>
                <NavItem href="#">
                    <Gift className="mr-2 h-5 w-5" /> Refer family & friends
                </NavItem>
                <Link title="logout" href="/logout" className="flex items-center justify-between text-white p-3 mt-6 rounded-md hover:bg-blue-500 space-x-2">
                    <div className="flex items-center gap-2">
                        <div className="relative">
                            <Image className="bg-gray-800 border-2 border-gray-300 w-9 h-9 rounded-full object-cover" src={localStorage.getItem("imageUrl") || "/default-profile.png"} alt="profile" height={100} width={100} />
                            <span className="bottom-0 left-6 absolute w-2.5 h-2.5 bg-[#04802E] rounded-full"></span>
                        </div>
                        <div className="text-xs">
                            <p className="w-32">{localStorage.getItem("name")}</p>
                            <p className="w-32">{localStorage.getItem("email")}</p>
                        </div>
                    </div>
                    <LogOut />
                </Link>
            </div>
        </div>
    );
};

const NavItem = ({
    children,
    ...props
}: Omit<ComponentProps<typeof Link>, "className">) => {
    const pathName = usePathname();
    const currentPath = pathName?.toString() || '';

    return (
        <Link
            {...props}
            className={cn(
                "flex items-center text-white text-xs pl-3 py-3 pr-4 rounded-md hover:text-primary hover:bg-white",
                currentPath.startsWith(props.href.toString()) && "text-primary bg-white"
            )}
        >
            {children}
        </Link>
    );
};

export default SideNav;
