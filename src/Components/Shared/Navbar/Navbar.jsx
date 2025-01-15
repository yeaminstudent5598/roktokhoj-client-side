import { NavLink } from "react-router-dom";

const Navbar = () => {


    const navOptions = <>
    
    <li><NavLink
    to="donation-request"
    >Donation Requests</NavLink></li>
    <li><NavLink
    to="blog"
    >Blog</NavLink></li>
    <li><NavLink
    to="login"
    >Login/Register</NavLink></li>
    
    </>

    return (
        <div>
            <div className="navbar items-center bg-base-100">
  <div className="navbar-start">
    <div className="dropdown">
      <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M4 6h16M4 12h8m-8 6h16" />
        </svg>
      </div>
      <ul
        tabIndex={0}
        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
        {navOptions}
      </ul>
    </div>
    <a className="rounded-full border border-red-600 text-center"><img className="w-10 h-10 " src="https://i.ibb.co.com/q9t4Kcp/roktokhoj-removebg-preview.png" alt="" /></a>
  </div>
  <div className="navbar-center hidden lg:flex">
    <ul className="menu menu-horizontal px-1">
     {navOptions}
    </ul>
  </div>
  <div className="navbar-end">
    <a className="btn">Button</a>
  </div>
</div>
        </div>
    );
};

export default Navbar;