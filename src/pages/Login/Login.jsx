import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import Message from "../../components/Message";
import ErrorMessage from "../../components/ErrorMessage";

const Login = () => {
  const [message, setMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = (user) => {
    setErrorMessage("");
    setMessage("Please wait...");

    fetch("https://house-hunter.cyclic.app/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(user),
    })
      .then((res) => res.json())
      .then((userData) => {
        if (userData.isLoginSuccess) {
          fetch("https://house-hunter.cyclic.app/jwt", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ userEmail: user.email }),
          })
            .then((res) => res.json())
            .then((data) => {
              const userInfo = {
                isLoginSuccess: true,
                email: user.email,
                role: userData.role,
                accessToken: data.token,
              };

              localStorage.setItem("user-info", JSON.stringify(userInfo));
              reset();

              if (userData.role === "House Owner") {
                navigate("/owner-dashboard");
              } else navigate("/renter-dashboard");

              window.location.reload(false);
            });

          setMessage("");
        } else {
          setMessage("");
          setErrorMessage("Authentication failed");
        }
      })
      .catch((error) => {
        setMessage("");
        setErrorMessage(error.message);
      });
  };

  return (
    <div className="hero min-h-screen">
      <div className="hero-content flex-col lg:flex-row-reverse">
        <div className="card glass flex-shrink-0 w-72 sm:w-96">
          <div className="card-body">
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>

                <input
                  type="email"
                  placeholder="Email"
                  className="input input-bordered bg-gray-100 text-black"
                  {...register("email", { required: true })}
                />

                {errors.email && (
                  <span className="text-white pt-1 pl-1">Give your email.</span>
                )}
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text">Password</span>
                </label>

                <input
                  type="password"
                  placeholder="password"
                  className="input input-bordered bg-gray-100 text-black"
                  {...register("password", { required: true })}
                />

                {errors.password && (
                  <span className="text-white pt-1 pl-1">
                    Give your password.
                  </span>
                )}
              </div>

              <div className="form-control mt-6">
                <input
                  type="submit"
                  value="Login"
                  className="btn rounded-md bg-[#2a303c] text-white border-none hover:bg-black hover:bg-opacity-70"
                />
              </div>
            </form>

            <p className="mt-7 text-center">
              New here?{" "}
              <span>
                <Link to="/signup" className="link link-hover">
                  Create a New Account
                </Link>
              </span>
            </p>
          </div>
        </div>
      </div>

      {message && <Message message={message}> </Message>}

      {errorMessage && (
        <ErrorMessage errorMessage={errorMessage}></ErrorMessage>
      )}
    </div>
  );
};

export default Login;
