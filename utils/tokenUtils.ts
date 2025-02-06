import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET;

if (!JWT_SECRET) {
    throw new Error("JWT_SECRET is not defined in environment variables");
}

// Generate a JWT Token
export function generateToken(payload: object, expiresIn: string = "1d") {
    return jwt.sign(payload, JWT_SECRET, { expiresIn });
}

// Verify a JWT Token
export function verifyToken(token: string) {
    try {
        return jwt.verify(token, JWT_SECRET);
    } catch (err) {
        console.error("JWT Verification Error:", err.message);
        throw new Error(err.message);
    }
}
