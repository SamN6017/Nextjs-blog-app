"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AddBlogPage() {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [url, setUrl] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState("");
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        setError("");

        const blogData = { title, content, url };
        try {
            const response = await fetch("/api/blog/add-blog", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(blogData),
            });

            const data = await response.json();

            if (response.ok) {
                // Redirect to the blogs page
                router.push("/blog");
            } else {
                setError(data.error || "Failed to create blog");
            }
        } catch (err) {
            setError("Something went wrong. Please try again.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-purple-600 via-indigo-600 to-blue-500 p-10">
            <div className="max-w-4xl mx-auto bg-white rounded-lg p-8 shadow-lg">
                <h1 className="text-4xl font-bold text-center text-gray-800 mb-8">
                    Add a New Blog
                </h1>

                {error && (
                    <div className="text-red-500 text-center mb-4">{error}</div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label
                            htmlFor="title"
                            className="block text-gray-700 font-medium mb-2"
                        >
                            Blog Title
                        </label>
                        <input
                            type="text"
                            id="title"
                            name="title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            className="w-full p-3 border border-gray-300 rounded-md"
                            required
                        />
                    </div>

                    <div>
                        <label
                            htmlFor="content"
                            className="block text-gray-700 font-medium mb-2"
                        >
                            Blog Content
                        </label>
                        <textarea
                            id="content"
                            name="content"
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                            className="w-full p-3 border border-gray-300 rounded-md"
                            rows={6}
                            required
                        />
                    </div>

                    <div>
                        <label
                            htmlFor="url"
                            className="block text-gray-700 font-medium mb-2"
                        >
                            URL (Optional)
                        </label>
                        <input
                            type="url"
                            id="url"
                            name="url"
                            value={url}
                            onChange={(e) => setUrl(e.target.value)}
                            className="w-full p-3 border border-gray-300 rounded-md"
                        />
                    </div>

                    <div className="text-center">
                        <button
                            type="submit"
                            className="w-full py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-md"
                            disabled={isSubmitting}
                        >
                            {isSubmitting ? "Creating..." : "Create Blog"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
