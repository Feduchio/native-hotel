import React, { useEffect, useState } from "react";
import {
  createStackNavigator,
} from "@react-navigation/stack";
import { useSelector } from "react-redux";

import { LoginScreen } from "../screens/LoginScreen";
import { StackParamList } from "./types";
import { MainScreen } from "../screens/MainScreen";
import { selectUserLogin } from "../redux/ducks/searchingHotels";

const Stack = createStackNavigator<StackParamList>();

export function NavigationStack() {
  const initLogin = useSelector(selectUserLogin)

  const [isLogin, setIsLogin] = useState(false);

  useEffect(() => {
    if(initLogin.length>3){
    setIsLogin(true)
    console.log(initLogin)}
    else{
      setIsLogin(false)
    }
  }, [initLogin]);

  return (
    <Stack.Navigator >
      {!isLogin ? (
        <Stack.Screen options={{ title:"Авторизация", cardStyle: {alignItems: 'center'}}} name="LoginScreen" component={LoginScreen} />
      ) : (
        <Stack.Screen options={{ title:"Simple Hotel"}} name="SearchScreen" component={MainScreen} />
      )}
    </Stack.Navigator>
  );
}
