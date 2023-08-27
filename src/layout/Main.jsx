import { Outlet } from "react-router-dom";
import Navbar from "../pages/Shared/Navbar/Navbar";
import Footer from "../pages/Shared/Footer/Footer";

const Main = () => {
  return (
    <>
      <Navbar></Navbar>

      <div className="container mx-auto">
        <Outlet></Outlet>
      </div>

      <Footer></Footer>
    </>
  );
};

export default Main;
