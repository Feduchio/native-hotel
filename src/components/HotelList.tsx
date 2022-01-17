import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import moment from "moment";
import { View } from "react-native";

import {
  getHotelsList,
  selectHotels,
  selectValueSearch,
} from "../redux/ducks/searchingHotels";
import HotelCard from "./HotelCard";



export default function HotelList( {navigation}: any) {
  const dispatch = useDispatch();
  const hotels = useSelector(selectHotels);
  const valueSearch = useSelector(selectValueSearch);
  const favButtonTitle = "Add to favorites";

  useEffect(() => {
    dispatch(
      getHotelsList({
        location: "moscow",
        checkIn: moment().format("YYYY-MM-DD"),
        countOfDays: 1,
      })
    );
  }, [dispatch]);

  return (
    <View>
      {hotels.data?.map((item) => (
        <HotelCard
          navigation={navigation}
          key={item.hotelId}
          id={item.hotelId}
          checkIn={
            moment(valueSearch?.checkIn)
              .locale("en-ca")
              .format("YYYY, DD MMMM") ||
            moment().locale("en-ca").format("YYYY, DD MMMM")
          }
          countOfDays={valueSearch?.countOfDays || 1}
          name={item.hotelName}
          stars={item.stars}
          priceAvg={item.priceAvg}
          favButtonTitle={favButtonTitle}
          
        />
      ))}
    </View>
  );
}
