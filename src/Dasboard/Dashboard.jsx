import { FaBook, FaHeart, FaHome, FaUsers } from "react-icons/fa";
import { MdBloodtype, MdOutlineRequestPage } from "react-icons/md";
import { NavLink, Outlet } from "react-router-dom";

import useAdmin from "../Hooks/useAdmin";
import useValunteer from "../Hooks/useVolunteer";
import useAuth from "../Hooks/useAuth";
import { FaPersonRifle } from "react-icons/fa6";

const Dashboard = () => {
    const {user} = useAuth();
  // Get the isAdmin and isValunteer values from hooks
  const [isAdmin] = useAdmin();
  const [isValunteer] = useValunteer();

  return (
    <div className="flex">
      {/* Dashboard Sidebar */}
      <div className="w-64 min-h-screen bg-white border-r">
        {/* User Info */}
        <div className="p-4 border-b">
          <div className="flex items-center gap-4">
            <img
              src={user?.photoURL}
              alt="Profile"
              className="w-10 h-10 rounded-full"
            />
            <div>
              <h2 className="font-bold text-lg">{user?.displayName}</h2>
              <p className="text-sm text-gray-500">{user?.email}</p>
            </div>
          </div>
        </div>

        {/* Budget Section */}
        <div className="p-4 border-b">
          <div className="flex items-center justify-between">
            <h3 className="font-medium">Team Budget</h3>
            <p className="font-bold text-lg">£65,915</p>
          </div>
        </div>

        {/* Navigation Menu */}
        <ul className="menu p-4 space-y-2">
          {/* Admin Dashboard Links */}
          {isAdmin ? (
            <>
              <li>
                <NavLink
                  to="/dashboard/admin-profile"
                  className="flex items-center gap-2 text-gray-700 hover:text-orange-500"
                >
                  <FaHome /> Admin Profile
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/dashboard/admin-dashboard"
                  className="flex items-center gap-2 text-gray-700 hover:text-orange-500"
                >
                  <FaHome /> Admin Dashboard
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/dashboard/allUsers"
                  className="flex items-center gap-2 text-gray-700 hover:text-orange-500"
                >
                  <FaUsers /> All Users
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/dashboard/all-blood-donation"
                  className="flex items-center gap-2 text-gray-700 hover:text-orange-500"
                >
                  <FaHeart /> All Blood Donation Request Page
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/dashboard/content-management-page"
                  className="flex items-center gap-2 text-gray-700 hover:text-orange-500"
                >
                  <FaBook /> Content Management Page
                </NavLink>
              </li>
            </>
          ) : isValunteer ? (
            // Volunteer Dashboard Links
            <>
              <li>
                <NavLink
                  to="/dashboard/volunteer-dashboard"
                  className="flex items-center gap-2 text-gray-700 hover:text-orange-500"
                >
                  <FaHome /> Volunteer Dashboard
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/dashboard/volunteer-profile"
                  className="flex items-center gap-2 text-gray-700 hover:text-orange-500"
                >
                  <FaPersonRifle /> Volunteer Profile
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/dashboard/all-blood-donation"
                  className="flex items-center gap-2 text-gray-700 hover:text-orange-500"
                >
                  <MdBloodtype /> My Donation Requests Page
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/dashboard/content-management-page"
                  className="flex items-center gap-2 text-gray-700 hover:text-orange-500"
                >
                  <MdOutlineRequestPage /> Content Management Page
                </NavLink>
              </li>
            </>
          ) : (
            // Donor Dashboard Links when neither isAdmin nor isValunteer is true
            <>
              <li>
                <NavLink
                  to="/dashboard/donor-profile"
                  className="flex items-center gap-2 text-gray-700 hover:text-orange-500"
                >
                  <FaHome /> Donor Profile
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/dashboard/donor-dashboard"
                  className="flex items-center gap-2 text-gray-700 hover:text-orange-500"
                >
                  <FaHome /> Donor Dasboard
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/dashboard/my-donation"
                  className="flex items-center gap-2 text-gray-700 hover:text-orange-500"
                >
                  <MdBloodtype /> My Donation Requests Page
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/dashboard/create-donation-request"
                  className="flex items-center gap-2 text-gray-700 hover:text-orange-500"
                >
                  <MdOutlineRequestPage /> Create Donation Request Page
                </NavLink>
              </li>
            </>
          )}
        </ul>
      </div>

      {/* Dashboard Content */}
      <div className="flex-1 p-8 bg-gray-50">
        <Outlet />
      </div>
    </div>
  );
};

export default Dashboard;
