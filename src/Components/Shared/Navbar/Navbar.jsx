import { useContext } from "react";
import { NavLink } from "react-router-dom";
import { AuthContext } from "../../AuthProvider/AuthProvider";
import { MdDashboard } from "react-icons/md";
import toast from "react-hot-toast";
import useAuth from "../../../Hooks/useAuth";
import useAdmin from "../../../Hooks/useAdmin";
import useValunteer from "../../../Hooks/useVolunteer";



const Navbar = () => {
  const { user, logOut } = useAuth();
  const [isAdmin] = useAdmin();
  const [isValunteer] = useValunteer();

  const handleLogout = () => {
    logOut()
      .then(() => {
        toast.success("User logged out successfully.");
      })
      .catch((error) => {
        toast.error("Logout Error", error);
      });
  };

  // Determine the appropriate profile route
  const getDashboardLink = () => {
    if (isAdmin) return "/dashboard/admin-profile";
    if (isValunteer) return "/dashboard/volunteer-profile";
    return "/dashboard/donor-profile";
  };

  // Navigation options based on user state
  const navOptions = (
    <>
      <li>
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive ? "text-primary font-bold" : ""
          }
        >
          Home
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/donation-request"
          className={({ isActive }) =>
            isActive ? "text-primary font-bold" : ""
          }
        >
          Donation Requests
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/blog"
          className={({ isActive }) =>
            isActive ? "text-primary font-bold" : ""
          }
        >
          Blog
        </NavLink>
      </li>
      {user && (
        <li>
          <NavLink
            to="/funding"
            className={({ isActive }) =>
              isActive ? "text-primary font-bold" : ""
            }
          >
            Funding
          </NavLink>
        </li>
      )}
    </>
  );

  return (
    <div className="navbar fixed bg-opacity-80 bg-red-700 z-10 shadow-lg">
      {/* Navbar Start */}
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
          >
            {navOptions}
          </ul>
        </div>
        <a
          className="rounded-full border border-red-600 text-center"
          href="/"
        >
          <img
            className="w-10 h-10"
            src="https://i.ibb.co/q9t4Kcp/roktokhoj-removebg-preview.png"
            alt="RoktoKhoj Logo"
          />
        </a>
        <h2 className="font-bold text-2xl ml-2"><span className="text-red-600">Rokto</span>Khoj</h2>
      </div>

      {/* Navbar Center */}
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">{navOptions}</ul>
      </div>

      {/* Navbar End */}
      <div className="navbar-end">
        {user ? (
          <div className="dropdown dropdown-end">
            <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
              <div className="w-10 rounded-full">
                <img src={user.photoURL} alt={user.displayName} />
              </div>
            </label>
            <ul
              tabIndex={0}
              className="menu menu-compact dropdown-content mt-3 p-3 shadow-lg bg-red-50 rounded-md w-56 border border-red-200"
            >
              <li className="mb-2">
                <NavLink
                  to={getDashboardLink()} // Dynamically set dashboard link
                  className={({ isActive }) =>
                    isActive
                      ? "flex items-center gap-2 text-red-700 font-semibold hover:text-red-800"
                      : "flex items-center gap-2 text-gray-700 hover:text-red-700"
                  }
                >
                  <MdDashboard className="text-lg" /> Dashboard
                </NavLink>
              </li>
              <li>
                <button
                  onClick={handleLogout}
                  className="btn btn-sm bg-red-500 hover:bg-red-600 text-white rounded-md flex justify-center items-center"
                >
                  Logout
                </button>
              </li>
            </ul>
          </div>
        ) : (
          <NavLink
            to="/login"
            className={({ isActive }) =>
              isActive
                ? "btn btn-primary ml-2"
                : "btn btn-outline btn-primary ml-2"
            }
          >
            Login/Register
          </NavLink>
        )}
      </div>
    </div>
  );
};

export default Navbar;
