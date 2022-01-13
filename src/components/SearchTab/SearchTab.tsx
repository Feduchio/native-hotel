import React from "react";
import { View, StyleSheet, ImageBackground, ScrollView } from "react-native";

import { SearchBlock } from "../SearchBlock/SearchBlock";
import HotelList from "../HotelList/HotelList";
import { image } from "../../redux/ducks/searchingHotels";

export const SearchTab = () => {
  return (
    <ImageBackground
      source={image}
      resizeMode="cover"
      style={styles.image}
      blurRadius={3}
    >
      <View style={styles.searchScreen}>
        <SearchBlock />

        <ScrollView>
          <HotelList />
        </ScrollView>

      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  searchScreen: {
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    justifyContent: "flex-start",
    height: "100%",
    width: "100%",
  },
});
