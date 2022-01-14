import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import { selectUserLogin } from "../redux/ducks/searchingHotels";
import { LoginScreen } from "./LoginScreen";
import { MainScreen } from "./MainScreen";

export const ScreenReducer = () => {
  
    const initLogin = useSelector(selectUserLogin);
    const [isLogin, setIsLogin] = useState(false);
  
    useEffect(() => {
      if (initLogin.length > 3) {
        setIsLogin(true);
      } else {
        setIsLogin(false);
      }
    }, [initLogin]);
return (
    <>
      {!isLogin ? (
        < LoginScreen />
      ) : (
        <MainScreen />
      )}
    </>
  );
}