import { FaBell, FaBook, FaHeart, FaHome, FaRegMoon, FaRegSun, FaSearch, FaUserCircle, FaUsers } from "react-icons/fa";
import { MdBloodtype, MdDashboard, MdLogout, MdOutlineRequestPage } from "react-icons/md";
import { Link, NavLink, Outlet } from "react-router-dom";
import { AiOutlineMenuUnfold } from "react-icons/ai";



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
      <div className="drawer lg:hidden block">
  <input id="my-drawer" type="checkbox" className="drawer-toggle" />
  <div className="drawer-content w-50">
    {/* Page content here */}
    <div className="flex-1  h-screen overflow-y-auto bg-gray-50 ">
      <div className="w-full h-20 flex items-center px-4 shadow-lg fixed top-0  text-white">
  {/* Left Section - Search Bar */}
  <div className="flex items-center gap-3">
   
    <input
      type="text"
      placeholder="Search"
      className="bg-transparent text-center rounded-lg py-1 px-2 text-sm w-full border border-black  outline-none text-black placeholder-black"
    />
  </div>

  {/* Right Section - Icons & Profile */}
  <div className="flex items-center pl-20 gap-4">
   
    <FaRegMoon className="text-xl text-black cursor-pointer" />
 
    

    

    {/* User Profile */}
    <div className="relative flex items-center  gap-4">
    <label htmlFor="my-drawer" className="text-black drawer-button"><AiOutlineMenuUnfold /></label>
      {/* Replace your user photo and details here */}
      <a  data-discover="true" className="flex gap-4">
        <span className="relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full ring-2 ring-red-200 hover:cursor-pointer hover:ring-4">
          <img className="aspect-square h-full w-full" src={user?.photoURL} alt="Profile" />
        </span>
        <div className="hidden sm:block">
          <h3 className="font-bold text-black">{user?.displayName}</h3>
          <p className="text-sm text-black -mt-1">{user?.email}</p>
        </div>
      </a>

      {/* Hamburger Icon for Mobile View */}
      <div className="xl:hidden">
        
      </div>
    </div>
  </div>
</div>

        <div>
        <Outlet />
        </div>
      </div>
  </div>
  <div className="drawer-side">
    <label htmlFor="my-drawer" aria-label="close sidebar" className="drawer-overlay"></label>
    <ul className="menu bg-base-200 text-base-content min-h-full w-64 p-4">
      {/* Sidebar content here */}
      <div className="">
  
  <div className="   flex flex-col">
    {/* User Info */}
    
    <div className="p-6 border-b">
    <Link to="/" className="font-bold text-2xl ml-2"><span className="text-red-600">Rokto</span>Khoj</Link>
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
                <MdOutlineRequestPage className="text-lg" /> Create Request
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
                <MdBloodtype className="text-lg" /> Donation Requests
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
                <MdBloodtype className="text-lg" />Donation Requests
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
                <MdOutlineRequestPage className="text-lg" /> Create Request
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
    </ul>
  </div>
</div>
      
      {/* Dashboard Sidebar */}
      <div className="hidden lg:block">
  
        <div className="w-64 h-screen bg-white border-r flex flex-col">
          {/* User Info */}
          
          <div className="p-6 border-b">
          <Link to="/" className="font-bold text-2xl ml-2"><span className="text-red-600">Rokto</span>Khoj</Link>
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
                      <MdOutlineRequestPage className="text-lg" /> Create Request
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
                      <MdBloodtype className="text-lg" />Donation Requests
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
                      <MdBloodtype className="text-lg" /> Donation Requests
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
                      <MdOutlineRequestPage className="text-lg" /> Create Request
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
      <div className="w-full bg-gray-50 h-20 grid p-0 md:grid-cols-2 items-center px-4 shadow-lg fixed top-0 z-50 text-white">
  {/* Left Section - Search Bar */}
  <div className="flex items-center gap-3">
    <button className="btn btn-ghost btn-circle">
      <FaSearch className="text-lg text-black" />
    </button>
    <input
      type="text"
      placeholder="Search"
      className="bg-transparent border border-gray-600 p-1 rounded-lg outline-none text-black placeholder-black"
    />
  </div>

  {/* Right Section - Icons & Profile */}
  <div className="flex items-center pl-20 gap-4">
   
    <FaRegMoon className="text-xl text-black cursor-pointer" />
 
    

    

    {/* User Profile */}
    <div className="relative flex items-center  gap-4">
      {/* Replace your user photo and details here */}
      <a  data-discover="true" className="flex gap-4">
        <span className="relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full ring-2 ring-red-200 hover:cursor-pointer hover:ring-4">
          <img className="aspect-square h-full w-full" src={user?.photoURL} alt="Profile" />
        </span>
        <div className="hidden sm:block">
          <h3 className="font-bold text-black">{user?.displayName}</h3>
          <p className="text-sm text-black -mt-1">{user?.email}</p>
        </div>
      </a>

      {/* Hamburger Icon for Mobile View */}
      <div className="xl:hidden">
        
      </div>
    </div>
  </div>
</div>

        <div>
        <Outlet />
        </div>
      </div>
     
    </div>
  );
};

export default Dashboard;