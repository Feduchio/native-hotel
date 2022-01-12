import { View, StyleSheet, ImageBackground } from "react-native";
import React from "react";
import { SearchBlock } from "../SearchBlock/SearchBlock";
import HotelList from "../HotelList/HotelList";

const image = {
  uri: "https://images.unsplash.com/photo-1589876876491-df78ff60e196?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=764&q=80",
};

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
        <HotelList />
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
