import { NavLink, useNavigate } from "react-router-dom";

const Navbar = () => {
  let userInfo = localStorage.getItem("user-info");
  const navigate = useNavigate();

  if (userInfo) {
    userInfo = JSON.parse(userInfo);
  } else {
    userInfo = false;
  }

  const handleLogOut = () => {
    localStorage.removeItem("user-info");
    navigate("/login");
    window.location.reload(false);
  };

  const navbarContent = (
    <>
      <li>
        <NavLink
          to="/"
          className="mb-1 lg:mb-0 lg:mr-1 link link-hover rounded hover:text-white"
        >
          Home
        </NavLink>
      </li>

      <li>
        <NavLink
          to="/houses"
          className="mb-1 lg:mb-0 lg:mr-1 link link-hover rounded hover:text-white"
        >
          Houses
        </NavLink>
      </li>

      {userInfo ? (
        <>
          {userInfo.role === "House Owner" && (
            <li>
              <NavLink
                to="/owner-dashboard"
                className="mb-1 lg:mb-0 lg:mr-1 link link-hover rounded hover:text-white"
              >
                Dashboard
              </NavLink>
            </li>
          )}

          {userInfo.role === "House Renter" && (
            <li>
              <NavLink
                to="/renter-dashboard"
                className="mb-1 lg:mb-0 lg:mr-1 link link-hover rounded hover:text-white"
              >
                Dashboard
              </NavLink>
            </li>
          )}

          <li>
            <NavLink
              to="/login"
              onClick={handleLogOut}
              className="link link-hover rounded hover:text-white"
            >
              Log Out
            </NavLink>
          </li>
        </>
      ) : (
        <li>
          <NavLink
            to="/login"
            className="link link-hover rounded hover:text-white"
          >
            Login
          </NavLink>
        </li>
      )}
    </>
  );

  return (
    <div className="relative z-10">
      <div className="fixed top-0 left-0 right-0 bg-black bg-opacity-30">
        <div className="container mx-auto navbar">
          <div className="navbar-start">
            <div className="dropdown">
              <label tabIndex={0} className="btn btn-ghost lg:hidden">
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
              </label>

              <ul
                tabIndex={0}
                className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-black bg-opacity-50 rounded-md w-52 text-white"
              >
                {navbarContent}
              </ul>
            </div>

            <a className="hidden sm:flex btn btn-ghost normal-case text-xl">
              House Hunter
            </a>
          </div>

          <div className="navbar-end hidden lg:flex">
            <ul className="menu menu-horizontal px-1">{navbarContent}</ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
