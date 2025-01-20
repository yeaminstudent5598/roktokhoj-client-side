import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import useAuth from "../../../../Hooks/useAuth";
import useAxiosPublic from "../../../../Hooks/useAxiosPublic";
import useAxiosSecure from "../../../../Hooks/axiosSecure";

const DonationRequestDetails = () => {
  const {user} = useAuth();
  const axiosPublic =useAxiosPublic();
  const axiosSecure =useAxiosSecure();

  const { id } = useParams();
  const [donationRequest, setDonationRequest] = useState(null);
  const [error, setError] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);


  // Fetch donation request details
  const fetchDonationRequest = async () => {
    try {
      const response = await axiosSecure.get(
        `/create-donation-request/${id}`
      );
      setDonationRequest(response.data);
    } catch (error) {
      if (error.response?.status === 404) {
        console.error("Donation request not found.");
        setError("Donation request not found. Please check the ID.");
      } else {
        console.error("Error fetching donation request details:", error);
        setError("An unexpected error occurred. Please try again later.");
      }
    }
  };

  useEffect(() => {
    fetchDonationRequest();
  }, [id]);

  // Handle donation confirmation
  const handleConfirmDonation = async () => {
    try {
      // Simulate API request to update donation status
      await axiosPublic.patch(`/donation-details/${id}`, {
        status: "inprogress",
        donorName: user.displayName,
        donorEmail: user.email,
      });

      setModalVisible(false); // Close modal on success
      Swal.fire({
        title: "Donation Confirmed!",
        text: "Thank you for your generous donation. The request status has been updated to 'In Progress.'",
        icon: "success",
        confirmButtonText: "Close",
      });
    } catch (error) {
      console.error("Error confirming donation:", error);
      Swal.fire({
        title: "Error",
        text: "Failed to confirm donation. Please try again later.",
        icon: "error",
        confirmButtonText: "Close",
      });
    }
  };

  if (error) {
    return (
      <div className="text-center py-10">
        <h2 className="text-2xl font-bold text-red-500">Error</h2>
        <p className="text-gray-600">{error}</p>
      </div>
    );
  }

  if (!donationRequest) {
    return <div className="text-center py-10">Loading...</div>;
  }

  return (
    <div className="max-w-3xl mx-auto p-5 pt-20">
      {/* Details Section */}
      <div className="card bg-base-100 shadow-xl p-6">
        <h1 className="text-3xl font-bold text-center mb-5 text-primary">
          Donation Request Details
        </h1>
        <div className="text-lg">
          <p>
            <span className="font-semibold">Name:</span> {donationRequest.recipientName}
          </p>
          <p>
            <span className="font-semibold">Blood Group:</span>{" "}
            {donationRequest.bloodGroup}
          </p>
          <p>
            <span className="font-semibold">Location:</span> {donationRequest.recipientUpazila}, 
             {donationRequest.fullAddress} , {donationRequest.hospitalName}
          </p>
          <p>
            <span className="font-semibold">Contact:</span>{" "}
            {donationRequest.requesterEmail}
          </p>
        </div>
        <button
          className="btn btn-primary mt-6 w-full"
          onClick={() => setModalVisible(true)}
        >
          Donate
        </button>
      </div>

      {/* Modal */}
      {modalVisible && (
        <div className="modal modal-open">
          <div className="modal-box">
            <h2 className="font-bold text-lg text-primary mb-4">
              Confirm Donation
            </h2>
            <form>
              <div className="form-control mb-4">
                <label className="label">
                  <span className="label-text">Donor Name</span>
                </label>
                <input
                  type="text"
                  value={user.displayName}
                  readOnly
                  className="input input-bordered"
                />
              </div>
              <div className="form-control mb-4">
                <label className="label">
                  <span className="label-text">Donor Email</span>
                </label>
                <input
                  type="email"
                  value={user.email}
                  readOnly
                  className="input input-bordered"
                />
              </div>
              <div className="flex justify-end">
                <button
                  type="button"
                  className="btn btn-primary mr-2"
                  onClick={handleConfirmDonation}
                >
                  Confirm Donation
                </button>
                <button
                  type="button"
                  className="btn btn-outline"
                  onClick={() => setModalVisible(false)}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default DonationRequestDetails;
