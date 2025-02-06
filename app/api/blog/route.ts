import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/utils/dbconnect";
import { Blogs, Users } from "@/models/dbmodels";


export async function GET(req: NextRequest, res: NextResponse) {
    await connectToDatabase();
    const blogs = await Blogs.find();
    return NextResponse.json(blogs);
}