import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const [role, setRole] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const manageRole = (event) => {
    setRole(`${event.target.value}`);
  };

  const onSubmit = (newUserData) => {
    setErrorMessage("");

    if (role === "") {
      setErrorMessage("Please Select Your Role");
      return;
    } else {
      const newUser = {
        name: newUserData.name,
        email: newUserData.email,
        phone: newUserData.phone,
        password: newUserData.password,
        role: role,
      };

      fetch("https://house-hunter-bice.vercel.app/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newUser),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data._id) {
            const userInfo = {
              isLoginSuccess: true,
              email: data.email,
              role: data.role,
            };

            localStorage.setItem("user-info", JSON.stringify(userInfo));
            reset();

            if (data.role === "House Owner") {
              navigate("/owner-dashboard");
            } else navigate("/renter-dashboard");

            window.location.reload(false);
          }

          if (data.isEmailRegistered) {
            setErrorMessage("This email is already registered");
          }
        })
        .catch((error) => {
          setErrorMessage(error.message);
        });
    }
  };

  return (
    <div className="hero min-h-screen">
      <div className="hero-content flex-col lg:flex-row-reverse">
        <div className="card flex-shrink-0 w-72 sm:w-96 shadow-md shadow-zinc-900">
          <div className="card-body">
            <select
              onChange={(event) => manageRole(event)}
              className="select select-bordered w-full"
            >
              <option disabled selected>
                Kindly Select Your Role
              </option>
              <option value="House Owner">House Owner</option>
              <option value="House Renter">House Renter</option>
            </select>

            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Full Name</span>
                </label>

                <input
                  type="text"
                  placeholder="Full Name"
                  className="input input-bordered"
                  {...register("name", { required: true })}
                />

                {errors.name && (
                  <span className="text-red-500 pt-1 pl-1">
                    Full Name is required.
                  </span>
                )}
              </div>

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
                    Email is required.
                  </span>
                )}
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text">Phone</span>
                </label>

                <input
                  type="tel"
                  placeholder="+8801XXXXXXXXX"
                  className="input input-bordered"
                  {...register("phone", {
                    required: true,
                    pattern: /[+]{1}[8]{2}[0]{1}[1]{1}[0-9]{9}/,
                  })}
                />

                {errors.phone?.type === "required" && (
                  <span className="text-red-500 pt-1 pl-1">
                    Phone number is required.
                  </span>
                )}

                {errors.phone?.type === "pattern" && (
                  <span className="text-red-500 pt-1 pl-1">
                    Only Bangladeshi phone numbers are allowed.
                  </span>
                )}
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text">Password</span>
                </label>

                <input
                  type="password"
                  placeholder="Password"
                  className="input input-bordered"
                  {...register("password", { required: true, minLength: 6 })}
                />

                {errors.password?.type === "required" && (
                  <span className="text-red-500 pt-1 pl-1">
                    Password is required.
                  </span>
                )}

                {errors.password?.type === "minLength" && (
                  <span className="text-red-500 pt-1 pl-1">
                    Password must be six characters.
                  </span>
                )}
              </div>

              <div className="form-control mt-6">
                <input
                  type="submit"
                  value="Sign Up"
                  className="btn btn-primary"
                />
              </div>
            </form>
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

export default SignUp;
