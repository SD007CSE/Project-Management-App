import { NextResponse } from "next/server";

export const GET = async (request) => {
    try {
        console.log("Logout successful");

        // Create a NextResponse object to clear the cookie
        const response = NextResponse.json({ message: "Logout successful" });
        response.cookies.set('authToken', '', {
            httpOnly: true, // Set httpOnly to true for security
            expires: new Date(0),
            path: '/',
            secure: process.env.NODE_ENV === 'production',
        });

        return response;

    } catch (error) {
        console.error(error);
        return new Response("Server error occurred", { status: 500 });
    }
};
