"use client";
import { useEffect, useState } from "react";

export default function BlogPage() {
    const [blogs, setBlogs] = useState([]);

    useEffect(() => {
        fetch("/api/blog")
            .then((res) => res.json())
            .then((data) => setBlogs(data))
            .catch((error) => console.error("Error fetching blogs:", error));
    }, []);

    return (
        <div className="min-h-screen bg-gradient-to-br from-purple-600 via-indigo-600 to-blue-500 p-10">
            <div className="max-w-6xl mx-auto">
                <h1 className="text-4xl font-bold text-white text-center mb-8">
                    Explore Blogs
                </h1>
                {blogs.length === 0 ? (
                    <p className="text-white text-center">No blogs available.</p>
                ) : (
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {blogs.map((blog: any) => (
                            <div
                                key={blog._id}
                                className="bg-white/10 backdrop-blur-lg p-6 rounded-lg shadow-lg transition transform hover:scale-105"
                            >
                                <h2 className="text-2xl font-semibold text-white">
                                    {blog.title}
                                </h2>
                                <p className="text-gray-300 mt-2 line-clamp-3">{blog.content}</p>
                                <a
                                    href={`/blog/${blog._id}`}
                                    className="inline-block mt-4 text-blue-300 hover:underline"
                                >
                                    Read More →
                                </a>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
