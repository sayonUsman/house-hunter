import img from "../../../assets/about-section-img.jpg";

const About = () => {
  return (
    <div
      className="flex flex-col xl:flex-row glass mt-12 md:mt-16 xl:mt-20"
      data-aos="fade-up"
      data-aos-duration="2000"
      data-aos-easing="ease-in-out"
    >
      <div className="xl:w-1/2 text-justify px-3 xl:px-0 xl:pl-2 xl:pr-7 xl:my-auto">
        <h3 className="font-DM text-xl xl:text-3xl text-center pt-3 pb-1 xl:pt-0 xl:pb-3">
          Who We Are
        </h3>

        <p>
          We are a real estate company. We started as a small real estate agency
          in 2015 with only a few properties and agents. We wanted to provide a
          simple and convenient way for people to find their dream homes.
        </p>

        <p>
          Our mission is to become the leading real estate company by offering a
          wide range of properties for sale and rent, as well as high-quality
          services such as valuation, marketing, legal advice, and property
          management. We aim to satisfy the needs and expectations of our
          clients, and to help them achieve their real estate goals.
        </p>

        <p className="pb-3 xl:pb-0">
          Today, We have over 10,000 properties and 500 agents. We have also
          received many awards and recognitions for our excellence and
          innovation in the real estate industry. We look forward to growing
          more in the future.
        </p>
      </div>

      <div className="xl:w-1/2 mx-auto">
        <img src={img} alt="A Image" />
      </div>
    </div>
  );
};

export default About;
