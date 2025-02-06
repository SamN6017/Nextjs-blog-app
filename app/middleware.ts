import { NextResponse, NextRequest } from "next/server";

export function middleware(req: NextRequest) {
    const token = req.cookies.get("authToken")?.value;

    const protectedRoutes = ["/blog", "/blog/add-blog"]; // List of protected routes

    if (protectedRoutes.includes(req.nextUrl.pathname) && !token) {
        return NextResponse.redirect(new URL("/auth/login", req.url)); // Redirect to login
    }

    return NextResponse.next(); // Allow request to continue
}

export const config = {
    matcher: ["/blog", "/blog/add-blog"], // Protect these pages
};
