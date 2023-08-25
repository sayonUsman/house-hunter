import video from "../../../assets/services-section-video.mp4";

const Services = () => {
  return (
    <div className="flex flex-col xl:flex-row-reverse glass mt-9">
      <div className="xl:w-1/2 text-justify px-3 xl:px-0 xl:pl-6 xl:pr-3 xl:my-auto">
        <h3 className="font-DM text-xl xl:text-3xl text-center pt-3 pb-1 xl:pt-0 xl:pb-3">
          What We Provide
        </h3>

        <p className="pb-3 xl:pb-0">
          We offer a variety of properties for sale and rent, such as villas,
          apartments, studios, offices, and shops. We have a team of experienced
          and professional agents who can help you find your ideal property in
          any location and budget. We also provide services such as valuation,
          marketing, legal advice, and property management.
        </p>
      </div>

      <div className="xl:w-1/2 mx-auto">
        <video autoPlay loop muted>
          <source src={video} type="video/mp4" />
        </video>
      </div>
    </div>
  );
};

export default Services;
