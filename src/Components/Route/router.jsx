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
import DonorProfile from "../../Dasboard/DonorDashboard/DonorProfile/DonorProfile";
import AdminDashboard from "../../Dasboard/AdminDashboard/AdminDashboard";
import AdminProfile from "../../Dasboard/AdminProfile/AdminProfile";
import VolunteerProfile from "../../Dasboard/VolunteerProfile/VolunteerProfile";
import BlogDetails from "../Pages/PublishedBlogs/BlogDetails/BlogDetails";
import ErrorPage from "../../ErrorPage/ErrorPage";
import FundingPage from "../FundingPage/FundingPage";
import VolunteerDashboard from "../../Dasboard/Volunteer/VolunteerDashboard";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import BloodReserves from "../Pages/BloodReserves/BloodReserves";



const stripePromise = loadStripe(import.meta.env.VITE_Payment_Gateway_PK);


const router = createBrowserRouter([
    {
      path: "/",
      element: <MainLayOut/>,
      errorElement: <ErrorPage/>,
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
          path: "/blood-reserves",
          element: <BloodReserves/>
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
          path: "blogs/:id",
          element: <BlogDetails/>
        },
        {
          path: '/search',
          element: <SearchPage/>
        },
        {
          path: 'funding',
          element: (
            <Elements stripe={stripePromise}>
              <FundingPage />
            </Elements>
          ),
        }
        
      ]
    },
    {
      path: '/dashboard',
      element: <PrivateRoute><Dashboard/></PrivateRoute>,
      children: [
        {
          path: 'admin-dashboard',
          element: <AdminDashboard/>
        },
        {
          path: 'admin-profile',
          element: <AdminProfile/>
        },
        {
          path: 'volunteer-dashboard',
          element: <VolunteerDashboard/>
        },
        {
          path: 'volunteer-profile',
          element: <VolunteerProfile/>
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
        },
       
        {
          path: 'donor-profile',
          element: <DonorProfile/>
        }
      ]
    }
  ]);
  

export default router;