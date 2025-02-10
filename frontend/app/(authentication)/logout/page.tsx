"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

function page() {
    const router = useRouter();

    useEffect(() => {
        // Clear authentication-related data from localStorage
        localStorage.removeItem("authToken");
        localStorage.removeItem("_id");
        localStorage.removeItem("name");
        localStorage.removeItem("email");
        localStorage.removeItem("role");
        localStorage.removeItem("imageUrl");

        // Navigate to the login page
        router.push("/login");
    }, [router]);

    return (
        <div className="flex flex-col items-center justify-center min-h-screen text-center">
            <h1 className="text-2xl font-semibold">Log out</h1>
            <p className="mt-1 text-sm text-gray-600">
                Logging out...
            </p>
        </div>
    );
}

export default page