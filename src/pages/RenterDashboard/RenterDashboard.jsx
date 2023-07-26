import Swal from "sweetalert2";
import { useState } from "react";
import Message from "../../components/Message";
import ErrorMessage from "../../components/ErrorMessage";
import useBookedHouses from "../../hooks/useBookedHouses";

const RenterDashboard = () => {
  const [bookedHouses, refetch] = useBookedHouses();
  const [message, setMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleCancelBooking = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, cancel booking!",
    }).then((result) => {
      if (result.isConfirmed) {
        setMessage("Please wait...");

        fetch(`https://house-hunter.cyclic.app/booked-house-details/${id}`, {
          method: "DELETE",
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.acknowledged) {
              refetch();
              setMessage("");
              Swal.fire(
                "Booking Cancelled!",
                "Your booking info have been deleted from database.",
                "success"
              );
            }
          })
          .catch((error) => {
            setMessage("");
            setErrorMessage(error.message);
          });
      }
    });
  };

  return (
    <div className="min-h-screen pt-16 lg:pt-24">
      <div className="flex justify-end mr-3 lg:mr-6">
        <button
          className="btn rounded-md bg-white text-black shadow-md shadow-purple-500"
          onClick={() => window.profile.showModal()}
          disabled={!bookedHouses}
        >
          View Profile
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="table table-compact w-full mt-3">
          <thead>
            <tr>
              <th>Address</th>
              <th>Rent Per Month</th>
              <th>Owner Name</th>
              <th>Owner Phone</th>
              <th>Booking Date</th>
              <th></th>
              <th></th>
            </tr>
          </thead>

          {bookedHouses &&
            bookedHouses.map((house) => (
              <tbody key={house._id}>
                <tr>
                  <td>{house.houseAddress}</td>
                  <td>{`${house.houseRent} BDT`}</td>
                  <td>{house.ownerName}</td>
                  <td>{house.ownerPhone}</td>
                  <td>{house.bookingDate}</td>

                  <td>
                    <button className="link link-hover">
                      Download Booking Info
                    </button>
                  </td>

                  <td>
                    <button
                      className="link link-hover"
                      onClick={() => handleCancelBooking(house._id)}
                    >
                      Cancel Booking
                    </button>
                  </td>
                </tr>
              </tbody>
            ))}
        </table>
      </div>

      {bookedHouses && (
        <dialog id="profile" className="modal modal-bottom sm:modal-middle">
          <form method="dialog" className="modal-box">
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
              ✕
            </button>

            <h3 className="font-bold text-lg">{bookedHouses[0].renterName}</h3>
            <p className="py-2">{`Email: ${bookedHouses[0].renterEmail}`}</p>
            <p>{`Phone: ${bookedHouses[0].renterPhone}`}</p>
          </form>
        </dialog>
      )}

      {!bookedHouses && (
        <div className="hidden sm:flex toast toast-end">
          <div className="alert alert-info">
            <div>
              <span>{"You have no booked house to view in the list."}</span>
            </div>
          </div>
        </div>
      )}

      {message && <Message message={message}></Message>}

      {errorMessage && (
        <ErrorMessage errorMessage={errorMessage}></ErrorMessage>
      )}
    </div>
  );
};

export default RenterDashboard;
