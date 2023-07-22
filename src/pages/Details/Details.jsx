import { useLoaderData } from "react-router-dom";

const Details = () => {
  const details = useLoaderData();

  return (
    <div className="hero min-h-screen">
      <div className="hero-content text-center">
        <div className="sm:w-9/12 card rounded-md shadow-md shadow-sky-500 mt-12 lg:mt-16">
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
                <button className="btn rounded-md bg-white text-black shadow-md shadow-purple-500 ml-3">
                  Book Now
                </button>
              </div>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Details;
