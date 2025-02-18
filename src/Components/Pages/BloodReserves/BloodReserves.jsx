import React from 'react';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../../Hooks/axiosSecure';

// Fetch users data using Tanstack Query
const BloodReserves = () => {
  const axiosSecure = useAxiosSecure();
  
  // Correct way to use the query hook
  const { data: users = [], isLoading, error } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await axiosSecure.get("/users/normal");
      return res.data;
    },
  });

  if (isLoading) {
    return <div className="text-center py-10 text-xl"><p className="min-h-screen flex items-center justify-center bg-gray-50"><div class="spinner"></div></p></div>;
  }

  if (error) {
    return <div className="text-center py-10 text-xl text-red-500">Error fetching users: {error.message}</div>;
  }

  return (
    <div className="px-4 pt-40">
      <h2 className="text-3xl font-semibold text-center mb-8">Blood Reserves</h2>
      <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {users.map((user) => (
          <div key={user._id} className="card w-full bg-white shadow-xl rounded-lg">
           
            <div className="card-body">
              <h3 className="card-title text-xl font-bold text-gray-800">{user.name}</h3>
              <p className="text-gray-500">Email: {user.email}</p>
              <p className="text-gray-500">Blood Group: {user.bloodGroup}</p>
              <p className="text-gray-500">Location: {user.upazila}, {user.district}</p>
              {/* <p className={`badge ${user.status === 'active' ? 'badge-success' : 'badge-error'}`}>
                Contact
              </p> */}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BloodReserves;
