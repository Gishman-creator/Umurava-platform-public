import type { Metadata } from "next";
import SideNav from "./_components/SideNav";
import Nav from "./_components/Nav";

export const metadata: Metadata = {
    title: "Umurava",
    description: "Build Work Experience Through Skills Challenges Program",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className="antialiased">
                <div className="bg-[#F9FAFB] flex">
                    <SideNav />
                    <div className="w-full">
                        <Nav />
                        {children}
                    </div>
                </div>
            </body>
        </html>
    );
}
