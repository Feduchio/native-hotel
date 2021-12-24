import Carousel from "react-elastic-carousel";

import carouselImg from "../../assets/images/carouselImg.jpg";

import "./ImageCarousel.css";

export const ImageCarousel = () => {
  return (
    <div className="image-carousel">
      <Carousel itemsToShow={3} showArrows={false} pagination={false}>
        {[...Array(5)].map((index) => (
          <img
            className="image-carousel-item"
            src={carouselImg}
            key={index}
            alt="carousel"
          />
        ))}
      </Carousel>
    </div>
  );
};
