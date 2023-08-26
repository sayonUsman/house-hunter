import apartment from "../../../assets/houseType/apartment.jpg";
import evergreen from "../../../assets/houseType/evergreen.jpg";
import family from "../../../assets/houseType/family.jpg";
import penthouse from "../../../assets/houseType/penthouse.jpg";
import resthouse from "../../../assets/houseType/resthouse.jpg";
import villa from "../../../assets/houseType/villa.jpg";

const PropertyType = () => {
  return (
    <div className="container mx-auto mt-12 md:mt-16 lg:mt-20">
      <h1 className="font-DM text-xl sm:text-2xl lg:text-3xl text-center mb-3 lg:mb-4">
        What kind of Property You Want
      </h1>

      <div className="flex flex-wrap lg:-m-2">
        <div className="flex w-full lg:w-1/2 flex-wrap flex-col lg:flex-row">
          <div className="w-full lg:w-1/2 pt-2 lg:p-2">
            <img
              alt="Gallery"
              className="block h-full w-full object-cover object-center"
              src={evergreen}
            />
          </div>

          <div className="w-full lg:w-1/2 pt-2 lg:p-2">
            <img
              alt="gallery"
              className="block h-full w-full object-cover object-center"
              src={resthouse}
            />
          </div>

          <div className="w-full pt-2 lg:p-2">
            <img
              alt="gallery"
              className="block h-full w-full object-cover object-center"
              src={family}
            />
          </div>
        </div>

        <div className="flex w-full lg:w-1/2 flex-wrap flex-col lg:flex-row">
          <div className="w-full pt-2 lg:p-2">
            <img
              alt="gallery"
              className="block h-full w-full object-cover object-center"
              src={apartment}
            />
          </div>

          <div className="w-full lg:w-1/2 pt-2 lg:p-2">
            <img
              alt="gallery"
              className="block h-full w-full object-cover object-center"
              src={villa}
            />
          </div>

          <div className="w-full lg:w-1/2 pt-2 lg:p-2">
            <img
              alt="gallery"
              className="block h-full w-full object-cover object-center"
              src={penthouse}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyType;
