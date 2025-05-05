import React from 'react';
import { Link } from 'react-router-dom';

const LandingPage = () => {
  return (
    <div className="container mx-auto p-6">
      <h2 className="text-3xl font-semibold text-center text-red-600 border-b-2 pb-2">Blood stock levels</h2>
      <div className="text-center mt-6 text-gray-700 text-lg">
        <p>Our current blood stock is at</p>
      </div>
 
      <div className="flex justify-center gap-12 mt-6">
        <div className="text-center">
          <p className="font-semibold">B+</p>
          <div className="relative w-24 h-32 border-2 border-gray-500 rounded-lg flex flex-col justify-end overflow-hidden">
            <div className="absolute bottom-0 w-full bg-red-500 h-[71.5%]"></div>
            <span className="absolute top-1/3 left-1/2 transform -translate-x-1/2 text-white font-semibold">5.0 days</span>
          </div>
        </div>

        <div className="text-center">
          <p className="font-semibold">O+</p>
          <div className="relative w-24 h-32 border-2 border-gray-500 rounded-lg flex flex-col justify-end overflow-hidden">
            <div className="absolute bottom-0 w-full bg-red-500 h-[71.5%]"></div>
            <span className="absolute top-1/3 left-1/2 transform -translate-x-1/2 text-white font-semibold">5.0 days</span>
          </div>
        </div>
      </div>

      <div className="text-center mt-6 text-gray-700">
        <p>The SANBS needs to maintain a blood stock level of 5 days for each blood group to ensure sustained blood availability for patients in need.</p>
        <div className="mt-3">
          <span className="text-red-600 font-semibold">5 days = adequate stock</span> | 
          <span className="text-yellow-500 font-semibold"> 3.5 days = significantly low</span> | 
          <span className="text-red-800 font-semibold"> Less than 3 days = critical</span>
        </div>
      </div>

      <div className="flex justify-center mt-6">
        <Link to="donation-request" className="bg-red-600 text-white px-6 py-2 rounded-lg text-lg font-semibold hover:bg-red-700">Blood Types</Link>
      </div>
    </div>
  
  );
};

export default LandingPage;