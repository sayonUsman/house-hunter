import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
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

    fetch("https://house-hunter-bice.vercel.app/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(user),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.isLoginSuccess) {
          const userInfo = {
            isLoginSuccess: true,
            email: user.email,
            role: data.role,
          };

          localStorage.setItem("user-info", JSON.stringify(userInfo));
          reset();

          if (data.role === "House Owner") {
            navigate("/owner-dashboard");
          } else navigate("/renter-dashboard");

          window.location.reload(false);
        } else {
          setErrorMessage("Authentication failed");
        }
      });
  };

  return (
    <div className="hero min-h-screen">
      <div className="hero-content flex-col lg:flex-row-reverse">
        <div className="card flex-shrink-0 w-72 sm:w-96 shadow-md shadow-sky-500">
          <div className="card-body">
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>

                <input
                  type="email"
                  placeholder="Email"
                  className="input input-bordered"
                  {...register("email", { required: true })}
                />

                {errors.email && (
                  <span className="text-red-500 pt-1 pl-1">
                    Give your email.
                  </span>
                )}
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text">Password</span>
                </label>

                <input
                  type="password"
                  placeholder="password"
                  className="input input-bordered"
                  {...register("password", { required: true })}
                />

                {errors.password && (
                  <span className="text-red-500 pt-1 pl-1">
                    Give your password.
                  </span>
                )}
              </div>

              <div className="form-control mt-6">
                <input
                  type="submit"
                  value="Login"
                  className="btn rounded-md bg-white text-black shadow-md shadow-purple-500"
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

      {errorMessage && (
        <div className="toast toast-end">
          <div className="alert alert-error">
            <div>
              <span>{errorMessage}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Login;
