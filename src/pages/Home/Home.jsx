import Banner from "./Banner/Banner";
import SponsorLogo from "./SponsorLogo/SponsorLogo";
import About from "./About/About";
import Services from "./Services/Services";
import PremiumServices from "./PremiumServices/PremiumServices";
import PropertyType from "./PropertyType/PropertyType";
import OfferCard from "./OfferCard/OfferCard";
import Statistics from "./Statistics/Statistics";
import Contact from "./Contact/Contact";
import AOS from "aos";
import "aos/dist/aos.css";

const Home = () => {
  AOS.init();

  return (
    <>
      <Banner></Banner>

      <h3 className="font-DM text-xl xl:text-3xl pl-1 py-4">Sponsored by</h3>

      <SponsorLogo></SponsorLogo>
      <About></About>
      <Services></Services>
      <PremiumServices></PremiumServices>
      <Statistics></Statistics>
      <PropertyType></PropertyType>
      <OfferCard></OfferCard>
      <Contact></Contact>
    </>
  );
};

export default Home;
