"use client"

import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { useState, useEffect } from 'react';
import { db } from "../config/firebase";

import { collection, getDocs } from "firebase/firestore";
import Pane from '../pane';
import Boxes from './box';
import './style.css';





const columns = [
    { field: 'id', headerName: 'Project ID', width: 200 },
    { field: 'name', headerName: 'Project name', width: 130 },
    {
        field: 'status',
        headerName: 'Project Completion(in %)',
        width: 190,
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
    {
        field: 'assigned',
        headerName: 'Assigned To',
        width: 150,
    }

];
export default function addproj() {
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [row, setRow] = useState({
        name: "",
        status: "",
        deadline: "",
        technologies: ""
    })

    useEffect(() => {
        async function fetchProjects() {
            try {
                const projCollection = collection(db, "projects");
                const querySnapshot = await getDocs(projCollection);

                if (querySnapshot.empty) {
                    console.log("No matching documents.");
                    setProjects([]);
                    setLoading(false);
                    return;
                }

                const projectsName = querySnapshot.docs
                    .map(doc => ({
                        id: doc.id,
                        name: doc.data()["Name"],
                        deadline: doc.data()["Project Deadline"],
                        technologies: doc.data()["Technologies"],
                        status:doc.data()["Completion"],
                        description:doc.data()["Description"],
                        deadline:doc.data()["Deadline"],
                        assigned:doc.data()["Assigned"]
            }));
                setRow(projectsName);
            } catch (err) {
                console.error("Failed to fetch project data:", err);
                setError(err.message);
            }
            setLoading(false);
        }
        fetchProjects();
    }, []);

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

        <div class="relative">
            <Pane/>
        </div>

            <div style={{ height: 400, width: '82.8%', backgroundColor:"white" }} class="ml-[250px]">
                <DataGrid
                    rows={row}
                    columns={columns}
                    initialState={{
                        pagination: {
                            paginationModel: { page: 0, pageSize: 5 },
                        },
                    }}
                    pageSizeOptions={[5, 10]}
                />
            </div>

            
            <Boxes/>
            
            

        </div>
    );
}
