import React from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "../../../Hooks/useAuth"; // Custom hook to get the current user
import useAxiosPublic from "../../../Hooks/useAxiosPublic"; // Custom hook to use AxiosPublic
import { useQuery } from "@tanstack/react-query"; // Import useQuery from TanStack Query
import { motion } from "framer-motion"; // Import Framer Motion

const DonationRequests = () => {
  const { user } = useAuth();
  const axiosPublic = useAxiosPublic();
  const navigate = useNavigate();

  // Function to fetch pending donation requests
  const fetchPendingRequests = async () => {
    const response = await axiosPublic.get("/create-donation-request");
    return response.data.filter(request => request.status === "pending");
  };

  // Using TanStack Query's useQuery hook for pending requests (updated for v5)
  const { data: requests, error, isLoading } = useQuery({
    queryKey: ["pendingDonationRequests"], // Query Key
    queryFn: fetchPendingRequests, // Query Function (GET method)
  });

  const handleViewRequest = (id) => {
    if (!user) {
      navigate("/login"); // If not logged in, redirect to login
    } else {
      navigate(`/donation-details/${id}`); // Navigate to donation request details page
    }
  };

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error fetching requests</p>;

  return (
    <div className="container pt-20 mx-auto p-6">
      {/* Top Heading */}
      <div className="text-center my-6">
        <motion.h1
          className="text-3xl font-bold text-red-600"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          RoktoKhoj
        </motion.h1>
        <motion.p
          className="text-lg text-gray-700 mt-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          Your Trusted Blood Donation Application
        </motion.p>
      </div>

      {/* Section Heading */}
      <motion.h2
        className="text-center text-2xl font-bold mb-6 text-gray-800"
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1 }}
      >
        Pending Blood Donation Requests
      </motion.h2>

      {/* Cards Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {requests?.map((request) => (
          <motion.div
            key={request._id} 
            className="card p-4 shadow-md bg-white rounded-lg"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            whileHover={{
              scale: 1.05, 
              borderColor: "#FF0000", 
              boxShadow: "0 0 10px rgba(255, 0, 0, 0.5)", 
            }}
            whileTap={{ scale: 0.98 }} 
            style={{ border: "2px solid #ddd", transition: "all 0.3s ease" }} 
          >
            <h3 className="font-semibold text-lg">{request.recipientName}</h3>
            <p className="text-sm text-gray-600">Location: {request.recipientDistrict}, {request.recipientUpazila}</p>
            <p className="text-sm text-gray-600">Hospital: {request.hospitalName} </p>
            <p className="text-sm text-gray-600">Blood Group: {request.bloodGroup}</p>
            <p className="text-sm text-gray-600">
              Date: {new Date(request.donationDate).toLocaleDateString()}
            </p>
            <p className="text-sm text-gray-600">Time: {request.donationTime}</p>
            <motion.button
  onClick={() => handleViewRequest(request._id)} 
  className="btn w-20 mt-4"
  style={{
    backgroundColor: '#D32F2F', 
    borderColor: '#D32F2F',     
    color: '#fff',              
  }}
  whileHover={{
    scale: 1.1,                
    backgroundColor: '#C2185B', 
    borderColor: '#C2185B',     
  }}
  whileTap={{
    scale: 0.95,               
    backgroundColor: '#FF5C8D',
    borderColor: '#FF5C8D',     
  }}
>
  View
</motion.button>

          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default DonationRequests;
