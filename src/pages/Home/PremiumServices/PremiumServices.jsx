import video from "../../../assets/premium-services-video.mp4";
import { IconContext } from "react-icons";
import { BiSupport } from "react-icons/Bi";
import { RxUpdate } from "react-icons/Rx";
import { PiTreeEvergreenDuotone } from "react-icons/Pi";
import { MdOutlineSecurity } from "react-icons/Md";

const PremiumServices = () => {
  return (
    <div className="flex flex-col xl:flex-row glass">
      <div className="xl:w-1/2 grid grid-cols-2 sm:px-7 py-3 xl:py-6">
        <div className="hero-content">
          <IconContext.Provider value={{ size: "45px" }}>
            <BiSupport></BiSupport>
          </IconContext.Provider>

          <p className="text-xl font-semibold">Premium Support</p>
        </div>

        <div className="hero-content">
          <IconContext.Provider value={{ size: "45px" }}>
            <RxUpdate></RxUpdate>
          </IconContext.Provider>

          <p className="text-xl font-semibold">Update Anytime</p>
        </div>

        <div className="hero-content">
          <IconContext.Provider value={{ size: "45px" }}>
            <PiTreeEvergreenDuotone></PiTreeEvergreenDuotone>
          </IconContext.Provider>

          <p className="text-xl font-semibold">Green Environment</p>
        </div>

        <div className="hero-content">
          <IconContext.Provider value={{ size: "45px" }}>
            <MdOutlineSecurity></MdOutlineSecurity>
          </IconContext.Provider>

          <p className="text-xl font-semibold">Best Security</p>
        </div>
      </div>

      <div className="xl:w-1/2 mx-auto">
        <video autoPlay loop muted>
          <source src={video} type="video/mp4" />
        </video>
      </div>
    </div>
  );
};

export default PremiumServices;
