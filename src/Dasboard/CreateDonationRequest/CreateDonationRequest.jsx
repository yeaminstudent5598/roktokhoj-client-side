import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { FaCheckCircle, FaExclamationCircle } from "react-icons/fa";
import useAuth from "../../Hooks/useAuth";
import useAxiosSecure from "../../Hooks/axiosSecure";
import Swal from "sweetalert2";
import { useQuery } from "@tanstack/react-query";

const CreateDonationRequest = () => {
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [districtData, setDistrictData] = useState([]);
  const [upazilaData, setUpazilaData] = useState([]);
  const [filteredUpazilas, setFilteredUpazilas] = useState([]);
  const [selectedDistrictId, setSelectedDistrictId] = useState("");

  // Fetch districts
  useEffect(() => {
    fetch("/districts.json")
      .then((res) => res.json())
      .then((data) => setDistrictData(data[2]?.data || []))
      .catch((err) => console.error("Error loading districts:", err));
  }, []);

  // Fetch upazilas
  useEffect(() => {
    fetch("/upazilas.json")
      .then((res) => res.json())
      .then((data) => setUpazilaData(data[2]?.data || []))
      .catch((err) => console.error("Error loading upazilas:", err));
  }, []);

  // Filter upazilas when district changes
  useEffect(() => {
    if (selectedDistrictId) {
      setFilteredUpazilas(
        upazilaData.filter((upazila) => upazila.district_id === selectedDistrictId)
      );
    } else {
      setFilteredUpazilas([]);
    }
  }, [selectedDistrictId, upazilaData]);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const { data: users = [], isLoading: isUsersLoading } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const response = await axiosSecure.get("/users");
      return response.data;
    },
  });

  const loggedInUser = users.find((u) => u.email === user?.email);

  if (loggedInUser?.status === "blocked") {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="p-6 bg-red-100 text-red-700 rounded-lg shadow-lg text-center">
          <FaExclamationCircle className="text-4xl mb-4" />
          <h2 className="text-xl font-bold mb-2">Access Denied</h2>
          <p>You are blocked and cannot create donation requests.</p>
        </div>
      </div>
    );
  }

  const onSubmit = (data) => {
    const selectedDistrict = districtData.find(
      (district) => district.id === data.recipientDistrict
    );

    const userInfo = {
      bloodGroup: data.bloodGroup,
      donationDate: data.donationDate,
      donationTime: data.donationTime,
      fullAddress: data.fullAddress,
      hospitalName: data.hospitalName,
      recipientDistrict: selectedDistrict?.name || "",
      recipientName: data.recipientName,
      recipientUpazila: data.recipientUpazila,
      requestMessage: data.requestMessage,
      requesterEmail: user?.email,
      requesterName: user?.displayName,
      status: "pending",
    };

    axiosSecure
      .post("/create-donation-request", userInfo)
      .then(() => {
        Swal.fire({
          title: "Success!",
          text: "Your donation request has been created successfully.",
          icon: "success",
          confirmButtonText: "OK",
        }).then(() => {
          navigate("/dashboard/donor-dashboard");
        });
      })
      .catch((error) => {
        console.error("Error creating donation request:", error);
        Swal.fire({
          title: "Error!",
          text: "Failed to create donation request. Please try again.",
          icon: "error",
          confirmButtonText: "OK",
        });
      });

    reset();
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-3xl font-bold text-center mb-6">
        Create Donation Request
      </h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium">Requester Name</label>
            <input
              type="text"
              value={user?.displayName}
              readOnly
              {...register("requesterName")}
              className="input input-bordered w-full"
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Requester Email</label>
            <input
              type="email"
              value={user?.email}
              readOnly
              {...register("requesterEmail")}
              className="input input-bordered w-full"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium">Recipient Name</label>
          <input
            type="text"
            {...register("recipientName", { required: "Recipient Name is required" })}
            className="input input-bordered w-full"
          />
          {errors.recipientName && (
            <span className="text-red-500 text-sm">{errors.recipientName.message}</span>
          )}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium">Recipient District</label>
            <select
              {...register("recipientDistrict", { required: "District is required" })}
              className="select select-bordered w-full"
              value={selectedDistrictId}
              onChange={(e) => setSelectedDistrictId(e.target.value)}
            >
              <option value="">Select District</option>
              {districtData.map((district) => (
                <option key={district.id} value={district.id}>
                  {district.name}
                </option>
              ))}
            </select>
            {errors.recipientDistrict && (
              <span className="text-red-500 text-sm">{errors.recipientDistrict.message}</span>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium">Recipient Upazila</label>
            <select
              {...register("recipientUpazila", { required: "Upazila is required" })}
              className="select select-bordered w-full"
            >
              <option value="">Select Upazila</option>
              {filteredUpazilas.map((upazila) => (
                <option key={upazila.id} value={upazila.name}>
                  {upazila.name}
                </option>
              ))}
            </select>
            {errors.recipientUpazila && (
              <span className="text-red-500 text-sm">{errors.recipientUpazila.message}</span>
            )}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium">Hospital Name</label>
          <input
            type="text"
            {...register("hospitalName", { required: "Hospital Name is required" })}
            className="input input-bordered w-full"
          />
          {errors.hospitalName && (
            <span className="text-red-500 text-sm">{errors.hospitalName.message}</span>
          )}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium">Blood Group</label>
            <select
              {...register("bloodGroup", { required: "Blood Group is required" })}
              className="select select-bordered w-full"
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
            {errors.bloodGroup && (
              <span className="text-red-500 text-sm">{errors.bloodGroup.message}</span>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium">Donation Date</label>
            <input
              type="date"
              {...register("donationDate", { required: "Donation Date is required" })}
              className="input input-bordered w-full"
            />
            {errors.donationDate && (
              <span className="text-red-500 text-sm">{errors.donationDate.message}</span>
            )}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium">Message</label>
          <textarea
            {...register("requestMessage")}
            className="textarea textarea-bordered w-full"
            placeholder="Write your request message here..."
          ></textarea>
        </div>

        <button type="submit" className="btn btn-primary w-full">
          Submit Request
        </button>
      </form>
    </div>
  );
};

export default CreateDonationRequest;
