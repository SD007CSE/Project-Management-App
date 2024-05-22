
'use client'
import { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import { db } from "./config/firebase";
import { collection, getDocs } from "firebase/firestore";

export default function Sales() {
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
                    deadline: doc.data()["Project Deadline"],
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

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div>
            <Line
                width={800}
                height={500}
                options={{
                    maintainAspectRatio: false,
                    scales: {
                        x: {
                            title: {
                                color: '#41C9E2',
                                display: true,
                                text: 'Projects'
                            },
                            grid: {
                                lineWidth: 0.4,
                                color: '#41C9E2',
                                borderColor: 'black',
                                tickColor: 'grey'
                            }
                        },
                        y: {
                            title: {
                                color: '#41C9E2',
                                display: true,
                                text: 'Progress'
                            },
                            grid: {
                                lineWidth: 0.4,
                                color: '#41C9E2',
                                borderColor: 'grey',
                                tickColor: 'grey'
                            }
                        }
                    }
                }}
                data={{
                    labels: rows.map(doc => doc["name"]),
                    datasets: [{
                        label: 'Project Progress',
                        data: rows.map(doc => doc["status"]),
                        fill: true,
                        borderColor: 'rgb(139, 147, 255)',
                        tension: 0
                    }]
                }}
            />
        </div>
    );
}
