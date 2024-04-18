/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from '/logo.png'
import { useSnackbar } from 'notistack';

import {
  signInStart,
  signInSuccess,
  signInFailure,
} from "../redux/user/userSlice";
import { useDispatch, useSelector } from "react-redux";

export default function SignIn() {
  const [formData, setFormData] = useState({});
  const { loading, error } = useSelector((state) => state.user);
  const { enqueueSnackbar } = useSnackbar();
  console.log(loading, error);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(signInStart());
      const res = await fetch("/api/auth/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.ok) {
        // Success
        dispatch(signInSuccess(data));
        // Show success alert
        enqueueSnackbar('Sign up successful!😍', {
          variant: 'success',
          autoHideDuration: 1500,
          style: {
            backgroundColor: '#38676d',
            color: 'white',
            borderRadius: '16px',
          }
        });
        // Navigate after dispatching actions
        navigate("/");
      } else {
        // Failure
        dispatch(signInFailure(data));
        // Add alert for failure
        enqueueSnackbar('Invalid username or password ☹️', { variant: 'error',autoHideDuration: 1500, style: {
          backgroundColor: '#aa4d4d', 
          color: 'white', 
          borderRadius: '16px',
        } });
      }
    } catch (error) {
      dispatch(signInFailure(error));
      // Add alert for failure
      
      enqueueSnackbar('An error occurred during login ☹️', { variant: 'error',autoHideDuration: 1500, style: {
        backgroundColor: '#aa4d4d', 
        color: 'white', 
        borderRadius: '16px',
      } });
      
    }
  };



  return (
    <div>
      <div className="flex h-screen bg-cover bg-center overflow-hidden">
        {/* Background image with opacity */}
        <div
          className="absolute inset-0 "
          style={{
            backgroundImage: `url('/back.jpg')`,
            opacity: 0.1,
            zIndex: -1, 
            backgroundSize: '50%',
          }}
        />
        <div className="flex-1 bg-[#083F46] rounded-r-[50%] pr-10 -my-20 overflow-hidden">
          {/* Left side - Sign In component */}
          <div className="flex items-center justify-center h-full">
            <div className="w-full max-w-md">
              <div className="">
                <h2 className="text-5xl text-white font-semibold">Hi there,</h2>
                <h3 className="text-2xl text-white font-semibold mt-4">Welcome to our </h3>
                <h3 className="text-2xl text-white font-semibold">contacts portal</h3>
              </div>
              <form onSubmit={handleSubmit} className="mt-4">
                <div className="mb-4 mt-12">

                  <input
                    type='email'
                    id='email'
                    name='email'
                    value={formData.email || ""}
                    onChange={handleChange}
                    placeholder='e-mail'
                    required
                    className="w-96 px-6 py-2 rounded-3xl border-2  border-gray-300 focus:outline-none placeholder:text-slate-600 placeholder:font-bold focus:border-blue-500"
                  />
                </div>
                <div className="mb-4 mt-8">

                  <input
                    type='password'
                    id='password'
                    name='password'
                    value={formData.password || ""}
                    onChange={handleChange}
                    placeholder='password'
                    required
                    className="w-96 px-6 py-2 rounded-3xl border-2  border-gray-300 focus:outline-none placeholder:text-slate-600 placeholder:font-bold focus:border-blue-500"
                  />
                </div>
                <div className=" flex flex-row ">
                  <button
                    type='submit'
                    disabled={loading}
                    className=" mt-6 border border-gray-100 text-white hover:bg-[#0b525b] font-bold py-1.5 px-8 rounded-3xl"
                  >
                    {loading ? "logging In..." : "login"}
                  </button>
                  <span className="text-white  text-md px-2 mt-8">
                    {""} or {""}
                    <Link to='/signup' className=" px-2 text-slate-200 underline  font-medium">Click here to Register</Link>
                  </span>
                </div>

              </form>


            </div>
          </div>
        </div>
        <div className="flex-1  rounded-l-[10%]">
          {/* Right side - Simple text */}
          <div className="flex items-center justify-start h-full ml-24">
            <div className="flex flex-col ">
              <img src={logo} alt="logo" className=" h-12  w-36" />
              <h1 className="text-7xl text-[#083F46] font-bold mb-2">contacts </h1>
              <h1 className="text-6xl text-[#083F46]  mb-3">portal</h1>
            </div>


          </div>
        </div>
      </div>
    </div>
  );
}
