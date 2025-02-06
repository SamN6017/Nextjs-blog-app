"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import AuthLayout from "../AuthLayout";

export default function Register() {
    const router = useRouter();
    const [formData, setFormData] = useState({ name: "", email: "", password: "" });
    const [error, setError] = useState("");

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await axios.post("/api/auth/register", formData, { withCredentials: true });

            if (response.status === 201) {
                router.push("/auth/login");
            }
        } catch (err) {
            setError("Registration failed. Please try again.");
        }
    };

    return (
        <AuthLayout>
            <h2 className="text-white text-2xl font-bold mb-6 text-center">Register</h2>
            {error && <p className="text-red-500 text-center">{error}</p>}
            <form onSubmit={handleSubmit} className="space-y-4 w-full">
                <input
                    type="text"
                    name="name"
                    placeholder="Full Name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full p-3 rounded bg-gray-700 text-white"
                    required
                />
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
                    className="w-full bg-green-500 hover:bg-green-600 text-white py-2 rounded transition"
                >
                    Register
                </button>
            </form>
            <p className="text-gray-400 mt-4 text-center">
                Already have an account? <a href="/auth/login" className="text-blue-400">Login</a>
            </p>
        </AuthLayout>
    );
}
