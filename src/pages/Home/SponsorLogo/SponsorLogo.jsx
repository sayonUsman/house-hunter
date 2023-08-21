import Marquee from "react-fast-marquee";
import logo1 from "../../../assets/sponsorLogo/logo1.png";
import logo2 from "../../../assets/sponsorLogo/logo2.png";
import logo3 from "../../../assets/sponsorLogo/logo3.png";
import logo4 from "../../../assets/sponsorLogo/logo4.png";
import logo5 from "../../../assets/sponsorLogo/logo5.png";
import logo6 from "../../../assets/sponsorLogo/logo6.png";
import logo7 from "../../../assets/sponsorLogo/logo7.png";
import LogoCard from "./LogoCard/LogoCard";

const logos = [logo1, logo2, logo3, logo4, logo5, logo6, logo7];

const SponsorLogo = () => {
  return (
    <Marquee pauseOnHover>
      {logos.map((logo) => (
        <LogoCard key={logos.indexOf(logo)} logo={logo}></LogoCard>
      ))}
    </Marquee>
  );
};

export default SponsorLogo;
