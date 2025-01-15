import {
    createBrowserRouter,
    RouterProvider,
  } from "react-router-dom";
import MainLayOut from "../LayOut/MainLayOut/MainLayOut";
  const router = createBrowserRouter([
    {
      path: "/",
      element: <MainLayOut/>,
    },
  ]);
  

export default router;