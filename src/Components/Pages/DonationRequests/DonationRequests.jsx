import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "../../../Hooks/useAuth"; // Custom hook to get the current user
import useAxiosPublic from "../../../Hooks/useAxiosPublic"; // Custom hook to use AxiosPublic

const DonationRequests = () => {
  const { user, currentUser } = useAuth();
  const axiosPublic = useAxiosPublic();
  const navigate = useNavigate();
  const [requests, setRequests] = useState([]); 

  useEffect(() => {
    // Fetch pending blood donation requests from API
    const fetchRequests = async () => {
      try {
        const response = await axiosPublic.get("/create-donation-request"); // API request to get donation data
        const pendingRequests = response.data.filter(request => request.status === "pending"); // Filter for pending requests
        setRequests(pendingRequests); // Update the state with pending requests only
      } catch (error) {
        console.error("Error fetching donation requests:", error);
      }
    };

    fetchRequests(); // Fetch donation requests when the component mounts
  }, [axiosPublic]); // The dependency array ensures the effect runs only once after the initial render

  const handleViewRequest = (id) => {
    if (!user) {
      // If user is not logged in, redirect to the login page
      navigate("/login");
    } else {
      // Navigate to the donation request details page
      navigate(`/donation-details/${id}`);
    }
  };

  return (
    <div className="container pt-20 mx-auto p-6">
      {/* Top Heading */}
      <div className="text-center my-6">
        <h1 className="text-3xl font-bold text-red-600">RoktoKhoj</h1>
        <p className="text-lg text-gray-700 mt-2">
          Your Trusted Blood Donation Application
        </p>
      </div>

      {/* Section Heading */}
      <h2 className="text-center text-2xl font-bold mb-6 text-gray-800">
        Pending Blood Donation Requests
      </h2>

      {/* Cards Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {requests.map((request) => (
          <div
            key={request._id} // Using _id as the key for each request
            className="card border p-4 shadow-md bg-white rounded-lg"
          >
            <h3 className="font-semibold text-lg">{request.recipientName}</h3>
            <p className="text-sm text-gray-600">Location: {request.recipientDistrict}, {request.recipientUpazila}</p>
            <p className="text-sm text-gray-600">Hospital: {request.hospitalName} </p>
            <p className="text-sm text-gray-600">Blood Group: {request.bloodGroup}</p>
            <p className="text-sm text-gray-600">
              Date: {new Date(request.donationDate).toLocaleDateString()}
            </p>
            <p className="text-sm text-gray-600">Time: {request.donationTime}</p>
            <button
              onClick={() => handleViewRequest(request._id)} // Pass _id to handle view request
              className="btn btn-primary mt-4"
            >
              View
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DonationRequests;
