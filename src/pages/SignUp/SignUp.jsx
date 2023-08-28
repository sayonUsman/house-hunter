import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import Message from "../../components/Message";
import ErrorMessage from "../../components/ErrorMessage";

const SignUp = () => {
  const [role, setRole] = useState("");
  const [message, setMessage] = useState("");
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
    setMessage("Please wait...");

    if (role === "") {
      setErrorMessage("Please Select Your Role.");
      return;
    } else {
      const newUser = {
        name: newUserData.name,
        email: newUserData.email,
        phone: newUserData.phone,
        password: newUserData.password,
        role: role,
      };

      fetch("https://house-hunter.cyclic.app/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newUser),
      })
        .then((res) => res.json())
        .then((userData) => {
          if (userData._id) {
            fetch("https://house-hunter.cyclic.app/jwt", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ userEmail: userData.email }),
            })
              .then((res) => res.json())
              .then((data) => {
                const userInfo = {
                  isLoginSuccess: true,
                  email: userData.email,
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
          }

          if (userData.isEmailRegistered) {
            setMessage("");
            setErrorMessage("This email is already registered");
          }
        })
        .catch((error) => {
          setMessage("");
          setErrorMessage(error.message);
        });
    }
  };

  return (
    <div className="hero min-h-screen">
      <div className="hero-content flex-col lg:flex-row-reverse">
        <div className="card glass flex-shrink-0 w-72 sm:w-96">
          <div className="card-body">
            <select
              onChange={(event) => manageRole(event)}
              className="select select-bordered w-full bg-gray-100 text-black"
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
                  className="input input-bordered bg-gray-100 text-black"
                  {...register("name", { required: true })}
                />

                {errors.name && (
                  <span className="text-white pt-1 pl-1">
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
                  className="input input-bordered bg-gray-100 text-black"
                  {...register("email", { required: true })}
                />

                {errors.email && (
                  <span className="text-white pt-1 pl-1">
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
                  className="input input-bordered bg-gray-100 text-black"
                  {...register("phone", {
                    required: true,
                    pattern: /[+]{1}[8]{2}[0]{1}[1]{1}[0-9]{9}/,
                  })}
                />

                {errors.phone?.type === "required" && (
                  <span className="text-white pt-1 pl-1">
                    Phone number is required.
                  </span>
                )}

                {errors.phone?.type === "pattern" && (
                  <span className="text-white pt-1 pl-1">
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
                  className="input input-bordered bg-gray-100 text-black"
                  {...register("password", { required: true, minLength: 6 })}
                />

                {errors.password?.type === "required" && (
                  <span className="text-white pt-1 pl-1">
                    Password is required.
                  </span>
                )}

                {errors.password?.type === "minLength" && (
                  <span className="text-white pt-1 pl-1">
                    Password must be six characters.
                  </span>
                )}
              </div>

              <div className="form-control mt-6">
                <input
                  type="submit"
                  value="Sign Up"
                  className="btn rounded-md bg-[#2a303c] text-white border-none hover:bg-black hover:bg-opacity-70"
                />
              </div>
            </form>
          </div>
        </div>
      </div>

      {message && <Message message={message}></Message>}

      {errorMessage && (
        <ErrorMessage errorMessage={errorMessage}> </ErrorMessage>
      )}
    </div>
  );
};

export default SignUp;
