import React, { useState } from "react";
import { FiEdit, FiSave } from "react-icons/fi";
import Swal from "sweetalert2";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import useAxiosSecure from "../../../Hooks/axiosSecure";
import useAuth from "../../../Hooks/useAuth";

const DonorProfile = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const [isEditing, setIsEditing] = useState(false);
  const [updatedProfile, setUpdatedProfile] = useState({});

  // Fetch user's profile
  const { data: profile, isLoading } = useQuery({
    queryKey: ["userProfile", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/users/${user?.email}`);
      console.log( "user info", res.data);
      return res.data;
    },
    enabled: !!user?.email,
  });
  

  // Mutation for updating the profile
  const updateProfileMutation = useMutation({
    mutationFn: (updatedData) => axiosSecure.patch(`/users/${updatedData.email}`, updatedData),
    onSuccess: () => {
      // Invalidate and refetch the user's profile after a successful update
      queryClient.invalidateQueries(["userProfile", user?.email]);
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Profile updated successfully!",
        showConfirmButton: false,
        timer: 1500,
      });
      setIsEditing(false);
    },
    onError: (error) => {
      Swal.fire("Error", "Failed to update profile.", "error");
      console.error(error);
    },
  });
  

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdatedProfile((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleEditClick = () => {
    setUpdatedProfile(profile); // Load the current profile into the state
    setIsEditing(true);
  };

  const handleSaveClick = () => {
    updateProfileMutation.mutate(updatedProfile);
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="p-6 max-w-3xl mx-auto bg-white rounded-xl shadow-md space-y-4">
      
      <div className="flex flex-col items-center space-y-4">
        <div className="avatar">
          <div className="w-24 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
            <img src={profile?.image || "https://via.placeholder.com/150"} alt="Avatar" />
          </div>
        </div>
        <h2 className="text-2xl font-bold text-center text-gray-800">Donor Profile</h2>
        <p>{profile.email}</p>
      </div>

      <form className="space-y-4">
        <div className="form-control">
          <label className="label font-semibold">Name</label>
          <input
            type="text"
            name="name"
            value={isEditing ? updatedProfile?.name : profile?.name}
            onChange={handleInputChange}
            className={`input input-bordered w-full ${isEditing ? "" : "bg-gray-200 cursor-not-allowed"}`}
            disabled={!isEditing}
          />
        </div>
        <div className="form-control">
          <label className="label font-semibold">District</label>
          <input
            type="text"
            name="district"
            value={isEditing ? updatedProfile?.district : profile?.district}
            onChange={handleInputChange}
            className={`input input-bordered w-full ${isEditing ? "" : "bg-gray-200 cursor-not-allowed"}`}
            disabled={!isEditing}
          />
        </div>
        <div className="form-control">
          <label className="label font-semibold">Upazila</label>
          <input
            type="text"
            name="upazila"
            value={isEditing ? updatedProfile?.upazila : profile?.upazila}
            onChange={handleInputChange}
            className={`input input-bordered w-full ${isEditing ? "" : "bg-gray-200 cursor-not-allowed"}`}
            disabled={!isEditing}
          />
        </div>
        <div className="form-control">
  <label className="label font-semibold">Blood Group</label>
  {isEditing ? (
    <select
      name="bloodGroup"
      value={updatedProfile?.bloodGroup || ""}
      onChange={handleInputChange}
      className="select select-bordered w-full"
    >
      <option value="" disabled>
        Select your blood group
      </option>
      <option value="A+">A+</option>
      <option value="A-">A-</option>
      <option value="B+">B+</option>
      <option value="B-">B-</option>
      <option value="AB+">AB+</option>
      <option value="AB-">AB-</option>
      <option value="O+">O+</option>
      <option value="O-">O-</option>
    </select>
  ) : (
    <input
      type="text"
      name="bloodGroup"
      value={profile?.bloodGroup}
      className="input input-bordered w-full bg-gray-200 cursor-not-allowed"
      disabled
    />
  )}
</div>

      </form>

      <div className="flex justify-center mt-6">
        {isEditing ? (
          <button
            className="btn btn-primary flex items-center gap-2"
            onClick={handleSaveClick}
            disabled={updateProfileMutation.isLoading}
          >
            <FiSave size={20} />
            Save
          </button>
        ) : (
          <button
            className="btn btn-secondary flex items-center gap-2"
            onClick={handleEditClick}
          >
            <FiEdit size={20} />
            Edit
          </button>
        )}
      </div>
    </div>
  );
};

export default DonorProfile;
