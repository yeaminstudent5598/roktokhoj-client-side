import React, { useState, useEffect } from "react";

const ExtraSection = () => {
  const [bloodGroup, setBloodGroup] = useState("");
  const [district, setDistrict] = useState("");
  const [upazila, setUpazila] = useState("");
  const [districtsData, setDistrictsData] = useState([]);
  const [upazilasData, setUpazilasData] = useState([]);
  const [filteredUpazilas, setFilteredUpazilas] = useState([]);
  const [donorsData, setDonorsData] = useState([]);
  const [filteredDonors, setFilteredDonors] = useState([]);

  // Fetch JSON data for districts, upazilas, and donors
  useEffect(() => {
    // Fetch districts data
    fetch("/districts.json")
      .then((response) => response.json())
      .then((data) => setDistrictsData(data))
      .catch((error) => console.error("Error fetching districts:", error));

    // Fetch upazilas data
    fetch("/upazilas.json")
      .then((response) => response.json())
      .then((data) => setUpazilasData(data))
      .catch((error) => console.error("Error fetching upazilas:", error));

    // Fetch donors data
    fetch("/donors.json")
      .then((response) => response.json())
      .then((data) => setDonorsData(data))
      .catch((error) => console.error("Error fetching donors:", error));
  }, []);

  const handleDistrictChange = (e) => {
    const selectedDistrict = e.target.value;
    setDistrict(selectedDistrict);

    // Filter upazilas based on selected district
    const filtered = upazilasData.filter(
      (upazila) => upazila.district_id.toString() === selectedDistrict
    );
    setFilteredUpazilas(filtered);
    setUpazila(""); // Reset upazila
  };

  const handleSearch = (e) => {
    e.preventDefault();

    // Filter donors based on search criteria
    const results = donorsData.filter((donor) => {
      return (
        (!bloodGroup || donor.bloodGroup === bloodGroup) &&
        (!district || donor.district_id.toString() === district) &&
        (!upazila || donor.upazila_id.toString() === upazila)
      );
    });

    setFilteredDonors(results);
  };

  return (
    <section className="py-12 bg-gray-100">
      <div className="min-h-screen flex flex-col items-center bg-base-200">
        <div className="w-full max-w-lg bg-white p-6 rounded-lg shadow-lg">
          <h1 className="text-3xl font-bold mb-4">Search Blood Donors</h1>
          <form onSubmit={handleSearch} className="space-y-4">
            {/* Blood Group Selector */}
            <div className="form-control">
              <label className="label">
                <span className="label-text">Blood Group</span>
              </label>
              <select
                className="select select-bordered w-full"
                value={bloodGroup}
                onChange={(e) => setBloodGroup(e.target.value)}
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
            </div>

            {/* District Selector */}
            <div className="form-control">
              <label className="label">
                <span className="label-text">District</span>
              </label>
              <select
                className="select select-bordered w-full"
                value={district}
                onChange={handleDistrictChange}
              >
                <option value="">Select District</option>
                {districtsData.map((district) => (
                  <option key={district.id} value={district.id}>
                    {district.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Upazila Selector */}
            <div className="form-control">
              <label className="label">
                <span className="label-text">Upazila</span>
              </label>
              <select
                className="select select-bordered w-full"
                value={upazila}
                onChange={(e) => setUpazila(e.target.value)}
              >
                <option value="">Select Upazila</option>
                {filteredUpazilas.map((upazila) => (
                  <option key={upazila.id} value={upazila.id}>
                    {upazila.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Search Button */}
            <div className="form-control mt-6">
              <button type="submit" className="btn btn-primary w-full">
                Search
              </button>
            </div>
          </form>
        </div>

        {/* Donors List */}
        <div className="w-full max-w-4xl mt-6">
          {filteredDonors.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredDonors.map((donor) => (
                <div
                  key={donor.id}
                  className="bg-white p-4 rounded-lg shadow-md flex flex-col items-center"
                >
                  <h2 className="text-xl font-bold">{donor.name}</h2>
                  <p>Blood Group: {donor.bloodGroup}</p>
                  <p>District: {donor.district_name}</p>
                  <p>Upazila: {donor.upazila_name}</p>
                  <p>Contact: {donor.contact}</p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-center text-gray-500 mt-6">No donors found.</p>
          )}
        </div>
      </div>
    </section>
  );
};

export default ExtraSection;
