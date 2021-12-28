import React, { useState, useEffect } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { StackNavigationProp } from '@react-navigation/stack';

import { Formik } from "formik";
import {
  Text,
  View,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Keyboard,
  TouchableWithoutFeedback,
} from "react-native";


// type Props = {
//   navigation: StackNavigationProp<StackParamList, 'CalendarScreen'>;
// }

export const LoginForm = (  ) => {

  const [loginDirty, setLoginDirty] = useState(false);
  const [passwordDirty, setPasswordDirty] = useState(false);
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("Логин не может быть пустым");
  const [passwordError, setPasswordError] = useState("Пароль не может быть пустым");
  const [formValid, setFormValid] = useState(false);

  const passMark = 'password'
  const logMark = 'login'

  const storeData = async (key: string, value: string) => {
    try {
      await AsyncStorage.setItem(key, value)
    } catch (e) {
      console.error(e)
    }
  }

  const formSubmitHandle = () => {
      storeData("user", login);
      // getData()
  }

  // const getData = async () => {
  //   try {
  //     const result = await AsyncStorage.getItem('user')
  //     console.log(result)

  //   } catch(e) {
  //     console.error(e)
  //   }
  // }


  return (      

  <TouchableWithoutFeedback
    style={styles.loginForm}
    activeOpacity={1}
    onPress={Keyboard.dismiss}
  >
    <Formik
      initialValues={{ login: login, password: password }}
      onSubmit={formSubmitHandle}
    >
      {(formikProps) => {
        const {  handleSubmit, handleChange, values } = formikProps;

        const loginHandler = (value: string) => {

          setLogin(value);
          const re = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
          if (!re.test(String(value).toLowerCase())) {
            setLoginError("Некорректный логин");
            return;
          }
          if (!value) {
            setLoginError("Логин не может быть пустым");
          } else {
            setLoginError("");
          }
        };
      
        const passwordHandler = (value: string) => {

          setPassword(value);
          const re = /[a-zA-Z0-9]+/;
          if (value.length < 8 || !re.test(String(value))) {
            setPasswordError("Некорректный пароль");
            return;
          }
          if (!value) {
            setPasswordError("Пароль не может быть пустым");
          } else {
            setPasswordError("");
          }
        };
      
        const blurHandler = (name: string) => {
          switch (name) {
            case 'login':
              setLoginDirty(true);
              break;
            case 'password':
              setPasswordDirty(true);
              break;
            default:
              break;
          }
        };

        useEffect(() => {
          if (loginError || passwordError) {
            setFormValid(false);
          } else {
            setFormValid(true);
          }
        }, [loginError, passwordError]);
      
        const onChange = (value: string, type: string) => {
          handleChange(type)(value);
          if (type === 'login') { loginHandler(value); } else (passwordHandler(value));
        };

        return (
          <View >

            <Text style={styles.loginFormTitle}> Simple Hotel Check </Text>

            <Text style={styles.loginFormLabel}> Логин </Text>
            <TextInput
              style={styles.loginFormInput}
              value={values.login}
              onChangeText={(value) => onChange(value, 'login')}
              onBlur={() => blurHandler(logMark)}
            />
            <Text>
              {loginDirty && loginError && <Text style={styles.error} >{loginError}</Text>}
            </Text>

            <Text style={styles.loginFormLabel}> Пароль </Text>
            <TextInput
              style={styles.loginFormInput}
              secureTextEntry={true}
              value={values.password}
              onChangeText={(value) => onChange(value, 'password')}
              onBlur={() => blurHandler(passMark)}
            />
            <Text>
              {passwordDirty && passwordError && <Text style={styles.error} >{passwordError}</Text>}
            </Text>

            <TouchableOpacity
              disabled={!formValid}
              style={{ opacity:  !formValid ? 0.5 : 1}}
              onPress={handleSubmit}
            >
              <Text style={styles.loginFormButton} > Войти </Text>
            </TouchableOpacity>

          </View>
        )
      }}
      
    </Formik>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  loginForm: {
    position: "absolute",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    padding: 32,
    fontWeight: "300",
    backgroundColor: "#fff",
  },

  loginFormTitle: {
    marginBottom: 30,
    color: "#424242",
    fontWeight: "500",
    fontSize: 24,
    fontStyle: "normal",
    lineHeight: 28,
    textAlign: "center",
  },

  loginFormLabel: {
    position: "relative",
    color: "#424242",
    fontWeight: "300",
    fontSize: 16,
    lineHeight: 19,
  },

  loginFormInput: {
    width: 345,
    height: 50,
    marginBottom: 5,
    paddingHorizontal: 20,
    fontSize: 20,
    borderWidth: 1,
    borderRadius: 4,
  },

  loginFormButton: {
    fontSize: 20,
    justifyContent: "center",
    textAlign: "center"
  },

  error: {
    justifyContent: "center",
    textAlign: "center",
    color: 'red',
    marginBottom: 5,
  },
});
