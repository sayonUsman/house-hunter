const Statistics = () => {
  return (
    <>
      <h1 className="font-DM text-xl sm:text-2xl lg:text-3xl text-center mt-9 mb-3 lg:mb-4">
        Statistics
      </h1>

      <div className="bg-[#4c545c] grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-5 py-7 sm:py-9">
        <div className="text-center">
          <p className="font-DM text-3xl 2xl:text-5xl">
            27 <span className="text-sm">years</span>+
          </p>
          <p className="text-lg md:text-xl">Experiences</p>
        </div>

        <div className="text-center">
          <p className="font-DM text-3xl 2xl:text-5xl">3999+</p>
          <p className="text-lg md:text-xl">Available Properties</p>
        </div>

        <div className="text-center">
          <p className="font-DM text-3xl 2xl:text-5xl">625+</p>
          <p className="text-lg md:text-xl">Guaranteed Agents</p>
        </div>

        <div className="text-center">
          <p className="font-DM text-3xl 2xl:text-5xl">7K+</p>
          <p className="text-lg md:text-xl">Happy Clients</p>
        </div>

        <div className="text-center">
          <p className="font-DM text-3xl 2xl:text-5xl">127</p>
          <p className="text-lg md:text-xl">Winning Awards</p>
        </div>
      </div>
    </>
  );
};

export default Statistics;
