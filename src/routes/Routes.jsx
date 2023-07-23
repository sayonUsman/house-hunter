import { createBrowserRouter } from "react-router-dom";
import Main from "../layout/Main";
import Login from "../pages/Login/Login";
import SignUp from "../pages/SignUp/SignUp";
import AddHouse from "../pages/AddHouse/AddHouse";
import OwnerDashboard from "../pages/OwnerDashboard/OwnerDashboard";
import Home from "../pages/Home/Home";
import RenterDashboard from "../pages/RenterDashboard/RenterDashboard";
import Details from "../pages/Details/Details";
import UpdateHouseDetails from "../pages/UpdateHouseDetails/UpdateHouseDetails";

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
        path: "/details/:id",
        element: <Details></Details>,
        loader: ({ params }) =>
          fetch(`https://house-hunter.cyclic.app/house-details/${params.id}`),
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
        path: "/updateHouseDetails/:id",
        element: <UpdateHouseDetails></UpdateHouseDetails>,
        loader: ({ params }) =>
          fetch(`https://house-hunter.cyclic.app/house-details/${params.id}`),
      },
      {
        path: "/renter-dashboard",
        element: <RenterDashboard></RenterDashboard>,
      },
    ],
  },
]);

export default router;
