import  { useState } from "react";
import Swal from "sweetalert2";
import { useQuery } from "@tanstack/react-query";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import useAuth from "../../Hooks/useAuth";
import useAxiosSecure from "../../Hooks/axiosSecure";
import useAxiosPublic from "../../Hooks/useAxiosPublic";

const FundingPage = () => {
  const axiosSecure = useAxiosSecure();
  const axiosPublic = useAxiosPublic()
  const { user } = useAuth();
  const [isFundModalOpen, setIsFundModalOpen] = useState(false);
  const [amount, setAmount] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false); // Button state

  const stripe = useStripe();
  const elements = useElements();

  // Fetch funding data with React Query
  const { data, isLoading, isError } = useQuery({
    queryKey: ["funds"],
    queryFn: async () => {
      const res = await axiosPublic.get("create-payment-intent");
      return res.data;
    },
  });
  console.log("API Response:", data);
  const funds = Array.isArray(data) ? data : []; 
  console.log(funds);
  const totalFunds = funds.reduce((sum, fund) => sum + (fund.amount || 0), 0);
  console.log("total funds", totalFunds);

  // Handle donation submission
  const handleDonation = async (e) => {
    e.preventDefault();
  
    if (!amount || parseFloat(amount) < 0) {
      Swal.fire("Error", "Please enter a valid amount (minimum $50).", "error");
      return;
    }
  
    if (!stripe || !elements) {
      Swal.fire("Error", "Stripe has not loaded yet.", "error");
      return;
    }
  
    const cardElement = elements.getElement(CardElement);
  
    if (!cardElement) {
      Swal.fire("Error", "Card element is not available.", "error");
      return;
    }
  
    setIsSubmitting(true);
  
    try {
      // Step 1: Create Payment Intent
      const paymentPayload = {
        amount: Math.round(parseFloat(amount) * 100),
        customer: user?.displayName || "Anonymous Donor",
        avatar: user?.photoURL || "default_avatar_url",
        date: new Date().toISOString(),
      };
  
      console.log("Payment Intent Payload:", paymentPayload);
  
      const { data } = await axiosSecure.post(`/create-payment-intent`, paymentPayload);
      const { clientSecret} = data;
  
      // Step 2: Confirm Card Payment
      const { error } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: cardElement,
          billing_details: { name: user?.displayName || "Anonymous Donor" },
        },
      });
  
      if (error) {
        cardElement.focus();
        Swal.fire("Error", `Payment failed: ${error.message}`, "error");
        setIsSubmitting(false);
        return;
      }
  
      // Step 3: Save Payment Details
      const savePayload = {
       
        amount: parseFloat(amount),
        customer: user?.displayName || "Anonymous Donor",
        avatar: user?.avatar || "default_avatar_url",
      };
  
      console.log("Saving Payment Details Payload:", savePayload);
  
      const saveResponse = await axiosSecure.post(`/save-payment-intent`, savePayload);
  
      if (!saveResponse?.data) {
        Swal.fire("Error", "Something went wrong while saving payment details.", "error");
        setIsSubmitting(false);
        return;
      }
  
      // Step 4: Success Handling
      Swal.fire("Success", "Your donation was successful!", "success");
      setAmount("");
     
      setIsFundModalOpen(false);
    } catch (err) {
      console.error("Error during donation:", err);
      Swal.fire("Error", err.message || "An error occurred during payment.", "error");
    } finally {
      setIsSubmitting(false);
    }
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
        <table className="w-full border border-gray-200 bg-white rounded-lg shadow-md overflow-hidden">
  <thead>
    <tr className="bg-gray-50 text-center text-gray-700 font-semibold">
      <th className="py-3 px-6 border-b">User</th>
      <th className="py-3 px-6 border-b">Amount</th>
      <th className="py-3 px-6 border-b">Date</th>
    </tr>
  </thead>
  <tbody className="text-center">
    {funds.map((fund, index) => (
      <tr
        key={index}
        className={`${
          index % 2 === 0 ? "bg-white" : "bg-gray-50"
        } hover:bg-blue-50 transition-colors`}
      >
        <td className="py-3 px-6 border-b text-gray-700">{fund.customer}</td>
        <td className="py-3 px-6 border-b text-gray-700 font-medium">
          ${fund.amount.toFixed(2)}
        </td>
        <td className="py-3 px-6 border-b text-gray-500">
          {new Date(fund.date).toLocaleDateString()}
        </td>
      </tr>
    ))}
  </tbody>
</table>

      )}


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
                  disabled={false}
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
