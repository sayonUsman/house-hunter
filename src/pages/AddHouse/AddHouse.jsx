import { useState } from "react";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import Message from "../../components/Message";
import ErrorMessage from "../../components/ErrorMessage";

const AddHouse = () => {
  const [message, setMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = (details) => {
    setMessage("Please wait...");

    let userInfo = localStorage.getItem("user-info");
    userInfo = JSON.parse(userInfo);
    const email = userInfo.email;

    const houseDetails = {
      ownerName: details.name,
      email: email,
      address: details.address,
      city: details.city,
      phone: details.phone,
      bedrooms: details.bedrooms,
      bathrooms: details.bathrooms,
      roomSize: details.roomSize,
      url: details.url,
      availabilityDate: details.date,
      rent: details.rent,
      description: details.description,
    };

    fetch("https://house-hunter.cyclic.app/house-details", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(houseDetails),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data._id) {
          reset();
          setMessage("");
          Swal.fire(
            "Great!",
            "Your house details have been saved to database.",
            "success"
          );
        }
      })
      .catch((error) => {
        setMessage("");
        setErrorMessage(error.message);
      });
  };

  return (
    <div className="hero min-h-screen">
      <div className="card glass rounded-md mt-16 md:mt-20 mb-4">
        <div className="card-body">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-col lg:flex-row">
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-semibold">Owner Name</span>
                </label>

                <input
                  type="text"
                  className="w-72 md:w-96 input input-bordered bg-gray-100 text-black"
                  {...register("name", { required: true })}
                />

                {errors.name && (
                  <span className="text-white pt-1 pl-1">
                    Owner Name is required.
                  </span>
                )}
              </div>

              <div className="form-control lg:ml-10">
                <label className="label">
                  <span className="label-text font-semibold">Address</span>
                </label>

                <input
                  type="text"
                  className="w-72 md:w-96 input input-bordered bg-gray-100 text-black"
                  {...register("address", { required: true })}
                />

                {errors.address && (
                  <span className="text-white pt-1 pl-1">
                    Address is required.
                  </span>
                )}
              </div>
            </div>

            <div className="flex flex-col lg:flex-row lg:mt-4">
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-semibold">City</span>
                </label>

                <input
                  type="text"
                  className="w-72 md:w-96 input input-bordered bg-gray-100 text-black"
                  {...register("city", { required: true })}
                />

                {errors.city && (
                  <span className="text-white pt-1 pl-1">
                    City is required.
                  </span>
                )}
              </div>

              <div className="form-control lg:ml-10">
                <label className="label">
                  <span className="label-text font-semibold">Phone Number</span>
                </label>

                <input
                  type="tel"
                  placeholder="+8801XXXXXXXXX"
                  className="w-72 md:w-96 input input-bordered bg-gray-100 text-black"
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
            </div>

            <div className="flex flex-col lg:flex-row lg:mt-4">
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-semibold">Bedrooms</span>
                </label>

                <input
                  type="number"
                  min="1"
                  className="w-72 md:w-96 input input-bordered bg-gray-100 text-black"
                  {...register("bedrooms", { required: true })}
                />

                {errors.bedrooms && (
                  <span className="text-white pt-1 pl-1">
                    Bedrooms is required.
                  </span>
                )}
              </div>

              <div className="form-control lg:ml-10">
                <label className="label">
                  <span className="label-text font-semibold">Bathrooms</span>
                </label>

                <input
                  type="number"
                  min="1"
                  className="w-72 md:w-96 input input-bordered bg-gray-100 text-black"
                  {...register("bathrooms", { required: true })}
                />

                {errors.bathrooms && (
                  <span className="text-white pt-1 pl-1">
                    Bathrooms is required.
                  </span>
                )}
              </div>
            </div>

            <div className="flex flex-col lg:flex-row lg:mt-4">
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-semibold">Room Size</span>
                </label>

                <input
                  type="text"
                  className="w-72 md:w-96 input input-bordered bg-gray-100 text-black"
                  {...register("roomSize", { required: true })}
                />

                {errors.roomSize && (
                  <span className="text-white pt-1 pl-1">
                    Room size is required.
                  </span>
                )}
              </div>

              <div className="form-control lg:ml-10">
                <label className="label">
                  <span className="label-text font-semibold">
                    House Picture URL
                  </span>
                </label>

                <input
                  type="url"
                  className="w-72 md:w-96 input input-bordered bg-gray-100 text-black"
                  {...register("url", { required: true })}
                />

                {errors.url && (
                  <span className="text-white pt-1 pl-1">
                    House picture url is required.
                  </span>
                )}
              </div>
            </div>

            <div className="flex flex-col lg:flex-row lg:mt-4">
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-semibold">
                    Availability Date
                  </span>
                </label>

                <input
                  type="date"
                  className="w-72 md:w-96 input input-bordered bg-gray-100 text-black"
                  {...register("date", { required: true })}
                />

                {errors.date && (
                  <span className="text-white pt-1 pl-1">
                    Availability date is required.
                  </span>
                )}
              </div>

              <div className="form-control lg:ml-10">
                <label className="label">
                  <span className="label-text font-semibold">
                    Rent Per Month
                  </span>
                </label>

                <input
                  type="number"
                  className="w-72 md:w-96 input input-bordered bg-gray-100 text-black"
                  {...register("rent", { required: true })}
                />

                {errors.rent && (
                  <span className="text-white pt-1 pl-1">
                    Rent is required.
                  </span>
                )}
              </div>
            </div>

            <div className="form-control mt-7">
              <label className="label">
                <span className="label-text font-semibold">Description</span>
              </label>

              <textarea
                rows="9"
                className="rounded-lg bg-gray-100 text-black pl-4 pt-2 pr-4 pb-2"
                {...register("description", { required: true })}
              ></textarea>

              {errors.description && (
                <span className="text-white pt-1 pl-1">
                  Description is required.
                </span>
              )}
            </div>

            <div className="form-control mt-12">
              <div className="flex mx-auto">
                <input
                  type="submit"
                  id="submit"
                  value="Add House"
                  className="w-48 btn rounded-md bg-[#2a303c] text-white border border-white hover:bg-black hover:bg-opacity-70 hover:border-none"
                />
              </div>
            </div>
          </form>
        </div>
      </div>

      {message && <Message message={message}></Message>}

      {errorMessage && (
        <ErrorMessage errorMessage={errorMessage}></ErrorMessage>
      )}
    </div>
  );
};

export default AddHouse;
