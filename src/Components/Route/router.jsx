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
import DonationRequestDetails from "../Pages/DonationRequests/DonationRequestDetails/DonationRequestDetails";
import PrivateRoute from "./PrivateRoute/PrivateRoute";
import AllBloodDonationRequests from "../Pages/DonationRequests/AllBloodDonationRequests/AllBloodDonationRequests";
import DonorDashboard from "../../Dasboard/DonorDashboard/DonorDashboard";
import EditDonationRequest from "../../Dasboard/EditDonationRequest/EditDonationRequest";
import MyDonationRequests from "../../Dasboard/MyDonationRequests/MyDonationRequests";
import ContentManagement from "../../Dasboard/ContentManagement/ContentManagement";
import AddBlog from "../../Dasboard/ContentManagement/AddBlog/AddBlog";
import SearchPage from "../Pages/SearchPage/SearchPage";
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
          path: '/donation-details/:id',
          element: <PrivateRoute> <DonationRequestDetails/></PrivateRoute>
        },
        {
          path: '/blog',
          element: <PublishedBlogs/>
        },
        {
          path: '/search',
          element: <SearchPage/>
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
          path: 'volunteer-profile',
          element: <AdminProfile></AdminProfile>
        },
        {
          path: 'allUsers',
          element: <AllUsers/>
        },
        {
          path: 'create-donation-request',
          element: <PrivateRoute><CreateDonationRequest/></PrivateRoute>
        },
        {
          path: 'all-blood-donation',
          element: <AllBloodDonationRequests/>
        },
        {
          path: 'donor-dashboard',
          element: <DonorDashboard/>
        },
        {
          path: 'edit-create-request/:id',
          element:<EditDonationRequest/>
        },
        {
          path: 'my-donation',
          element: <MyDonationRequests/>
        },
        {
          path: 'content-management-page',
          element: <ContentManagement/>
        },
        {
          path: 'content-management/add-blog',
          element: <AddBlog/>
        }
      ]
    }
  ]);
  

export default router;