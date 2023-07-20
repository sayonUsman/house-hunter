import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const OwnerDashboard = () => {
  let userInfo = localStorage.getItem("user-info");
  userInfo = JSON.parse(userInfo);
  const [myHouses, setMyHouses] = useState([]);
  const [message, setMessage] = useState("");
  const email = userInfo.email;

  useEffect(() => {
    fetch(`https://house-hunter-bice.vercel.app/house-details/${email}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.length === 0) {
          setMessage("You have no house to view in the list.");
        } else {
          setMyHouses(data);
          setMessage("");
        }
      });
  }, [email]);

  return (
    <div className="container mx-auto min-h-screen pt-16 lg:pt-24">
      <div className="flex justify-end mr-3 lg:mr-6">
        <Link
          to="/addHouse"
          className="btn rounded-md bg-white text-black shadow-md shadow-purple-500"
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
              <th>Rent Per Month</th>
              <th>Phone Number</th>
              <th></th>
              <th></th>
            </tr>
          </thead>

          {myHouses &&
            myHouses.map((house) => (
              <tbody key={house._id}>
                <tr>
                  <td>{house.address}</td>
                  <td>{house.city}</td>
                  <td>{`${house.rent} BDT`}</td>
                  <td>{house.phone}</td>
                  <td className="link link-hover">Update</td>

                  <td>
                    <button className="link link-hover">Delete</button>
                  </td>
                </tr>
              </tbody>
            ))}
        </table>
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

export default OwnerDashboard;
