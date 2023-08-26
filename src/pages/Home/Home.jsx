import Banner from "./Banner/Banner";
import SponsorLogo from "./SponsorLogo/SponsorLogo";
import About from "./About/About";
import Services from "./Services/Services";
import PremiumServices from "./PremiumServices/PremiumServices";
import PropertyType from "./HouseType/HouseType";
import OfferCard from "./OfferCard/OfferCard";

const Home = () => {
  return (
    <>
      <Banner></Banner>

      <h3 className="font-DM text-xl xl:text-3xl pl-1 py-4">Sponsored by</h3>

      <SponsorLogo></SponsorLogo>
      <About></About>
      <Services></Services>
      <PremiumServices></PremiumServices>
      <PropertyType></PropertyType>
      <OfferCard></OfferCard>
    </>
  );
};

export default Home;
