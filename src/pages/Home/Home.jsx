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
    <div className="grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3 gap-10 lg:gap-3 pt-10 lg:pt-16 pb-7">
      {houses.map((house) => (
        <div className="flex mx-auto" key={house._id}>
          <div className="card rounded-lg shadow-md shadow-orange-400 mx-3 sm:mx-9 lg:mx-6 mt-9">
            <figure className="p-3">
              <img
                src={house.url}
                alt="House Image"
                className="w-[625px] h-72 rounded-lg"
              />
            </figure>

            <div className="card-body">
              <div className="flex my-auto">
                <span>
                  <p className="text-justify">{house.description}</p>
                  <p className="font-semibold mt-5">{`Bedrooms: ${house.bedrooms}`}</p>
                  <p className="font-semibold">{`Bathrooms: ${house.bathrooms}`}</p>
                  <p className="font-semibold">{`Room Size: ${house.roomSize}`}</p>
                  <p className="font-semibold">{`Address: ${house.address}`}</p>
                  <p className="font-semibold">{`Rent: ${house.rent} BDT`}</p>
                  <p className="font-semibold">{`Contact: ${house.phone}`}</p>
                  <p className="font-semibold">{`Availability Date: ${house.availabilityDate}`}</p>

                  <div className="card-actions mt-2">
                    <button className="btn rounded-md btn-primary text-white mt-3">
                      Book Now
                    </button>
                  </div>
                </span>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Home;
