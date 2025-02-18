import React, { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../Hooks/axiosSecure";
import { jsPDF } from "jspdf"; // Import jsPDF

const SearchPage = () => {
  const axiosSecure = useAxiosSecure();
  const [searchCriteria, setSearchCriteria] = useState({
    bloodGroup: "",
    district: "",
    upazila: "",
  });

  // Fetch district data
  const { data: districtData = [], isLoading: isDistrictLoading } = useQuery({
    queryKey: ["districts"],
    queryFn: async () => {
      const response = await fetch("/districts.json");
      const data = await response.json();
      return data[2]?.data || [];
    },
  });
  const districtName = (id) => {
    const districsname = districtData.find(item => item.id == id);
    return districsname?.name;
  };

  // Fetch upazila data
  const { data: upazilaData = [], isLoading: isUpazilaLoading } = useQuery({
    queryKey: ["upazilas"],
    queryFn: async () => {
      const response = await fetch("/upazilas.json");
      const data = await response.json();
      return data[2]?.data || [];
    },
  });

  // Filter upazilas based on selected district
  const filteredUpazilas = upazilaData.filter(
    (upazila) => upazila.district_id === searchCriteria.district
  );

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSearchCriteria((prev) => ({ ...prev, [name]: value }));
  };

  // Fetch users data based on search criteria
  const { data: users = [], isLoading: isUsersLoading } = useQuery({
    queryKey: [
      "users",
      searchCriteria.bloodGroup,
      districtName(searchCriteria.district),
      searchCriteria.upazila,
    ],
    queryFn: async () => {
      const response = await axiosSecure.get("/users/normal", {
        params: { ...searchCriteria, district: districtName(searchCriteria.district) },
      });
      return response.data;
    },
  });

  if (isUsersLoading || isDistrictLoading || isUpazilaLoading) {
    return <div> <div className="loading min-h-screen flex items-center justify-center bg-gray-50">
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

  // Function to generate PDF
  const generatePDF = () => {
    const doc = new jsPDF();

    // Title for the PDF
    doc.setFontSize(18);
    doc.text("Donors Search Results", 20, 20);

    // Loop through users and add them to the PDF
    let y = 30; // y-axis start position for the content
    users.forEach((user, index) => {
      doc.setFontSize(12);
      doc.text(`Name: ${user.name}`, 20, y);
      doc.text(`Blood Group: ${user.bloodGroup}`, 20, y + 10);
      doc.text(`Location: ${user.upazila}, ${user.district}`, 20, y + 20);
      doc.text(`Contact: ${user.email}`, 20, y + 30);
      y += 40; // Move down for the next user
      
      // Add a page if the content exceeds the page
      if (y > 250) {
        doc.addPage();
        y = 20; // Reset y position for new page
      }
    });

    // Save the generated PDF
    doc.save("donor_results.pdf");
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-center text-2xl font-bold mb-6">Search for Donors</h1>

      {/* Search Form */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Blood Group Selector */}
          <div>
            <label className="block font-semibold mb-2" htmlFor="bloodGroup">
              Blood Group
            </label>
            <select
              id="bloodGroup"
              name="bloodGroup"
              value={searchCriteria.bloodGroup}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2"
            >
              <option value="">Select Blood Group</option>
              {["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"].map((group) => (
                <option key={group} value={group}>
                  {group}
                </option>
              ))}
            </select>
          </div>

          {/* District Selector */}
          <div>
            <label className="block font-semibold mb-2" htmlFor="district">
              District
            </label>
            <select
              id="district"
              name="district"
              value={searchCriteria.district}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2"
            >
              <option value="">Select District</option>
              {districtData.map((district) => (
                <option key={district.id} value={district.id}>
                  {district.name}
                </option>
              ))}
            </select>
          </div>

          {/* Upazila Selector */}
          <div>
            <label className="block font-semibold mb-2" htmlFor="upazila">
              Upazila
            </label>
            <select
              id="upazila"
              name="upazila"
              value={searchCriteria.upazila}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2"
            >
              <option value="">Select Upazila</option>
              {filteredUpazilas.map((upazila) => (
                <option key={upazila.id} value={upazila.name}>
                  {upazila.name}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Donor Results */}
      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {users.length ? (
          users.map((user, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow-md p-4 flex flex-col gap-2"
            >
              <div className="flex justify-between items-center">
                <h3 className="font-bold text-lg">{user.name}</h3>
                <span className="bg-blue-500 text-white px-2 py-1 rounded">
                  {user.bloodGroup}
                </span>
              </div>
              <p className="text-gray-600 text-sm">
                {user.upazila}, {user.district}
              </p>
              <p className="text-gray-600 text-sm">Contact: {user.email}</p>
            </div>
          ))
        ) : (
          <p className="text-gray-500">No donors found for the selected criteria.</p>
        )}
      </div>

      {/* Download Button */}
      {users.length > 0 && (
        <div className="text-center mt-6">
          <button
            onClick={generatePDF}
            className="btn btn-primary"
          >
            Download Search Results as PDF
          </button>
        </div>
      )}
    </div>
  );
};

export default SearchPage;
