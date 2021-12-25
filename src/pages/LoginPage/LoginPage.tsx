import React from "react";
import { View, StyleSheet } from "react-native";

import { LoginForm } from "../../components/LoginForm/LoginForm";

export const LoginPage = () => {
  return (
    <>
      <View style={styles.loginPage} />
      <LoginForm />
    </>
  );
};

const styles = StyleSheet.create({
  loginPage: {
    position: "absolute",
    width: "100%",
    height: "100%",
    // backgroundRepeat: 'no-repeat',
    // background-image: url("../../assets/images/background_img.svg");
    // filter: blur(10px);
  },
});
