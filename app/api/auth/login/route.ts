import { connectToDatabase } from "@/utils/dbconnect";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { Users } from "@/models/dbmodels";
import { generateToken } from "@/utils/tokenUtils";

await connectToDatabase();

export async function POST(req: NextRequest, res: NextResponse) {
    const { email, password } = await req.json();
    const user = await Users.findOne({ email });
    if (!user) {
        console.log("User not found");
        return NextResponse.json({ error: "User not found" }, { status: 404 });
    }
    else {
        const match = await bcrypt.compare(password, user.password);
        if (!match) {
            return NextResponse.json({ error: "Invalid password" });
        }
        const token = generateToken({ id: user._id, username: user.name });
        const response = NextResponse.json({ message: "Login successful" });

        response.cookies.set({
            name: "authToken",
            value: token,
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            maxAge: 24 * 60 * 60, // 1 day
            path: "/",
        });

        return response;
    }

}



