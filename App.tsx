import React from "react";
import { Provider } from "react-redux";
import { StyleSheet, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";

import store from "./src/redux/store";
import { NavigationStack } from "./src/navigator/NavigationStack";

export default function App() {
  return(
    <Provider store={store}>
      <View style={styles.container}>
        <NavigationContainer>
          <NavigationStack />
        </NavigationContainer>
      </View>
    </Provider>
  )}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "red",
    width: "100%",
    height: "100%",
  },
});
