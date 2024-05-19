"use client"
import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { useState, useEffect } from 'react';
import { db } from "../config/firebase";
import { collection, getDocs, updateDoc, doc } from "firebase/firestore";
import Pane from '../pane';
import Down from './dropdown';
import Button from '@mui/material/Button';
import "./style.css"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function addproj() {
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true); // Define loading state here
    const [error, setError] = useState(null);


    const DropdownCell = (params) => {
        const [value, setValue] = useState(params.value);

        const handleChange = async (event) => {
            const newValue = event
            console.log("Event:"+event);

            setValue(newValue);
            // Update the value in the database
            await handleUpdateAssigned(params.id, newValue);
            // Update the value in projectsData
            const updatedProjects = projects.map(project => {
                if (project.id === params.id) {
                    return { ...project, Assigned: newValue };
                }
                return project;
            });
            setProjects(updatedProjects);
            console.log(projects);
        };

        return (
            <Down
                handleEmployeeSelect={handleChange}
            />
        );
    };

    const columns = [
        { field: 'id', headerName: 'Project ID', width: 200 },
        { field: 'name', headerName: 'Project name', width: 130 },
        { field: 'status', headerName: 'Project Completion(in %)', width: 190 },
        { field: 'technologies', headerName: 'Tech Stack', width: 150 },
        { field: 'description', headerName: 'Project Description', width: 150 },
        { field: 'deadline', headerName: 'Project Deadline', width: 150 },
        { field: 'Assigned', headerName: 'Assigned To', width: 200, renderCell: DropdownCell }
    ];









    const handleUpdateAssigned = async (id, newValue) => {
        try {
            const projRef = doc(db, "projects", id);
            await updateDoc(projRef, {
                Assigned: newValue
            });
            console.log("Assigned column updated successfully.");
            toast("Updated!");
        } catch (err) {
            console.error("Error updating Assigned column:", err);
        }
    };

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

                const projectsData = querySnapshot.docs.map(doc => ({
                    id: doc.id,
                    name: doc.data()["Name"],
                    deadline: doc.data()["Project Deadline"],
                    technologies: doc.data()["Technologies"],
                    status: doc.data()["Completion"],
                    description: doc.data()["Description"],
                    Assigned: doc.data()["Assigned"],
                    deadline: doc.data()["Deadline"]
                }));
                setProjects(projectsData);

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

    return (
        <div>
            <div class="relative">
                <Pane />
            </div>

            <div style={{ height: 400, width: '82.8%', backgroundColor: "white" }} class="ml-[250px]">
                <DataGrid
                    rows={projects}
                    columns={columns}
                    pageSizeOptions={[5, 10]}
                />

            </div>
            <div>
                <div class='py-1 ml-[250px]'>
                    <Button variant="outlined" class='btn' onClick={() => handleClick()} >Save</Button>
                
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
        </div>
    );
}
