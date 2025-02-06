import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    try {
        console.log("in api route of Logging out user");
        const response = NextResponse.json({ message: "Logout successful" });

        response.cookies.set("authToken", "", {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: process.env.NODE_ENV === "production" ? 'none' : 'strict',
            maxAge: 0,
        });

        return response;
    } catch (error) {
        console.error('Error during logout:', error);
        return NextResponse.json({ error: 'Logout failed' }, { status: 500 });
    }
}