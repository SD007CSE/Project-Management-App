'use client';

import { useEffect, useState } from 'react';
import { getCookie } from '../../utils/clientCookies';
import {jwtDecode} from 'jwt-decode';
import { db } from "../config/firebase";
import { collection, getDocs, doc, updateDoc } from "firebase/firestore";
import Pane from '../pane';
import { DataGrid } from '@mui/x-data-grid';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const columns = [
    { field: 'id', headerName: 'Project ID', width: 200 },
    { field: 'name', headerName: 'Project name', width: 130 },
    {
        field: 'status',
        headerName: 'Project Completion (in %)',
        width: 190,
        editable: true
    },
    {
        field: 'technologies',
        headerName: 'Tech Stack',
        width: 150,
    },
    {
        field: 'description',
        headerName: 'Project Description',
        width: 150,
    },
    {
        field: 'deadline',
        headerName: 'Project Deadline',
        width: 150,
    },
];

export default function Project() {
    const [token, setToken] = useState(null);
    const [userId, setUserId] = useState(null);
    const [employeeName,setEmployeeName] = useState([]);
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [row, setRow] = useState([]);

    useEffect(() => {
        const token = getCookie('authToken'); // Match the cookie name set in login.js
        if (token) {
            const decoded = jwtDecode(token);
            setUserId(decoded.userId);
            setToken(token);
        }
    }, []);

    useEffect(() => {
        if (userId) {
            async function fetchProjects() {
                try {
                    const projCollection = collection(db, "projects");
                    const querySnapshot = await getDocs(projCollection);
                    const userCollection = collection(db, "user");
                    const querySnapshot1 = await getDocs(userCollection);

                    if (querySnapshot.empty) {
                        console.log("No matching documents.");
                        setProjects([]);
                        setLoading(false);
                        return;
                    }


                    const empName = querySnapshot1.docs
                        .filter(doc=>doc.id===userId)
                        .map(doc=> ({
                            id: doc.id,
                            fName:doc.data()["Name"]
                        }))
                    console.log(empName[0].fName);
                    setEmployeeName(empName);
                        


                    const filteredProjects = querySnapshot.docs
                        .map(doc => ({
                            id: doc.id,
                            name: doc.data()["Name"],
                            deadline: doc.data()["Project Deadline"],
                            technologies: doc.data()["Technologies"],
                            status: doc.data()["Completion"],
                            description: doc.data()["Description"],
                            deadline: doc.data()["Deadline"],
                            assigned: doc.data()["Assigned"]
                        }))
                        .filter(project => project.assigned === userId);

                    setRow(filteredProjects);
                    


                } catch (err) {
                    console.error("Failed to fetch project data:", err);
                    setError(err.message);
                }
                setLoading(false);
            }
            fetchProjects();
        }
    }, [userId]);

    const processRowUpdate = async (newRow, oldRow) => {
        if (newRow.status !== oldRow.status) {
            try {
                const projectRef = doc(db, "projects", newRow.id);
                await updateDoc(projectRef, { Completion: newRow.status });
                toast("Updated!");
            } catch (err) {
                console.error("Failed to update project status:", err);
                setError("Failed to update project status");
                return oldRow; // Revert to the old row if update fails
            }
        }
        return newRow;
    };

    const handleProcessRowUpdateError = (error) => {
        console.error("Error updating row:", error);
        setError("Error updating row");
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    if (row.length === 0) {
        return <div>No projects found</div>;
    }

    return (
        <div>
            <Pane />
            <h1>Project Page</h1>
            <span class="ml-[258px] my-2 font-medium font-mono text-slate-100" >Hi, {employeeName[0].fName} the below table shows you the projects that are allocated to you after progress with the project you</span>
            <span class="ml-[228px] my-2 font-medium font-mono text-slate-100" >can change the project completion column for repective projects.</span>
            <div style={{ height: 400, width: '82.8%', backgroundColor: "white" }} class="ml-[250px]">
                <DataGrid
                    rows={row}
                    columns={columns}
                    initialState={{
                        pagination: {
                            paginationModel: { page: 0, pageSize: 5 },
                        },
                    }}
                    pageSizeOptions={[5, 10]}
                    processRowUpdate={processRowUpdate}
                    onProcessRowUpdateError={handleProcessRowUpdateError}
                />
                <ToastContainer
                    position="top-center"
                    autoClose={5000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                    theme="dark"
                    
                />
            </div>
        </div>
    );
}
