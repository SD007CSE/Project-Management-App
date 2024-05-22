'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import React from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
//import "./styles.css"

function login() {

  const router = useRouter()
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [token, setToken] = useState("");
  //console.log({email}+":"+{password});

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    console.log(JSON.stringify({ email }) + ":" + JSON.stringify({ password }));

    if (!email || !password) {
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
      Email: email,
      Password: password
    };

    try {

      const res = await axios.post("api/users/login", UserInfo);
      setToken(res.data.token);
      console.log("\nFrom frontend: \n", res.data.token);
      console.log("Status:", res.status);
      
      router.push('/');


    } catch (error) {
      console.log(error);
      if(error){
        toast.error('Email/Password is incorrect', {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
          });
          setIsLoading(false)
          return;
      }
    }

  }

  return (
    <form onSubmit={handleSubmit} class='w-1/2'>

      <div class="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
        <div class="relative py-3 sm:max-w-xl sm:mx-auto w-1/2">
          <div
            class="absolute inset-0 bg-gradient-to-r from-blue-300 to-blue-600 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl">
          </div>
          <div class="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
            <div class="max-w-md mx-auto">
              <div>
                <h1 class="text-2xl font-semibold text-black">Login</h1>
              </div>
              <div class="divide-y divide-gray-200">
                <div class="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
                  <div class="relative">
                    <input autoComplete="off" onChange={(e) => { setEmail(e.target.value) }} id="email" name="email" type="text" class="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600" placeholder="Email address" value={email} />
                    <label htmlfor="email" class="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm">Email Address</label>
                  </div>
                  <div class="relative">
                    <input autoComplete="off" onChange={(e) => { setPassword(e.target.value) }} id="password" name="password" type="password" class="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600" placeholder="Password" value={password} />
                    <label htmlfor="password" class="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm">Password</label>
                  </div>
                  <div class="relative">
                    <button class="bg-blue-500 text-white rounded-md px-2 py-1" disabled={isLoading} >
                      {isLoading && <span>Checking...</span>}
                      {!isLoading && <span>Login</span>}
                    </button>
                  </div>
                  <div class='relative'>
                    <p>
                      Not a member <Link href="/register"><span class='underline underline-offset-4'>Register?</span></Link>
                    </p>
                  </div>
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
    </form>

  );
}

export default login;