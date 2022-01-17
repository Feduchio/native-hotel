import React from "react";
import { View, StyleSheet, ImageBackground, ScrollView } from "react-native";

import { SearchBlock } from "./SearchBlock";
import HotelList from "./HotelList";
import { image } from "../redux/ducks/searchingHotels";

export const SearchTab = ({ navigation }: any) => {
  return (
    <ImageBackground
      source={image}
      resizeMode="cover"
      style={styles.image}
      blurRadius={3}
    >
      <View style={styles.searchScreen}>
        <SearchBlock />

        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.container}>
            <HotelList navigation={navigation} />
          </View>
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
  container: {
    paddingBottom: "10%",
  },
  image: {
    justifyContent: "flex-start",
    height: "100%",
    width: "100%",
  },
});
