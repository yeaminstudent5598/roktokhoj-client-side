import { FaBook, FaHeart, FaHome, FaSearch, FaShoppingCart, FaUsers, FaUtensils } from "react-icons/fa";
import { FaCalendar, FaList, FaListCheck, FaMoneyBill, FaRegMessage } from "react-icons/fa6";
import { NavLink, Outlet } from "react-router-dom";

import { MdBloodtype, MdEmail, MdHome, MdOutlineRequestPage, MdRequestPage } from "react-icons/md";

import useAdmin from "../Hooks/useAdmin";


const Dashboard = () => {
 

    // TODO: get isAdmin value form databaser
    const [isAdmin] = useAdmin();
    return (
        <div className="flex">
            {/* dashboard slider */}
            <div className="w-64 min-h-screen bg-orange-400">
                <ul className="menu p-4 ">

                    { 
                        isAdmin ? <>
                        
                        <li ><NavLink to="/dashboard/admin-profile">
                    <FaHome></FaHome>
                    Admin Profile</NavLink></li>
                    <li ><NavLink to="/dashboard/allUsers">
                    <FaUsers></FaUsers>
                    All Users</NavLink></li>
                    <li ><NavLink to="/dashboard/all-blood-donation">
                    <FaHeart></FaHeart>
                    All Blood Donation Request Page</NavLink></li>

                
                    <li ><NavLink to="/dashboard/content-management-page">
                    <FaBook></FaBook>
                    content Management Page </NavLink></li>
                    
                    
                    
                        </> : <>
                        <li ><NavLink to="/dashboard/userHome">
                    <FaHome></FaHome>
                    User Home</NavLink></li>
                    

                
                    <li ><NavLink to="/dashboard/my-donation">
                    <MdBloodtype></MdBloodtype>
                    My Donation Requests Page</NavLink></li>
                    <li ><NavLink to="/dashboard/create-donation-request">
                    <MdOutlineRequestPage/>
                    Create Donation Request Page</NavLink></li>
                    
                        </>
                    }
                    {/* shared navlinks */}
                    
                    
                    
                </ul>
            </div>
            {/* dashboard content */}
            <div className="flex-1 p-8">
                <Outlet></Outlet>
            </div>
        </div>
    );
};

export default Dashboard;