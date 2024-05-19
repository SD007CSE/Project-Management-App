'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import React from 'react';
import CustomizedMenus from './dropdown';
import { ToastContainer, toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";


import axios from 'axios';


function register() {

    const router = useRouter();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [role, setRole] = useState("")
    const [password, setPassword] = useState('');
    const [cpassword, setCPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [err, setErr] = useState();


    const designation = (designationData) => {
        setRole(designationData);
        console.log(designationData);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        //setIsLoading(true);
        //console.log(JSON.stringify({ email }) + ":" + JSON.stringify({ password }));
        if (password === cpassword) {
            console.log("passwords are equal");
        } else {

            toast.error('Password does not match', {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
                });
            setTimeout(() => { }, 1000);
            setIsLoading(false)
            return;
        }



        if (!name || !email || !role || !password) {

            toast.error('Have to fill all the credentials', {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
                });
            setTimeout(() => { }, 1000);
            setIsLoading(false)
            return;
        }

        const UserInfo = {
            Role: role,
            Name: name,
            Email: email,
            Password: password
        };

        try {
            const res = await axios.post("api/users/register", UserInfo);

            console.log(res);
            toast("Successfuly Registered!");
            router.push('/login')
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <form onSubmit={handleSubmit} className='w-1/2'>
            <div className="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
                <div className="relative py-3 sm:max-w-xl sm:mx-auto">
                    <div
                        className="absolute inset-0 bg-gradient-to-r from-blue-300 to-blue-600 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl">
                    </div>
                    <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
                        <div className="max-w-md mx-auto">
                            <div>
                                <h1 className="text-2xl font-semibold">Login Form with Floating Labels</h1>
                            </div>
                            <div className="divide-y divide-gray-200">
                                <div className="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">

                                    <div className='text-sm'>
                                        <p>{err}</p>
                                    </div>

                                    <CustomizedMenus des={designation} />
                                    <div className="relative">
                                        <input autoComplete="off" onChange={(e) => { setName(e.target.value) }} id="email" name="name" type="text" className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600" placeholder="Email address" value={name} />
                                        <label for="email" className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm">Full Name</label>
                                    </div>
                                    <div className="relative">
                                        <input autoComplete="off" onChange={(e) => { setEmail(e.target.value) }} id="email" name="email" type="text" className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600" placeholder="Email address" value={email} />
                                        <label for="email" className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm">Email Address</label>
                                    </div>
                                    <div className="relative">
                                        <input autoComplete="off" onChange={(e) => { setPassword(e.target.value) }} id="password" name="password" type="password" className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600" placeholder="Password" value={password} />
                                        <label for="password" className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm">Password</label>
                                    </div>
                                    <div className="relative">
                                        <input autoComplete="off" onChange={(e) => { setCPassword(e.target.value) }} id="password" name="password" type="password" className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600" placeholder="Password" value={cpassword} />
                                        <label for="password" className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm">Confirm Password</label>
                                    </div>
                                    <div className="relative">
                                        <button className="bg-blue-500 text-white rounded-md px-2 py-1" disabled={isLoading} >
                                            {isLoading && <span>Wait for some time...</span>}
                                            {!isLoading && <span>Register</span>}
                                        </button>

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
                        </div>
                    </div>
                </div>
            </div>
        </form>

    );
}

export default register;