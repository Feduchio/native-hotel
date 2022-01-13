import React from "react";
import { Button, Image, View, Text, StyleSheet} from "react-native";
import { useDispatch } from "react-redux";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import { SearchTab } from "../components/SearchTab/SearchTab";
import { FavoriteTab } from "../components/FavoriteTab/FavoriteTab";
import { setUser } from "../redux/ducks/searchingHotels";

const Tab = createBottomTabNavigator();

export const MainScreen = () => {
  const dispatch = useDispatch();
  const unlog = () => {
    dispatch(setUser(""));
  };

  return (
    <Tab.Navigator >
      <Tab.Screen
        name="Search"
        component={SearchTab}
        options={{
          headerLeft: () => <Button onPress={unlog} title="Unlog"/>,
          tabBarIcon: ({focused}) => (
            <View style={styles.container}>
              <Image 
              source={require('../../assets/Icons/search.png')} 
              resizeMode="contain"
              style={{ tintColor: focused ? "#e32f45" : '#748c94', ...styles.image}}/>
              <Text style={{ color: focused ? "#e32f45" : '#748c94'}}>Search</Text>
            </View>
          ),
          title: '',
          headerTitle: 'Search'
        }}
      />
      <Tab.Screen
        name='Favorites'
        component={FavoriteTab}
        options={{
          headerLeft: () => <Button onPress={unlog} title="Unlog" />,
          tabBarIcon: ({focused}) => (
            <View style={styles.container}>
              <Image 
              source={require('../../assets/Icons/favourite.png')} 
              resizeMode="contain"
              style={{ tintColor: focused ? "#e32f45" : '#748c94', ...styles.image}}/>
              <Text style={{ color: focused ? "#e32f45" : '#748c94'}}>Favorites</Text>
            </View>
          ),
          title: '',
          headerTitle: 'Favorites'
        }}
      />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  container:{
    alignItems:'center', 
    justifyContent: 'center', 
    top: 7
  },
  image: {
    width: 20, 
    height: 20, 
  },
})
