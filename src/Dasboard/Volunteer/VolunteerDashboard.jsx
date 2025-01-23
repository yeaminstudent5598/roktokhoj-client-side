import React from "react";
import { useQuery } from "@tanstack/react-query";
import { FaUserFriends, FaHandHoldingUsd, FaHeartbeat } from "react-icons/fa";
import useAxiosSecure from "../../Hooks/axiosSecure";


const VolunteerDashboard = () => {
  const axiosSecure = useAxiosSecure();

  // Fetch total users
  const { data: users = [], isLoading: isUsersLoading } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const response = await axiosSecure.get("/users/volunteer");
      return response.data;
    },
  });

  // Fetch donation requests
  const { data: donationRequests = [], isLoading: isDonationsLoading } = useQuery({
    queryKey: ["create-donation-request"],
    queryFn: async () => {
      const response = await axiosSecure.get("/create-donation-request");
      return response.data;
    },
  });

  // Calculate statistics
  const totalUsers = users.length;
  const totalRequests = donationRequests.length;
  const totalFunding = donationRequests.reduce(
    (total, request) => total + request.amount, // Assuming `amount` represents the donation amount
    0
  );

  // Loading state
  if (isUsersLoading || isDonationsLoading) {
    return (
      <div className="p-6 bg-gray-100 min-h-screen">
        <h1 className="text-center text-xl font-bold">Loading...</h1>
      </div>
    );
  }

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      {/* Welcome Section */}
      <div className="bg-white shadow-md rounded-lg p-6 mb-6">
        <h1 className="text-2xl font-bold mb-2">Welcome, Admin!</h1>
        <p className="text-gray-600">
          Manage and track your organization's progress efficiently.
        </p>
      </div>

      {/* Featured Cards for Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Total Users Card */}
        <div className="bg-white shadow-md rounded-lg p-6 flex flex-col items-center">
          <FaUserFriends className="text-4xl text-blue-500 mb-4" />
          <h2 className="text-3xl font-bold mb-2">{totalUsers}</h2>
          <p className="text-gray-600">Total Users (Donors)</p>
        </div>

        {/* Total Funding Card */}
        <div className="bg-white shadow-md rounded-lg p-6 flex flex-col items-center">
          <FaHandHoldingUsd className="text-4xl text-green-500 mb-4" />
          <h2 className="text-3xl font-bold mb-2">
            ${totalFunding.toLocaleString()}
          </h2>
          <p className="text-gray-600">Total Funding</p>
        </div>

        {/* Total Blood Donation Requests Card */}
        <div className="bg-white shadow-md rounded-lg p-6 flex flex-col items-center">
          <FaHeartbeat className="text-4xl text-red-500 mb-4" />
          <h2 className="text-3xl font-bold mb-2">{totalRequests}</h2>
          <p className="text-gray-600">Total Blood Donation Requests</p>
        </div>
      </div>
    </div>
  );
};

export default VolunteerDashboard;
