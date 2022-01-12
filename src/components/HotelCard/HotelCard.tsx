import { useDispatch, useSelector } from "react-redux";

// import { HeartOutlined } from "@ant-design/icons/lib/icons";
// import { addFavoriteHotel } from "../../store/actions";
import { correctNumeral } from "../CorrectNumber/CorrectNumber";

import { Text, View, StyleSheet, TouchableOpacity } from "react-native";
import {
  addFavoriteHotel,
  selectFavorites,
} from "../../redux/ducks/searchingHotels";
import { AddFavoriteHotelActionPayload } from "../../redux/ducks/searchingHotelsTypes";
import React from "react";
import { Rating } from "react-native-ratings";

export default function HotelCard({
  id,
  name,
  checkIn,
  countOfDays,
  stars,
  priceAvg,
}) {
  const dispatch = useDispatch();
  const fav = useSelector(selectFavorites);

  const favoriteClick = (e: AddFavoriteHotelActionPayload) => {
    dispatch(addFavoriteHotel(e));
    console.log("fav", fav);
  };

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={() =>
        favoriteClick({
          id,
          name,
          checkIn,
          countOfDays,
          stars,
          priceAvg,
        })
      }
    >
      <View style={styles.container}>
        <View style={styles.card}>
          <View>
            <Text style={styles.name}>{name}</Text>
          </View>
          <View>
            <Text style={styles.date}>
              {checkIn} - {countOfDays}{" "}
              {correctNumeral(countOfDays, {
                one: "день",
                two: "дня",
                plural: "дней",
              })}
            </Text>
          </View>
        </View>
        <View style={styles.price}>
          <View>
            <Rating
              ratingCount={5}
              readonly={true}
              startingValue={stars}
              imageSize={15}
            />
          </View>
          <Text>
            Price: <Text>{priceAvg.toFixed()}</Text>
          </Text>
        </View>
        {/* <HeartOutlined
        onClick={() =>
          
        }
        style={{ fontSize: "21px" }}
        className="hotels-card-favorite"
      /> */}
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "space-between",
    flexDirection: "row",
    width: 380,
    height: 60,
    borderRadius: 10,
    backgroundColor: "white",
    marginVertical: 4,
    opacity: 0.95,
  },
  card: {
    marginHorizontal: 14,
    maxWidth: "60%",
    maxHeight: "100%",
  },
  price: {
    marginHorizontal: 14,
    alignItems: "flex-end",
  },
  name: {
    fontWeight: "bold",
    marginBottom: 5,
  },
  date: {
    fontWeight: "300",
  },
});

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
