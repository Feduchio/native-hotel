import { useDispatch } from "react-redux";
// import StarRatings from "react-star-ratings";

// import { HeartOutlined } from "@ant-design/icons/lib/icons";
// import { addFavoriteHotel } from "../../store/actions";
import { correctNumeral } from "../CorrectNumber/CorrectNumber";

import { Text, View } from "react-native";

export default function HotelCard({
  id,
  name,
  checkIn,
  countOfDays,
  stars,
  priceAvg,
}) {
  const dispatch = useDispatch();

  // const favoriteClick = (e) => {
  //   dispatch(addFavoriteHotel(e));
  // };

  return (
    <View>
      <View>
        <Text>{name}</Text>
        <View>
          <Text>{checkIn}</Text>
          <Text>
            {" "}
            - {countOfDays}{" "}
            {correctNumeral(countOfDays, {
              one: "день",
              two: "дня",
              plural: "дней",
            })}
          </Text>
        </View>
        {/* <StarRatings
            rating={stars}
            numberOfStars={5}
            starRatedColor="#CDBC1E"
            starDimension="17px"
            starSpacing="0"
          /> */}
      </View>
      <Text>
        Price: <Text>{priceAvg.toFixed()}</Text>
      </Text>
      {/* <HeartOutlined
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
      /> */}
    </View>
  );
}

// .hotels-card {
//   position: relative;
//   display: flex;
//   justify-content: space-between;
//   width: 99%;
//   margin: 20px 0;
// }

// .hotel-list {
//   height: 60%;
// }

// .hotels-card-body {
//   display: flex;
//   align-items: center;
// }

// .hotels-card-line {
//   background: rgba(135 135 135 20%);
// }

// .hotels-card-favorite {
//   position: absolute;
//   right: 15px;
// }

// .hotels-card-price {
//   position: absolute;
//   right: 35px;
//   bottom: 0;
//   display: flex;
//   align-items: flex-end;
//   justify-content: space-between;
//   width: 13%;
//   color: #878787;
//   font-weight: 300;
//   font-size: 11px;
// }

// .hotels-card-price-avg {
//   color: #424242;
//   font-weight: 400;
//   font-size: 17px;
// }

// .hotels-card-name {
//   color: #424242;
//   font-weight: 300;
//   font-size: 17px;
//   font-style: normal;
//   line-height: 22px;
//   letter-spacing: -0.408px;
// }

// .hotels-card-date {
//   display: flex;
//   justify-content: space-between;
//   width: 180px;
//   margin-top: -2px;
//   margin-bottom: 3px;
//   color: #878787;
// }
