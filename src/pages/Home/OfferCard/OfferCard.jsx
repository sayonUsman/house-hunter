const OfferCard = () => {
  return (
    <div
      className="hero bg-fixed mt-7 sm:mt-12"
      style={{
        backgroundImage:
          "url(https://img.freepik.com/free-psd/modern-farmhouse-meadow-hill-generative-ai_587448-2232.jpg?w=1380&t=st=1692643118~exp=1692643718~hmac=bafdeeb3530858b0335504303671bdc1f5987979925852e1a6e794cd38bb4f67)",
      }}
    >
      <div className="hero-overlay bg-opacity-40"></div>
      <div className="hero-content text-center">
        <h1 className="text-3xl md:text-4xl lg:text-5xl xl:text-7xl font-DM font-bold py-96">
          Get 10% Off from Your First Booking
        </h1>
      </div>
    </div>
  );
};

export default OfferCard;
