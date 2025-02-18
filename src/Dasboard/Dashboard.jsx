import { FaBook, FaHeart, FaHome, FaRegSun, FaUserCircle, FaUsers } from "react-icons/fa";
import { MdBloodtype, MdDashboard, MdLogout, MdOutlineRequestPage } from "react-icons/md";
import { NavLink, Outlet } from "react-router-dom";

import useAdmin from "../Hooks/useAdmin";
import useValunteer from "../Hooks/useVolunteer";
import useAuth from "../Hooks/useAuth";

import toast from "react-hot-toast";
import DashboardProfile from "../Components/Pages/DashboardProfile/DashboardProfile";

const Dashboard = () => {
  const { user, logOut } = useAuth();
  const [isAdmin] = useAdmin();
  const [isValunteer] = useValunteer();

  const handleLogout = () => {
    logOut()
      .then(() => {
        toast.success("User logged out successfully.");
        console.log("logout successfully");
      })
      .catch((error) => {
        toast.error("Logout Error:", error);
      });
  };

  return (
    <div className="flex">

      
      {/* Dashboard Sidebar */}
      <div className="hidden lg:block">
  
        <div className="w-64 h-screen bg-white border-r flex flex-col">
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

          {/* Navigation Menu */}
          <div className="flex-1 overflow-y-auto">
            <ul className="menu p-4 space-y-2">
              {/* Admin Dashboard Links */}
              {isAdmin ? (
                <>
                  <li className="mb-2">
                    <NavLink
                      to="/dashboard/admin-profile"
                      className={({ isActive }) =>
                        isActive
                          ? "flex items-center gap-2 text-red-600 font-semibold bg-red-50 rounded-md p-2 shadow-sm hover:bg-red-100"
                          : "flex items-center gap-2 text-gray-700 hover:text-red-600 hover:bg-red-50 rounded-md p-2"
                      }
                    >
                      <FaUserCircle className="text-lg" /> Admin Profile
                    </NavLink>
                  </li>
                  <li className="mb-2">
                    <NavLink
                      to="/dashboard/admin-dashboard"
                      className={({ isActive }) =>
                        isActive
                          ? "flex items-center gap-2 text-red-600 font-semibold bg-red-50 rounded-md p-2 shadow-sm hover:bg-red-100"
                          : "flex items-center gap-2 text-gray-700 hover:text-red-600 hover:bg-red-50 rounded-md p-2"
                      }
                    >
                      <MdDashboard className="text-lg" /> Admin Dashboard
                    </NavLink>
                  </li>
                  <li className="mb-2">
                    <NavLink
                      to="/dashboard/allUsers"
                      className={({ isActive }) =>
                        isActive
                          ? "flex items-center gap-2 text-red-600 font-semibold bg-red-50 rounded-md p-2 shadow-sm hover:bg-red-100"
                          : "flex items-center gap-2 text-gray-700 hover:text-red-600 hover:bg-red-50 rounded-md p-2"
                      }
                    >
                      <FaUsers className="text-lg" /> All Users
                    </NavLink>
                  </li>
                  <li className="mb-2">
                    <NavLink
                      to="/dashboard/all-blood-donation"
                      className={({ isActive }) =>
                        isActive
                          ? "flex items-center gap-2 text-red-600 font-semibold bg-red-50 rounded-md p-2 shadow-sm hover:bg-red-100"
                          : "flex items-center gap-2 text-gray-700 hover:text-red-600 hover:bg-red-50 rounded-md p-2"
                      }
                    >
                      <MdBloodtype className="text-lg" /> All Blood Donation Requests
                    </NavLink>
                  </li>
                  <li className="mb-2">
                    <NavLink
                      to="/dashboard/content-management-page"
                      className={({ isActive }) =>
                        isActive
                          ? "flex items-center gap-2 text-red-600 font-semibold bg-red-50 rounded-md p-2 shadow-sm hover:bg-red-100"
                          : "flex items-center gap-2 text-gray-700 hover:text-red-600 hover:bg-red-50 rounded-md p-2"
                      }
                    >
                      <FaBook className="text-lg" /> Content Management
                    </NavLink>
                  </li>
                  <li className="mb-2">
                    <NavLink
                      to="/dashboard/create-donation-request"
                      className={({ isActive }) =>
                        isActive
                          ? "flex items-center gap-2 text-red-600 font-semibold bg-red-50 rounded-md p-2 shadow-sm hover:bg-red-100"
                          : "flex items-center gap-2 text-gray-700 hover:text-red-600 hover:bg-red-50 rounded-md p-2"
                      }
                    >
                      <MdOutlineRequestPage className="text-lg" /> Create Donation Request
                    </NavLink>
                  </li>
                  <li className="mt-4">
                    <button
                      onClick={handleLogout}
                      className="flex items-center gap-2 text-white bg-red-600 hover:bg-red-700 rounded-md px-4 py-2 shadow-md"
                    >
                      <MdLogout className="text-lg" /> Logout
                    </button>
                  </li>
                </>
              ) : isValunteer ? (
                // Volunteer Dashboard Links
                <>
                  <li className="mb-2">
                    <NavLink
                      to="/"
                      className={({ isActive }) =>
                        isActive
                          ? "flex items-center gap-2 text-blue-600 font-semibold bg-blue-50 rounded-md p-2 shadow-sm hover:bg-blue-100"
                          : "flex items-center gap-2 text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-md p-2"
                      }
                    >
                      <FaHome className="text-lg" /> Go To Home
                    </NavLink>
                  </li>
                  <li className="mb-2">
                    <NavLink
                      to="/dashboard/volunteer-dashboard"
                      className={({ isActive }) =>
                        isActive
                          ? "flex items-center gap-2 text-blue-600 font-semibold bg-blue-50 rounded-md p-2 shadow-sm hover:bg-blue-100"
                          : "flex items-center gap-2 text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-md p-2"
                      }
                    >
                      <MdDashboard className="text-lg" /> Volunteer Dashboard
                    </NavLink>
                  </li>
                  <li className="mb-2">
                    <NavLink
                      to="/dashboard/volunteer-profile"
                      className={({ isActive }) =>
                        isActive
                          ? "flex items-center gap-2 text-blue-600 font-semibold bg-blue-50 rounded-md p-2 shadow-sm hover:bg-blue-100"
                          : "flex items-center gap-2 text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-md p-2"
                      }
                    >
                      <FaUserCircle className="text-lg" /> Volunteer Profile
                    </NavLink>
                  </li>
                  <li className="mb-2">
                    <NavLink
                      to="/dashboard/all-blood-donation"
                      className={({ isActive }) =>
                        isActive
                          ? "flex items-center gap-2 text-blue-600 font-semibold bg-blue-50 rounded-md p-2 shadow-sm hover:bg-blue-100"
                          : "flex items-center gap-2 text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-md p-2"
                      }
                    >
                      <MdBloodtype className="text-lg" /> My Donation Requests
                    </NavLink>
                  </li>
                  <li className="mb-2">
                    <NavLink
                      to="/dashboard/content-management-page"
                      className={({ isActive }) =>
                        isActive
                          ? "flex items-center gap-2 text-blue-600 font-semibold bg-blue-50 rounded-md p-2 shadow-sm hover:bg-blue-100"
                          : "flex items-center gap-2 text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-md p-2"
                      }
                    >
                      <MdOutlineRequestPage className="text-lg" /> Content Management
                    </NavLink>
                  </li>
                  <li className="mt-4">
                    <button
                      onClick={handleLogout}
                      className="flex items-center gap-2 text-white bg-red-600 hover:bg-blue-700 rounded-md px-4 py-2 shadow-md"
                    >
                      <MdLogout className="text-lg" /> Logout
                    </button>
                  </li>
                </>
              ) : (
                // Donor Dashboard Links
                <>
                  <li className="mb-2">
                    <NavLink
                      to="/"
                      className={({ isActive }) =>
                        isActive
                          ? "flex items-center gap-2 text-red-600 font-semibold bg-red-50 rounded-md p-2 shadow-sm hover:bg-red-100"
                          : "flex items-center gap-2 text-gray-700 hover:text-red-600 hover:bg-red-50 rounded-md p-2"
                      }
                    >
                      <FaHome className="text-lg" /> Go To Home
                    </NavLink>
                  </li>
                  <li className="mb-2">
                    <NavLink
                      to="/dashboard/donor-profile"
                      className={({ isActive }) =>
                        isActive
                          ? "flex items-center gap-2 text-red-600 font-semibold bg-red-50 rounded-md p-2 shadow-sm hover:bg-red-100"
                          : "flex items-center gap-2 text-gray-700 hover:text-red-600 hover:bg-red-50 rounded-md p-2"
                      }
                    >
                      <FaUserCircle className="text-lg" /> Donor Profile
                    </NavLink>
                  </li>
                  <li className="mb-2">
                    <NavLink
                      to="/dashboard/donor-dashboard"
                      className={({ isActive }) =>
                        isActive
                          ? "flex items-center gap-2 text-red-600 font-semibold bg-red-50 rounded-md p-2 shadow-sm hover:bg-red-100"
                          : "flex items-center gap-2 text-gray-700 hover:text-red-600 hover:bg-red-50 rounded-md p-2"
                      }
                    >
                      <MdDashboard className="text-lg" /> Donor Dashboard
                    </NavLink>
                  </li>
                  <li className="mb-2">
                    <NavLink
                      to="/dashboard/my-donation"
                      className={({ isActive }) =>
                        isActive
                          ? "flex items-center gap-2 text-red-600 font-semibold bg-red-50 rounded-md p-2 shadow-sm hover:bg-red-100"
                          : "flex items-center gap-2 text-gray-700 hover:text-red-600 hover:bg-red-50 rounded-md p-2"
                      }
                    >
                      <MdBloodtype className="text-lg" /> My Donation Requests
                    </NavLink>
                  </li>
                  <li className="mb-2">
                    <NavLink
                      to="/dashboard/create-donation-request"
                      className={({ isActive }) =>
                        isActive
                          ? "flex items-center gap-2 text-red-600 font-semibold bg-red-50 rounded-md p-2 shadow-sm hover:bg-red-100"
                          : "flex items-center gap-2 text-gray-700 hover:text-red-600 hover:bg-red-50 rounded-md p-2"
                      }
                    >
                      <MdOutlineRequestPage className="text-lg" /> Create Donation Request
                    </NavLink>
                  </li>
                  <li className="mt-4">
                    <button
                      onClick={handleLogout}
                      className="flex items-center gap-2 text-white bg-red-600 hover:bg-red-700 rounded-md px-4 py-2 shadow-md"
                    >
                      <MdLogout className="text-lg" /> Logout
                    </button>
                  </li>
                </>
              )}
            </ul>
          </div>
          
        </div>
        
      </div>
      


      {/* Dashboard Content */}
      <div className="flex-1 h-screen overflow-y-auto bg-gray-50 ">
        <div className="w-full pr-10 flex justify-end h-20  bg-gray-100 fixed text-white">
          
        
              <div className="btn btn-ghost btn-circle avatar"><div className="w-10 rounded-full border-2 border-red-600">
                <img src={user.photoURL} alt={user.displayName} />
              </div></div>
              <div className="text-black text-xl"><FaRegSun /></div>
            
        </div>
        <Outlet />
      </div>
     
    </div>
  );
};

export default Dashboard;