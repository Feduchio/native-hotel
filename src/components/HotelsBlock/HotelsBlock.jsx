import { useSelector } from "react-redux";
import moment from "moment";
import "moment/locale/ru";

import { FavoriteCounter } from "../FavoriteCounter/FavoriteCounter";
import HotelList from "../HotelList/HotelList";
import { ImageCarousel } from "../ImageCarousel/ImageCarousel";
import { selectValueSearch } from "../../store/selectors";

import "./HotelsBlock.css";

export const HotelsBlock = () => {
  const valueSearch = useSelector(selectValueSearch);

  return (
    <div className="hotels-block">
      <div className="hotels-block-container">
        <h2 className="hotels-block-container-title">
          Отели{" "}
          <span className="hotels-block-container-title-pointer">{">"}</span>{" "}
          {valueSearch.location ? valueSearch.location : "Москва"}
        </h2>
        <div className="hotels-block-container-date">
          {moment(valueSearch?.checkIn).locale("ru").format("DD MMMM YYYY") ||
            moment().locale("ru").format("DD MMMM YYYY")}
        </div>
        <ImageCarousel />
        <FavoriteCounter />
        <HotelList />
      </div>
    </div>
  );
};

// .hotels-block {
//   grid-area: C;
//   height: 300px;
//   margin: 20px;
// }

// .hotels-block-container {
//   position: relative;
//   width: 80vh;
//   min-width: 664px;
//   height: 80vh;
//   padding: 32px;
//   background-color: #fff;
//   border-radius: 8px;
// }

// .hotels-block-container-title {
//   color: #424242;
//   font-weight: 500;
//   font-size: 32px;
//   line-height: 37px;
// }

// .hotels-block-container-title-pointer {
//   color: #878787;
// }

// .hotels-block-container-date {
//   position: absolute;
//   top: 32px;
//   right: 32px;
//   color: #41522e;
//   font-size: 24px;
//   line-height: 28px;
// }
