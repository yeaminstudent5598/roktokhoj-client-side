import React from 'react';

const MissionSection = () => {
  return (
    <section className="w-full px-10 bg-white py-20">
      <div className="container mx-auto">
        <div className="flex flex-col lg:flex-row-reverse items-center">
          {/* Image Section */}
          <div className="w-full lg:w-1/2 overflow-hidden rounded-lg shadow-lg">
            <img
              src="https://i.ibb.co.com/dJ5MgWYr/6720cabd816c66e32dfd887a-optimized-1396-c1396x930-0x0.webp"
              alt="Our Commitment"
              className="w-full h-auto object-cover"
            />
          </div>

          {/* Content Section */}
          <div className="w-full lg:w-1/2 lg:pr-12 mt-10 lg:mt-0">
            <p className="text-red-500 font-semibold uppercase">Our Mission and History</p>
            <h2 className="text-4xl lg:text-5xl font-bold mt-4">Our Commitment to Health & Community</h2>
            <div className="my-6">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="100%"
                height="4"
                className="w-1/4"
              >
                <path d="M0 2 L3000 2" style={{ fill: 'none', stroke: '#ed3d31', strokeWidth: '4px' }} />
              </svg>
            </div>
            <p className="text-xl text-gray-700 mt-4">
              Discover the vital role of Blood Center as a leading nonprofit organization dedicated to blood donation.
            </p>
            <p className="text-gray-600 mt-6">
              Blood Center is a public donation center with blood donation members in the changing health care system. Founded in 1978, Blood Center is one of the nation’s oldest and largest nonprofit transfusion medicine organizations. We provide blood and volunteer services across the US. With our national footprint, deep community roots, and specialized services, we are the thread that connects people and resources together to fuel progress in transfusion medicine.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MissionSection;