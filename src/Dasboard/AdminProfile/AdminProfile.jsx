import React, { useEffect, useState } from 'react';
import { FaUserFriends, FaHandHoldingUsd, FaHeartbeat } from 'react-icons/fa';
import axios from 'axios';
import useAxiosSecure from '../../Hooks/axiosSecure';

const AdminProfile = () => {
    const axiosSecure = useAxiosSecure();
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalFunding: 0,
    totalRequests: 0,
  });

  useEffect(() => {
    // Fetch total users and total funding from the users API
    const fetchStats = async () => {
      try {
        const usersResponse = await axiosSecure.get('/users'); 
        const donationResponse = await axiosSecure.get('/create-donation-request'); 

        const totalUsers = usersResponse.data.length; 
        const totalRequests = donationResponse.data.length;

        // Calculate total funding (sum of all donations)
        const totalFunding = donationResponse.data.reduce(
          (total, request) => total + request.amount, // Assuming `amount` represents the donation amount
          0
        );

        setStats({
          totalUsers,
          totalFunding,
          totalRequests,
        });
      } catch (error) {
        console.error('Error fetching statistics:', error);
      }
    };

    fetchStats();
  }, []);

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      {/* Welcome Section */}
      <div className="bg-white shadow-md rounded-lg p-6 mb-6">
        <h1 className="text-2xl font-bold mb-2">Welcome, Admin!</h1>
        <p className="text-gray-600">Manage and track your organization's progress efficiently.</p>
      </div>

      {/* Featured Cards for Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Total Users Card */}
        <div className="bg-white shadow-md rounded-lg p-6 flex flex-col items-center">
          <FaUserFriends className="text-4xl text-blue-500 mb-4" />
          <h2 className="text-3xl font-bold mb-2">{stats.totalUsers}</h2>
          <p className="text-gray-600">Total Users (Donors)</p>
        </div>

        {/* Total Funding Card */}
        <div className="bg-white shadow-md rounded-lg p-6 flex flex-col items-center">
          <FaHandHoldingUsd className="text-4xl text-green-500 mb-4" />
          <h2 className="text-3xl font-bold mb-2">${stats.totalFunding.toLocaleString()}</h2>
          <p className="text-gray-600">Total Funding</p>
        </div>

        {/* Total Blood Donation Requests Card */}
        <div className="bg-white shadow-md rounded-lg p-6 flex flex-col items-center">
          <FaHeartbeat className="text-4xl text-red-500 mb-4" />
          <h2 className="text-3xl font-bold mb-2">{stats.totalRequests}</h2>
          <p className="text-gray-600">Total Blood Donation Requests</p>
        </div>
      </div>
    </div>
  );
};

export default AdminProfile;
