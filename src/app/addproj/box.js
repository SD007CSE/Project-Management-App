"use client"
import * as React from 'react';
import axios from 'axios';
import { useState, useEffect } from 'react';
import './style.css'
import Button from '@mui/material/Button';


import {
    MDBContainer,
    MDBRow,
    MDBCol,
    MDBCard,
    MDBCardBody,
    MDBInput,
    MDBTextArea,
}
    from 'mdb-react-ui-kit';

const defaultData = {
    name: "",
    deadline: "",
    technologies: "",
    description: "",
    completion: 0,
    assigned: ""
};


export default function Boxes() {
    const [isLoading, setIsLoading] = useState(false);

    const [projectData, setProjectData] = useState(defaultData)
    const [err, setErr] = useState("");

    const onValueChange = (name, value) => {
        setProjectData({ ...projectData, [name]: value });
    }



    const handleSubmit = async () => {



        if (!projectData.name || !projectData.deadline || !projectData.technologies || !projectData.description) {
            setErr("Have to provide all the fields")
            setTimeout(() => { }, 1000);
            return;
        }
        console.log(projectData);
        //console.log(projectData.deadline["$D"]+"/"+(projectData.deadline["$M"]+1)+"/"+projectData.deadline["$y"]);
        setIsLoading(true);
        try {
            console.log("trying");
            const res = await axios.post("api/projects/add",projectData);
            console.log(res);
            location.reload();
        } catch (error) {
            console.log(error);
        }
    }

    // useEffect(() => {
    //     console.log("Updated project data:", projectData);
    // }, [projectData]);




    return (



        <div class="ml-[530px] flex">

            <div class="flex">
                <div>
                    <MDBContainer fluid>

                        <MDBRow className='justify-content-center align-items-center m-5'>

                            <MDBCard style={{ borderRadius: '25px', minWidth: '500px' }}>
                                <MDBCardBody className='px-4'>

                                    <h2 class="fw-bold mb-4 pb-2 pb-md-0 mb-md-5 text-xl text-black">Project Form</h2>

                                    <MDBRow>

                                        <MDBCol md='12'>
                                            <MDBInput wrapperClass='mb-4' label='Project Name' size='lg' id='form1' type='text' name='name' value={projectData.name} onChange={(e) => onValueChange('name',e.target.value)} />
                                        </MDBCol>
                                    </MDBRow>
                                    <MDBRow>
                                        <MDBCol md='12' class="mb-4">
                                        <label for="Project Deadline" class="col-form-label">Project Deadline</label>
                                        <input type="date" class="form-control" name="deadline" value={projectData.deadline} onChange={(e) => onValueChange('deadline',e.target.value)} placeholder="Project Deadline"/>
                                        </MDBCol>
                                    </MDBRow>
                                    <MDBRow>
                                        <MDBCol md='12'>
                                            <MDBInput wrapperClass='mb-4' label='Tech Stack to be used' size='lg' id='form4' type='text' name='technologies' value={projectData.technologies} onChange={(e) => onValueChange('technologies',e.target.value)} />
                                        </MDBCol>
                                    </MDBRow>

                                    <MDBRow>

                                        <MDBCol md='12' class='my-2'>
                                            <MDBTextArea label='Project Description' id='textAreaExample' name='description' rows={5} value={projectData.description} onChange={(e) => onValueChange('description',e.target.value)} />
                                        </MDBCol>

                                    </MDBRow>

                                    <div class="relative">
                                        <div class='py-1'>
                                            <Button variant="outlined" class='btn' onClick={() => handleSubmit()} >
                                            {isLoading && <span>Adding...</span>}
                                            {!isLoading && <span>Add Project</span>}</Button>
                                        </div>
                                    </div>
                                </MDBCardBody>
                            </MDBCard>
                        </MDBRow>
                    </MDBContainer>
                </div>



            </div>
        </div>
    );
}
