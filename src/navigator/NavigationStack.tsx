import React, { useEffect, useState } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { useSelector } from "react-redux";

import { LoginScreen } from "../screens/LoginScreen";
import { StackParamList } from "./types";
import { MainScreen } from "../screens/MainScreen";
import { selectUserLogin } from "../redux/ducks/searchingHotels";
import { HotelScreen } from "../components/HotelScreen";
import { SearchTab } from "../components/SearchTab/SearchTab";

const Stack = createStackNavigator<StackParamList>();

export function NavigationStack() {

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
        <Stack.Screen
          name="SearchScreen"
          component={SearchTab}
        />
        <Stack.Screen
          name="HotelScreen"
          component={HotelScreen}
        />
    </Stack.Navigator>
  );
}
