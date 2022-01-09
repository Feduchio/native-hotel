import React, { useEffect, useState } from "react";
import {
  createStackNavigator,
  TransitionPresets,
} from "@react-navigation/stack";
import { connect } from "react-redux";
import { ImageBackground, Text, View } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { LoginScreen } from "../screens/LoginScreen";
import { StackParamList } from "./types";
import { SearchScreen } from "../screens/SearchScreen";

const Stack = createStackNavigator<StackParamList>();

export function NavigationStack() {
  const [isLogin, setIsLogin] = useState(false);
  const res = AsyncStorage.getItem("user");

  const getData = async () => {
    try {
      await res;
      console.log(res);
      if (res !== "") {
        //  setIsLogin(true)
        return res;
      }
      console.log(res);
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    getData();
  }, [res]);

  return (
    <Stack.Navigator>
      {!isLogin ? (
        <Stack.Screen name="LoginScreen" component={LoginScreen} />
      ) : (
        <Stack.Screen name="SearchScreen" component={SearchScreen} />
      )}
    </Stack.Navigator>
  );
}
