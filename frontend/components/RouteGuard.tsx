"use client";
import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { setRole } from "@/lib/features/authentication/authSlice";

const Unauthorized = () => (
  <div className="flex flex-col items-center justify-center min-h-screen text-center">
    <h1 className="text-2xl font-semibold">Unauthorized</h1>
    <p className="mt-1 text-sm text-gray-600">You do not have access to this page.</p>
    <button
      onClick={() => window.history.back()}
      className="mt-6 text-sm text-blue-500 hover:underline"
    >
      Go back
    </button>
  </div>
);

export default function RouteGuard({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const dispatch = useDispatch();
  const [isAuthorized, setIsAuthorized] = useState<boolean | null>(null);

  useEffect(() => {
    const authToken = localStorage.getItem("authToken");
    const role = localStorage.getItem("role");

    // Check if the route needs authentication
    const isTalentRoute = pathname.startsWith("/talent/");
    const isAdminRoute = pathname.startsWith("/admin/");

    if (!isTalentRoute && !isAdminRoute) {
      setIsAuthorized(true); // Allow public routes
      return;
    }

    // If no authToken, redirect to login
    if (!authToken) {
      router.push("/login");
      return;
    }

    // Check role-based access
    if ((isTalentRoute && role !== "talent") || (isAdminRoute && role !== "admin")) {
      setIsAuthorized(false); // Show Unauthorized page
      return;
    }

    if (role == "talent") dispatch(setRole("talent"));
    if (role == "admin") dispatch(setRole("admin"));

    setIsAuthorized(true); // Allow access
  }, [pathname, router]);

  if (isAuthorized === null) return null; // Avoid flickering before checking auth

  return isAuthorized ? <>{children}</> : <Unauthorized />;
}
