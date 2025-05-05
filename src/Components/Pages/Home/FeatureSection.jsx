import React from 'react';
import { FaTint, FaHandHoldingHeart, FaCheckCircle } from 'react-icons/fa'; // Import icons
import { Link } from 'react-router-dom';

const FeatureSection = () => {
    return ( 
        <div className="featured-section dark:bg-gray-900 grid grid-cols-1 md:grid-cols-3 gap-6 bg-gray-100 py-12 px-10">
            {/* Find Donation Center */}
            <div className="featured-item dark:bg-gray-900 bg-white shadow-lg rounded-lg p-6 hover:shadow-xl transition">
                <div className="image-container flex justify-center mb-4 text-red-700 text-5xl">
                    <FaTint />
                </div>
                <h5 className="text-lg font-bold text-red-700 text-center mb-2">Find Donation Centers</h5>
                <p className="text-gray-600 text-center mb-4">
                    Locate the nearest blood donation centers or drives in your area by entering your zip code.
                </p>
                <div className="text-center">
                    <Link to="/dashboard/create-donation-request"
                        
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn bg-red-700 text-white px-4 py-2 rounded hover:bg-red-800 transition"
                    >
                        Donate Now
                    </Link>
                </div>
            </div>

            {/* Blood Donation Process */}
            <div className="featured-item dark:bg-gray-900 bg-white shadow-lg rounded-lg p-6 hover:shadow-xl transition">
                <div className="image-container flex justify-center mb-4 text-red-700 text-5xl">
                    <FaHandHoldingHeart />
                </div>
                <h5 className="text-lg font-bold text-red-700 text-center mb-2">Learn About the Process</h5>
                <p className="text-gray-600 text-center mb-4">
                    Understand every step of the simple and life-saving blood donation process.
                </p>
                <div className="text-center">
                    <Link to="/blog"
                        
                        target="_self"
                        className="btn bg-red-700 text-white px-4 py-2 rounded hover:bg-red-800 transition"
                    >
                        Learn More
                    </Link>
                </div>
            </div>

            {/* Check Eligibility */}
            <div className="featured-item dark:bg-gray-900 bg-white shadow-lg rounded-lg p-6 hover:shadow-xl transition">
                <div className="image-container flex justify-center mb-4 text-red-700 text-5xl">
                    <FaCheckCircle />
                </div>
                <h5 className="text-lg font-bold text-red-700 text-center mb-2">Check Your Eligibility</h5>
                <p className="text-gray-600 text-center mb-4">
                    Donating blood is easy and safe. See if you meet the criteria to donate today.
                </p>
                <div className="text-center">
                    <Link to="blood-reserves"
                       
                        target="_self"
                        className="btn bg-red-700 text-white px-4 py-2 rounded hover:bg-red-800 transition"
                    >
                        Check Now
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default FeatureSection;
