import { createBrowserRouter } from "react-router-dom";
import Main from "../layout/Main";
import Login from "../pages/Login/Login";
import SignUp from "../pages/SignUp/SignUp";
import AddHouse from "../pages/AddHouse/AddHouse";
import OwnerDashboard from "../pages/OwnerDashboard/OwnerDashboard";
import Home from "../pages/Home/Home";
import RenterDashboard from "../pages/RenterDashboard/RenterDashboard";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Main></Main>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "/login",
        element: <Login></Login>,
      },
      {
        path: "/signup",
        element: <SignUp></SignUp>,
      },
      {
        path: "/owner-dashboard",
        element: <OwnerDashboard></OwnerDashboard>,
      },
      {
        path: "/addHouse",
        element: <AddHouse></AddHouse>,
      },
      {
        path: "/renter-dashboard",
        element: <RenterDashboard></RenterDashboard>,
      },
    ],
  },
]);

export default router;
