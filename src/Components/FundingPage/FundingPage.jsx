import React, { useState } from "react";
import Swal from "sweetalert2";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import useAuth from "../../Hooks/useAuth";
import useAxiosSecure from "../../Hooks/axiosSecure";

const FundingPage = () => {
    const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const [currentPage, setCurrentPage] = useState(1);
  const [fundsPerPage] = useState(10); // Items per page
  const [isFundModalOpen, setIsFundModalOpen] = useState(false);
  const [amount, setAmount] = useState("");

  const stripe = useStripe();
  const elements = useElements();

  // Fetch funding data with React Query
  const { data, isLoading, isError } = useQuery({
    queryKey: ["funds", currentPage],
    queryFn: async () => {
      const res = await axios.get(`/api/funding?page=${currentPage}&limit=${fundsPerPage}`);
      return res.data;
    },
  });

  const funds = data?.funds || [];
  const totalFunds = data?.total || 0;

  // Handle donation submission
  const handleDonation = async (e) => {
    e.preventDefault();

    if (!amount || parseFloat(amount) <= 0) {
      Swal.fire("Error", "Please enter a valid amount.", "error");
      return;
    }

    if (!stripe || !elements) return;

    const cardElement = elements.getElement(CardElement);

    try {
      const response = await axiosSecure.post("/create-payment-intent", {
        amount: Math.round(parseFloat(amount) * 100),
        user: user.disaplayName,
      });


      const { error } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: cardElement,
          billing_details: { name: user?.name || "Anonymous Donor" },
        },
    });

    console.log(payment_method);
    
      if (error) {
        Swal.fire("Error", "Payment failed. Please try again.", "error");
      } else {
        Swal.fire("Success", "Your donation was successful!", "success");
        setAmount("");
        setIsFundModalOpen(false);
      }
    } catch (err) {
      console.error(err);
      Swal.fire("Error", "An error occurred during payment.", "error");
    }
  };

  const handlePageChange = (newPage) => {
    if (newPage > 0) setCurrentPage(newPage);
  };

  return (
    <div className="container mx-auto py-20 px-4">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Funding Page</h1>
        <button
          onClick={() => setIsFundModalOpen(true)}
          className="btn btn-primary px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Give Fund
        </button>
      </div>

      {/* Total Funds */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold">
          Total Funds: ${totalFunds.toLocaleString()}
        </h2>
      </div>

      {/* Table of Funds */}
      {isLoading ? (
        <p>Loading...</p>
      ) : isError ? (
        <p>Error loading data. Please try again later.</p>
      ) : (
        <table className="w-full border border-gray-300 bg-white rounded-lg shadow-sm overflow-hidden">
          <thead>
            <tr className="bg-blue-100">
              <th className="py-2 px-4 border-b">User</th>
              <th className="py-2 px-4 border-b">Amount</th>
              <th className="py-2 px-4 border-b">Date</th>
            </tr>
          </thead>
          <tbody>
            {funds.map((fund, index) => (
              <tr key={index} className="hover:bg-gray-100">
                <td className="py-2 px-4 border-b">{fund.userName}</td>
                <td className="py-2 px-4 border-b">${fund.amount}</td>
                <td className="py-2 px-4 border-b">
                  {new Date(fund.date).toLocaleDateString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {/* Pagination */}
      <div className="flex justify-center mt-4">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-4 py-2 mx-1 bg-gray-200 text-gray-600 rounded hover:bg-gray-300 disabled:opacity-50"
        >
          Prev
        </button>
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={funds.length < fundsPerPage}
          className="px-4 py-2 mx-1 bg-gray-200 text-gray-600 rounded hover:bg-gray-300 disabled:opacity-50"
        >
          Next
        </button>
      </div>

      {/* Fund Modal */}
      {isFundModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-xl font-bold mb-4">Donate Funds</h2>
            <form onSubmit={handleDonation}>
              <div className="mb-4">
                <label className="block text-gray-700">User Name</label>
                <input
                  type="text"
                  
                  defaultValue={user.displayName}
                  onChange={(e) => setAmount(e.target.value)}
                  className="w-full p-2 border rounded mt-1"
                  placeholder="Enter amount (e.g., 10.00)"
                />
                <label className="block text-gray-700">Amount</label>
                <input
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="w-full p-2 border rounded mt-1"
                  placeholder="Enter amount (e.g., 10.00)"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Card Details</label>
                <CardElement className="p-2 border rounded mt-1" />
              </div>
              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsFundModalOpen(false)}
                  className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={!stripe}
                  className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                  Donate
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default FundingPage;
