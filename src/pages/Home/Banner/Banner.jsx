import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import slide1 from "../../../assets/banner/slide1.png";
import slide2 from "../../../assets/banner/slide2.png";
import slide3 from "../../../assets/banner/slide3.png";

const Banner = () => {
  return (
    <Carousel autoPlay infiniteLoop interval={3000}>
      <div>
        <img src={slide1} alt="Slider Image" />
      </div>

      <div>
        <img src={slide2} alt="Slider Image" />
      </div>

      <div>
        <img src={slide3} alt="Slider Image" />
      </div>
    </Carousel>
  );
};

export default Banner;
