import { Link } from "react-router-dom";
import useHouses from "../../hooks/useHouses";
import Swal from "sweetalert2";
import { useState } from "react";
import Message from "../../components/Message";
import ErrorMessage from "../../components/ErrorMessage";

const OwnerDashboard = () => {
  const [data, refetch] = useHouses();
  const [message, setMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        setMessage("Please wait...");

        fetch(`https://house-hunter.cyclic.app/house-details/${id}`, {
          method: "DELETE",
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.acknowledged) {
              refetch();
              setMessage("");
              Swal.fire(
                "Deleted!",
                "Your house info have been deleted from database.",
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
        <Link
          to="/addHouse"
          className="btn rounded-md bg-[#2a303c] text-white border border-white"
        >
          Add New House
        </Link>
      </div>

      <div className="overflow-x-auto">
        <table className="table table-compact w-full mt-3">
          <thead>
            <tr>
              <th>Address</th>
              <th>City</th>
              <th>Availability Date</th>
              <th>Rent Per Month</th>
              <th>Phone Number</th>
              <th></th>
              <th></th>
            </tr>
          </thead>

          {!data?.error &&
            data?.map((house) => (
              <tbody key={house._id}>
                <tr>
                  <td>{house.address}</td>
                  <td>{house.city}</td>
                  <td>{house.availabilityDate}</td>
                  <td>{`${house.rent} BDT`}</td>
                  <td>{house.phone}</td>
                  <td className="link link-hover">
                    <Link to={`/updateHouseDetails/${house._id}`}>Edit</Link>
                  </td>

                  <td>
                    <button
                      className="link link-hover"
                      onClick={() => handleDelete(house._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              </tbody>
            ))}
        </table>
      </div>

      {!data && (
        <div className="hidden sm:flex toast toast-end ">
          <div className="alert alert-info">
            <div>
              <span>{"You have not added any house to give rent yet."}</span>
            </div>
          </div>
        </div>
      )}

      {message && <Message message={message}></Message>}

      {errorMessage && (
        <ErrorMessage errorMessage={errorMessage}></ErrorMessage>
      )}

      {data?.error && (
        <ErrorMessage errorMessage={"Please login again!"}></ErrorMessage>
      )}
    </div>
  );
};

export default OwnerDashboard;
