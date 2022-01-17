import React from "react";
import { Image, View, Text, StyleSheet } from "react-native";
import { useDispatch } from "react-redux";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { AntDesign } from "@expo/vector-icons";

import { FavoriteTab } from "../components/FavoriteTab";
import { setUser } from "../redux/ducks/searchingHotels";
import { TouchableOpacity } from "react-native-gesture-handler";
import { NavigationStack } from "../navigator/NavigationStack";

const Tab = createBottomTabNavigator();

export const MainScreen = () => {
  const dispatch = useDispatch();
  const unlog = () => {
    dispatch(setUser(""));
  };

  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Search"
        component={NavigationStack}
        options={{
          headerLeft: () => (
            <TouchableOpacity
              style={{ padding: 7, ...styles.container }}
              onPress={unlog}
            >
              <AntDesign name="logout" size={24} color="black" />
            </TouchableOpacity>
          ),
          tabBarIcon: ({ focused }) => (
            <View style={{ top: 7, ...styles.container }}>
              <Image
                source={require("../../assets/Icons/search.png")}
                resizeMode="contain"
                style={{
                  tintColor: focused ? "#e32f45" : "#748c94",
                  ...styles.image,
                }}
              />
              <Text style={{ color: focused ? "#e32f45" : "#748c94" }}>
                Search
              </Text>
            </View>
          ),
          title: "",
          headerTitle: "Simple Hotel",
        }}
      />
      <Tab.Screen
        name="Favorites"
        component={FavoriteTab}
        options={{
          headerLeft: () => (
            <TouchableOpacity
              style={{ padding: 7, ...styles.container }}
              onPress={unlog}
            >
              <AntDesign name="logout" size={24} color="black" />
            </TouchableOpacity>
          ),
          tabBarIcon: ({ focused }) => (
            <View style={{ top: 7, ...styles.container }}>
              <Image
                source={require("../../assets/Icons/favourite.png")}
                resizeMode="contain"
                style={{
                  tintColor: focused ? "#e32f45" : "#748c94",
                  ...styles.image,
                }}
              />
              <Text style={{ color: focused ? "#e32f45" : "#748c94" }}>
                Favorites
              </Text>
            </View>
          ),
          title: "",
          headerTitle: "Favorites",
        }}
      />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    width: 20,
    height: 20,
  },
});
