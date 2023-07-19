import { useEffect, useState } from "react";

const Home = () => {
  const [houses, setHouses] = useState([]);

  useEffect(() => {
    fetch(`https://house-hunter-bice.vercel.app/house-details`)
      .then((res) => res.json())
      .then((data) => {
        setHouses(data);
      });
  }, []);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3 gap-5 md:gap-7 lg:mx-7 pt-10 lg:pt-16 pb-7">
      {houses.map((house) => (
        <div className="flex mx-auto" key={house._id}>
          <div className="w-[475px] lg:w-full card rounded-lg shadow-md shadow-sky-500 mx-7 mt-7 sm:mt-9">
            <figure className="p-3">
              <img
                src={house.url}
                alt="House Image"
                className="lg:w-[625px] h-72 rounded-lg"
              />
            </figure>

            <div className="card-body">
              <span>
                <p className="font-semibold mt-5">{`Location: ${house.address}`}</p>
                <p className="font-semibold">{`Room Size: ${house.roomSize}`}</p>
                <p className="font-semibold">{`Rent: ${house.rent} BDT`}</p>
                <p className="font-semibold">{`Availability Date: ${house.availabilityDate}`}</p>

                <div className="card-actions justify-end mt-7">
                  <button className="btn rounded-md bg-white text-black shadow-md shadow-purple-500">
                    View Details
                  </button>

                  <button className="btn rounded-md bg-white text-black shadow-md shadow-purple-500 ml-3">
                    Book Now
                  </button>
                </div>
              </span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Home;
