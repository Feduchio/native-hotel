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
