import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import useAxiosSecure from "../../../Hooks/axiosSecure";

const BloodReserves = () => {
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  const [selectedDate, setSelectedDate] = useState("");
  const [searchLocation, setSearchLocation] = useState("");
  const [selectedBloodGroup, setSelectedBloodGroup] = useState("");

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

  // Filter users based on selected date
  if (selectedDate) {
    filteredUsers = users.filter(
      (user) =>
        new Date(user.donationDate).toDateString() ===
        new Date(selectedDate).toDateString()
    );
  }

  // Filter users based on selected blood group
  if (selectedBloodGroup) {
    filteredUsers = filteredUsers.filter(
      (user) => user.bloodGroup === selectedBloodGroup
    );
  }

  // Filter users based on location search
  if (searchLocation) {
    filteredUsers = filteredUsers.filter(
      (user) =>
        user.upazila.toLowerCase().includes(searchLocation.toLowerCase()) ||
        user.district.toLowerCase().includes(searchLocation.toLowerCase())
    );
  }

  return (
    <div className="container mx-auto px-10">
      <motion.h1
        className="text-3xl pt-24 font-bold text-red-600 text-center mb-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        RoktoKhoj - Blood Reserves
      </motion.h1>

      <div className="flex justify-between items-center mb-6 flex-wrap gap-4">
      <div className="flex items-center gap-2">
          <label className="text-gray-700 font-semibold">Search Location:</label>
          <input
            type="text"
            className="border border-gray-300 px-2 py-1 rounded-lg"
            placeholder="Search by location"
            value={searchLocation}
            onChange={(e) => setSearchLocation(e.target.value)}
          />
        </div>
        <div className="flex items-center gap-2">
          <label className="text-gray-700 font-semibold">Blood Group:</label>
          <select
            className="border border-gray-300 px-2 py-1 rounded-lg"
            value={selectedBloodGroup}
            onChange={(e) => setSelectedBloodGroup(e.target.value)}
          >
            <option value="">Select Blood Group</option>
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

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredUsers.map((user) => (
          <motion.div
            key={user._id}
            className="card p-4 shadow-md bg-white rounded-lg border-2 border-gray-300"
            whileHover={{ scale: 1.05, boxShadow: "0 0 10px rgba(255, 0, 0, 0.5)" }}
            whileTap={{ scale: 0.98 }}
          >
            <h3 className="font-semibold text-lg">{user.name}</h3>
            <p className="text-sm text-gray-600">Location: {user.upazila}, {user.district}</p>
            <p className="text-sm text-gray-600">Blood Group: {user.bloodGroup}</p>
            
            
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default BloodReserves;
