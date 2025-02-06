"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import AuthLayout from "../AuthLayout";
import Link from "next/link";

export default function Login() {
    const router = useRouter();
    const [formData, setFormData] = useState({ email: "", password: "" });
    const [error, setError] = useState("");

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await axios.post("/api/auth/login", formData, { withCredentials: true });
            console.log("Login response:", response);
            if (response.status === 200) {
                router.push("/blog");
            }
            else {
                router.push("/auth/login");
            }
        } catch (err) {
            setError("Invalid credentials. Please try again.");
        }
    };

    return (
        <AuthLayout>
            <div className="w-full max-w-md mx-auto px-4 sm:px-6 lg:px-8">
                <h2 className="text-white text-2xl sm:text-3xl font-bold mb-6 text-center">Login</h2>
                {error && <p className="text-red-500 text-center mb-4">{error}</p>}
                <form onSubmit={handleSubmit} className="space-y-4 w-full">
                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full p-3 rounded bg-gray-700 text-white"
                        required
                    />
                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        value={formData.password}
                        onChange={handleChange}
                        className="w-full p-3 rounded bg-gray-700 text-white"
                        required
                    />
                    <button
                        type="submit"
                        className="w-full bg-blue-500 hover:bg-blue-600 text-white py-3 rounded transition text-lg"
                    >
                        Login
                    </button>
                </form>
                <p className="text-gray-400 mt-6 text-center text-sm sm:text-base">
                    Don't have an account? <Link href="/auth/register" className="text-blue-400 hover:underline">Register</Link>
                </p>
            </div>
        </AuthLayout>
    );
}
