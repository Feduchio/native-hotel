import React from "react";
import { View, StyleSheet, ImageBackground } from "react-native";

import { LoginForm } from "../components/LoginForm/LoginForm";

const image = { uri: "https://images.unsplash.com/photo-1589876876491-df78ff60e196?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=764&q=80" };

export const LoginScreen = () => {
  return (
    <ImageBackground source={image} resizeMode="cover" style={styles.image}>
      <LoginForm />
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  image: {
    justifyContent: "flex-start",
    height: '100%',
    width: '100%'
  },
})
