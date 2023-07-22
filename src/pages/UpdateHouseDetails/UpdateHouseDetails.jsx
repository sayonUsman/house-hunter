import { useState } from "react";
import { useForm } from "react-hook-form";
import { useLoaderData, useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";

const UpdateHouseDetails = () => {
  const details = useLoaderData();
  const params = useParams();
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
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

    fetch(`http://localhost:5000/house-details/${params.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(houseDetails),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.acknowledged) {
          setMessage("");
          navigate("/owner-dashboard");
          Swal.fire(
            "Done!",
            "Your house details have been updated successfully.",
            "success"
          );
        }
      });
  };

  return (
    <div className="hero min-h-screen">
      <div className="card rounded-md shadow-md shadow-sky-500 mt-16 md:mt-20 mb-4">
        <div className="card-body">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-col lg:flex-row">
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-semibold">Owner Name</span>
                </label>

                <input
                  type="text"
                  className="w-72 md:w-96 input input-bordered text-black border border-black"
                  defaultValue={details[0].ownerName}
                  {...register("name")}
                />
              </div>

              <div className="form-control lg:ml-10">
                <label className="label">
                  <span className="label-text font-semibold">Address</span>
                </label>

                <input
                  type="text"
                  className="w-72 md:w-96 input input-bordered text-black border border-black"
                  defaultValue={details[0].address}
                  {...register("address")}
                />
              </div>
            </div>

            <div className="flex flex-col lg:flex-row lg:mt-4">
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-semibold">City</span>
                </label>

                <input
                  type="text"
                  className="w-72 md:w-96 input input-bordered text-black border border-black"
                  defaultValue={details[0].city}
                  {...register("city")}
                />
              </div>

              <div className="form-control lg:ml-10">
                <label className="label">
                  <span className="label-text font-semibold">Phone Number</span>
                </label>

                <input
                  type="tel"
                  placeholder="+8801XXXXXXXXX"
                  className="w-72 md:w-96 input input-bordered text-black border border-black"
                  defaultValue={details[0].phone}
                  {...register("phone", {
                    pattern: /[+]{1}[8]{2}[0]{1}[1]{1}[0-9]{9}/,
                  })}
                />

                {errors.phone?.type === "pattern" && (
                  <span className="text-red-500 pt-1 pl-1">
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
                  className="w-72 md:w-96 input input-bordered text-black border border-black"
                  defaultValue={details[0].bedrooms}
                  {...register("bedrooms")}
                />
              </div>

              <div className="form-control lg:ml-10">
                <label className="label">
                  <span className="label-text font-semibold">Bathrooms</span>
                </label>

                <input
                  type="number"
                  min="1"
                  className="w-72 md:w-96 input input-bordered text-black border border-black"
                  defaultValue={details[0].bathrooms}
                  {...register("bathrooms")}
                />
              </div>
            </div>

            <div className="flex flex-col lg:flex-row lg:mt-4">
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-semibold">Room Size</span>
                </label>

                <input
                  type="text"
                  className="w-72 md:w-96 input input-bordered text-black border border-black"
                  defaultValue={details[0].roomSize}
                  {...register("roomSize")}
                />
              </div>

              <div className="form-control lg:ml-10">
                <label className="label">
                  <span className="label-text font-semibold">
                    House Picture URL
                  </span>
                </label>

                <input
                  type="url"
                  className="w-72 md:w-96 input input-bordered text-black border border-black"
                  defaultValue={details[0].url}
                  {...register("url")}
                />
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
                  className="w-72 md:w-96 input input-bordered text-black border border-black"
                  defaultValue={details[0].availabilityDate}
                  {...register("date")}
                />
              </div>

              <div className="form-control lg:ml-10">
                <label className="label">
                  <span className="label-text font-semibold">
                    Rent Per Month
                  </span>
                </label>

                <input
                  type="number"
                  className="w-72 md:w-96 input input-bordered text-black border border-black"
                  defaultValue={details[0].rent}
                  {...register("rent")}
                />
              </div>
            </div>

            <div className="form-control mt-7">
              <label className="label">
                <span className="label-text font-semibold">Description</span>
              </label>

              <textarea
                rows="9"
                className="rounded-lg border border-black pl-4 pt-2 pr-4 pb-2"
                defaultValue={details[0].description}
                {...register("description")}
              ></textarea>
            </div>

            <div className="form-control mt-12">
              <div className="flex mx-auto">
                <input
                  type="submit"
                  id="submit"
                  value="Update Details"
                  className="w-48 btn rounded-md bg-white text-black shadow-md shadow-purple-500"
                />
              </div>
            </div>
          </form>
        </div>
      </div>

      {message && (
        <div className="toast toast-end">
          <div className="alert alert-info">
            <div>
              <span>{message}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UpdateHouseDetails;
