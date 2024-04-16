/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
/* eslint-disable react/no-unescaped-entities */
import React from 'react';


export default function DeleteContac({ contactName, onDelete, onCancel }) {
  return (
    <div className="fixed top-0 left-0 right-0 bottom-0 flex justify-center items-center backdrop-blur-sm  bg-gray-900 bg-opacity-70 z-50">
      <div className="bg-white px-20 p-8 rounded-3xl shadow-md flex flex-col items-center">
        <p className="text-[#083F46] text-xl font-semibold mb-4">Do you want to delete contact "{contactName}"?</p>
        <div className="flex justify-center">
          <button
            onClick={onDelete}
            className="bg-[#083F46] hover:bg-[#3e676d] text-white font-bold py-1 px-5 rounded-2xl mr-4 focus:outline-none focus:shadow-outline"
          >
            Yes
          </button>
          <button
            onClick={onCancel}
            className=" border border-gray-800 hover:bg-[#dfe3e4] text-[#083F46] font-bold py-1 px-4 rounded-2xl focus:outline-none focus:shadow-outline"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
