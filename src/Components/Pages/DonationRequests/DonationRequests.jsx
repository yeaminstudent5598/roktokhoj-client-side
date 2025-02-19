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
      <div className="loading min-h-screen flex items-center justify-center bg-gray-50">
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

      {/* Sorting Buttons - Date Picker & Blood Group */}
      <div className="flex justify-between items-center mb-6">
        {/* Date Picker for Sorting */}
        <div className="flex items-center gap-2">
          <label className="text-gray-700 font-semibold">Select Date:</label>
          <input
            type="date"
            className="border border-gray-300 px-2 py-1 rounded-lg"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
          />
        </div>

        {/* Sort by Blood Group Button */}
        <motion.button
          className="btn bg-green-600 text-white px-4 py-2 rounded-lg"
          whileHover={{ scale: 1.1, backgroundColor: "#059669" }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setSortBy("bloodGroup")}
        >
          Sort by Blood Group
        </motion.button>
      </div>

      {/* Cards Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {sortedRequests?.map((request) => (
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
            <p className="text-sm text-gray-600">
              Location: {request.recipientDistrict}, {request.recipientUpazila}
            </p>
            <p className="text-sm text-gray-600">
              Hospital: {request.hospitalName}
            </p>
            <p className="text-sm text-gray-600">
              Blood Group: {request.bloodGroup}
            </p>
            <p className="text-sm text-gray-600">
              Date: {new Date(request.donationDate).toLocaleDateString()}
            </p>
            <p className="text-sm text-gray-600">Time: {request.donationTime}</p>
            <motion.button
              onClick={() => handleViewRequest(request._id)}
              className="btn w-20 mt-4"
              style={{
                backgroundColor: "#D32F2F",
                borderColor: "#D32F2F",
                color: "#fff",
              }}
              whileHover={{
                scale: 1.1,
                backgroundColor: "#C2185B",
                borderColor: "#C2185B",
              }}
              whileTap={{
                scale: 0.95,
                backgroundColor: "#FF5C8D",
                borderColor: "#FF5C8D",
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
