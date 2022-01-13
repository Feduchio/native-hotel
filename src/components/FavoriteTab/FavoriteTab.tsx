import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { View, Text, Button, StyleSheet, ImageBackground, ScrollView } from "react-native";
import moment from "moment";

import { clearFavorites, image, selectFavorites } from "../../redux/ducks/searchingHotels";
import HotelCard from "../HotelCard/HotelCard";

export const FavoriteTab = () => {
  const dispatch = useDispatch();
  const favorites = useSelector(selectFavorites);

  const FILTERS = { STARS: "stars", PRICE: "priceAvg" };
  const [sort, setSort] = useState({ name: "", direction: "" });

  const clearFav = () => {
    dispatch(clearFavorites());
  };
  const handleFilterClick = (filter: any) => {
    if (sort.direction === "ascend") {
      setSort({ name: filter, direction: "descend" });
    } else {
      setSort({ name: filter, direction: "ascend" });
    }
  };

  const favButtonTitle = 'Remove from fav'

  const sortedHotels = sort.name
    ? favorites.sort((a: { [x: string]: number; }, b: { [x: string]: number; }) => {
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
    <ImageBackground
      source={image}
      resizeMode="cover"
      style={styles.image}
      blurRadius={3}
    >
      <View style={styles.buttons}>
        <Button 
          title={"Clear"} 
          onPress={clearFav} />
        <Button 
          title='Рейтинг'
          onPress={() => handleFilterClick(FILTERS.STARS)}/>
        <Button 
          title='Цена'
          onPress={() => handleFilterClick(FILTERS.PRICE)}/>
      </View>

      <ScrollView>
      <View style={styles.favorites}>
        {favorites?.map(
          (item: {
            id: number;
            name: string;
            countOfDays: number;
            checkIn: string;
            stars: number;
            priceAvg: number;
          }) => (
            <HotelCard
              key={item.id}
              id={item.id}
              checkIn={
                moment(item.checkIn).locale("en-ca").format("YYYY, DD MMMM") ||
                moment().locale("en-ca").format("YYYY, DD MMMM")
              }
              countOfDays={item.countOfDays || 1}
              name={item.name}
              stars={item.stars}
              priceAvg={item.priceAvg}
              favButtonTitle={favButtonTitle}
            />
          )
        )}
      </View>
      </ScrollView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  buttons:{
    flexDirection: 'row',
    justifyContent: 'center',
    width: "100%",
    height: 45,
    backgroundColor: "white",
  },
  favorites: {
    alignItems: 'center',
  },
  image: {
    justifyContent: "flex-start",
    height: "100%",
    width: "100%",
  },
});