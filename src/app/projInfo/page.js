"use client"

import ProjectData from "../projectData.json"
import { Bar } from 'react-chartjs-2';
import Panes from "../pane";
import { db } from "../config/firebase";
import { collection, getDocs } from "firebase/firestore";
import { useState,useEffect } from "react";
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);

export default function Project() {
    const [projects, setProjects] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const [rows, setRows] = useState([]);


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
                    deadline: doc.data()["Deadline"],
                    technologies: doc.data()["Technologies"],
                    status: doc.data()["Completion"],
                    description: doc.data()["Description"],
                    assigned: doc.data()["Assigned"]
                }));
                
                setRows(projectsName);
            } catch (err) {
                console.error("Failed to fetch project data:", err);
                setError(err.message);
            }
            setLoading(false);
        }
        fetchProjects();
    }, []);









    return (
        <div class="ml-[270px]">

            <Bar
                options={{

                    scales: {

                        y: {
                            ticks: {

                                stepSize: 5
                            },
                            max: 100
                        }
                    }
                }}
                data={{
                    labels: rows.map(doc => doc["name"]),
                    datasets: [{
                        label: 'Projects Status',
                        data: rows.map(doc => doc["status"]),
                        backgroundColor: [
                            'rgb(116, 105, 182,0.2)',
                        ],
                        borderColor: [
                            'rgb(139, 147, 255)',
                        ],
                        borderWidth: 1
                    }]
                }}
            />

            <div>
            <ol class="list-[upper-roman]  list-outside font-['Open_Sans'] text-lg font-medium ml-6">
                
                    {
                        rows.map(doc => (
                            <>
                            <li> <p class="text-xl">{doc["name"]}</p> </li>
                                 <span class="dark:text-slate-400 ">Description: {doc["description"]}</span>
                                 <p class="dark:text-slate-400">Deadline: {doc["deadline"]}</p>
                                
                                    <span class="static dark:text-slate-400">Project Status:</span>
                                    <span class={projects["PROJECT COMPLETION"] === 100 ? "text-lime-600 pl-3 " : "text-red-700 pl-3"}>
                                        {doc["status"] === 100 ? "Completed" :doc["status"]}
                                    </span>
                                
                                
                            
                            </>
                        ))
                    }
                    </ol>
            </div>
            <Panes proj = {ProjectData}/>


        </div>
    )
}