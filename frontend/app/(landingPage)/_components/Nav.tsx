"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useState } from "react";
import { Menu, X } from "lucide-react"; // Import icons

const Nav = ({ children }: { children: React.ReactNode }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            {/* Top Nav */}
            <nav className="bg-white flex items-center justify-between font-dm-sans py-3 px-6 md:px-14 fixed top-0 left-0 right-0 z-10">
                {/* Logo & Name */}
                <div className="flex items-center gap-2 font-bold">
                    <Image
                        src="/favicon-2.png"
                        alt="Umurava logo"
                        width={40}
                        height={40}
                        priority
                    />
                    <p className="text-base hover:text-primary">Umurava</p>
                </div>

                <div className='hidden lg:flex w-7/12 items-center justify-evenly'>
                    {children}
                </div>

                <Button className="hidden lg:flex bg-secondary text-white text-xs">
                    <Link href="/signup">Join the Program</Link>
                </Button>

                {/* Hamburger Menu (Visible on md screens and above) */}
                <button
                    className="block lg:hidden text-gray-700 hover:text-primary focus:outline-none"
                    onClick={() => setIsOpen(!isOpen)}
                >
                    {isOpen ? <X size={28} /> : <Menu size={28} />}
                </button>
            </nav>

            {/* Side Navbar */}
            <aside
                className={cn(
                    "fixed top-0 right-0 h-full w-64 bg-white shadow-lg transform transition-transform duration-300 z-20",
                    isOpen ? "translate-x-0" : "translate-x-full"
                )}
            >
                {/* Close Button */}
                <button
                    className="absolute top-4 right-4 text-gray-700 hover:text-primary"
                    onClick={() => setIsOpen(false)}
                >
                    <X size={24} />
                </button>

                {/* Nav Links */}
                <div className="mt-16 flex flex-col items-start space-y-6 px-6">
                    {children}
                </div>

                {/* CTA Button */}
                <div className="absolute bottom-6 left-6 right-6">
                    <Button className="w-full bg-secondary text-white text-xs">
                        Join the Program
                    </Button>
                </div>
            </aside>
        </>
    );
};

const NavItem = (props: Omit<React.ComponentProps<typeof Link>, "className">) => {
    const pathName = usePathname();
    return (
        <Link
            {...props}
            className={cn(
                "flex items-center text-sm hover:text-primary",
                pathName === props.href && "text-primary"
            )}
        />
    );
};

export { Nav, NavItem };
