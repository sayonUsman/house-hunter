import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

const Login = () => {
  const [errorMessage, setErrorMessage] = useState("");
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    setErrorMessage("");

    fetch("http://localhost:5000/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((date) => {
        if (date.isLoginSuccess) {
          reset();
          Swal.fire({
            position: "center",
            icon: "success",
            title: "Welcome Back.",
            text: "Logged in has been done successfully.",
            showConfirmButton: true,
            timer: 2000,
          });
        } else {
          setErrorMessage("Authentication failed");
        }
      });
  };

  return (
    <div className="hero min-h-screen bg-base-200">
      <div className="hero-content flex-col lg:flex-row-reverse">
        <div className="card flex-shrink-0 w-72 sm:w-96 shadow-2xl bg-base-100">
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
                  className="btn btn-primary"
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
