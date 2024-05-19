"use client"



import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { useState, useEffect } from 'react';
import { db } from "../config/firebase";
import { collection, getDocs } from "firebase/firestore";
import Pane from '../pane';
import Boxes from './box';


const columns = [
    { field: 'id', headerName: 'Employee ID', width: 300 },
    { field: 'fName', headerName: 'Full name', width: 130 },
    {
        field: 'designation',
        headerName: 'Designation',
        width: 90,
    },

];
export default function Employee() {
    const [employees, setEmployees] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [row, setRow] = useState({
        id: "",
        fName: "",
        lName: "",
        designation: ""
    })

    useEffect(() => {
        async function fetchEmployees() {
            try {
                const userCollection = collection(db, "user");
                const querySnapshot = await getDocs(userCollection);

                if (querySnapshot.empty) {
                    console.log("No matching documents.");
                    setEmployees([]);
                    setLoading(false);
                    return;
                }

                const employeeNames = querySnapshot.docs
                    .filter(doc => doc.data()["Role"] === "user" || doc.data()["Role"] === "employee")
                    .map(doc => ({
                        id: doc.id,
                        fName: doc.data()["Name"],
                        designation: doc.data()["Role"],
                        role: doc.data()["Role"],
                }));
                setRow(employeeNames);
            } catch (err) {
                console.error("Failed to fetch employees:", err);
                setError(err.message);
            }
            setLoading(false);
        }




        fetchEmployees();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    if (row.length === 0) {
        return <div>No employees found</div>;
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
