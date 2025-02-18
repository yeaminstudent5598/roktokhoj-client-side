import React from 'react';
import { Link } from 'react-router-dom';

const HelpSection = () => {
  return (
    <div className="container mx-auto px-10 py-10">
      <div className="row flex  items-center gap-12 lg:gap-20">
        <div className="col-xl-6 col-lg-6 col-md-6 col-12 mb-4">
          <div className=" relative">
            <img src="https://i.ibb.co.com/9kWf1v0F/help1.png" alt="Help Image 1" className="" />
            <img src="https://i.ibb.co.com/hFShKYFP/help2.png" alt="Help Image 2" className=" absolute top-20 left-60 w-48 object-cover" />
          </div>
        </div>

        <div className="col-xl-6 col-lg-6 col-md-6 col-12">
          <div className="help_content">
            <p className="text-red-500">Help The People in Need</p>
            <h2 className="text-5xl font-bold mt-2">Welcome to Blood Donors Organization</h2>
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
