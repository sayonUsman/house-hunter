import Banner from "./Banner/Banner";
import OfferCard from "./OfferCard/OfferCard";
import SponsorLogo from "./SponsorLogo/SponsorLogo";

const Home = () => {
  return (
    <>
      <Banner></Banner>

      <h3 className="font-DM text-xl xl:text-3xl pl-1 py-4">Sponsored by</h3>

      <SponsorLogo></SponsorLogo>

      <OfferCard></OfferCard>
    </>
  );
};

export default Home;
