import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import Message from "../../components/Message";
import ErrorMessage from "../../components/ErrorMessage";
import moment from "moment/moment";
import LoadingDots from "../../components/LoadingDots";
import Banner from "./Banner/Banner";

const Home = () => {
  const [houses, setHouses] = useState(null);
  const [message, setMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();
  let userInfo = localStorage.getItem("user-info");
  userInfo = JSON.parse(userInfo);

  useEffect(() => {
    fetch(`https://house-hunter.cyclic.app/houses-details`)
      .then((res) => res.json())
      .then((data) => {
        setHouses(data);
      })
      .catch((error) => {
        setMessage("");
        setErrorMessage(error.message);
      });
  }, []);

  const handleViewDetails = (id) => {
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

  const handleBooking = (house) => {
    setErrorMessage("");

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
    } else if (userInfo.role === "House Owner") {
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
    <>
      <Banner></Banner>

      {houses && (
        <div className="grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3 gap-3 xl:mx-20 2xl:mx-6 pt-10 lg:pt-14 pb-7">
          {houses.map((house) => (
            <div className="flex mx-auto" key={house._id}>
              <div className="sm:w-[475px] lg:w-[445px] xl:w-[475px] card glass rounded-lg mx-4 sm:mx-7 2xl:mx-0 mt-7 sm:mt-9">
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
                        className="btn rounded-md bg-[#2a303c] text-white border border-white"
                        onClick={() => handleViewDetails(house._id)}
                      >
                        View Details
                      </button>

                      <button
                        className="btn rounded-md bg-[#2a303c] text-white boder border-white ml-3"
                        onClick={() => handleBooking(house)}
                      >
                        Book Now
                      </button>
                    </div>
                  </span>
                </div>
              </div>
            </div>
          ))}

          {message && <Message message={message}></Message>}

          {errorMessage && (
            <ErrorMessage errorMessage={errorMessage}></ErrorMessage>
          )}
        </div>
      )}

      {!houses && <LoadingDots></LoadingDots>}
    </>
  );
};

export default Home;
