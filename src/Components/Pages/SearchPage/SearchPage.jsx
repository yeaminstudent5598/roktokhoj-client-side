import React, { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../Hooks/axiosSecure";

const SearchPage = () => {
  const axiosSecure = useAxiosSecure();
  const [searchCriteria, setSearchCriteria] = useState({
    bloodGroup: "",            
    district: "",
    upazila: "",
  });
  const { data: users = [] } = useQuery({
    queryKey: ["users",searchCriteria.bloodGroup, searchCriteria.district, searchCriteria.upazila],
    queryFn: async () => {
      const res = await axiosSecure.get("/users");
      console.log("Fetched users data:", res.data);
      console.log(res.data);
      return res.data;
    },
  });

  
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [districtData, setDistrictData] = useState([]);
  const [upazilaData, setUpazilaData] = useState([]);
  const [filteredUpazilas, setFilteredUpazilas] = useState([]);

  // Fetch district and upazila data
  useEffect(() => {
    fetch("/districts.json")
      .then((res) => res.json())
      .then((data) => {
        const districts = data[2]?.data || [];
        setDistrictData(districts);
      })
      .catch((err) => console.error("Error loading districts:", err));
  }, []);

  useEffect(() => {
    fetch("/upazilas.json")
      .then((res) => res.json())
      .then((data) => {
        const upazilas = data[2]?.data || [];
        setUpazilaData(upazilas);
      })
      .catch((err) => console.error("Error loading upazilas:", err));
  }, []);

   
  // Filter upazilas based on selected district
  useEffect(() => {
    if (searchCriteria.district) {
      const filtered = upazilaData.filter(
        (upazila) => upazila.district_id === searchCriteria.district
      );
      setFilteredUpazilas(filtered);
    } else {
      setFilteredUpazilas([]);
    }
  }, [searchCriteria.district, upazilaData]);

  // Filter users whenever search criteria or users data change
  useEffect(() => {
    if (users.length > 0) {
      const filtered = users.filter((user) => {
        return (
          (searchCriteria.bloodGroup ? user.bloodGroup === searchCriteria.bloodGroup : true) &&
          (searchCriteria.district ? user.district === searchCriteria.district : true) &&
          (searchCriteria.upazila ? user.upazila === searchCriteria.upazila : true)
        );
      });
      setFilteredUsers(filtered);
    }
  }, [users, searchCriteria]); // Re-run when `users` or `searchCriteria` change

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSearchCriteria((prev) => ({ ...prev, [name]: value }));
  };

  const handleSearch = () => {
    const filtered = users.filter((user) => {
      return (
        (searchCriteria.bloodGroup ? user.bloodGroup === searchCriteria.bloodGroup : true) &&
        (searchCriteria.district ? user.district === districtData.find(d => d.id === searchCriteria.district)?.name : true) &&
        (searchCriteria.upazila ? user.upazila === searchCriteria.upazila : true)
      );
    });
    setFilteredUsers(filtered);
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

        <button
          onClick={handleSearch}
          className="btn btn-primary mt-4 w-full"
        >
          Search
        </button>
      </div>

      {/* Donor Results */}
      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredUsers.length ? (
          filteredUsers.map((user, index) => (
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
              <p className="text-gray-600 text-sm">{user.upazila}, {user.district}</p>
              <p className="text-gray-600 text-sm">Contact: {user.email}</p>
            </div>
          ))
        ) : (
          <p className="text-gray-500">No donors found for the selected criteria.</p>
        )}
      </div>
    </div>
  );
};

export default SearchPage;
