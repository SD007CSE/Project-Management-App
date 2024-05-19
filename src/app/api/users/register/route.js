import { NextRequest, NextResponse } from "next/server";
import { db } from "../../../config/firebase";
import { collection, addDoc } from "firebase/firestore";
import bcrypt from "bcryptjs";

export const POST = async (NextRequest) => {
    try {
        const userCollection = collection(db, "user");
        const body = await NextRequest.json();
        const { Name, Email, Password, Role } = body;

        if (!Name || !Email || !Password || !Role) {
            return new Response("Name, email, password, and role are required", { status: 400 });
        }

        // Hash the password
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(Password, salt);

        // Add the user to the Firestore collection
        const docRef = await addDoc(userCollection, { Role, Name, Email, Password: hash });

        // If the document reference is successfully returned, the user was saved successfully
        if (docRef.id) {
            console.log("User saved successfully with ID:", docRef.id);
            return new Response(JSON.stringify({ message: "User saved successfully", userId: docRef.id }), {
                status: 200,
                headers: {
                    'Content-Type': 'application/json',
                },
            });
        } else {
            throw new Error('Failed to save user');
        }
    } catch (error) {
        console.error(error);
        return new Response(JSON.stringify({ error: "An error occurred" }), {
            status: 500,
            headers: {
                'Content-Type': 'application/json',
            },
        });
    }
};
