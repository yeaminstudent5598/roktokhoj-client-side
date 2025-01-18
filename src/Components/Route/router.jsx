import {
    createBrowserRouter,
    RouterProvider,
  } from "react-router-dom";
import MainLayOut from "../LayOut/MainLayOut/MainLayOut";
import Home from "../Pages/Home/Home";
import Login from "../Pages/Login/Login";
import SignUp from "../Pages/SignUp/SignUp";
import DonationRequests from "../Pages/DonationRequests/DonationRequests";
import PublishedBlogs from "../Pages/PublishedBlogs/PublishedBlogs";
import Dashboard from "../../Dasboard/Dashboard";
import AllUsers from "../../Dasboard/AllUsers/AllUsers";
import AdminProfile from "../../Dasboard/AdminProfile/AdminProfile";
import CreateDonationRequest from "../../Dasboard/CreateDonationRequest/CreateDonationRequest";
  const router = createBrowserRouter([
    {
      path: "/",
      element: <MainLayOut/>,
      children:[
        {
            path: '/',
            element:<Home></Home>
        },
        {
            path: '/login',
            element: <Login/>
        },
        {
            path: '/signUp',
            element: <SignUp/>
        },
        {
          path: '/donation-request',
          element: <DonationRequests/>
        },
        {
          path: 'blog',
          element: <PublishedBlogs/>
        }
      ]
    },
    {
      path: '/dashboard',
      element: <Dashboard/>,
      children: [
        {
          path: 'admin-profile',
          element: <AdminProfile/>
        },
        {
          path: 'allUsers',
          element: <AllUsers/>
        },
        {
          path: 'create-donation-request',
          element: <CreateDonationRequest/>
        }
      ]
    }
  ]);
  

export default router;