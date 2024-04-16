/* eslint-disable no-unused-vars */
import React, { useState} from 'react';
import back from '/back.jpg';
import LogoComponent from '../components/LogoComponent';
import SignOut from '../components/SignOut';
import { useSelector } from 'react-redux';
import AddContactSuccess from '../components/alerts/AddContactSuccess';
import { useNavigate } from 'react-router-dom';
import { useSnackbar } from 'notistack';

export default function NewContact() {
  const [showSuccessMessage, setShowSuccessMessage] = useState(false); // State to manage success message display
  const { currentUser } = useSelector((state) => state.user);
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phoneNumber: '',
    gender: 'male', // Default gender
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/contacts/addContact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        // Reset form after successful submission
        setFormData({
          fullName: '',
          email: '',
          phoneNumber: '',
          gender: 'male',
        });
        // Show success message and after 2 seconds, navigate to contacts page
        setShowSuccessMessage(true);
        setTimeout(() => {
          navigate('/contacts');
        }, 2000); 

      } else {
        const data = await res.json();
        
        enqueueSnackbar('Failed to add contact ☹️', { variant: 'error',autoHideDuration: 1500, style: {
          backgroundColor: '#aa4d4d', // Set background color
          color: 'white', // Set text color
          borderRadius: '16px',
        } });
      }
    } catch (error) {
      
      enqueueSnackbar('An error occurred.try again later ☹️', { variant: 'error',autoHideDuration: 1500, style: {
        backgroundColor: '#aa4d4d', // Set background color
        color: 'white', // Set text color
        borderRadius: '16px',
      } });
      console.error(error);
    }
  };

  return (
    <div className="relative min-h-screen bg-[#083F46] overflow-hidden">
      {/* Top right triangle */}
      <div
        className="absolute -top-20 -mt-2 -right-60 h-64 w-96 bg-white rotate-45"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.7), rgba(255,255,255,0.7)), url(${back}) `,
          backgroundSize: '100%',
        }}
      ></div>
      <div className="absolute -right-6 -top-6">
        <div className="w-[650px] h-[650px] bg-[#083F46] rounded-full"></div>
      </div>

      {/* main area */}
      <div className="relative z-50 ml-10 mt-10 xl:ml-10 xl:mt-10 2xl:ml-40 2xl:mt-32">
        {/* Logo component */}
        <div className="flex flex-col mt-14 ml-40 z-50">
          <LogoComponent />
        </div>

        {/* Form area */}
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col mt-14 ml-40 z-50 pr-20">
            <h1 className="text-5xl text-[#ffffff] font-bold mb-0 ">New Contact</h1>
            <div className="flex flex-col mt-10">
              <div className="flex flex-row flex-wrap gap-10">
                {/* full Name */}
                <div className="mb-4 ">
                  <input
                    type="text"
                    id="fullName"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    maxLength={25}
                    placeholder="Full Name"
                    required
                    className="w-full md:w-96 px-6 py-2 rounded-3xl border-2  border-gray-300 focus:outline-none placeholder:text-slate-600 placeholder:font-bold focus:border-blue-500"
                  />
                </div>
                {/* email */}
                <div className="mb-4 ">
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    maxLength={25}
                    placeholder="E-mail"
                    required
                    className="w-full md:w-96 px-6 py-2 rounded-3xl border-2  border-gray-300 focus:outline-none placeholder:text-slate-600 placeholder:font-bold focus:border-blue-500"
                  />
                </div>
              </div>
              <div className="flex flex-row flex-wrap gap-10">
                {/* phone number */}
                <div className="mb-4 ">
                  <input
                    type="tel"
                    id="phoneNumber"
                    name="phoneNumber"
                    value={formData.phoneNumber}
                    onChange={handleChange}
                    placeholder="Phone Number"
                    required
                    className="w-full md:w-96 px-6 py-2 rounded-3xl border-2  border-gray-300 focus:outline-none placeholder:text-slate-600 placeholder:font-bold focus:border-blue-500"
                    maxLength={25}
                    pattern="[0-9]*" 
                    title="Please enter Calid Phone number" 
                  />
                </div>
                {/* radio button for gender */}
                <div className="flex flex-row gap-16 ml-2 items-center">
                  <span className="text-lg text-[#ffffff]">Gender </span>
                  <label htmlFor="male" className="inline-flex items-center bg-[#083F46] text-white rounded-lg px-2 py-1 cursor-pointer">
                    <input
                      type="radio"
                      id="male"
                      name="gender"
                      value="male"
                      checked={formData.gender === 'male'}
                      onChange={handleChange}
                      className="form-radio h-5 w-5 mr-2 bg-[#083F46]"
                    />
                    Male
                  </label>
                  <label htmlFor="female" className="inline-flex items-center bg-[#083F46] text-white rounded-lg px-2 py-1 cursor-pointer">
                    <input
                      type="radio"
                      id="female"
                      name="gender"
                      value="female"
                      checked={formData.gender === 'female'}
                      onChange={handleChange}
                      className="form-radio h-5 w-5 mr-2 bg-[#083F46]"
                    />
                    Female
                  </label>
                </div>
              </div>
            </div>
            <button
              type="submit"
              className="mt-12 border w-64 border-gray-100 hover:bg-[#173d5a] text-white font-semibold py-1.5 px-8 rounded-3xl"
            >
              add your first contact
            </button>
          </div>
        </form>
      </div>
      {/* Add contact success message */}
      {/* Conditionally render success message */}
{showSuccessMessage && (
        <AddContactSuccess onClose={() => setShowSuccessMessage(false)} />
      )}
      
      {/* Logout Button in right site bottom */}
      <div className="fixed bottom-0 right-0 m-8">
        <SignOut />
      </div>

      {/* Left side */}
      <div className="absolute z-10 -left-6 -bottom-6">
        <div className="w-[650px] h-[650px] bg-[#083F46] rounded-full"></div>
      </div>

      {/* Left bottom */}
      <div
        className="absolute -bottom-40 -left-40 h-96 w-64 bg-white -rotate-45"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.7), rgba(255,255,255,0.7)), url(${back})`,
          backgroundSize: '100%',
        }}
      ></div>
    </div>
  );

}
