import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "../../../Hooks/useAuth";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";

const DonationRequests = () => {
  const { user } = useAuth();
  const axiosPublic = useAxiosPublic();
  const navigate = useNavigate();
  const [sortBy, setSortBy] = useState("newest");
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedBloodGroup, setSelectedBloodGroup] = useState("");

  const fetchPendingRequests = async () => {
    const response = await axiosPublic.get("/create-donation-request");
    return response.data.filter((request) => request.status === "pending");
  };

  const { data: requests, error, isLoading } = useQuery({
    queryKey: ["pendingDonationRequests"],
    queryFn: fetchPendingRequests,
  });

  const handleViewRequest = (id) => {
    if (!user) {
      navigate("/login");
    } else {
      navigate(`/donation-details/${id}`);
    }
  };

  if (isLoading)
    return (
      <div className="loading px-10 min-h-screen flex items-center justify-center bg-gray-50">
        <svg width="64px" height="48px">
          <polyline
            points="0.157 23.954, 14 23.954, 21.843 48, 43 0, 50 24, 64 24"
            id="back"
            className="stroke-gray-300 stroke-2 fill-none"
          ></polyline>
          <polyline
            points="0.157 23.954, 14 23.954, 21.843 48, 43 0, 50 24, 64 24"
            id="front"
            className="stroke-blue-500 stroke-2 fill-none animate-dash"
          ></polyline>
        </svg>
      </div>
    );

  if (error) return <p>Error fetching requests</p>;

  // Filtering and Sorting Logic
  let filteredRequests = requests || [];

  if (selectedDate) {
    filteredRequests = filteredRequests.filter(
      (request) =>
        new Date(request.donationDate).toDateString() ===
        new Date(selectedDate).toDateString()
    );
  }

  if (selectedBloodGroup) {
    filteredRequests = filteredRequests.filter(
      (request) => request.bloodGroup === selectedBloodGroup
    );
  }

  const sortedRequests = [...filteredRequests].sort((a, b) => {
    if (sortBy === "newest") {
      return new Date(b.donationDate) - new Date(a.donationDate);
    } else if (sortBy === "bloodGroup") {
      return a.bloodGroup.localeCompare(b.bloodGroup);
    }
  });

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

      {/* Sorting & Filtering Section */}
      <div className="md:flex md:justify-between  items-center mb-6">
        {/* Date Picker for Filtering */}
        <div className="flex items-center mb-6 gap-2">
          <label className="text-gray-700 font-semibold">Date:</label>
          <input
            type="date"
            className="border border-gray-300 w-full px-2 py-1 rounded-lg"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
          />
        </div>

        {/* Blood Group Selector */}
        <div className="flex items-center gap-2">
          <label className="text-gray-700 font-semibold">Blood:</label>
          <select
            className="border border-gray-300 px-2 py-1 w-full rounded-lg"
            value={selectedBloodGroup}
            onChange={(e) => setSelectedBloodGroup(e.target.value)}
          >
            <option value="">All</option>
            <option value="A+">A+</option>
            <option value="A-">A-</option>
            <option value="B+">B+</option>
            <option value="B-">B-</option>
            <option value="AB+">AB+</option>
            <option value="AB-">AB-</option>
            <option value="O+">O+</option>
            <option value="O-">O-</option>
          </select>
        </div>
      </div>

      {/* Cards Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {sortedRequests?.map((request) => (
          <motion.div
            key={request._id}
            className="card p-4 dark:bg-gray-900 shadow-md bg-white rounded-lg"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            whileHover={{
              scale: 1.05,
              borderColor: "#FF0000",
              boxShadow: "0 0 10px rgba(255, 0, 0, 0.5)",
            }}
            whileTap={{ scale: 0.98 }}
          >
            <h3 className="font-semibold text-lg">{request.recipientName}</h3>
            <p className="text-sm text-gray-600">
              Location: {request.recipientDistrict}, {request.recipientUpazila}
            </p>
            <p className="text-sm text-gray-600">Hospital: {request.hospitalName}</p>
            <p className="text-sm text-gray-600">Blood Group: {request.bloodGroup}</p>
            <p className="text-sm text-gray-600">
              Date: {new Date(request.donationDate).toLocaleDateString()}
            </p>
            <motion.button
              onClick={() => handleViewRequest(request._id)}
              className="btn w-20 mt-4 bg-red-600 text-white rounded-lg"
              whileHover={{ scale: 1.1, backgroundColor: "#C2185B" }}
              whileTap={{ scale: 0.95 }}
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
