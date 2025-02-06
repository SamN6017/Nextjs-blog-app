"use client";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  return (
    <div className="h-screen w-screen flex">
      {/* Left Panel - 20% width */}
      <div className="w-1/5 bg-black/70 flex flex-col justify-center items-center text-white p-6 shadow-lg">
        <h1 className="text-3xl font-bold mb-6">Welcome!</h1>
        <button
          onClick={() => router.push("/auth/login")}
          className="w-full py-2 px-4 bg-blue-500 hover:bg-blue-600 transition rounded-md mb-4"
        >
          Sign In
        </button>
        <button
          onClick={() => router.push("/auth/register")}
          className="w-full py-2 px-4 bg-green-500 hover:bg-green-600 transition rounded-md"
        >
          Register
        </button>
      </div>

      {/* Right Panel - 80% width */}
      <div className="w-4/5 flex justify-center items-center relative">
        {/* Gradient Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-purple-500 via-blue-500 to-indigo-600"></div>

        {/* Graphic Content */}
        <div className="relative z-10 text-center text-white p-10">
          <h1 className="text-5xl font-bold">Expand your thoughts</h1>
          <p className="text-lg mt-4 opacity-90">
            Join us and experience a revolutionary way to connect.
          </p>
        </div>
      </div>
    </div>
  );
}
