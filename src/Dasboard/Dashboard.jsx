import { FaBook, FaHeart, FaHome, FaUserCircle, FaUsers } from "react-icons/fa";
import { MdBloodtype, MdDashboard, MdLogout, MdOutlineRequestPage } from "react-icons/md";
import { NavLink, Outlet } from "react-router-dom";

import useAdmin from "../Hooks/useAdmin";
import useValunteer from "../Hooks/useVolunteer";
import useAuth from "../Hooks/useAuth";
import { FaPersonRifle } from "react-icons/fa6";

const Dashboard = () => {
    const {user, logOut} = useAuth();
  // Get the isAdmin and isValunteer values from hooks
  const [isAdmin] = useAdmin();
  const [isValunteer] = useValunteer();


  const handleLogout = () => {
    logOut()
      .then(() => {
        console.log("User logged out successfully.");
      })
      .catch((error) => {
        console.error("Logout Error:", error);
      });
  };

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
               <FaHeart className="text-lg" /> All Blood Donation Requests
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
            // Donor Dashboard Links when neither isAdmin nor isValunteer is true
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

      {/* Dashboard Content */}
      <div className="flex-1 p-8 bg-gray-50">
        <Outlet />
      </div>
    </div>
  );
};

export default Dashboard;
