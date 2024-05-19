import { NextRequest, NextResponse } from "next/server";
import { db } from "../../../config/firebase";
import { collection, query, where, getDocs } from "firebase/firestore";
import bcrypt from "bcryptjs";
import jwt from 'jsonwebtoken'; // Import jsonwebtoken

export const POST = async (NextRequest) => {
    try {
        const userCollection = collection(db, "user");
        const body = await NextRequest.json();
        const { Email, Password } = body;

        if (!Email || !Password) {
            return new Response("Email and password are required", { status: 401 });
        }

        const userQuery = query(userCollection, where('Email', '==', Email));
        const querySnapshot = await getDocs(userQuery);

        if (querySnapshot.empty) {
            console.log("No matching documents.");
            return new Response("User not found", { status: 404 });
        }

        const userDoc = querySnapshot.docs[0];
        const userData = userDoc.data();


        const passwordMatch = await bcrypt.compare(Password, userData.Password);
        if (!passwordMatch) {
            console.log("Passwords do not match.");
            return new Response("Invalid login credentials", { status: 401 });
        }
        console.log("User Data: "+userData);

        // User is authenticated, generate a JWT
        const token = jwt.sign(
            { userId: userDoc.id,role: userData.Role }, // Payload
            process.env.JWT_SECRET, // Secret key from environment variable
            { expiresIn: '1d' } // Token expiration time
        );

        console.log("Login successful");

        // Create a NextResponse object to set the cookie
        const response = NextResponse.json({ token });
        response.cookies.set('authToken', token, {
            httpOnly: false,
        });
        console.log(response.cookies);

        return response;

    } catch (error) {
        console.error(error);
        return new Response("Server error occurred", { status: 500 });
    }
};
