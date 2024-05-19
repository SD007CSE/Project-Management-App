import { db } from "../../../config/firebase";
import { collection, addDoc } from "firebase/firestore";

export const POST = async (NextRequest) => {
    try {
        console.log("backend");
        const projCollection = collection(db, "projects");
        const body = await NextRequest.json();
        console.log(body);
        const { name, deadline, technologies, description, completion, assigned } = body;

        // Add the document to Firestore
        const docRef = await addDoc(projCollection, {
            Name: name,
            Deadline: deadline,
            Technologies:technologies,
            Description:description,
            Completion:completion,
            Assigned:assigned
        });

        console.log("Document written with ID: ", docRef.id);

        // Return a success response
        return new Response(JSON.stringify({ message: "Project saved successfully" }));
    } catch (error) {
        console.error("Error adding document: ", error);
        // Return an error response
        return new Response(JSON.stringify({ error: "Error saving project" }), { status: 500 });
    }
}
