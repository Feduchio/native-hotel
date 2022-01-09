import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";

import { Provider } from "react-redux";
import store from "./store/store";
import { NavigationStack } from "./src/navigator/NavigationStack";
import { NavigationContainer } from "@react-navigation/native";

export default function App() {
  return (
    <Provider store={store}>
      <View style={styles.container}>
        <NavigationContainer>
          <StatusBar style="auto" />
          <NavigationStack />
        </NavigationContainer>
      </View>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
  },
});
