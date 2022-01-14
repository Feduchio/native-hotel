import React from "react";
import { Provider } from "react-redux";
import { NavigationContainer } from "@react-navigation/native";

import store from "./src/redux/store";
import { NavigationStack } from "./src/navigator/NavigationStack";
import { ScreenReducer } from "./src/screens/ScreenReducer";

export default function App() {
  return(
    <Provider store={store}>
        <NavigationContainer>
          <ScreenReducer />
        </NavigationContainer>
    </Provider>
  )}


