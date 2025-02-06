import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/utils/dbconnect";
import bcrypt from "bcrypt";
import { Users } from "@/models/dbmodels";

export async function POST(req: NextRequest) {
    await connectToDatabase();

    const { name, email, password } = await req.json();

    console.log("Request received\n", name, email, password);

    if (!email || !password) {
        return NextResponse.json({ error: "Email and password are required" }, { status: 400 });
    }

    // Check for existing user (commented out for now)
    const existingUser = await Users.findOne({ email });
    if (existingUser) {
        return NextResponse.json({ error: "User already exists" }, { status: 404 });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new Users({ name, email, password: hashedPassword });
    await newUser.save();

    console.log("User created successfully\n", newUser);

    return NextResponse.json({ message: "User registered successfully" }, { status: 201 });;
}