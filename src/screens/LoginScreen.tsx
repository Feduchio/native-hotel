import React from "react";
import { StyleSheet, View } from "react-native";

import { LoginForm } from "../components/LoginForm";

export const LoginScreen = () => {
  return (
    <View style={styles.container}>
      <LoginForm />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    height: "100%",
    width: "100%",
  },
});
