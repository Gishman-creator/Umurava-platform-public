import type { Metadata } from "next";
import "./globals.css";
import StoreProvider from "@/lib/StoreProvider";
import RouteGuard from "@/components/RouteGuard";

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
    <StoreProvider>
      <html lang="en">
        <body className="antialiased">
          <RouteGuard>{children}</RouteGuard>
        </body>
      </html>
    </StoreProvider>
  );
}
