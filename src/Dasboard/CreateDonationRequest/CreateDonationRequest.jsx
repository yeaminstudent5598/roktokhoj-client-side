import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form"; // Import useForm from React Hook Form
import { FaCheckCircle, FaExclamationCircle } from "react-icons/fa"; // React Icons for success/error icons
import useAuth from "../../Hooks/useAuth";
import useAxiosSecure from "../../Hooks/axiosSecure";
import Swal from "sweetalert2";

const CreateDonationRequest = () => {
    const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  console.log(user);
  const navigate = useNavigate();
  const [districtData, setDistrictData] = useState([]);

  const [upazilaData, setUpazilaData] = useState([]);
  const [filteredUpazilas, setFilteredUpazilas] = useState([]);
  const [selectedDistrictId, setSelectedDistrictId] = useState("");

  useEffect(() => {
    fetch("/districts.json")
      .then((res) => res.json())
      .then((data) => {
        // console.log("District Data:", data);
        const districts = data[2]?.data || [];
        setDistrictData(districts);
        // console.log(districts);
      })
      .catch((err) => console.error("Error loading districts:", err));
      
  }, []);
  // console.log(districtData);
  useEffect(() => {
    fetch("/upazilas.json")
      .then((res) => res.json())
      .then((data) => {
        console.log("Upazila Data:", data);
        const upazilas = data[2]?.data || [];
        setUpazilaData(upazilas);
      })
      .catch((err) => console.error("Error loading upazilas:", err));
  }, []);
  
  // Filter Upazilas based on District Selection
  useEffect(() => {
    if (selectedDistrictId) {
      const filtered = upazilaData.filter(
        (upazila) => upazila.district_id === selectedDistrictId
      );
      setFilteredUpazilas(filtered);
    } else {
      setFilteredUpazilas([]);
    }
  }, [selectedDistrictId, upazilaData]);

  // React Hook Form
  const {
    register,
    handleSubmit,reset,
    formState: { errors },
  } = useForm();

  // Handle Form Submission
  const onSubmit = (data) => {
    const districtsName = districtData.find(item => item.id == data.recipientDistrict)
    console.log( "districts", districtsName);
 
    const userInfo = {
        bloodGroup: data.bloodGroup,
        donationDate: data.donationDate,
        donationTime: data.donationTime,
        fullAddress: data.fullAddress,
        hospitalName: data.hospitalName,
        recipientDistrict: districtsName.name,
        recipientName: data.recipientName,
        recipientUpazila: data.recipientUpazila,
        requestMessage: data.requestMessage,
        requesterEmail: data.requesterEmail,
        requesterName: data.requesterName,
        status: 'pending',
      }
      console.log(userInfo);

      axiosSecure.post('/create-donation-request', userInfo)
  .then((userRes) => {
   
  })
  .catch((error) => {
    console.error("Error creating donation request:", error);
  });

  reset();
    // Show a success message and redirect to the dashboard
    Swal.fire({
      title: "Success!",
      text: "Your donation request has been created successfully.",
      icon: "success",
      confirmButtonText: "OK",
    })
    .then(() => {
      // Redirect to the dashboard after closing the alert
      navigate("/dashboard");
    });
  };
 console.log( "block user", user)
  // If user is blocked, show a message
  if (user?.status === "blocked") {
    return (
      <div className="p-6 bg-red-100 text-red-700 rounded-lg">
        <FaExclamationCircle className="inline-block mr-2" />
        <span>You are blocked. You cannot create donation requests.</span>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-2xl font-semibold mb-4">Create Donation Request</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Requester Information */}
        <div className="form-control">
          <label className="label">Requester Name</label>
          <input
            type="text"
            value={user?.displayName}
            readOnly
            {...register("requesterName")}
            className="input input-bordered w-full"
          />
        </div>

        <div className="form-control">
          <label className="label">Requester Email</label>
          <input
            type="email"
            value={user?.email}
            readOnly
            {...register("requesterEmail")}
            className="input input-bordered w-full"
          />
        </div>

        {/* Recipient Information */}
        <div className="form-control">
          <label className="label">Recipient Name</label>
          <input
            type="text"
            {...register("recipientName", { required: "Recipient Name is required" })}
            className="input input-bordered w-full"
          />
          {errors.recipientName && (
            <span className="text-red-500">{errors.recipientName.message}</span>
          )}
        </div>

        <div className="form-control">
          <label className="label">Recipient District</label>
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
            <span className="text-red-500">{errors.recipientDistrict.message}</span>
          )}
        </div>

        <div className="form-control">
          <label className="label">Recipient Upazila</label>
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
            <span className="text-red-500">{errors.recipientUpazila.message}</span>
          )}
        </div>

        {/* Hospital & Blood Group */}
        <div className="form-control">
          <label className="label">Hospital Name</label>
          <input
            type="text"
            {...register("hospitalName", { required: "Hospital Name is required" })}
            className="input input-bordered w-full"
          />
          {errors.hospitalName && (
            <span className="text-red-500">{errors.hospitalName.message}</span>
          )}
        </div>

        <div className="form-control">
          <label className="label">Full Address</label>
          <input
            type="text"
            {...register("fullAddress", { required: "Full Address is required" })}
            className="input input-bordered w-full"
          />
          {errors.fullAddress && (
            <span className="text-red-500">{errors.fullAddress.message}</span>
          )}
        </div>

        <div className="form-control">
          <label className="label">Blood Group</label>
          <select
            {...register("bloodGroup", { required: "Blood Group is required" })}
            className="select select-bordered w-full"
          >
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
            <span className="text-red-500">{errors.bloodGroup.message}</span>
          )}
        </div>

        {/* Donation Date & Time */}
        <div className="form-control">
          <label className="label">Donation Date</label>
          <input
            type="date"
            {...register("donationDate", { required: "Donation Date is required" })}
            className="input input-bordered w-full"
          />
          {errors.donationDate && (
            <span className="text-red-500">{errors.donationDate.message}</span>
          )}
        </div>

        <div className="form-control">
          <label className="label">Donation Time</label>
          <input
            type="time"
            {...register("donationTime", { required: "Donation Time is required" })}
            className="input input-bordered w-full"
          />
          {errors.donationTime && (
            <span className="text-red-500">{errors.donationTime.message}</span>
          )}
        </div>

        {/* Request Message */}
        <div className="form-control">
          <label className="label">Request Message</label>
          <textarea
            {...register("requestMessage", { required: "Request Message is required" })}
            className="textarea textarea-bordered w-full"
          />
          {errors.requestMessage && (
            <span className="text-red-500">{errors.requestMessage.message}</span>
          )}
        </div>

        {/* Request Button */}
        <button type="submit" className="btn btn-primary w-full">
          <FaCheckCircle className="mr-2" /> Submit Donation Request
        </button>
      </form>
    </div>
  );
};

export default CreateDonationRequest;
