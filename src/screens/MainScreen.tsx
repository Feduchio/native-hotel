import React from "react";
import { SearchTab } from "../components/SearchTab/SearchTab";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { FavoriteTab } from "../components/FavoriteTab/FavoriteTab";
import { Button } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { selectUserLogin, setUser } from "../redux/ducks/searchingHotels";

const Tab = createBottomTabNavigator();

export const MainScreen = () => {

  const dispatch = useDispatch();
  const unlog = () => {
    dispatch(setUser(""));
  };

  return (

      <Tab.Navigator >
        <Tab.Screen name="Search" component={SearchTab} 
        options={{
          headerLeft: () => (
            <Button
              onPress={unlog}
              title="Unlog"
            />
          ),
        }} />
        <Tab.Screen name="Favorite" component={FavoriteTab} 
                options={{
                  headerLeft: () => (
                    <Button
                      onPress={unlog}
                      title="Unlog"
                    />
                  ),
                }} />
      </Tab.Navigator>

  );
}
