import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/utils/dbconnect";
import jwt from "jsonwebtoken";
import { Blogs, Users } from "@/models/dbmodels";

export async function POST(req: NextRequest, res: NextResponse) {
    await connectToDatabase();
    const token = req.cookies.get("authToken")?.value;
    const { title, content, url } = await req.json();
    if (!token) {
        return NextResponse.json({ error: "Unauthorized" });
    }
    const userId = jwt.verify(token, String(process.env.JWT_SECRET)).id;
    const author = await Users.findOne({ _id: userId });
    const newBlog = new Blogs({ title, content, url, author });
    await newBlog.save();
    return NextResponse.json({ message: "Blog added successfully" });
}