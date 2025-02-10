import type { Metadata } from "next";
import { Nav, NavItem } from "./_components/Nav";
import Footer from "./_components/Footer";

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
            <body
                className='antialiased'
            >
                <Nav>
                    <NavItem href='/'>Home</NavItem>
                    <NavItem href='/challenges'>Challenge & Hackathons</NavItem>
                    <NavItem href='/institutions'>For Eductional Institutions</NavItem>
                    <NavItem href='/about-us'>About Us</NavItem>
                </Nav>
                {children}
                <Footer />
            </body>
        </html>
    );
}
