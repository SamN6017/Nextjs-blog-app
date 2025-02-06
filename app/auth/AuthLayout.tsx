import React from "react";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="min-h-screen flex flex-col md:flex-row">
            {/* Left Panel - Form Section */}
            <div className="w-full md:w-1/3 lg:w-1/4 bg-gray-800 flex flex-col items-center justify-center p-6 shadow-lg">
                {children}
            </div>

            {/* Right Panel - Gradient Background with Text */}
            <div className="w-full md:w-2/3 lg:w-3/4 flex justify-center items-center relative">
                {/* Gradient Background */}
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500 via-blue-500 to-indigo-600"></div>

                {/* Graphic Content */}
                <div className="relative z-10 text-center text-white p-10">
                    <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold">Expand your thoughts</h1>
                    <p className="text-base md:text-lg mt-4 opacity-90">
                        Join us and experience a revolutionary way to connect.
                    </p>
                </div>
            </div>
        </div>
    );
}
