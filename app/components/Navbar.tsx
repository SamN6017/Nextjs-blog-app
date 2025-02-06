"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";

export default function Navbar() {
    const [username, setUsername] = useState<string | null>(null);
    const pathname = usePathname();
    const router = useRouter();

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const res = await fetch("/api/auth/me", {
                    method: "GET",
                    credentials: "include", // Important to send cookies
                });
                const data = await res.json();
                console.log("User data:", data);
                if (data.username) {
                    setUsername(data.username);
                }
            } catch (error) {
                console.error("Failed to fetch user:", error);
            }
        };

        fetchUser();
    }, []);

    const handleLogout = async () => {
        try {
            const res = await fetch("/api/auth/logout", {
                method: "POST",
                credentials: "include",
            });

            if (res.ok) {
                setUsername(null);
                router.push("/auth/login"); // Redirect to login page
            } else {
                console.error("Logout failed");
            }
        } catch (error) {
            const errorData = await res.json();
            console.error("Logout failed:", errorData.error);
        }
    };

    return (
        <nav className="bg-blue-600 text-white p-4 shadow-lg">
            <div className="max-w-7xl mx-auto flex justify-between items-center">
                <h1 className="text-2xl font-bold">My Blog</h1>
                <div className="space-x-4 flex items-center">
                    <Link href="/blogs" className="hover:underline">
                        Blogs
                    </Link>
                    <Link href="/blog/add-blog" className="hover:underline">
                        Add Blog
                    </Link>
                    {username ? (
                        <div className="flex items-center space-x-4">
                            <span className="font-semibold">{username}</span>
                            <button
                                onClick={handleLogout}
                                className="bg-red-500 px-4 py-2 rounded-md hover:bg-red-600 transition"
                            >
                                Logout
                            </button>
                        </div>
                    ) : (
                        <Link href="/auth/login" className="hover:underline">
                            Login
                        </Link>
                    )}
                </div>
            </div>
        </nav>
    );
}
