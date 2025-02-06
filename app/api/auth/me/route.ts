import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/utils/dbconnect";
import { Users } from "@/models/dbmodels";
import jwt from "jsonwebtoken";

export async function GET(req: NextRequest, res: NextResponse) {
    const token = req.cookies.get("authToken")?.value;
    if (!token) {
        return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
    }
    await connectToDatabase();
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET as string);
        console.log("Decoded token:", decoded);
        const userName = await Users.findById(decoded.id);
        return NextResponse.json({ username: userName?.name, id: userName?._id });
    } catch (error) {
        return NextResponse.json({ error: "Invalid token" }, { status: 401 });
    }
}
