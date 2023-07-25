import ErrorMessage from "../components/ErrorMessage";

const OwnerRoute = ({ children }) => {
  let userInfo = localStorage.getItem("user-info");
  userInfo = JSON.parse(userInfo);
  const role = userInfo?.role;

  if (role === "House Owner") {
    return children;
  } else {
    localStorage.removeItem("user-info");

    return (
      <>
        <div className="hero min-h-screen">
          <div className="hero-content text-center">
            <div className="max-w-md">
              <h1 className="text-5xl font-bold">Oops!</h1>
            </div>
          </div>
        </div>

        <ErrorMessage
          errorMessage={"You cannot access this route!"}
        ></ErrorMessage>
      </>
    );
  }
};

export default OwnerRoute;
