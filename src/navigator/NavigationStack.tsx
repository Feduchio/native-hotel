import React, { useEffect, useState } from 'react';
import { createStackNavigator, TransitionPresets } from '@react-navigation/stack';
import { connect } from 'react-redux';
import { ImageBackground, Text, View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { LoginScreen } from '../screens/LoginScreen';
// import { SearchScreen } from '../screens/searchScreen';
import { StackParamList } from './types';


const Stack = createStackNavigator<StackParamList>();


export function NavigationStack() { 

    const [ isLogin, setIsLogin] = useState(false)
    
    const getData = async () => {
        try {
          const res = await AsyncStorage.getItem('user')
          console.log(res)
          if (res !== ''){
              return res
          }
          console.log(res)
    
        } catch(e) {
          console.error(e)
        }
      }

    useEffect(() => {  
        getData()
    }, [])

    return(
        <View>
        {!getData ? <Text> heh </Text> : (<LoginScreen />) }
        </View>
         
    )
}