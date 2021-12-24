import { useState } from "react";
import { useSelector } from "react-redux";
import Scrollbars from "react-custom-scrollbars/lib/Scrollbars";

import HotelCard from "../HotelCard/HotelCard";
import { selectFavorites } from "../../store/selectors";
import "./FavoriteBlock.css";

const FILTERS = { STARS: "stars", PRICE: "priceAvg" };

export const FavoriteBlock = () => {
  const favorites = useSelector(selectFavorites);
  const [sort, setSort] = useState({ name: "", direction: "" });

  const handleFilterClick = (filter) => {
    if (sort.direction === "ascend") {
      setSort({ name: filter, direction: "descend" });
    } else {
      setSort({ name: filter, direction: "ascend" });
    }
  };

  const sortedHotels = sort.name
    ? favorites.sort((a, b) => {
        const sortKey = sort.name;
        if (sort.direction === "ascend") {
          return a[sortKey] - b[sortKey];
        }
        if (sort.direction === "descend") {
          return b[sortKey] - a[sortKey];
        } else {
          return 0;
        }
      })
    : favorites;

  return (
    <div className="favorite-block">
      <div className="favorite-block-container">
        <h2 className="favorite-block-container-title">Избранное</h2>
        <button
          className="favorite-block-container-button"
          onClick={() => handleFilterClick(FILTERS.STARS)}
        >
          Рейтинг
        </button>
        <button
          className="favorite-block-container-button"
          onClick={() => handleFilterClick(FILTERS.PRICE)}
        >
          Цена
        </button>
        <Scrollbars>
          {sortedHotels.map((favorites, index) => (
            <>
              <HotelCard
                checkIn={favorites.checkIn}
                countOfDays={favorites.countOfDays}
                key={favorites.id}
                id={favorites.id}
                name={favorites.name}
                stars={favorites.stars}
                priceAvg={favorites.priceAvg}
              />
              {sortedHotels.length - 1 !== index && <div className="divider" />}
            </>
          ))}
        </Scrollbars>
      </div>
    </div>
  );
};
