import About from "./About/About";
import Banner from "./Banner/Banner";
import OfferCard from "./OfferCard/OfferCard";
import PremiumServices from "./PremiumServices/PremiumServices";
import Services from "./Services/Services";
import SponsorLogo from "./SponsorLogo/SponsorLogo";

const Home = () => {
  return (
    <>
      <Banner></Banner>

      <h3 className="font-DM text-xl xl:text-3xl pl-1 py-4">Sponsored by</h3>

      <SponsorLogo></SponsorLogo>
      <About></About>
      <Services></Services>
      <PremiumServices></PremiumServices>
      <OfferCard></OfferCard>
    </>
  );
};

export default Home;
