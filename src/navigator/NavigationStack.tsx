import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import { StackParamList } from "./types";
import { HotelScreen } from "../screens/HotelScreen";
import { SearchTab } from "../components/SearchTab";

const Stack = createStackNavigator<StackParamList>();

export function NavigationStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="SearchScreen" component={SearchTab} />
      <Stack.Screen name="HotelScreen" component={HotelScreen} />
    </Stack.Navigator>
  );
}
