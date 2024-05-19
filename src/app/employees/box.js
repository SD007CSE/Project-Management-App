import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import './style.css'
import { useRouter } from 'next/navigation'

export default function Boxes() {

    const router = useRouter();


    return (
        <div class="ml-[270px] flex">
            <div class="flex-initial">
                <Box
                    height={370}
                    width={370}
                    my={4}

                    display="flex"
                    alignItems="center"
                    gap={4}
                    p={2}
                    sx={{}}
                >
                    <div class='grid '>
                        <div>
                            Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                        </div>
                        <div class='py-1'>
                            <Button variant="outlined" class='btn' onClick={()=>{
                                router.push("/assiproj")
                            }}>Assign Projects</Button>
                        </div>
                    </div>
                </Box>
            </div>

            <div class="flex-initial">
                <Box
                    height={370}
                    width={370}
                    my={4}
                    mx={2}
                    display="flex"
                    alignItems="center"
                    gap={4}
                    p={2}
                    sx={{}}
                >
                    <div class='grid '>
                        <div>
                            Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                        </div>
                        <div class='py-1'>
                            <Button variant="outlined" onClick={()=>{
                                router.push("/addproj")
                            }} class='btn'>Add Project</Button>
                        </div>
                    </div>
                </Box>

            </div>
            <div class="flex-initial">
                <Box
                    height={370}
                    width={370}
                    my={4}

                    display="flex"
                    alignItems="center"
                    gap={4}
                    p={2}
                    sx={{}}
                >
                    <div class='grid '>
                        <div>
                            Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                        </div>
                        <div class='py-1'>
                            <Button variant="outlined" class='btn'>Delete Project</Button>
                        </div>
                    </div>
                </Box>
            </div>
        </div>


    );
}
