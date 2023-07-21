import { Link } from "react-router-dom";
import useHouses from "../../hooks/useHouses";
import Swal from "sweetalert2";

const OwnerDashboard = () => {
  const [myHouses, refetch] = useHouses();

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
        fetch(`http://localhost:5000/house-details/${id}`, {
          method: "DELETE",
        });

        refetch();

        Swal.fire(
          "Deleted!",
          "Your house info hava been deleted from database.",
          "success"
        );
      }
    });
  };

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

      {!myHouses && (
        <div className="toast toast-end">
          <div className="alert alert-info">
            <div>
              <span>{"You have no house to view in the list."}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OwnerDashboard;
