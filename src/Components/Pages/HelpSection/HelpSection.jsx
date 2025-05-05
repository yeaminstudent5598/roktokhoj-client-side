import React from 'react';
import { Link } from 'react-router-dom';

const HelpSection = () => {
  return (
    <div className="container  mx-auto px-10 py-10">
      <div className="flex grid grid-cols-1 md:grid-cols-2 items-center gap-12 lg:gap-20">
        <div className="mb-4"> 
          <div className="w-full relative">
            <img src="https://i.ibb.co.com/9kWf1v0F/help1.png" alt="Help Image 1" className="" />
            <img src="https://i.ibb.co.com/hFShKYFP/help2.png" alt="Help Image 2" className=" absolute md:top-20 md:left-60 md:w-48 w-20 top-28 left-44 object-cover" />
          </div>
        </div>

        <div className="">
          <div className="help_content">
            <p className="text-red-500">Help The People in Need</p>
            <h2 className="md:text-5xl font-bold mt-2">Welcome to Blood Donors Organization</h2>
            <p className="mt-4 text-gray-700">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed eiusmod tempor <br /> incididunt ut labore et dolore magna aliqua. Suspendisse the gravida. Risus <br /> commodo viverra maecenas.
            </p>
            <div className="flex justify-between mt-8">
              <ul className="list-none space-y-2">
                <li><i className="fa-solid fa-angles-right text-blue-600"></i> Good Service</li>
                <li><i className="fa-solid fa-angles-right text-blue-600"></i> Help People</li>
                <li><i className="fa-solid fa-angles-right text-blue-600"></i> Hugine Tools</li>
              </ul>
              <ul className="list-none space-y-2">
                <li><i className="fa-solid fa-angles-right text-blue-600"></i> 24h Service</li>
                <li><i className="fa-solid fa-angles-right text-blue-600"></i> Health Check</li>
                <li><i className="fa-solid fa-angles-right text-blue-600"></i> Blood Bank</li>
              </ul>
            </div>
            <Link to="blog" className=" btn btn-primary mt-6">Explore Now</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HelpSection;
