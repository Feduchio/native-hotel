import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";

import { Provider } from "react-redux";
import store from "./src/redux/store";
import { NavigationStack } from "./src/navigator/NavigationStack";
import { NavigationContainer } from "@react-navigation/native";
import React from "react";

export default function App() {
  return (
    <Provider store={store}>
      <View style={styles.container}>
        <NavigationContainer>
          <NavigationStack />
        </NavigationContainer>
      </View>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "red",
    width: "100%",
    height: "100%",
  },
});
