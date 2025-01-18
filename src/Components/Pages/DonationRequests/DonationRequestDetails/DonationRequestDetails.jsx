import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useAuth from "../../../Hooks/useAuth"; // Custom hook to get current user
import useAxiosPublic from "../../../Hooks/useAxiosPublic"; // Custom hook for axios
import Modal from "../../UI/Modal"; // Assuming you have a Modal component

const DonationRequestDetails = () => {
  const { currentUser } = useAuth(); // Get current user
  const { id } = useParams(); // Get donation request ID from URL params
  const axiosPublic = useAxiosPublic();
  const navigate = useNavigate();
  
  const [donationRequest, setDonationRequest] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [donorName] = useState(currentUser?.name); // Donor name from logged-in user
  const [donorEmail] = useState(currentUser?.email); // Donor email from logged-in user

  useEffect(() => {
    // Fetch donation request details by ID
    const fetchDonationRequest = async () => {
      try {
        const response = await axiosPublic.get(`/create-donation-request/${id}`);
        setDonationRequest(response.data);
      } catch (error) {
        console.error("Error fetching donation request details:", error);
      }
    };

    fetchDonationRequest();
  }, [id, axiosPublic]);

  // Handle donation confirmation
  const handleDonate = async () => {
    if (!currentUser) {
      // Redirect to login if the user is not logged in
      navigate("/login");
      return;
    }

    try {
      // Update the donation status to 'inprogress'
      const updatedRequest = { ...donationRequest, status: "inprogress" };
      await axiosPublic.put(`/create-donation-request/${id}`, updatedRequest);
      setShowModal(false); // Close the modal
      alert("Donation confirmed and status updated!");
    } catch (error) {
      console.error("Error confirming donation:", error);
    }
  };

  return (
    <div className="container mx-auto p-6">
      {donationRequest && (
        <>
          <h1 className="text-center text-2xl font-bold mb-4">Donation Request Details</h1>
          
          <div className="card border p-6 shadow-md bg-white rounded-lg mb-6">
            <h2 className="font-semibold">Recipient: {donationRequest.recipientName}</h2>
            <p className="text-sm text-gray-600">Location: {donationRequest.fullAddress}</p>
            <p className="text-sm text-gray-600">Blood Group: {donationRequest.bloodGroup}</p>
            <p className="text-sm text-gray-600">Date: {new Date(donationRequest.donationDate).toLocaleDateString()}</p>
            <p className="text-sm text-gray-600">Time: {new Date(donationRequest.donationTime * 1000).toLocaleTimeString()}</p>
            <p className="text-sm text-gray-600">Request Message: {donationRequest.requestMessage}</p>
            <p className="text-sm text-gray-600">Hospital: {donationRequest.hospitalName}</p>
            <p className="text-sm text-gray-600">District: {donationRequest.recipientDistrict}</p>
            <p className="text-sm text-gray-600">Upazila: {donationRequest.recipientUpazila}</p>
          </div>

          {/* Donate button */}
          <button
            onClick={() => setShowModal(true)}
            className="btn btn-primary mt-4"
          >
            Donate
          </button>

          {/* Modal with donation form */}
          {showModal && (
            <Modal onClose={() => setShowModal(false)}>
              <h3 className="text-xl font-bold mb-4">Confirm Donation</h3>
              <form onSubmit={(e) => e.preventDefault()}>
                <div className="mb-4">
                  <label htmlFor="donorName" className="block text-sm text-gray-600">Donor Name</label>
                  <input
                    id="donorName"
                    value={donorName}
                    readOnly
                    className="w-full p-2 border border-gray-300 rounded mt-2"
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="donorEmail" className="block text-sm text-gray-600">Donor Email</label>
                  <input
                    id="donorEmail"
                    value={donorEmail}
                    readOnly
                    className="w-full p-2 border border-gray-300 rounded mt-2"
                  />
                </div>
                <button
                  onClick={handleDonate}
                  className="btn btn-primary mt-4"
                >
                  Confirm Donation
                </button>
              </form>
            </Modal>
          )}
        </>
      )}
    </div>
  );
};

export default DonationRequestDetails;
