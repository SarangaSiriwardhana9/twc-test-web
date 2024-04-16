/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from 'react';

export default function DeleteContactSuccess({ onClose }) {
  return (
    <div className="fixed top-0 left-0 right-0 bottom-0 flex justify-center items-center z-50">
      <div className="bg-gray-900 bg-opacity-70 backdrop-blur-sm fixed inset-0"></div>
      <div className="bg-white px-20 p-8 rounded-3xl shadow-md flex flex-col items-center relative">
        <p className="text-[#083F46] text-lg font-semibold mb-4">Your contact has been deleted successfully!</p>
        <button
          onClick={onClose}
          className="bg-[#083F46] hover:bg-[#326268] mt-1 text-white font-bold py-1 px-5 rounded-2xl focus:outline-none focus:shadow-outline"
        >
          Okay
        </button>
      </div>
    </div>
  );
}
