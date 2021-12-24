import { useDispatch } from "react-redux";
import StarRatings from "react-star-ratings";

import { HeartOutlined } from "@ant-design/icons/lib/icons";
import { addFavoriteHotel } from "../../store/actions";
import { correctNumeral } from "../CorrectNumber/CorrectNumber";

import "./HotelCard.css";

export default function HotelCard({
  id,
  name,
  checkIn,
  countOfDays,
  stars,
  priceAvg,
}) {
  const dispatch = useDispatch();

  const favoriteClick = (e) => {
    dispatch(addFavoriteHotel(e));
  };

  return (
    <div className="hotels-card">
      <div className="hotels-card-body">
        <div>
          <div className="hotels-card-name">{name}</div>
          <div className="hotels-card-date">
            <div>{checkIn}</div>
            <div>
              {" "}
              - {countOfDays}{" "}
              {correctNumeral(countOfDays, {
                one: "день",
                two: "дня",
                plural: "дней",
              })}
            </div>
          </div>
          <StarRatings
            rating={stars}
            numberOfStars={5}
            starRatedColor="#CDBC1E"
            starDimension="17px"
            starSpacing="0"
          />
        </div>
      </div>
      <div className="hotels-card-price">
        Price: <div className="hotels-card-price-avg">{priceAvg.toFixed()}</div>
      </div>
      <HeartOutlined
        onClick={() =>
          favoriteClick({
            id,
            name,
            checkIn,
            countOfDays,
            stars,
            priceAvg,
          })
        }
        style={{ fontSize: "21px" }}
        className="hotels-card-favorite"
      />
    </div>
  );
}
