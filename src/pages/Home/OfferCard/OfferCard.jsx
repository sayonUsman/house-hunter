import { Link } from "react-router-dom";

const OfferCard = () => {
  return (
    <div
      className="hero bg-fixed mt-16 lg:mt-20"
      style={{
        backgroundImage:
          "url(https://img.freepik.com/free-psd/modern-farmhouse-meadow-hill-generative-ai_587448-2232.jpg?w=1380&t=st=1692643118~exp=1692643718~hmac=bafdeeb3530858b0335504303671bdc1f5987979925852e1a6e794cd38bb4f67)",
      }}
    >
      <div className="hero-overlay bg-opacity-40"></div>
      <div className="hero-content text-center">
        <div className="py-96">
          <h1 className="text-3xl md:text-4xl lg:text-5xl xl:text-7xl font-DM font-bold">
            Get 10% Off from Your First Booking
          </h1>

          <Link
            to="/houses"
            className="btn rounded-sm font-DM bg-white text-black hover:text-white border-none mt-4 xl:mt-5"
          >
            Book Now
          </Link>
        </div>
      </div>
    </div>
  );
};

export default OfferCard;
