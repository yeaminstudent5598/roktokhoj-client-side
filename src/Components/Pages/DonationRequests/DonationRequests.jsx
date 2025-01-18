import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "../../../Hooks/useAuth"; // Custom hook to get the current user
import useAxiosPublic from "../../../Hooks/useAxiosPublic"; // Custom hook to use AxiosPublic

const DonationRequests = () => {
  const { currentUser } = useAuth();
  const axiosPublic = useAxiosPublic();
  const navigate = useNavigate();
  const [requests, setRequests] = useState([]); // State to hold fetched requests

  useEffect(() => {
    // Fetch pending blood donation requests from API
    const fetchRequests = async () => {
      try {
        const response = await axiosPublic.get("/create-donation-request"); // API request to get donation data
        setRequests(response.data); // Update the state with fetched donation requests
      } catch (error) {
        console.error("Error fetching donation requests:", error);
      }
    };

    fetchRequests(); // Fetch donation requests when the component mounts
  }, [axiosPublic]); // The dependency array ensures the effect runs only once after the initial render

  const handleViewRequest = (id) => {
    if (!currentUser) {
      // If user is not logged in, redirect to the login page
      navigate("/login");
    } else {
      // Navigate to the donation request details page
      navigate(`/donation-request/${id}`);
    }
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-center text-2xl font-bold mb-4">Blood Donation Requests</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* Map through the requests and display each request in a card */}
        {requests.map((request) => (
          <div
            key={request._id} // Using _id as the key for each request
            className="card border p-4 shadow-md bg-white rounded-lg"
          >
            <h2 className="font-semibold">{request.recipientName}</h2>
            <p className="text-sm text-gray-600">Location: {request.fullAddress}</p> {/* Using fullAddress for location */}
            <p className="text-sm text-gray-600">Blood Group: {request.bloodGroup}</p>
            <p className="text-sm text-gray-600">
              Date: {new Date(request.donationDate).toLocaleDateString()} {/* Format date */}
            </p>
            <p className="text-sm text-gray-600">
              Time: {new Date(request.donationTime * 1000).toLocaleTimeString()} {/* Convert time to proper format */}
            </p>
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
