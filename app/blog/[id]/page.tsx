"use client";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

export default function BlogDetailsPage() {
    const { id } = useParams(); // Get blog ID from the URL
    const router = useRouter();
    const [blog, setBlog] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [loggedInUser, setLoggedInUser] = useState<string | null>(null);

    useEffect(() => {
        const fetchBlog = async () => {
            try {
                const response = await fetch(`/api/blog/${id}`);
                const data = await response.json();
                if (response.ok) {
                    setBlog(data);
                } else {
                    setError(data.error || "Failed to fetch blog");
                }
            } catch (err) {
                setError("Something went wrong. Please try again.");
            } finally {
                setLoading(false);
            }
        };

        const fetchUser = async () => {
            try {
                const res = await fetch("/api/auth/me", {
                    method: "GET",
                    credentials: "include",
                });
                const userData = await res.json();
                console.log("User data:", userData);
                if (userData.username) {
                    setLoggedInUser(userData.id);
                }
            } catch (error) {
                console.error("Failed to fetch user:", error);
            }
        };

        if (id) {
            fetchBlog();
            fetchUser();
        }
    }, [id]);

    const handleDelete = async () => {
        if (!confirm("Are you sure you want to delete this blog?")) return;
        try {
            const res = await fetch(`/api/blog/${id}`, {
                method: "DELETE",
                credentials: "include",
            });

            if (res.ok) {
                alert("Blog deleted successfully!");
                router.push("/blogs"); // Redirect after deletion
            } else {
                const data = await res.json();
                alert(data.error || "Failed to delete blog.");
            }
        } catch (error) {
            console.error("Error deleting blog:", error);
        }
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <p className="text-gray-500">Loading...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex justify-center items-center h-screen">
                <p className="text-red-500">{error}</p>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-purple-600 via-indigo-600 to-blue-500 p-10">
            <div className="max-w-3xl mx-auto bg-white rounded-lg p-8 shadow-lg relative">
                {/* Date */}
                <p className="absolute top-4 left-4 text-gray-500 text-sm">
                    {new Date(blog.createdAt).toLocaleDateString()}
                </p>

                {/* Thumbnail Image */}
                {blog.thumbnailUrl && (
                    <img
                        src={blog.thumbnailUrl}
                        alt="Blog Thumbnail"
                        className="w-full h-64 object-cover rounded-lg mb-4"
                    />
                )}

                {/* Blog Title */}
                <h1 className="text-4xl font-bold text-gray-800 mb-4">
                    {blog.title}
                </h1>

                {/* Blog Content */}
                <p className="text-gray-600">{blog.content}</p>

                {/* Read More Link */}
                {blog.url && (
                    <div className="mt-6">
                        <a
                            href={blog.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-500 hover:underline"
                        >
                            Read more
                        </a>
                    </div>
                )}

                {/* Author */}
                <p className="text-gray-700 mt-6">
                    <strong>Author:</strong> {blog.author}
                </p>

                {/* Edit & Delete Buttons for Author Only */}
                {loggedInUser === blog.author && (
                    <div className="mt-4 flex space-x-4">
                        <button
                            onClick={() => router.push(`/blog/edit/${id}`)}
                            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                        >
                            Edit
                        </button>
                        <button
                            onClick={handleDelete}
                            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                        >
                            Delete
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}
