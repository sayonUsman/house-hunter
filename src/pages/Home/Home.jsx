import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const Home = () => {
  const [houses, setHouses] = useState([]);
  const [message, setMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`http://localhost:5000/houses-details`)
      .then((res) => res.json())
      .then((data) => {
        setHouses(data);
      });
  }, []);

  const handleViewDetails = (id) => {
    let userInfo = localStorage.getItem("user-info");

    if (!userInfo) {
      Swal.fire({
        title: "Oops!",
        text: "To view full details kindly login your account.",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Login",
      }).then((result) => {
        if (result.isConfirmed) {
          navigate("/login");
        }
      });
    } else {
      navigate(`/details/${id}`);
    }
  };

  const handleBooking = (id) => {
    let userInfo = localStorage.getItem("user-info");

    if (!userInfo) {
      Swal.fire({
        title: "Oops!",
        text: "To ensure the booking kindly login your account.",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Login",
      }).then((result) => {
        if (result.isConfirmed) {
          navigate("/login");
        }
      });
    } else {
      setErrorMessage("");
      setMessage("Please wait...");
      userInfo = JSON.parse(userInfo);
      const email = userInfo.email;
      const bookingInfo = {
        houseId: id,
        email: email,
      };

      fetch("http://localhost:5000/booked-house-details", {
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
        });
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3 gap-3 xl:mx-20 2xl:mx-6 pt-10 lg:pt-14 pb-7">
      {houses.map((house) => (
        <div className="flex mx-auto" key={house._id}>
          <div className="sm:w-[475px] lg:w-[445px] xl:w-[475px] card rounded-lg shadow-md shadow-sky-500 mx-4 sm:mx-7 2xl:mx-0 mt-7 sm:mt-9">
            <figure className="p-3">
              <img
                src={house.url}
                alt="House Image"
                className="sm:h-72 rounded-lg"
              />
            </figure>

            <div className="card-body">
              <span>
                <p className="font-semibold mt-5">{`Location: ${house.address}`}</p>
                <p className="font-semibold">{`Room Size: ${house.roomSize}`}</p>
                <p className="font-semibold">{`Rent: ${house.rent} BDT`}</p>
                <p className="font-semibold">{`Availability Date: ${house.availabilityDate}`}</p>

                <div className="card-actions justify-end mt-7">
                  <button
                    className="btn rounded-md bg-white text-black shadow-md shadow-purple-500"
                    onClick={() => handleViewDetails(house._id)}
                  >
                    View Details
                  </button>

                  <button
                    className="btn rounded-md bg-white text-black shadow-md shadow-purple-500 ml-3"
                    onClick={() => handleBooking(house._id)}
                  >
                    Book Now
                  </button>
                </div>
              </span>
            </div>
          </div>
        </div>
      ))}

      {message && (
        <div className="toast toast-end">
          <div className="alert alert-info">
            <div>
              <span>{message}</span>
            </div>
          </div>
        </div>
      )}

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

export default Home;
