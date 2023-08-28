import { useState } from "react";
import { useLoaderData, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import Message from "../../components/Message";
import ErrorMessage from "../../components/ErrorMessage";
import moment from "moment/moment";

const Details = () => {
  const details = useLoaderData();
  const [message, setMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleBooking = (house) => {
    let userInfo = localStorage.getItem("user-info");
    userInfo = JSON.parse(userInfo);
    setErrorMessage("");

    if (userInfo.role === "House Owner") {
      setErrorMessage("You cannot book the house as an owner!");
    } else {
      setMessage("Please wait...");
      const email = userInfo.email;
      const bookingInfo = {
        email: email,
        houseId: house._id,
        houseAddress: house.address,
        ownerName: house.ownerName,
        ownerPhone: house.phone,
        rent: house.rent,
        bookingDate: moment().format("LL"),
      };

      fetch("https://house-hunter.cyclic.app/booked-house-details", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(bookingInfo),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data._id) {
            setMessage("");
            navigate("/renter-dashboard");
            Swal.fire("Great!", "Your booking is confirmed", "success");
          } else if (data.isMoreThanTwo) {
            setMessage("");
            setErrorMessage("You cannot book more than two booking!");
          } else if (data.isHouseBooked) {
            setMessage("");
            setErrorMessage("The house has already booked!");
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
      <div className="hero-content text-center">
        <div className="sm:w-9/12 card glass rounded-md mt-12 lg:mt-16">
          <figure className="p-3">
            <img
              src={details[0].url}
              alt="House Image"
              className="w-fit rounded-lg"
            />
          </figure>

          <div className="card-body">
            <span className="text-left">
              <p className="text-justify">{`${details[0].description}`}</p>

              <span className="font-semibold">
                <p className=" mt-5">{`Bedrooms: ${details[0].bedrooms}`}</p>
                <p>{`Bathrooms: ${details[0].bathrooms}`}</p>
                <p>{`Rent: ${details[0].rent} BDT`}</p>
                <p>{`Owner: ${details[0].ownerName}`}</p>
                <p>{`Contact Number: ${details[0].phone}`}</p>
                <p>{`Location: ${details[0].address}`}</p>
              </span>

              <div className="card-actions justify-end mt-7">
                <button
                  className="btn rounded-md bg-[#2a303c] text-white border border-white ml-3 hover:bg-black hover:bg-opacity-70 hover:border-none"
                  onClick={() => handleBooking(details[0])}
                >
                  Book Now
                </button>
              </div>
            </span>
          </div>
        </div>
      </div>

      {message && <Message message={message}></Message>}

      {errorMessage && (
        <ErrorMessage errorMessage={errorMessage}></ErrorMessage>
      )}
    </div>
  );
};

export default Details;
