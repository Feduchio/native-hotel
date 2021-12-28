import React from "react";
import { View, StyleSheet } from "react-native";

import { LoginForm } from "../components/LoginForm/LoginForm";

export const LoginScreen = () => {
  return (
    <>
      <View style={styles.LoginScreen} />
      <LoginForm />
    </>
  );
};

const styles = StyleSheet.create({
  LoginScreen: {
    position: "absolute",
    width: "100%",
    height: "100%",
  },
});
