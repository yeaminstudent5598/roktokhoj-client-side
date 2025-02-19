import React from 'react';

const ImpactSection = () => {
  return (
    <section className="w-full  px-10 py-20">
      <div className="container mx-auto">
        <div className="flex flex-col lg:flex-row items-center">
          {/* Image Section */}
          <div className="w-full lg:w-1/2 overflow-hidden">
            <img
              src="https://i.ibb.co.com/N67bgCNF/671f6586e8a69d1d9a534b82-optimized-1479-c1479x878-0x0.webp"
              alt="Who We Are"
              className="w-full h-auto object-cover"
            />
          </div>

          {/* Content Section */}
          <div className="w-full lg:w-1/2 lg:pl-12 mt-10 lg:mt-0">
            <p className="text-red-500 font-semibold uppercase">MAKE AN IMPACT</p>
            <h2 className="text-4xl lg:text-5xl font-bold mt-4">Who We Are</h2>
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
              We are a dedicated nonprofit blood donation center committed to saving lives and strengthening communities.
            </p>
            <p className="text-gray-600 mt-6">
              We believe in the power of community and the life-saving impact of blood donation. Our mission is to ensure a steady supply of safe and accessible blood for patients in need. We are dedicated to raising awareness about the importance of blood donation and providing support to donors throughout their journey.
            </p>
            <div className="mt-8">
              <a
                href="#donors-day"
                className="btn bg-red-600  font-bold"
              >
                DONATE NOW
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ImpactSection;