"use client";

import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { useState, useEffect } from 'react';
import { db } from "../config/firebase";
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import Pane from '../pane';

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

export default function DelProj() {
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedRows, setSelectedRows] = useState([]);

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

                const projectsName = querySnapshot.docs.map(doc => ({
                    id: doc.id,
                    name: doc.data()["Name"],
                    deadline: doc.data()["Project Deadline"],
                    technologies: doc.data()["Technologies"],
                    status: doc.data()["Completion"],
                    description: doc.data()["Description"],
                    assigned: doc.data()["Assigned"]
                }));
                setProjects(projectsName);
            } catch (err) {
                console.error("Failed to fetch project data:", err);
                setError(err.message);
            }
            setLoading(false);
        }
        fetchProjects();
    }, []);

    const handleRowSelection = (newSelection) => {
        setSelectedRows(newSelection);
    };

    const handleDelete = async () => {
        try {
            await Promise.all(selectedRows.map(async (id) => {
                await deleteDoc(doc(db, "projects", id));
            }));
            setProjects(projects.filter((project) => !selectedRows.includes(project.id)));
            setSelectedRows([]);
        } catch (err) {
            console.error("Failed to delete project(s):", err);
            setError(err.message);
        }
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    if (projects.length === 0) {
        return <div>No projects found</div>;
    }

    return (
        <div>
            <div className="relative">
                <Pane />
            </div>
            <div style={{ height: 400, width: '82.8%', backgroundColor: "white" }} className="ml-[250px]">
                <DataGrid
                    checkboxSelection
                    rows={projects}
                    columns={columns}
                    onRowSelectionModelChange={(newSelection) => {
                        handleRowSelection(newSelection);
                    }}
                    initialState={{
                        pagination: {
                            paginationModel: { page: 0, pageSize: 5 },
                        },
                    }}
                    pageSizeOptions={[5, 10]}
                />
                {selectedRows.length > 0 && (
                    <button onClick={handleDelete} className="bg-red-500 text-white rounded-md px-4 py-1 mt-4 mx-3">
                        Delete Selected
                    </button>
                )}
            </div>
        </div>
    );
}
