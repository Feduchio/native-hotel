import { useDispatch, useSelector } from "react-redux";

import { correctNumeral } from "../CorrectNumber/CorrectNumber";

import { View, Text, StyleSheet, Button } from "react-native";
import React from "react";
import {
  addFavoriteHotel,
  selectFavorites,
} from "../../redux/ducks/searchingHotels";

export const FavoriteCounter = () => {
  const dispatch = useDispatch();
  const countFavorites = useSelector(selectFavorites);
  const clear = () => {
    dispatch(addFavoriteHotel([]));
  };
  return (
    <View style={styles.container}>
      <Text style={styles.text}>
        В Избранном {countFavorites.length}{" "}
        {correctNumeral(countFavorites.length, {
          one: "отель",
          two: "отеля",
          plural: "отелей",
        })}
      </Text>
      <Button title={"Очистить"} onPress={clear} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: 80,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    fontWeight: "bold",
  },
});
