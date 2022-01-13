import React from "react";
import { StyleSheet, ImageBackground } from "react-native";

import { LoginForm } from "../components/LoginForm/LoginForm";
import { image } from "../redux/ducks/searchingHotels";

export const LoginScreen = () => {
  return (
    <ImageBackground source={image} resizeMode="cover" style={styles.image}>
      <LoginForm />
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  image: {
    justifyContent: "center",
    height: "100%",
    width: "100%",
  },
});
