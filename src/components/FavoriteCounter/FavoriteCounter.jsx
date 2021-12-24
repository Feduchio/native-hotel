import { useSelector } from "react-redux";

import { correctNumeral } from "../CorrectNumber/CorrectNumber";
import { selectFavorites } from "../../store/selectors";

import "./FavoriteCounter.css";

export const FavoriteCounter = () => {
  const countFavorites = useSelector(selectFavorites);
  return (
    <div className="favorite-counter">
      Добавленно в Избранное: {countFavorites.length}{" "}
      {correctNumeral(countFavorites.length, {
        one: "отель",
        two: "отеля",
        plural: "отелей",
      })}
    </div>
  );
};
