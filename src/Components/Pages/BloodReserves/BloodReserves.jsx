import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import useAxiosSecure from "../../../Hooks/axiosSecure";

const BloodReserves = () => {
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  const [selectedDate, setSelectedDate] = useState("");
  const [sortBy, setSortBy] = useState("newest");

  const { data: users = [], isLoading, error } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await axiosSecure.get("/users/normal");
      return res.data;
    },
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="loader"></div>
      </div>
    );
  }

  if (error) return <p className="text-red-500 text-center">Error fetching data</p>;

  let filteredUsers = users;

  if (selectedDate) {
    filteredUsers = users.filter(
      (user) =>
        new Date(user.donationDate).toDateString() ===
        new Date(selectedDate).toDateString()
    );
  }

  const sortedUsers = [...filteredUsers].sort((a, b) => {
    if (sortBy === "newest") {
      return new Date(b.donationDate) - new Date(a.donationDate);
    } else if (sortBy === "bloodGroup") {
      return a.bloodGroup.localeCompare(b.bloodGroup);
    }
  });

  return (
    <div className="container mx-auto p-6">
      <motion.h1
        className="text-3xl font-bold text-red-600 text-center mb-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        RoktoKhoj - Blood Reserves
      </motion.h1>
      
      <div className="flex justify-between items-center mb-6 flex-wrap gap-4">
        <div className="flex items-center gap-2">
          <label className="text-gray-700 font-semibold">Select Date:</label>
          <input
            type="date"
            className="border border-gray-300 px-2 py-1 rounded-lg"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
          />
        </div>

        <motion.button
          className="btn bg-green-600 text-white px-4 py-2 rounded-lg"
          whileHover={{ scale: 1.1, backgroundColor: "#059669" }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setSortBy("bloodGroup")}
        >
          Sort by Blood Group
        </motion.button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {sortedUsers.map((user) => (
          <motion.div
            key={user._id}
            className="card p-4 shadow-md bg-white rounded-lg border-2 border-gray-300"
            whileHover={{ scale: 1.05, boxShadow: "0 0 10px rgba(255, 0, 0, 0.5)" }}
            whileTap={{ scale: 0.98 }}
          >
            <h3 className="font-semibold text-lg">{user.name}</h3>
            <p className="text-sm text-gray-600">Location: {user.location}</p>
            <p className="text-sm text-gray-600">Blood Group: {user.bloodGroup}</p>
            <p className="text-sm text-gray-600">Date: {new Date(user.donationDate).toLocaleDateString()}</p>
            
            <motion.button
              onClick={() => navigate(`/donor-details/${user._id}`)}
              className="btn bg-red-600 text-white px-4 py-2 mt-4 rounded-lg"
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

export default BloodReserves;
