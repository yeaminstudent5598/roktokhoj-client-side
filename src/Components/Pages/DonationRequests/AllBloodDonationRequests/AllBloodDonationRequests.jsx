import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { FaEdit } from "react-icons/fa";
import Swal from "sweetalert2";
import ReactPaginate from "react-paginate";
import useAxiosSecure from "../../../../Hooks/axiosSecure";
import { useNavigate } from "react-router-dom";
import useAdmin from "../../../../Hooks/useAdmin";
import useValunteer from "../../../../Hooks/useVolunteer";
import useAuth from "../../../../Hooks/useAuth";

const AllBloodDonationRequests = () => {
  const axiosSecure = useAxiosSecure();
  const {loading} = useAuth();
  const [isAdmin] = useAdmin();
  const [isValunteer] = useValunteer();
  const navigate = useNavigate();
  const { data: requests = [], refetch } = useQuery({
    queryKey: ["blood-donation-requests"],
    queryFn: async () => {
      const res = await axiosSecure.get("/create-donation-request");
      return res.data;
    },
  });

  const [filter, setFilter] = useState("all"); // 'all', 'pending', 'done', 'canceled'
  const [currentPage, setCurrentPage] = useState(0);
  const requestsPerPage = 5;

  // Filter requests based on status
  const filteredRequests =
    filter === "all"
      ? requests
      : requests.filter((request) => request.status === filter);

  // Pagination logic
  const pageCount = Math.ceil(filteredRequests.length / requestsPerPage);
  const displayedRequests = filteredRequests.slice(
    currentPage * requestsPerPage,
    (currentPage + 1) * requestsPerPage
  );

  const handlePageClick = (event) => {
    setCurrentPage(event.selected);
  };

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "Cancel",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure
          .delete(`/create-donation-request/${id}`)
          .then(() => {
            refetch();
            Swal.fire({
              position: "top-end",
              icon: "success",
              title: "Donation request deleted successfully.",
              showConfirmButton: false,
              timer: 1500,
            });
          })
          .catch((err) => {
            Swal.fire("Error", "Failed to delete donation request.", "error");
            console.error(err);
          });
      }
    });
  };

  const handleStatusUpdate = (id, status) => {
    Swal.fire({
      title: "Update Status",
      input: "select",
      inputOptions: {
        pending: "Pending",
        inprogress: "In Progress",
        done: "Done",
        canceled: "Canceled",
      },
      inputValue: status,
      showCancelButton: true,
      confirmButtonText: "Update",
      showLoaderOnConfirm: true,
      preConfirm: (newStatus) => {
        return axiosSecure
          .patch(`/create-donation-request/${id}`, { status: newStatus })
          .then(() => {
            refetch();
            Swal.fire("Updated!", "Donation status updated successfully.", "success");
          })
          .catch((err) => {
            Swal.fire("Error", "Failed to update status.", "error");
            console.error(err);
          });
      },
    });
  };


  if (loading) {
    return <div className="text-center py-10"> <div className="loading min-h-screen flex items-center justify-center bg-gray-50">
    <svg width="64px" height="48px">
      <polyline
        points="0.157 23.954, 14 23.954, 21.843 48, 43 0, 50 24, 64 24"
        id="back"
        className="stroke-gray-300 stroke-2 fill-none"
      ></polyline>
      <polyline
        points="0.157 23.954, 14 23.954, 21.843 48, 43 0, 50 24, 64 24"
        id="front"
        className="stroke-blue-500 stroke-2 fill-none animate-dash"
      ></polyline>
    </svg>
  </div></div>;
  }

  return (
    <div className="p-8">
      {/* Header Section */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-semibold">All Blood Donation Requests</h2>
        <div className="flex items-center gap-4">
          <select
            className="select select-bordered"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          >
            <option value="all">All</option>
            <option value="pending">Pending</option>
            <option value="inprogress">In Progress</option>
            <option value="done">Done</option>
            <option value="canceled">Canceled</option>
          </select>
        </div>
      </div>

      {/* Table Section */}
      <div className="overflow-x-auto">
        <table className="table w-full border">
          {/* Table Header */}
          <thead className="bg-[#D1A054] text-white">
            <tr>
              <th>#</th>
              <th>Blood Type</th>
              <th>Donor Name</th>
              <th>Contact</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          {/* Table Body */}
          <tbody>
            {displayedRequests.map((request, index) => (
              <tr key={request._id} className="hover:bg-gray-100">
                <td>{index + 1 + currentPage * requestsPerPage}</td>
                <td>{request.bloodGroup}</td>
                <td>{request.recipientName}</td>
                <td>{request.requesterEmail}</td>
                <td>{request.status}</td>
                <td className="border border-gray-300 px-4 py-2 flex space-x-2">
                  {isAdmin && (
                    <>
                      <button
                        className="btn btn-sm btn-info"
                        onClick={() =>
                          navigate(`/donation-details/${request._id}`)
                        }
                      >
                        View
                      </button>
                      <button
                        className="btn btn-sm btn-primary"
                        onClick={() =>
                          navigate(`/dashboard/edit-create-request/${request._id}`)
                        }
                      >
                        Edit
                      </button>
                      <button
                        className="btn btn-sm btn-danger"
                        onClick={() => handleDelete(request._id)}
                      >
                        Delete
                      </button>
                    </>
                  )}
                  {isValunteer && (
                    <button
                      className="btn btn-sm btn-warning"
                      onClick={() =>
                        handleStatusUpdate(request._id, request.status)
                      }
                    >
                      Update Status
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="mt-4">
        <ReactPaginate
          previousLabel={"Previous"}
          nextLabel={"Next"}
          pageCount={pageCount}
          onPageChange={handlePageClick}
          containerClassName={"pagination flex justify-center gap-2"}
          activeClassName={"btn btn-primary"}
          pageLinkClassName={"btn btn-sm"}
          previousLinkClassName={"btn btn-sm"}
          nextLinkClassName={"btn btn-sm"}
        />
      </div>
    </div>
  );
};

export default AllBloodDonationRequests;
