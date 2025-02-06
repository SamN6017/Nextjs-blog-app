import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { Blogs, Users } from "@/models/dbmodels";
import { connectToDatabase } from "@/utils/dbconnect";

export async function GET(req: NextRequest, context: { params: { id: string } }) {
    try {
        const blogid = context.params.id;
        await connectToDatabase(); // Extracting blog ID from URL
        if (!blogid) {
            return NextResponse.json({ error: "Blog ID is required" }, { status: 400 });
        }

        const blog = await Blogs.findById(blogid);
        if (!blog) {
            return NextResponse.json({ error: "Blog not found" }, { status: 404 });
        }

        return NextResponse.json(blog);
    } catch (error) {
        console.error("Error fetching blog:", error);
        return NextResponse.json({ error: "Server error" }, { status: 500 });
    }
}

export async function PUT(req: NextRequest, res: NextResponse) {
    const blogid = req.query.id;
    const token = req.cookies.get("authToken")?.value;
    const { title, content, url } = await req.json();

    if (!token) {
        return NextResponse.json({ error: "Unauthorized" });
    }
    const userId = jwt.verify(token, String(process.env.JWT_SECRET)).id;
    const updatedBlog = await Blogs.findOneAndUpdate({ _id: blogid }, { title, content, url });
    return NextResponse.json({ message: "Blog updated successfully" });
}

export async function DELETE(req: NextRequest) {
    try {
        // Extract ID from the URL
        const { pathname } = req.nextUrl;
        const blogid = pathname.split("/").pop();
        const token = req.cookies.get("authToken")?.value;

        if (!token) {
            return NextResponse.json({ error: "Unauthorized" });
        }
        const userId = jwt.verify(token, String(process.env.JWT_SECRET)).id;
        const deletedBlog = await Blogs.findOneAndDelete({ _id: blogid });
        return NextResponse.json({ message: "Blog deleted successfully" });
    }
    catch (error) {
        console.error("Error deleting blog:", error);
        return NextResponse.json({ error: "Server error" }, { status: 500 });
    }
}